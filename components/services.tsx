import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Tv, Shield, Plug } from "lucide-react"

const services = [
  {
    icon: Lightbulb,
    title: "Light Fixture Installation",
    description:
      "Professional installation of light fixtures, ceiling fans, and chandeliers. Transform any room with expert lighting.",
    features: ["Chandeliers & Pendants", "Ceiling Fans", "Recessed Lighting", "Sconces & Flush Mounts"],
  },
  {
    icon: Tv,
    title: "TV & Entertainment",
    description:
      "TV wall mounting, soundbar installation, and full surround sound systems with clean, concealed wiring.",
    features: ["TV Wall Mounting", "Soundbar Install", "Surround Sound", "Cable Management"],
  },
  {
    icon: Shield,
    title: "Security & Smart Home",
    description:
      "Ring doorbell and camera installations, smart switches, dimmers, and outlet upgrades for a modern home.",
    features: ["Ring Doorbells", "Security Cameras", "Smart Switches", "Outlet Upgrades"],
  },
  {
    icon: Plug,
    title: "Specialized Lighting",
    description:
      "Landscape lighting, cabinet lighting, garage hex lighting, permanent LED systems, and whole-home LED conversions.",
    features: ["Landscape Lighting", "Cabinet LEDs", "Garage Hex Lights", "LED Conversions"],
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-balance">Our Professional Services</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Comprehensive lighting and electrical solutions for homeowners and businesses
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border">
              <CardContent className="p-8 space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="text-muted-foreground text-pretty leading-relaxed">{service.description}</p>
                </div>

                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-muted-foreground flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
