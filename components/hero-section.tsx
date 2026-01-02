"use client"

import { useEffect, useState } from "react"
import { heroConfig } from "@/lib/config/hero"
import { Playfair_Display, Cormorant_Garamond } from "next/font/google"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
})

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    if (heroConfig.autoRotate) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % heroConfig.slides.length)
      }, heroConfig.rotateInterval)

      return () => clearInterval(interval)
    }
  }, [])

  return (
    <section
      className="relative w-full  overflow-hidden bg-background"
      style={{
        height: heroConfig.height.mobile,
      }}
    >
      {heroConfig.slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute bg-bottom  inset-0 transition-opacity duration-1000 ${currentImage === index ? "opacity-100" : "opacity-0"
            }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Dark overlay */}
          {slide.overlay && (
            <div
              className="absolute inset-0 bg-black pointer-events-none"
              style={{ opacity: slide.overlay / 100 }}
            />
          )}

          {/* Content overlay */}
          {(slide.title || slide.subtitle || slide.cta) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-4xl mx-auto text-center px-6 md:px-8">
                <div className="space-y-6 animate-fade-in">
                  {slide.title && (
                    <h1 className={`${playfair.className} text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider text-white drop-shadow-2xl leading-tight`}>
                      {slide.title}
                    </h1>
                  )}
                  {slide.subtitle && (
                    <p className={`${cormorant.className} text-xl md:text-2xl lg:text-3xl text-white/95 font-light tracking-wide drop-shadow-lg max-w-2xl mx-auto`}>
                      {slide.subtitle}
                    </p>
                  )}
                  {slide.cta && (
                    <div className="pt-4">
                      <a
                        href={slide.cta.href}
                        className={`${cormorant.className} inline-block mt-4 px-10 py-4 bg-white/95 text-black text-lg font-medium tracking-widest uppercase hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl backdrop-blur-sm`}
                      >
                        {slide.cta.text}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {heroConfig.slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`h-2 rounded-full transition-all duration-300 ${currentImage === index
              ? "bg-white w-8 shadow-lg"
              : "bg-white/40 w-2 hover:bg-white/60"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentImage((prev) => (prev === 0 ? heroConfig.slides.length - 1 : prev - 1))}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => setCurrentImage((prev) => (prev + 1) % heroConfig.slides.length)}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 group"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <style jsx>{`
        @media (min-width: 768px) {
          section {
            height: ${heroConfig.height.desktop};
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </section>
  )
}