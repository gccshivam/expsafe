"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Camera, Upload, MapPin, AlertTriangle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function ReportHazardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    image: null as File | null,
    description: "",
    location: "",
    category: "",
    severity: 3,
    latitude: null as number | null,
    longitude: null as number | null,
  })

  const hazardCategories = [
    { value: "road_damage", label: "Road Damage (Potholes, Cracks)" },
    { value: "electrical", label: "Electrical Hazard (Exposed Wires, Damaged Poles)" },
    { value: "water", label: "Water Issues (Leaks, Flooding)" },
    { value: "structural", label: "Structural Problems (Building Damage, Bridges)" },
    { value: "debris", label: "Debris or Obstruction" },
    { value: "lighting", label: "Lighting Issues (Street Lights Out)" },
    { value: "signage", label: "Missing or Damaged Signs" },
    { value: "vegetation", label: "Overgrown Vegetation" },
    { value: "other", label: "Other Hazard" },
  ]

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData({ ...formData, image: file })

      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            location: "Current location detected",
          })
          toast({
            title: "Location detected",
            description: "Your current location has been added to the report.",
          })
        },
        (error) => {
          toast({
            title: "Location error",
            description: "Unable to get your location. Please enter it manually.",
            variant: "destructive",
          })
        },
      )
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation. Please enter location manually.",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.image) {
      toast({
        title: "Image required",
        description: "Please upload an image of the hazard.",
        variant: "destructive",
      })
      return
    }

    if (!formData.category) {
      toast({
        title: "Category required",
        description: "Please select a hazard category.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real implementation, this would upload the image and form data to your backend
      // const formDataToSend = new FormData();
      // Object.entries(formData).forEach(([key, value]) => {
      //   if (value !== null) formDataToSend.append(key, value);
      // });
      // const response = await fetch('/api/hazards', {
      //   method: 'POST',
      //   body: formDataToSend,
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Report submitted successfully",
        description: "Thank you for helping make your community safer!",
      })

      // Redirect to a success page or the map
      router.push("/report/success")
    } catch (error) {
      console.error("Error submitting report:", error)
      toast({
        title: "Submission failed",
        description: "There was an error submitting your report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold">Report a Hazard</h1>
          <p className="text-gray-600">Help make your community safer by reporting hazards you encounter.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border bg-white p-6 shadow-md">
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Hazard Image <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col items-center justify-center">
              {imagePreview ? (
                <div className="relative mb-4 h-64 w-full overflow-hidden rounded-lg">
                  <Image
                    src={imagePreview || "/placeholder.svg"}
                    alt="Hazard preview"
                    fill
                    className="object-contain"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() => {
                      setImagePreview(null)
                      setFormData({ ...formData, image: null })
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="mb-4 flex h-64 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Camera className="mb-3 h-10 w-10 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG or JPEG (Max 10MB)</p>
                  </div>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="image-upload">
                    <Button type="button" variant="outline" className="mt-2">
                      <Upload className="mr-2 h-4 w-4" /> Upload Image
                    </Button>
                  </label>
                </div>
              )}
              <p className="text-xs text-gray-500">
                Our AI will analyze your image to help categorize and assess the hazard.
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium">
              Describe the Issue
            </label>
            <Textarea
              id="description"
              placeholder="Please provide details about the hazard..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label htmlFor="location" className="block text-sm font-medium">
              Location
            </label>
            <div className="flex gap-2">
              <Input
                id="location"
                placeholder="Enter the location or address of the hazard"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="flex-1"
              />
              <Button type="button" variant="outline" onClick={getCurrentLocation}>
                <MapPin className="mr-2 h-4 w-4" /> Current Location
              </Button>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-medium">
              Hazard Category <span className="text-red-500">*</span>
            </label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select hazard type" />
              </SelectTrigger>
              <SelectContent>
                {hazardCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Severity */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Severity Level: {formData.severity}/5</label>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Low</span>
              <Slider
                value={[formData.severity]}
                min={1}
                max={5}
                step={1}
                onValueChange={(value) => setFormData({ ...formData, severity: value[0] })}
                className="flex-1"
              />
              <span className="text-sm text-gray-500">High</span>
            </div>
            {formData.severity >= 4 && (
              <div className="mt-2 flex items-center rounded-md bg-amber-50 p-2 text-amber-800">
                <AlertTriangle className="mr-2 h-4 w-4" />
                <span className="text-xs">
                  You've indicated this is a high-severity hazard. Please submit as soon as possible.
                </span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Hazard Report"}
          </Button>

          <p className="text-center text-xs text-gray-500">
            By submitting this report, you confirm that the information provided is accurate to the best of your
            knowledge.
          </p>
        </form>
      </div>
    </div>
  )
}

