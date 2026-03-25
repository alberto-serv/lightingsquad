import { Card } from "@/components/ui/card"

const galleryItems = [
  {
    title: "Residential Dryer Vent",
    description: "Complete home dryer vent cleaning",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Lint Removal",
    description: "Heavy lint buildup removal",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Commercial Laundromat",
    description: "Multi-unit dryer vent cleaning",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Vent Inspection",
    description: "Professional safety inspection",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Exterior Vent Cleaning",
    description: "Outside vent cap cleaning",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Apartment Complex",
    description: "Multi-family building service",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-balance">See Our Results</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Real transformations from our professional dryer vent cleaning services
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
