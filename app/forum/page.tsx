"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, ThumbsUp, MessageSquare, MoreHorizontal, Calendar, TrendingUp } from "lucide-react"

// Mock data for forum discussions
const mockDiscussions = [
  {
    id: "1",
    title: "Dangerous intersection needs traffic light",
    content:
      "The intersection of Oak and Main has had 3 accidents this month. We need to petition the city for a traffic light before someone gets seriously hurt.",
    author: {
      name: "Jennifer Wilson",
      avatar: "/placeholder.svg?height=40&width=40&text=JW",
    },
    category: "traffic",
    votes: 42,
    comments: 15,
    createdAt: "2023-11-10T14:30:00Z",
    isHot: true,
  },
  {
    id: "2",
    title: "Playground equipment in Central Park is damaged",
    content:
      "Several pieces of playground equipment in Central Park are broken and have sharp edges. Children could get hurt. The city needs to repair or replace them.",
    author: {
      name: "Marcus Johnson",
      avatar: "/placeholder.svg?height=40&width=40&text=MJ",
    },
    category: "parks",
    votes: 28,
    comments: 7,
    createdAt: "2023-11-12T09:15:00Z",
    isHot: false,
  },
  {
    id: "3",
    title: "Street lights out on Elm Street for over a week",
    content:
      "The entire block of Elm Street between 5th and 6th Avenue has had no street lighting for over a week. It's very dangerous at night.",
    author: {
      name: "Sarah Thompson",
      avatar: "/placeholder.svg?height=40&width=40&text=ST",
    },
    category: "lighting",
    votes: 35,
    comments: 12,
    createdAt: "2023-11-14T18:45:00Z",
    isHot: true,
  },
  {
    id: "4",
    title: "Flooding on River Road after heavy rain",
    content:
      "River Road near the bridge consistently floods after heavy rain. The drainage system needs to be improved to prevent this recurring issue.",
    author: {
      name: "David Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=DC",
    },
    category: "flooding",
    votes: 19,
    comments: 8,
    createdAt: "2023-11-15T11:20:00Z",
    isHot: false,
  },
  {
    id: "5",
    title: "Proposal for community clean-up day",
    content:
      "I'm proposing a community clean-up day for the riverside park area. We could organize volunteers and get supplies from the local hardware store.",
    author: {
      name: "Lisa Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40&text=LR",
    },
    category: "community",
    votes: 31,
    comments: 22,
    createdAt: "2023-11-16T15:10:00Z",
    isHot: true,
  },
]

// Mock data for updates on hazard resolutions
const mockUpdates = [
  {
    id: "1",
    title: "Pothole on Main Street repaired",
    content: "The city has filled the large pothole on Main Street that was reported last week.",
    status: "resolved",
    updatedAt: "2023-11-17T10:30:00Z",
    originalReportId: "123",
  },
  {
    id: "2",
    title: "Broken swing at Westside Park",
    content: "Parks department has scheduled repairs for the broken swing set for next Tuesday.",
    status: "in_progress",
    updatedAt: "2023-11-16T14:45:00Z",
    originalReportId: "124",
  },
  {
    id: "3",
    title: "Fallen tree removed from Cedar Lane",
    content: "Public works has removed the fallen tree that was blocking Cedar Lane after the storm.",
    status: "resolved",
    updatedAt: "2023-11-15T09:20:00Z",
    originalReportId: "125",
  },
]

export default function ForumPage() {
  const [activeTab, setActiveTab] = useState("discussions")
  const [searchQuery, setSearchQuery] = useState("")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const getCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      traffic: "bg-red-100 text-red-800",
      parks: "bg-green-100 text-green-800",
      lighting: "bg-yellow-100 text-yellow-800",
      flooding: "bg-blue-100 text-blue-800",
      community: "bg-purple-100 text-purple-800",
    }
    return (
      <Badge className={colors[category] || "bg-gray-100 text-gray-800"}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Community Forum</h1>
        <p className="text-gray-600">
          Discuss safety concerns, vote on priorities, and track progress on hazard resolutions.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search discussions..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Button className="flex items-center gap-1">Start New Discussion</Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="updates">Hazard Updates</TabsTrigger>
        </TabsList>

        <TabsContent value="discussions" className="space-y-6">
          {mockDiscussions.map((discussion) => (
            <Card key={discussion.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      {discussion.title}
                      {discussion.isHot && (
                        <Badge variant="outline" className="border-red-500 text-red-500">
                          <TrendingUp className="mr-1 h-3 w-3" /> Hot
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="mt-1 flex items-center gap-2">
                      <div className="flex items-center">
                        <Avatar className="mr-2 h-6 w-6">
                          <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                          <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {discussion.author.name}
                      </div>
                      <span>•</span>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {formatDate(discussion.createdAt)}
                      </div>
                      <span>•</span>
                      {getCategoryBadge(discussion.category)}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Save</DropdownMenuItem>
                      <DropdownMenuItem>Report</DropdownMenuItem>
                      <DropdownMenuItem>Share</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p>{discussion.content}</p>
              </CardContent>
              <CardFooter className="border-t bg-gray-50 px-6 py-3">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{discussion.votes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>{discussion.comments}</span>
                    </Button>
                  </div>
                  <Button size="sm">Join Discussion</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="updates" className="space-y-6">
          {mockUpdates.map((update) => (
            <Card key={update.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{update.title}</CardTitle>
                    <CardDescription className="mt-1 flex items-center gap-2">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {formatDate(update.updatedAt)}
                      </div>
                      <span>•</span>
                      {getStatusBadge(update.status)}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>{update.content}</p>
              </CardContent>
              <CardFooter className="border-t bg-gray-50 px-6 py-3">
                <div className="flex w-full items-center justify-between">
                  <Button variant="outline" size="sm">
                    View Original Report
                  </Button>
                  <Button size="sm">Add Comment</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

