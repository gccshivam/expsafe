import { Quote } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  image?: string
}

export default function TestimonialCard({ quote, author, role, image }: TestimonialCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <Quote className="mb-4 h-8 w-8 text-primary opacity-50" />
      <p className="mb-4 text-gray-700">{quote}</p>
      <div className="flex items-center">
        <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-gray-200">
          {image ? (
            <img src={image || "/placeholder.svg"} alt={author} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-primary text-white">
              {author.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  )
}

