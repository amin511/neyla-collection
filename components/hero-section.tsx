"use client"

import { useEffect, useState } from "react"
import { heroConfig } from "@/lib/config"

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)
  const slides = heroConfig.slides

  useEffect(() => {
    if (!heroConfig.autoRotate) return

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % slides.length)
    }, heroConfig.rotateInterval)

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <section 
      className="relative w-full overflow-hidden bg-background"
      style={{ height: `clamp(${heroConfig.height.mobile}, 50vh, ${heroConfig.height.desktop})` }}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${slide.image})`,
            opacity: currentImage === index ? 1 : 0,
          }}
        />
      ))}

      {/* Dark overlay for better text visibility */}
      <div 
        className="absolute inset-0" 
        style={{ backgroundColor: `rgba(0, 0, 0, ${(slides[currentImage]?.overlay || 30) / 100})` }} 
      />

      {/* Content overlay */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        {slides[currentImage]?.title && (
          <h1
            className={`${heroConfig.typography.title} opacity-0 animate-fade-in-rise`}
            style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
          >
            {slides[currentImage].title}
          </h1>
        )}
        {slides[currentImage]?.subtitle && (
          <p className={heroConfig.typography.subtitle}>
            {slides[currentImage].subtitle}
          </p>
        )}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-all ${currentImage === index ? "bg-white w-6" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
