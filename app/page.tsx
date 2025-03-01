import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Camera, Upload, CheckCircle } from "lucide-react"
import MiniMap from "@/components/mini-map"
import TestimonialCard from "@/components/testimonial-card"
import PartnerLogos from "@/components/partner-logos"
import TopContributors from "@/components/top-contributors"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="City with hazard markers"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="mb-6 text-4xl font-bold md:text-6xl">Transforming Community Safety with AI</h1>
          <p className="mb-8 max-w-2xl text-lg">
            Join thousands of citizens making their communities safer, one report at a time.
          </p>
          <Link href="/report">
            <Button size="lg" className="text-lg">
              Report a Hazard Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Brief Introduction */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">How SafetySpot Works</h2>
            <p className="mb-8 text-lg text-gray-700">
              SafetySpot uses AI and community engagement to identify, prioritize, and resolve safety hazards in your
              neighborhood. Our platform connects citizens with local authorities to create safer communities.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-2 text-xl font-semibold">
                <span className="rounded-full bg-primary px-3 py-1 text-white">10,000+</span>
                <span>Hazards Reported</span>
              </div>
              <div className="flex items-center gap-2 text-xl font-semibold">
                <span className="rounded-full bg-primary px-3 py-1 text-white">85%</span>
                <span>Resolution Rate</span>
              </div>
              <div className="flex items-center gap-2 text-xl font-semibold">
                <span className="rounded-full bg-primary px-3 py-1 text-white">5,000+</span>
                <span>Active Users</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                <Camera className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold">1. Take a Photo</h3>
              <p className="text-gray-600">Capture the hazard with your smartphone or upload an existing image.</p>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                <Upload className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold">2. Submit & Vote</h3>
              <p className="text-gray-600">Report the hazard and let the community vote on its priority.</p>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold">3. Action Taken</h3>
              <p className="text-gray-600">Local authorities are alerted and take action to resolve the issue.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Success Stories</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              quote="Thanks to SafetySpot, the dangerous pothole on my street was fixed within a week of reporting it."
              author="Sarah Johnson"
              role="Community Member"
            />
            <TestimonialCard
              quote="As a city official, this platform has revolutionized how we prioritize infrastructure repairs."
              author="Michael Chen"
              role="City Infrastructure Manager"
            />
            <TestimonialCard
              quote="The AI analysis helps us identify patterns of hazards that we wouldn't have noticed otherwise."
              author="Dr. Lisa Patel"
              role="Urban Safety Researcher"
            />
          </div>
        </div>
      </section>

      {/* Gamification */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">Community Heroes</h2>
          <p className="mb-12 text-center text-lg text-gray-700">
            Recognition for those making the biggest impact in their communities
          </p>
          <TopContributors />
        </div>
      </section>

      {/* Map Preview */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="max-w-xl">
              <h2 className="mb-4 text-3xl font-bold">Live Safety Map</h2>
              <p className="mb-6 text-lg text-gray-700">
                Explore reported hazards in your area. Our interactive map shows real-time data on safety issues and
                their resolution status.
              </p>
              <Link href="/map">
                <Button size="lg">View Full Map</Button>
              </Link>
            </div>
            <div className="h-[400px] w-full max-w-2xl rounded-lg border shadow-lg lg:w-1/2">
              <MiniMap />
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Partners</h2>
          <PartnerLogos />
        </div>
      </section>

      {/* App Download */}
      <section className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold">Get the SafetySpot App</h2>
          <p className="mb-8 text-lg">Report hazards on the go and receive real-time notifications</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="bg-white text-primary hover:bg-gray-100">
              <Image
                src="/placeholder.svg?height=24&width=24"
                alt="App Store"
                width={24}
                height={24}
                className="mr-2"
              />
              App Store
            </Button>
            <Button variant="outline" className="bg-white text-primary hover:bg-gray-100">
              <Image
                src="/placeholder.svg?height=24&width=24"
                alt="Google Play"
                width={24}
                height={24}
                className="mr-2"
              />
              Google Play
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

