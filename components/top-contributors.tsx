import Image from "next/image"
import { Trophy, Award, Star } from "lucide-react"

export default function TopContributors() {
  const contributors = [
    {
      name: "John Smith",
      reports: 42,
      badge: "Safety Hero",
      icon: <Trophy className="h-6 w-6 text-yellow-500" />,
    },
    {
      name: "Maria Garcia",
      reports: 38,
      badge: "Road Guardian",
      icon: <Award className="h-6 w-6 text-blue-500" />,
    },
    {
      name: "David Chen",
      reports: 35,
      badge: "Community Watchdog",
      icon: <Star className="h-6 w-6 text-green-500" />,
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {contributors.map((contributor, index) => (
        <div
          key={contributor.name}
          className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md transition-transform hover:-translate-y-1"
        >
          <div className="mb-4 overflow-hidden rounded-full border-4 border-primary">
            <Image
              src={`/placeholder.svg?height=100&width=100&text=${contributor.name.charAt(0)}`}
              alt={contributor.name}
              width={100}
              height={100}
              className="h-24 w-24 object-cover"
            />
          </div>
          <h3 className="mb-1 text-xl font-bold">{contributor.name}</h3>
          <p className="mb-3 text-gray-600">{contributor.reports} Hazards Reported</p>
          <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
            {contributor.icon}
            <span className="font-medium">{contributor.badge}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

