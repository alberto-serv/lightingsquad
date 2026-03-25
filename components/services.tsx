import { Card, CardContent } from "@/components/ui/card"
import { Home, Building2, Flame, Wind } from "lucide-react"

const services = [
  {
    icon: Home,
    title: "Residential Dryer Vents",
    description:
      "Complete dryer vent cleaning for homes. Prevent fires and improve dryer efficiency with our thorough cleaning service.",
    features: ["Vent Inspection", "Lint Removal", "Duct Cleaning", "Safety Check"],
  },
  {
    icon: Building2,
    title: "Commercial Services",
    description:
      "Professional dryer vent cleaning for laundromats, hotels, and multi-unit buildings. Keep your business safe and compliant.",
    features: ["Multi-Unit Buildings", "Laundromats", "Hotels & Resorts", "Apartment Complexes"],
  },
  {
    icon: Flame,
    title: "Fire Prevention",
    description:
      "Specialized fire prevention services including dryer vent inspections and safety assessments to protect your property.",
    features: ["Fire Risk Assessment", "Code Compliance", "Safety Inspections", "Prevention Plans"],
  },
  {
    icon: Wind,
    title: "Airflow Optimization",
    description:
      "Improve dryer performance and reduce energy costs with our airflow optimization and vent system upgrades.",
    features: ["Efficiency Testing", "Vent Upgrades", "Airflow Analysis", "Energy Savings"],
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-balance">Our Professional Services</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            We provide comprehensive dryer vent cleaning solutions for residential and commercial properties
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
