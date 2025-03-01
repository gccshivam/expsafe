"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, AlertTriangle, MapPin, Camera, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const mainRef = useRef(null)
  const headingRef = useRef(null)
  const ctaRef = useRef(null)
  const hazardIconsRef = useRef(null)
  const featureCardsRef = useRef(null)
  
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)
    
    const ctx = gsap.context(() => {
      // Hero section entrance animation
      const tl = gsap.timeline()
      
      // Animate the background gradient
      tl.fromTo(
        ".bg-gradient-radial",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
      )
      
      // Animate main heading with text reveal effect
      tl.fromTo(
        ".heading-text .char",
        { opacity: 0, y: 100, rotateX: -90 },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          stagger: 0.03,
          duration: 0.8, 
          ease: "back.out(1.7)" 
        },
        "-=0.5"
      )
      
      // Animate tagline
      tl.fromTo(
        ".tagline",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
      
      // Animate CTA button with bounce
      tl.fromTo(
        ".cta-button",
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.6, 
          ease: "elastic.out(1, 0.5)",
          onComplete: () => {
            // Add a subtle pulse animation to the button
            gsap.to(".cta-button", {
              scale: 1.05,
              duration: 0.8,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            })
          }
        },
        "-=0.2"
      )
      
      // Floating hazard icons animation
      gsap.fromTo(
        ".hazard-icon",
        { opacity: 0, y: 40, scale: 0 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          stagger: 0.15,
          duration: 0.7, 
          ease: "back.out(1.7)",
          delay: 0.8
        }
      )
      
      // Create floating animation for hazard icons
      gsap.to(".hazard-icon", {
        y: "random(-15, 15)",
        x: "random(-10, 10)",
        rotation: "random(-8, 8)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2
      })
      
      // Feature cards animation on scroll
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 60 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.2,
          duration: 0.8, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".features-section",
            start: "top 80%"
          }
        }
      )
      
      // Stats counter animation
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".stats-section",
            start: "top 85%"
          }
        }
      )
      
      // Create particle effect on hover for the CTA button
      const createParticles = (e) => {
        const button = e.currentTarget
        for (let i = 0; i < 30; i++) {
          const particle = document.createElement('div')
          particle.classList.add('safety-particle')
          
          const size = Math.random() * 8 + 4
          const x = e.offsetX
          const y = e.offsetY
          
          gsap.set(particle, {
            x,
            y,
            width: size,
            height: size,
            backgroundColor: `hsl(${Math.random() * 60 + 30}, 100%, 50%)`,
            borderRadius: '50%',
            position: 'absolute'
          })
          
          button.appendChild(particle)
          
          gsap.to(particle, {
            x: x + (Math.random() - 0.5) * 100,
            y: y + (Math.random() - 0.5) * 100,
            opacity: 0,
            duration: Math.random() * 1 + 0.5,
            onComplete: () => button.removeChild(particle)
          })
        }
      }
      
      const ctaButton = document.querySelector('.cta-button')
      if (ctaButton) {
        ctaButton.addEventListener('mouseenter', createParticles)
      }
    })
    
    // Split text into characters for animation
    const heading = document.querySelector('.heading-text')
    if (heading) {
      const text = heading.innerHTML
      const chars = text.split('').map(char => 
        char === ' ' ? ' ' : `<span class="char">${char}</span>`
      ).join('')
      heading.innerHTML = chars
    }
    
    return () => ctx.revert() // Cleanup
  }, [])

  return (
    <main ref={mainRef} className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-24 lg:py-32">
        {/* Animated background gradient */}
        <div className="bg-gradient-radial absolute inset-0 bg-gradient-to-b from-yellow-100/30 via-white to-blue-100/30 opacity-70"></div>
        
        {/* Floating hazard icons */}
        <div ref={hazardIconsRef} className="absolute inset-0 z-0 overflow-hidden">
          <div className="hazard-icon absolute left-[10%] top-[15%]">
            <AlertTriangle className="h-10 w-10 text-amber-500/60" />
          </div>
          <div className="hazard-icon absolute left-[80%] top-[20%]">
            <div className="rounded-full bg-red-100 p-3">
              <AlertTriangle className="h-8 w-8 text-red-500/60" />
            </div>
          </div>
          <div className="hazard-icon absolute left-[20%] top-[70%]">
            <div className="rounded-full bg-blue-100 p-3">
              <MapPin className="h-8 w-8 text-blue-500/60" />
            </div>
          </div>
          <div className="hazard-icon absolute left-[75%] top-[75%]">
            <Camera className="h-10 w-10 text-purple-500/60" />
          </div>
          <div className="hazard-icon absolute left-[15%] top-[40%]">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-8 w-8 text-green-500/60" />
            </div>
          </div>
          <div className="hazard-icon absolute left-[60%] top-[35%]">
            <div className="rounded-full bg-yellow-100 p-3">
              <Shield className="h-8 w-8 text-yellow-600/60" />
            </div>
          </div>
        </div>
        
        {/* Hero content */}
        <div className="container relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-block rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-800">
            Community Safety Initiative
          </div>
          <h1 
            ref={headingRef} 
            className="heading-text mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
          >
            Report Hazards, Save Lives
          </h1>
          <p className="tagline mx-auto mb-10 max-w-2xl text-xl text-gray-600">
            Help make your community safer by identifying and reporting hazards in your area. 
            Together, we can prevent accidents before they happen.
          </p>
          <div ref={ctaRef} className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link href="/report-hazard" passHref>
              <Button className="cta-button h-12 rounded-full bg-amber-600 px-8 text-lg font-medium hover:bg-amber-700">
                Report a Hazard <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/map" passHref>
              <Button 
                variant="outline" 
                className="h-12 rounded-full border-gray-300 px-6 text-lg font-medium hover:bg-gray-100"
              >
                View Hazard Map
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="features-section bg-white py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-20 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          
          <div 
            ref={featureCardsRef}
            className="grid gap-8 md:grid-cols-3"
          >
            <div className="feature-card rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 p-8 shadow-md">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/20">
                <Camera className="h-7 w-7 text-amber-600" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">1. Capture</h3>
              <p className="text-gray-600">
                Take a photo of any safety hazard you encounter. Our AI will help categorize the issue.
              </p>
            </div>
            
            <div className="feature-card rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-8 shadow-md">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/20">
                <MapPin className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">2. Locate</h3>
              <p className="text-gray-600">
                Mark the exact location or use your current GPS position to pinpoint the hazard.
              </p>
            </div>
            
            <div className="feature-card rounded-xl bg-gradient-to-br from-green-50 to-green-100 p-8 shadow-md">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20">
                <CheckCircle className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">3. Report</h3>
              <p className="text-gray-600">
                Submit your report. Authorities are notified and prioritize fixes based on severity.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="stats-section bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            Making a Difference
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="stat-item rounded-xl bg-white p-8 text-center shadow-md">
              <div className="mb-3 text-4xl font-bold text-amber-600">2,350+</div>
              <p className="text-lg text-gray-600">Hazards Reported</p>
            </div>
            
            <div className="stat-item rounded-xl bg-white p-8 text-center shadow-md">
              <div className="mb-3 text-4xl font-bold text-amber-600">87%</div>
              <p className="text-lg text-gray-600">Resolution Rate</p>
            </div>
            
            <div className="stat-item rounded-xl bg-white p-8 text-center shadow-md">
              <div className="mb-3 text-4xl font-bold text-amber-600">34</div>
              <p className="text-lg text-gray-600">Communities Protected</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call To Action Section */}
      <section className="bg-gradient-to-r from-amber-600 to-red-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-8 text-3xl font-bold sm:text-4xl">Join Our Safety Community Today</h2>
          <p className="mx-auto mb-10 max-w-2xl text-xl">
            Be part of the solution. Your reports help keep everyone safe.
          </p>
          <Link href="/report-hazard" passHref>
            <Button className="h-12 rounded-full bg-white px-8 text-lg font-medium text-amber-600 hover:bg-gray-100">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Add some custom styles for particles */}
      <style jsx>{`
        .safety-particle {
          pointer-events: none;
          z-index: 100;
        }
      `}</style>
    </main>
  )
}
