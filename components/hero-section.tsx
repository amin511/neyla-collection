"use client"

import { useEffect, useState } from "react"

const HERO_IMAGES = [
  "/images/WhatsApp4.jpeg",
  "/images/WhatsApp4.jpeg",
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
    <section className="relative w-full overflow-hidden bg-background">
  {HERO_IMAGES.map((image, index) => (
    <img
      key={index}
      src={image}
      alt=""
      className={`absolute inset-0 w-full h-auto transition-opacity duration-1000
        ${currentImage === index ? "opacity-100 relative" : "opacity-0"}`}
    />
  ))}

  {/* Dark overlay */}
  {/* <div className="absolute inset-0 bg-black/30 pointer-events-none" /> */}

  {/* Content overlay */}


  {/* Dots */}
  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
    {HERO_IMAGES.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentImage(index)}
        className={`w-2 h-2 rounded-full transition-all ${
          currentImage === index ? "bg-white w-6" : "bg-white/50"
        }`}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))}
  </div>
</section>

  )
}