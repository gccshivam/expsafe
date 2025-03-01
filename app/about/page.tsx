import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "Urban planning expert with 15 years of experience in community safety initiatives.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Dr. Priya Sharma",
      role: "AI Research Lead",
      bio: "PhD in Computer Vision with expertise in hazard detection algorithms.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Marcus Williams",
      role: "Community Engagement Director",
      bio: "Former city council member passionate about civic technology.",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">About SafetySpot</h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg">
            We're on a mission to create safer communities through technology, AI, and citizen engagement.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold">Our Mission & Vision</h2>
            <div className="mb-12 space-y-6 text-lg">
              <p>
                <strong>Our Mission:</strong> To empower communities to identify, report, and resolve safety hazards
                through collaborative technology and AI-driven solutions.
              </p>
              <p>
                <strong>Our Vision:</strong> A world where every community has the tools to create safer environments
                through citizen engagement and data-driven decision making.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why SafetySpot */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Why SafetySpot?</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-bold">Community-Driven</h3>
              <p>
                We believe that residents know their neighborhoods best. SafetySpot harnesses collective knowledge to
                identify and prioritize safety concerns.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-bold">AI-Powered Analysis</h3>
              <p>
                Our advanced AI algorithms analyze hazard reports, categorize issues, predict severity, and identify
                patterns that might otherwise go unnoticed.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-bold">Transparent Process</h3>
              <p>
                From submission to resolution, we keep everyone informed about the status of reported hazards and the
                actions being taken.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-bold">Data-Driven Decisions</h3>
              <p>
                We provide authorities with actionable insights to make informed decisions about resource allocation and
                infrastructure improvements.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-bold">Gamified Engagement</h3>
              <p>
                Our platform recognizes and rewards active community members, encouraging ongoing participation in
                safety initiatives.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-bold">Accessible Technology</h3>
              <p>
                SafetySpot is designed to be user-friendly and accessible to everyone, regardless of technical expertise
                or background.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Use AI */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
            <div className="max-w-xl">
              <h2 className="mb-6 text-3xl font-bold">How We Use AI & Crowdsourcing</h2>
              <div className="space-y-4">
                <p>
                  SafetySpot combines the power of artificial intelligence with community knowledge to create a
                  comprehensive safety monitoring system.
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>
                    <strong>Image Analysis:</strong> Our AI automatically detects and categorizes hazards from submitted
                    photos.
                  </li>
                  <li>
                    <strong>Severity Prediction:</strong> Machine learning algorithms assess the urgency of reported
                    issues.
                  </li>
                  <li>
                    <strong>Pattern Recognition:</strong> We identify recurring problems and systemic issues across
                    neighborhoods.
                  </li>
                  <li>
                    <strong>Community Validation:</strong> User votes and comments help verify and prioritize reports.
                  </li>
                  <li>
                    <strong>Data Aggregation:</strong> We combine reports to create comprehensive safety maps and
                    insights.
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full max-w-md">
              <Image
                src="/placeholder.svg?height=600&width=500"
                alt="AI and Crowdsourcing Illustration"
                width={500}
                height={600}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Team</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <div key={member.name} className="rounded-lg bg-white p-6 shadow-md">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="mx-auto mb-4 h-48 w-48 rounded-full object-cover"
                />
                <h3 className="mb-1 text-center text-xl font-bold">{member.name}</h3>
                <p className="mb-3 text-center text-primary">{member.role}</p>
                <p className="text-center text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Partnerships & Collaborations</h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg">
            We work closely with local governments, community organizations, and technology partners to create effective
            safety solutions.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="mb-4 text-xl font-bold">For Municipalities</h3>
              <p className="mb-6">
                Partner with SafetySpot to streamline your hazard reporting system, prioritize infrastructure repairs,
                and engage with residents on safety issues.
              </p>
              <Link href="/contact">
                <Button>Become a Municipal Partner</Button>
              </Link>
            </div>
            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="mb-4 text-xl font-bold">For Organizations</h3>
              <p className="mb-6">
                NGOs, community groups, and businesses can collaborate with SafetySpot to promote safety initiatives and
                contribute to community well-being.
              </p>
              <Link href="/contact">
                <Button>Explore Partnerships</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Contact Us</h2>
          <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-md">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-xl font-bold">Get in Touch</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <Mail className="mr-2 h-5 w-5 text-primary" />
                    <span>info@safetyspot.com</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="mr-2 h-5 w-5 text-primary" />
                    <span>+1 (555) 123-4567</span>
                  </li>
                  <li className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-primary" />
                    <span>123 Safety Street, Innovation City, 10001</span>
                  </li>
                </ul>
                <div className="mt-6 flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-primary">
                    <Facebook className="h-6 w-6" />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-primary">
                    <Twitter className="h-6 w-6" />
                    <span className="sr-only">Twitter</span>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-primary">
                    <Instagram className="h-6 w-6" />
                    <span className="sr-only">Instagram</span>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="mb-4 text-xl font-bold">Send Us a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="mb-1 block text-sm font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full rounded-md border border-gray-300 p-2"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full rounded-md border border-gray-300 p-2"
                      placeholder="Your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-1 block text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full rounded-md border border-gray-300 p-2"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

