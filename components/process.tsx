import { Card, CardContent } from "@/components/ui/card"
import { Phone, Calendar, Lightbulb, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: Phone,
    number: "01",
    title: "Get Your Quote",
    description:
      "Contact us for a free, no-obligation quote. We'll discuss your lighting or electrical needs and provide transparent pricing.",
  },
  {
    icon: Calendar,
    number: "02",
    title: "Schedule Service",
    description:
      "Choose a convenient time that works for you. We offer flexible scheduling to fit your busy lifestyle.",
  },
  {
    icon: Lightbulb,
    number: "03",
    title: "Professional Installation",
    description:
      "Our skilled technicians arrive with all the right tools and equipment to complete your lighting or electrical project.",
  },
  {
    icon: CheckCircle,
    number: "04",
    title: "Final Walkthrough",
    description:
      "We do a thorough walkthrough with you to make sure everything works perfectly and you're completely satisfied.",
  },
]

export function Process() {
  return (
    <section id="process" className="py-24 bg-accent/20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-balance">Our Simple Process</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            From initial contact to final walkthrough, we make every project hassle-free
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                    <step.icon className="h-10 w-10 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground text-pretty leading-relaxed">{step.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
