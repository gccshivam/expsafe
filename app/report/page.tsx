"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Camera, Upload, MapPin, AlertTriangle, CheckCircle2, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import gsap from "gsap"

export default function ReportHazardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

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

  // Initialize GSAP animations
  useEffect(() => {
    // Animate background safety pattern
    const animateBackground = () => {
      if (backgroundRef.current) {
        gsap.to(backgroundRef.current, {
          backgroundPosition: "100% 100%",
          duration: 60,
          repeat: -1,
          ease: "linear"
        });
      }
    }

    // Animate form elements on load
    const animateFormElements = () => {
      if (formRef.current) {
        const formElements = formRef.current.querySelectorAll("div.space-y-2, button.w-full");
        
        gsap.from(formElements, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        });
      }
    }

    animateBackground();
    animateFormElements();
  }, []);

  // Success animation
  useEffect(() => {
    if (showSuccess && successRef.current) {
      gsap.fromTo(successRef.current, 
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, [showSuccess]);

  const handleImageClick = () => {
    // Trigger the hidden file input click when the upload area is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData({ ...formData, image: file })

      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
        
        // Animate the preview image appearing
        gsap.fromTo(".preview-image-container", 
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
        );
      }
      reader.readAsDataURL(file)
    }
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      // Animate the location button when clicked
      gsap.to("#location-button", {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });
      
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
      // Simulate API call - removed actual API call as requested
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // Show success message instead of redirecting
      setShowSuccess(true)
      
      // Clear form data
      setFormData({
        image: null,
        description: "",
        location: "",
        category: "",
        severity: 3,
        latitude: null,
        longitude: null,
      })
      setImagePreview(null);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      
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

  const closeSuccessMessage = () => {
    // Animate out before hiding
    if (successRef.current) {
      gsap.to(successRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => setShowSuccess(false)
      });
    }
  }

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Animated background pattern */}
      <div 
        ref={backgroundRef}
        className="fixed inset-0 opacity-10"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%231e88e5' fill-opacity='0.5' fill-rule='evenodd'/%3E%3C/svg%3E\")",
          backgroundSize: "150px 150px",
          zIndex: -1,
        }}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-4xl font-bold text-blue-700 drop-shadow-sm">Report a Hazard</h1>
            <p className="text-gray-600">Help make your community safer by reporting hazards you encounter.</p>
          </div>

          <form 
            ref={formRef}
            onSubmit={handleSubmit} 
            className="space-y-6 rounded-lg border bg-white p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
          >
            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Hazard Image <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col items-center justify-center">
                {imagePreview ? (
                  <div className="preview-image-container relative mb-4 h-64 w-full overflow-hidden rounded-lg border-2 border-blue-200">
                    <Image
                      src={imagePreview}
                      alt="Hazard preview"
                      fill
                      className="object-contain"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute right-2 top-2 opacity-90 transition-opacity hover:opacity-100"
                      onClick={() => {
                        setImagePreview(null)
                        setFormData({ ...formData, image: null })
                        
                        // Animate removing the image
                        gsap.to(".preview-image-container", {
                          opacity: 0,
                          scale: 0.8,
                          duration: 0.3,
                          ease: "power2.in"
                        });
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div 
                    onClick={handleImageClick}
                    className="mb-4 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 transition-all duration-300 hover:border-blue-400 hover:bg-blue-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Camera className="mb-3 h-12 w-12 text-blue-400" />
                      <p className="mb-2 text-sm text-gray-600">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG or JPEG (Max 10MB)</p>
                    </div>
                    <Input
                      ref={fileInputRef}
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <Button type="button" variant="outline" className="mt-2">
                      <Upload className="mr-2 h-4 w-4" /> Upload Image
                    </Button>
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  Your image will be analyzed to help categorize and assess the hazard.
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
                className="border-blue-200 focus:border-blue-400 focus:ring-blue-400"
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
                  className="flex-1 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                />
                <Button 
                  id="location-button"
                  type="button" 
                  variant="outline" 
                  onClick={getCurrentLocation}
                  className="border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100"
                >
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
                <SelectTrigger className="border-blue-200 focus:ring-blue-400">
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
                  onValueChange={(value) => {
                    setFormData({ ...formData, severity: value[0] })
                    
                    // Animate the severity change
                    if (value[0] >= 4) {
                      gsap.fromTo(".severity-warning", 
                        { opacity: 0, y: 10 },
                        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
                      );
                    }
                  }}
                  className="flex-1"
                />
                <span className="text-sm text-gray-500">High</span>
              </div>
              {formData.severity >= 4 && (
                <div className="severity-warning mt-2 flex items-center rounded-md bg-amber-50 p-2 text-amber-800">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  <span className="text-xs">
                    You've indicated this is a high-severity hazard. Please submit as soon as possible.
                  </span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-blue-600 text-white transition-all hover:bg-blue-700 disabled:bg-blue-300" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Hazard Report"}
            </Button>

            <p className="text-center text-xs text-gray-500">
              By submitting this report, you confirm that the information provided is accurate to the best of your
              knowledge.
            </p>
          </form>
        </div>
      </div>

      {/* Success Message Popup */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div 
            ref={successRef}
            className="relative mx-4 max-w-md rounded-lg bg-white p-8 shadow-2xl"
          >
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
              onClick={closeSuccessMessage}
            >
              <X className="h-4 w-4" />
            </Button>
            
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-green-100 p-3">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">Report Submitted Successfully!</h3>
              <p className="mb-6 text-gray-600">
                Thank you for helping make your community safer. Your report has been submitted and will be reviewed shortly.
              </p>
              <Button 
                onClick={closeSuccessMessage}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Submit Another Report
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
