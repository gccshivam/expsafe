import Image from "next/image"

export default function PartnerLogos() {
  const partners = [
    { name: "City of Springfield", logo: "/placeholder.svg?height=60&width=180" },
    { name: "Urban Safety Initiative", logo: "/placeholder.svg?height=60&width=180" },
    { name: "Community First NGO", logo: "/placeholder.svg?height=60&width=180" },
    { name: "Metropolitan Transport Authority", logo: "/placeholder.svg?height=60&width=180" },
    { name: "National Infrastructure Fund", logo: "/placeholder.svg?height=60&width=180" },
  ]

  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      {partners.map((partner) => (
        <div key={partner.name} className="flex h-20 items-center justify-center">
          <Image
            src={partner.logo || "/placeholder.svg"}
            alt={partner.name}
            width={180}
            height={60}
            className="max-h-16 w-auto grayscale transition-all duration-300 hover:grayscale-0"
          />
        </div>
      ))}
    </div>
  )
}

