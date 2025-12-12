"use client"

import { useEffect, useState } from "react"

const HERO_IMAGES = [
  "/images/whatsapp-20image-202025-11-17-20at-2010.jpeg",
  "/images/WhatsApp2.jpeg",
]

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full h-[400px] md:h-[600px] overflow-hidden bg-background">
      {HERO_IMAGES.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${image})`,
            opacity: currentImage === index ? 1 : 0,
          }}
        />
      ))}

      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content overlay */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-light tracking-tight text-white">
          NEW Collection 2026
        </h1>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {HERO_IMAGES.map((_, index) => (
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
