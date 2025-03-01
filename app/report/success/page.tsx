import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, MapPin, ArrowRight } from "lucide-react"

export default function ReportSuccessPage() {
  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="h-24 w-24 text-green-500" />
        </div>
        <h1 className="mb-4 text-3xl font-bold">Report Submitted Successfully!</h1>
        <p className="mb-8 text-lg text-gray-600">
          Thank you for helping make your community safer. Your report has been received and will be reviewed shortly.
        </p>
        <div className="mb-6 rounded-lg bg-gray-50 p-6 text-left">
          <h2 className="mb-4 text-xl font-semibold">What happens next?</h2>
          <ol className="ml-6 list-decimal space-y-2">
            <li>Our AI will analyze your report and categorize the hazard</li>
            <li>Community members can view and vote on your report</li>
            <li>Local authorities will be notified based on severity and votes</li>
            <li>You'll receive updates as your report status changes</li>
          </ol>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/map" className="flex-1">
            <Button variant="outline" className="w-full">
              <MapPin className="mr-2 h-4 w-4" /> View on Map
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button className="w-full">
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

