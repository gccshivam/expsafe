import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Phone, AlertTriangle, FileText, Video, Download } from "lucide-react"

export default function ResourcesPage() {
  const emergencyContacts = [
    { name: "Police (Non-Emergency)", number: "555-123-4567" },
    { name: "Fire Department", number: "555-123-8910" },
    { name: "City Services", number: "311" },
    { name: "Power Outage Reporting", number: "555-123-5678" },
    { name: "Water/Sewer Issues", number: "555-123-9012" },
    { name: "Road Hazards", number: "555-123-3456" },
  ]

  const safetyGuides = [
    {
      title: "How to Report Road Hazards",
      description: "Learn the most effective way to report and document road hazards.",
      image: "/placeholder.svg?height=200&width=300",
      link: "#",
    },
    {
      title: "Identifying Electrical Hazards",
      description: "Tips for safely identifying and reporting electrical hazards in your community.",
      image: "/placeholder.svg?height=200&width=300",
      link: "#",
    },
    {
      title: "Water and Flooding Safety",
      description: "What to do when you encounter water hazards and flooding in your area.",
      image: "/placeholder.svg?height=200&width=300",
      link: "#",
    },
    {
      title: "Structural Safety Concerns",
      description: "How to identify and report potentially dangerous structural issues.",
      image: "/placeholder.svg?height=200&width=300",
      link: "#",
    },
  ]

  const safetyVideos = [
    {
      title: "Community Safety Walkthrough",
      description: "A visual guide to identifying common safety hazards in your neighborhood.",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "5:23",
    },
    {
      title: "How to Use SafetySpot Effectively",
      description: "Learn how to make the most of the SafetySpot platform to report hazards.",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "8:47",
    },
    {
      title: "Safety Tips for Urban Areas",
      description: "Expert advice on staying safe and reporting hazards in urban environments.",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "12:05",
    },
  ]

  const faqs = [
    {
      question: "How do I report a hazard?",
      answer:
        "You can report a hazard by clicking the 'Report a Hazard' button in the navigation menu. You'll need to upload a photo, provide a description, and indicate the location of the hazard. Our AI will help categorize and assess the severity of the issue.",
    },
    {
      question: "What happens after I submit a report?",
      answer:
        "After submission, your report becomes visible on the Safety Map. Community members can vote on its priority, and local authorities are notified based on the severity and community votes. You'll receive updates as the status of your report changes.",
    },
    {
      question: "How are hazards prioritized?",
      answer:
        "Hazards are prioritized based on several factors: the AI-assessed severity, the number of community votes, the category of hazard, and the proximity to sensitive locations like schools or hospitals.",
    },
    {
      question: "Can I report a hazard anonymously?",
      answer:
        "Yes, you can choose to report hazards anonymously. However, creating an account allows you to track your reports, receive updates, and earn community recognition for your contributions.",
    },
    {
      question: "How do I earn badges and recognition?",
      answer:
        "You earn badges by actively participating in the SafetySpot community. This includes submitting verified hazard reports, voting on other reports, participating in forum discussions, and when your reported hazards are resolved.",
    },
    {
      question: "Can I use SafetySpot in my city?",
      answer:
        "SafetySpot is designed to work in any community. While we have formal partnerships with some municipalities for direct integration with their systems, the platform works independently to collect, verify, and highlight safety concerns in any location.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Resources & Safety Tips</h1>
        <p className="text-gray-600">
          Essential information, guides, and contacts to help you stay safe and report hazards effectively.
        </p>
      </div>

      <Tabs defaultValue="emergency" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-2 md:grid-cols-4 lg:w-[800px]">
          <TabsTrigger value="emergency">Emergency Contacts</TabsTrigger>
          <TabsTrigger value="guides">Safety Guides</TabsTrigger>
          <TabsTrigger value="videos">Safety Videos</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="emergency" className="space-y-6">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
              <h2 className="text-lg font-semibold text-red-700">For Emergencies, Always Call 911</h2>
            </div>
            <p className="mt-2 text-red-700">
              If you're reporting a situation that requires immediate emergency response, please call 911 instead of using
              this platform.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {emergencyContacts.map((contact) => (
              <Card key={contact.name}>
                <CardHeader className="pb-2">
                  <CardTitle>{contact.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-5 w-5 text-primary" />
                    <span className="text-lg font-semibold">{contact.number}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Call Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-bold">Download Emergency Contact List</h3>
            <p className="mb-4">
              Keep important emergency contacts handy by downloading our comprehensive contact list for your area.
            </p>
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" /> Download PDF
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="guides" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {safetyGuides.map((guide) => (
              <Card key={guide.title} className="overflow-hidden">
                <div className="relative h-40 w-full">
                  <Image
                    src={guide.image || "/placeholder.svg"}
                    alt={guide.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href={guide.link} className="w-full">
                    <Button variant="outline" className="w-full flex items-center gap-2">
                      <FileText className="h-4 w-4" /> Read Guide
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-bold">Safety Reporting Checklist</h3>
            <p className="mb-4">
              Use this checklist when reporting hazards to ensure you provide all the necessary information:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>Take clear photos from multiple angles if possible</li>
              <li>Note the exact location (street address, landmarks, or GPS coordinates)</li>
              <li>Describe the hazard in detail, including size, duration, and potential risks</li>
              <li>Note if the hazard is affecting traffic, pedestrians, or property</li>
              <li>Indicate if the situation appears to be worsening</li>
              <li>Mention if you've seen any temporary measures already in place</li>
            </ul>
            <Button className="mt-4 flex items-center gap-2">
              <Download className="h-4 w-4" /> Download Checklist
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {safetyVideos.map((video) => (
              <Card key={video.title} className="overflow-hidden">
                <div className="relative h-40 w-full">
                  <Image
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary bg-opacity-80 text-white">
                      <Video className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-70 px-2 py-1 text-xs text-white">
                    {video.duration}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{video.title}</CardTitle>
                  <CardDescription>{video.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full">Watch Video</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-bold">Safety Webinars</h3>
            <p className="mb-4">
              Join our upcoming live webinars to learn more about community safety and effective hazard reporting:
            </p>
            <ul className="space-y-4">
              <li className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <h4 className="font-semibold">Community Safety Workshop</h4>
                  <p className="text-sm text-gray-600">November 25, 2023 • 7:00 PM EST</p>
                </div>
                <Button>Register</Button>
              </li>
              <li className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <h4 className="font-semibold">Expert Q&A: Urban Infrastructure Safety</h4>
                  <p className="text-sm text-gray-600">December 10, 2023 • 6:30 PM EST</p>
                </div>
                <Button>Register</Button>
              </li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find answers to common questions about using SafetySpot and reporting hazards.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-gray-500">
                Can't find what you're looking for? Contact our support team.
              </p>
              <Link href="/contact">
                <Button variant="outline">Contact Support</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-bold">Additional Resources</h3>
            <p className="mb-4">
              Explore more safety resources and educational materials to help keep your community safe.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <FileText className="h-4 w-4" /> Safety Guidelines
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" /> Training Materials
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Video className="h-4 w-4" /> Educational Videos
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}