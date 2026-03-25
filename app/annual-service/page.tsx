"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Phone, Calendar, CreditCard, Shield, AlertCircle } from "lucide-react"
import { useState } from "react"

export default function AnnualServicePage() {
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge className="bg-green-600 text-white hover:bg-green-600/90 mb-4">SAVE 30% ANNUALLY</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Annual Service Plan</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Never worry about scheduling again. Get automatic annual service with priority scheduling and save 30% on
              every visit.
            </p>
          </div>

          {/* Comparison Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">One-Time Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-4xl font-bold text-muted-foreground">$159</div>
                <p className="text-muted-foreground">Per cleaning</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span>Full dryer vent cleaning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span>Camera inspection included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span>1-year guarantee</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span>You schedule each time</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-4 border-green-600 shadow-xl bg-gradient-to-br from-white to-green-50 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-green-600 text-white text-sm px-6 py-2">RECOMMENDED</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Annual Service Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl text-muted-foreground line-through">$159</span>
                  <span className="text-4xl font-bold text-green-600">$111</span>
                </div>
                <p className="text-green-600 font-semibold">Save $48 per year (30% off)</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold">Everything in one-time service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold">Automatic annual scheduling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold">Priority service windows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold">Card on file - no hassle payments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold">Reminder notifications</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">How the Annual Service Plan Works</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="bg-[#2A75AE] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                  <h3 className="font-bold">Sign Up</h3>
                  <p className="text-sm text-muted-foreground">
                    Enroll in the annual plan and securely save your payment method
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="bg-[#2A75AE] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                  <h3 className="font-bold">We Contact You</h3>
                  <p className="text-sm text-muted-foreground">
                    We'll reach out when it's time for your annual service with scheduling options
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="bg-[#2A75AE] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                  <h3 className="font-bold">Schedule Service</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred date and time from priority scheduling windows
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-3">
                  <div className="bg-[#2A75AE] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                    4
                  </div>
                  <h3 className="font-bold">Automatic Payment</h3>
                  <p className="text-sm text-muted-foreground">
                    Your card is charged after service completion - no hassle, no invoices
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-16 bg-gradient-to-b from-blue-50 to-white rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Annual Service?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="bg-[#2A75AE]/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-[#2A75AE]" />
                </div>
                <h3 className="font-bold text-lg">Never Forget</h3>
                <p className="text-muted-foreground">
                  We track your service schedule and remind you when it's time for your annual cleaning
                </p>
              </div>
              <div className="space-y-3">
                <div className="bg-[#2A75AE]/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-[#2A75AE]" />
                </div>
                <h3 className="font-bold text-lg">Hassle-Free</h3>
                <p className="text-muted-foreground">
                  Card on file means no invoices, no payment reminders - just seamless service
                </p>
              </div>
              <div className="space-y-3">
                <div className="bg-[#2A75AE]/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-[#2A75AE]" />
                </div>
                <h3 className="font-bold text-lg">Consistent Protection</h3>
                <p className="text-muted-foreground">
                  Annual cleaning keeps your home safe and your dryer running efficiently year after year
                </p>
              </div>
            </div>
          </div>

          {/* Contract Terms */}
          <Card className="mb-12 border-2 border-[#2A75AE]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-[#2A75AE]" />
                Annual Service Agreement Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-6 space-y-4">
                <h3 className="font-bold text-lg">Important Information:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#2A75AE] flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Annual Service Rate:</strong> You will be charged $111 (30% discount) for your annual
                      dryer vent cleaning service
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#2A75AE] flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Scheduling:</strong> We will contact you approximately 11-12 months after your last
                      service to schedule your next appointment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#2A75AE] flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Payment:</strong> Your card on file will be charged automatically after service completion
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-[#D3331D] flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Cancellation Policy:</strong> If you choose not to schedule or cancel your annual service
                      appointment, you will be charged the standard single cleaning rate of $159 (instead of the
                      discounted $111 rate). This ensures fairness to customers who maintain their annual commitment.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#2A75AE] flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Opt-Out:</strong> You may opt out of the annual service plan at any time by contacting us
                      before we schedule your next appointment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#2A75AE] flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Guarantee:</strong> All services include our standard 1-year guarantee
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white border-2 border-[#2A75AE] rounded-lg">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                  I understand and agree to the Annual Service Agreement terms, including the cancellation policy that
                  states if I choose not to schedule my annual service, I will be charged the standard single cleaning
                  rate of $159.
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Testimonials */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">What Annual Plan Members Say</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <CheckCircle2 key={star} className="h-4 w-4 text-green-600" />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    "The annual plan is so convenient! I don't have to remember to schedule, and the discount is great.
                    Best decision for home maintenance."
                  </p>
                  <div>
                    <p className="font-semibold">Michael R.</p>
                    <p className="text-sm text-muted-foreground">Annual Member since 2022</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <CheckCircle2 key={star} className="h-4 w-4 text-green-600" />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    "Love that they reach out to me when it's time. No more forgetting about dryer vent maintenance. The
                    automatic payment is super easy too."
                  </p>
                  <div>
                    <p className="font-semibold">Jennifer L.</p>
                    <p className="text-sm text-muted-foreground">Annual Member since 2021</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <CheckCircle2 key={star} className="h-4 w-4 text-green-600" />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    "The 30% savings adds up! Plus I get priority scheduling which is perfect for my busy schedule.
                    Highly recommend the annual plan."
                  </p>
                  <div>
                    <p className="font-semibold">David K.</p>
                    <p className="text-sm text-muted-foreground">Annual Member since 2023</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-green-600 text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Save 30% Every Year?</h2>
            <p className="text-lg mb-8 text-white/90">
              Join our annual service plan and never worry about dryer vent maintenance again
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                disabled={!agreedToTerms}
                className="disabled:opacity-50"
                asChild={agreedToTerms}
              >
                {agreedToTerms ? (
                  <Link href="/estimate/services">
                    Enroll in Annual Plan
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                ) : (
                  <span>
                    Enroll in Annual Plan
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-green-600"
                asChild
              >
                <a href="tel:6156322980">
                  <Phone className="mr-2 h-5 w-5" />
                  Questions? Call Us
                </a>
              </Button>
            </div>
            {!agreedToTerms && <p className="text-sm text-white/80 mt-4">Please agree to the terms above to enroll</p>}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
