import { Card } from "@/components/ui/card"

const galleryItems = [
  {
    title: "Light Fixture Installation",
    description: "Beautiful chandelier and pendant installations",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "TV Wall Mounting",
    description: "Clean TV mounting with concealed wiring",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Landscape Lighting",
    description: "Outdoor pathway and garden lighting",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Cabinet Lighting",
    description: "Under-cabinet LED lighting installation",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Smart Home Setup",
    description: "Smart switches and dimmer installations",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Security Cameras",
    description: "Ring doorbell and camera installations",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-balance">See Our Work</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Real projects from our professional lighting and electrical services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
