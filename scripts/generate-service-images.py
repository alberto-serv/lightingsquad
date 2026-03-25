#!/usr/bin/env python3
"""
Generate service card images using Nano Banana (Gemini) API.

Prerequisites:
  pip install google-genai Pillow

Usage:
  export GEMINI_API_KEY="your-api-key-here"
  python scripts/generate-service-images.py

Images are saved to public/services/ as WebP files, 600x400px, under 2MB each.
"""

import os
import sys
import base64
import time
from pathlib import Path

try:
    from google import genai
except ImportError:
    print("Missing dependency. Run: pip install google-genai")
    sys.exit(1)

try:
    from PIL import Image
    import io
except ImportError:
    print("Missing dependency. Run: pip install Pillow")
    sys.exit(1)

API_KEY = os.environ.get("GEMINI_API_KEY")
if not API_KEY:
    print("Error: Set GEMINI_API_KEY environment variable")
    print("  export GEMINI_API_KEY='your-key-here'")
    sys.exit(1)

# Output directory
OUTPUT_DIR = Path(__file__).parent.parent / "public" / "services"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Target dimensions for cards (3:2 ratio, good for responsive card layouts)
TARGET_WIDTH = 600
TARGET_HEIGHT = 400

MODEL = "gemini-2.0-flash-exp"  # Nano Banana model with image generation

# Style prefix for consistency across all images
STYLE = (
    "Professional, clean, modern photograph with warm lighting and shallow depth of field. "
    "Residential home setting. No text, no logos, no watermarks. "
    "High quality, editorial style, warm color temperature."
)

# All 14 service cards with filenames and prompts
SERVICES = [
    {
        "filename": "permanent-led.webp",
        "prompt": f"{STYLE} Close-up of modern permanent LED strip lighting installed along the roofline of a beautiful home at dusk, warm white glow against twilight sky.",
    },
    {
        "filename": "garage-hex.webp",
        "prompt": f"{STYLE} Stunning hexagonal LED honeycomb lights installed on a garage ceiling, illuminating a clean modern garage interior with bright even lighting.",
    },
    {
        "filename": "switches-outlets.webp",
        "prompt": f"{STYLE} Elegant modern white dimmer switch and electrical outlet on a clean wall, with soft ambient lighting in a contemporary home interior.",
    },
    {
        "filename": "led-bulb-upgrade.webp",
        "prompt": f"{STYLE} Hand holding a modern LED light bulb near a stylish pendant light fixture, warm inviting glow in a modern kitchen setting.",
    },
    {
        "filename": "light-fixture.webp",
        "prompt": f"{STYLE} Beautiful modern pendant light fixture being installed in a dining room, warm ambient glow, clean contemporary interior design.",
    },
    {
        "filename": "fixture-cleaning.webp",
        "prompt": f"{STYLE} Sparkling clean crystal chandelier in an elegant room, light refracting beautifully through pristine glass, freshly cleaned and gleaming.",
    },
    {
        "filename": "outdoor-lighting.webp",
        "prompt": f"{STYLE} Beautiful landscape lighting along a garden pathway at dusk, warm pathway lights illuminating lush landscaping and a walkway leading to a home.",
    },
    {
        "filename": "exterior-bulb.webp",
        "prompt": f"{STYLE} Exterior porch light fixture on a home entrance with a fresh bright LED bulb, warm welcoming glow at the front door at evening time.",
    },
    {
        "filename": "tv-mounting.webp",
        "prompt": f"{STYLE} Large flat screen TV wall-mounted on a clean living room wall with concealed cables, modern entertainment setup with soundbar below.",
    },
    {
        "filename": "audio-system.webp",
        "prompt": f"{STYLE} Premium home audio surround sound system installed in a modern living room, sleek speakers mounted on walls with clean cable management.",
    },
    {
        "filename": "doorbell.webp",
        "prompt": f"{STYLE} Ring video doorbell installed on a modern home entrance, close-up showing the device mounted next to a stylish front door.",
    },
    {
        "filename": "security-cameras.webp",
        "prompt": f"{STYLE} Modern white security camera mounted on the exterior corner of a home, overlooking a driveway, clean professional installation.",
    },
    {
        "filename": "picture-hanging.webp",
        "prompt": f"{STYLE} Beautifully arranged gallery wall with multiple framed art pieces and photographs hung perfectly on a living room wall, balanced spacing.",
    },
    {
        "filename": "ceiling-fan.webp",
        "prompt": f"{STYLE} Modern ceiling fan with integrated LED light installed in a bright bedroom, clean white blades spinning gently, airy comfortable room.",
    },
]


def generate_image(client: genai.Client, prompt: str) -> bytes | None:
    """Generate an image using Gemini API and return raw image bytes."""
    try:
        response = client.models.generate_content(
            model=MODEL,
            contents=prompt,
            config=genai.types.GenerateContentConfig(
                response_modalities=["IMAGE", "TEXT"],
            ),
        )

        # Extract image data from response
        for part in response.candidates[0].content.parts:
            if part.inline_data is not None:
                return part.inline_data.data

        print("  Warning: No image in response, retrying...")
        return None

    except Exception as e:
        print(f"  API error: {e}")
        return None


def process_image(image_bytes: bytes, output_path: Path) -> bool:
    """Resize to target dimensions and save as WebP under 2MB."""
    try:
        img = Image.open(io.BytesIO(image_bytes))

        # Resize to 600x400 with high quality
        img = img.resize((TARGET_WIDTH, TARGET_HEIGHT), Image.LANCZOS)

        # Convert to RGB if needed (remove alpha channel)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")

        # Save as WebP, adjust quality to stay under 2MB
        quality = 85
        while quality >= 30:
            buffer = io.BytesIO()
            img.save(buffer, format="WEBP", quality=quality)
            size = buffer.tell()

            if size < 2 * 1024 * 1024:  # Under 2MB
                with open(output_path, "wb") as f:
                    f.write(buffer.getvalue())
                print(f"  Saved: {output_path.name} ({size / 1024:.0f} KB, q={quality})")
                return True

            quality -= 10

        print(f"  Error: Could not compress {output_path.name} under 2MB")
        return False

    except Exception as e:
        print(f"  Processing error: {e}")
        return False


def main():
    client = genai.Client(api_key=API_KEY)

    print(f"Generating {len(SERVICES)} service card images...")
    print(f"Output: {OUTPUT_DIR}")
    print(f"Dimensions: {TARGET_WIDTH}x{TARGET_HEIGHT}px (3:2)")
    print(f"Model: {MODEL}")
    print()

    success = 0
    failed = []

    for i, service in enumerate(SERVICES, 1):
        filename = service["filename"]
        output_path = OUTPUT_DIR / filename

        # Skip if already exists
        if output_path.exists():
            print(f"[{i}/{len(SERVICES)}] {filename} — already exists, skipping")
            success += 1
            continue

        print(f"[{i}/{len(SERVICES)}] Generating {filename}...")

        # Retry up to 3 times
        image_bytes = None
        for attempt in range(3):
            image_bytes = generate_image(client, service["prompt"])
            if image_bytes:
                break
            if attempt < 2:
                wait = 2 ** (attempt + 1)
                print(f"  Retrying in {wait}s...")
                time.sleep(wait)

        if not image_bytes:
            print(f"  FAILED: Could not generate {filename}")
            failed.append(filename)
            continue

        if process_image(image_bytes, output_path):
            success += 1
        else:
            failed.append(filename)

        # Rate limit: ~2 seconds between requests
        if i < len(SERVICES):
            time.sleep(2)

    print()
    print(f"Done! {success}/{len(SERVICES)} images generated.")
    if failed:
        print(f"Failed: {', '.join(failed)}")
        print("Re-run the script to retry failed images (existing ones are skipped).")


if __name__ == "__main__":
    main()
