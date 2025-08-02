"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Bu Rina",
      location: "Sleman",
      text: "Produk ini selalu laku di warung saya, repeat order terus!",
      rating: 5,
    },
    {
      name: "Rizky",
      location: "Mahasiswa",
      text: "Balik modal 3 hari. Enak, mudah dijual!",
      rating: 5,
    },
    {
      name: "Pak Budi",
      location: "Bantul",
      text: "Kualitas konsisten, pelanggan puas. Untung besar!",
      rating: 5,
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimoni" className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">Testimoni Pelanggan</h2>
          <p className="text-amber-700 text-lg">Apa kata mereka yang sudah merasakan keuntungannya</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>

              <blockquote className="text-xl text-amber-800 mb-6 italic">
                "{testimonials[currentIndex].text}"
              </blockquote>

              <div className="text-amber-900">
                <p className="font-bold text-lg">{testimonials[currentIndex].name}</p>
                <p className="text-amber-600">{testimonials[currentIndex].location}</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center items-center mt-6 space-x-4">
            <Button variant="outline" size="sm" onClick={prevTestimonial} className="rounded-full bg-transparent">
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-yellow-400" : "bg-amber-300"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>

            <Button variant="outline" size="sm" onClick={nextTestimonial} className="rounded-full bg-transparent">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
