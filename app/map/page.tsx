"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, MapPin, AlertTriangle, ThumbsUp, MessageSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Loader } from "lucide-react"

// Mock data for hazards
const mockHazards = [
  {
    id: "1",
    title: "Large pothole on Main Street",
    description: "Deep pothole that could damage vehicles or cause accidents",
    category: "road_damage",
    severity: 4,
    status: "pending",
    votes: 15,
    comments: 3,
    location: "Main Street & 5th Avenue",
    latitude: 40.7128,
    longitude: -74.006,
    image: "/placeholder.svg?height=200&width=300",
    reportedBy: "John D.",
    reportedAt: "2023-11-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Fallen tree blocking sidewalk",
    description: "Tree has fallen after the storm and is completely blocking the pedestrian path",
    category: "debris",
    severity: 3,
    status: "in_progress",
    votes: 8,
    comments: 2,
    location: "Oak Avenue near Central Park",
    latitude: 40.7135,
    longitude: -74.0046,
    image: "/placeholder.svg?height=200&width=300",
    reportedBy: "Sarah M.",
    reportedAt: "2023-11-16T14:45:00Z",
  },
  {
    id: "3",
    title: "Broken street light",
    description: "Street light has been out for several days, creating a dark area at night",
    category: "lighting",
    severity: 2,
    status: "pending",
    votes: 5,
    comments: 1,
    location: "Pine Street & 10th Avenue",
    latitude: 40.7142,
    longitude: -74.0052,
    image: "/placeholder.svg?height=200&width=300",
    reportedBy: "Michael T.",
    reportedAt: "2023-11-17T18:20:00Z",
  },
  {
    id: "4",
    title: "Exposed electrical wires",
    description: "Electrical box on the corner has exposed wires that could be dangerous",
    category: "electrical",
    severity: 5,
    status: "pending",
    votes: 23,
    comments: 7,
    location: "Elm Street & 3rd Avenue",
    latitude: 40.7139,
    longitude: -74.0062,
    image: "/placeholder.svg?height=200&width=300",
    reportedBy: "Lisa K.",
    reportedAt: "2023-11-18T09:15:00Z",
  },
  {
    id: "5",
    title: "Water main leak",
    description: "Water pooling on the street from what appears to be a water main leak",
    category: "water",
    severity: 4,
    status: "in_progress",
    votes: 12,
    comments: 4,
    location: "Maple Avenue & 7th Street",
    latitude: 40.7145,
    longitude: -74.007,
    image: "/placeholder.svg?height=200&width=300",
    reportedBy: "Robert J.",
    reportedAt: "2023-11-19T11:30:00Z",
  },
]

export default function MapPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedHazard, setSelectedHazard] = useState<(typeof mockHazards)[0] | null>(null)
  const [filters, setFilters] = useState({
    category: "all",
    status: "all",
    severity: [1, 5],
    timeframe: "all",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [mapView, setMapView] = useState("map") // "map" or "satellite"
  const [showResolvedHazards, setShowResolvedHazards] = useState(false)

  // Simulate loading the map
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleVote = (hazardId: string) => {
    // In a real app, this would call an API to register the vote
    console.log(`Voted for hazard ${hazardId}`)
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      road_damage: "bg-amber-500",
      electrical: "bg-red-500",
      water: "bg-blue-500",
      structural: "bg-purple-500",
      debris: "bg-green-500",
      lighting: "bg-yellow-500",
      signage: "bg-orange-500",
      vegetation: "bg-emerald-500",
      other: "bg-gray-500",
    }
    return colors[category] || "bg-gray-500"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            Pending
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            In Progress
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="flex h-full flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full border-b md:w-96 md:border-b-0 md:border-r">
          <div className="flex h-full flex-col">
            <div className="border-b p-4">
              <h1 className="mb-4 text-2xl font-bold">Live Safety Map</h1>
              <div className="relative mb-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by location or keyword"
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" /> Filters
                </Button>
                <div className="flex items-center space-x-2">
                  <Switch id="show-resolved" checked={showResolvedHazards} onCheckedChange={setShowResolvedHazards} />
                  <Label htmlFor="show-resolved" className="text-sm">
                    Show Resolved
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4">
              <div className="mb-4 flex justify-between">
                <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="road_damage">Road Damage</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                    <SelectItem value="water">Water Issues</SelectItem>
                    <SelectItem value="structural">Structural</SelectItem>
                    <SelectItem value="debris">Debris</SelectItem>
                    <SelectItem value="lighting">Lighting</SelectItem>
                    <SelectItem value="signage">Signage</SelectItem>
                    <SelectItem value="vegetation">Vegetation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium">
                  Severity Range: {filters.severity[0]} - {filters.severity[1]}
                </label>
                <Slider
                  value={filters.severity}
                  min={1}
                  max={5}
                  step={1}
                  onValueChange={(value) => setFilters({ ...filters, severity: value })}
                />
              </div>

              <div className="space-y-4">
                {mockHazards.map((hazard) => (
                  <div
                    key={hazard.id}
                    className={`cursor-pointer rounded-lg border p-4 transition-colors hover:bg-gray-50 ${
                      selectedHazard?.id === hazard.id ? "border-primary bg-gray-50" : ""
                    }`}
                    onClick={() => setSelectedHazard(hazard)}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`mr-2 h-3 w-3 rounded-full ${getCategoryColor(hazard.category)}`}></div>
                        <h3 className="font-medium">{hazard.title}</h3>
                      </div>
                      {getStatusBadge(hazard.status)}
                    </div>
                    <p className="mb-2 text-sm text-gray-600 line-clamp-2">{hazard.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3" />
                        {hazard.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <ThumbsUp className="mr-1 h-3 w-3" />
                          {hazard.votes}
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="mr-1 h-3 w-3" />
                          {hazard.comments}
                        </div>
                        <div>{formatDate(hazard.reportedAt)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="relative flex-1">
          {isLoading ? (
            <div className="flex h-full w-full items-center justify-center bg-gray-100">
              <div className="text-center">
                <Loader className="mx-auto mb-4 h-8 w-8 animate-spin text-primary" />
                <p>Loading map data...</p>
              </div>
            </div>
          ) : (
            <div className="h-full w-full">
              <div className="absolute left-4 top-4 z-10">
                <Tabs value={mapView} onValueChange={setMapView} className="bg-white rounded-md shadow-md">
                  <TabsList>
                    <TabsTrigger value="map">Map</TabsTrigger>
                    <TabsTrigger value="satellite">Satellite</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* This would be replaced with an actual map component */}
              <div className="h-full w-full bg-gray-200">
                <div className="h-full w-full bg-[url('/placeholder.svg?height=1000&width=1000&text=Interactive+Map')]"></div>
              </div>

              {/* Hazard Detail Panel */}
              {selectedHazard && (
                <div className="absolute bottom-4 right-4 w-80 rounded-lg border bg-white p-4 shadow-lg">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-bold">{selectedHazard.title}</h3>
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => setSelectedHazard(null)}>
                      ×
                    </button>
                  </div>
                  <img
                    src={selectedHazard.image || "/placeholder.svg"}
                    alt={selectedHazard.title}
                    className="mb-2 h-40 w-full rounded object-cover"
                  />
                  <p className="mb-2 text-sm">{selectedHazard.description}</p>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`mr-2 h-3 w-3 rounded-full ${getCategoryColor(selectedHazard.category)}`}></div>
                      <span className="text-sm">
                        {selectedHazard.category.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    </div>
                    {getStatusBadge(selectedHazard.status)}
                  </div>
                  <div className="mb-2 flex items-center text-sm">
                    <MapPin className="mr-1 h-4 w-4 text-gray-500" />
                    {selectedHazard.location}
                  </div>
                  {selectedHazard.severity >= 4 && (
                    <div className="mb-2 flex items-center rounded-md bg-red-50 p-2 text-red-800">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      <span className="text-xs">High severity hazard</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center"
                      onClick={() => handleVote(selectedHazard.id)}
                    >
                      <ThumbsUp className="mr-1 h-4 w-4" /> Upvote ({selectedHazard.votes})
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center">
                      <MessageSquare className="mr-1 h-4 w-4" /> Comment
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

