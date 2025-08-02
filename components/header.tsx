"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20mbah%20wiryo%20singkong%20keju%20frozen-gTBSLC2iCxKy9d3FkIGInTGNbZ4laQ.png"
              alt="Mbah Wiryo Logo"
              width={60}
              height={60}
              className="mr-2"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => document.getElementById("beranda")?.scrollIntoView({ behavior: "smooth" })}
              className="text-amber-900 hover:text-amber-600 font-medium cursor-pointer"
            >
              Beranda
            </button>
            <button
              onClick={() => document.getElementById("tentang")?.scrollIntoView({ behavior: "smooth" })}
              className="text-amber-900 hover:text-amber-600 font-medium cursor-pointer"
            >
              Tentang Kami
            </button>
            <button
              onClick={() => document.getElementById("produk")?.scrollIntoView({ behavior: "smooth" })}
              className="text-amber-900 hover:text-amber-600 font-medium cursor-pointer"
            >
              Produk
            </button>
            <button
              onClick={() => document.getElementById("ongkir")?.scrollIntoView({ behavior: "smooth" })}
              className="text-amber-900 hover:text-amber-600 font-medium cursor-pointer"
            >
              Cek Ongkir
            </button>
            <button
              onClick={() => document.getElementById("reseller")?.scrollIntoView({ behavior: "smooth" })}
              className="text-amber-900 hover:text-amber-600 font-medium cursor-pointer"
            >
              Jadi Reseller
            </button>
            <button
              onClick={() => document.getElementById("testimoni")?.scrollIntoView({ behavior: "smooth" })}
              className="text-amber-900 hover:text-amber-600 font-medium cursor-pointer"
            >
              Testimoni
            </button>
            <button
              onClick={() => document.getElementById("kontak")?.scrollIntoView({ behavior: "smooth" })}
              className="text-amber-900 hover:text-amber-600 font-medium cursor-pointer"
            >
              Kontak
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              asChild
              className="bg-yellow-400 hover:bg-yellow-500 text-amber-900 font-bold px-6 py-2 rounded-full shadow-lg"
            >
              <Link href="https://wa.me/6282147566278" target="_blank">
                Gabung Reseller
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => {
                  document.getElementById("beranda")?.scrollIntoView({ behavior: "smooth" })
                  setIsMenuOpen(false)
                }}
                className="text-amber-900 hover:text-amber-600 font-medium text-left cursor-pointer"
              >
                Beranda
              </button>
              <button
                onClick={() => {
                  document.getElementById("tentang")?.scrollIntoView({ behavior: "smooth" })
                  setIsMenuOpen(false)
                }}
                className="text-amber-900 hover:text-amber-600 font-medium text-left cursor-pointer"
              >
                Tentang Kami
              </button>
              <button
                onClick={() => {
                  document.getElementById("produk")?.scrollIntoView({ behavior: "smooth" })
                  setIsMenuOpen(false)
                }}
                className="text-amber-900 hover:text-amber-600 font-medium text-left cursor-pointer"
              >
                Produk
              </button>
              <button
                onClick={() => {
                  document.getElementById("ongkir")?.scrollIntoView({ behavior: "smooth" })
                  setIsMenuOpen(false)
                }}
                className="text-amber-900 hover:text-amber-600 font-medium text-left cursor-pointer"
              >
                Cek Ongkir
              </button>
              <button
                onClick={() => {
                  document.getElementById("reseller")?.scrollIntoView({ behavior: "smooth" })
                  setIsMenuOpen(false)
                }}
                className="text-amber-900 hover:text-amber-600 font-medium text-left cursor-pointer"
              >
                Jadi Reseller
              </button>
              <button
                onClick={() => {
                  document.getElementById("testimoni")?.scrollIntoView({ behavior: "smooth" })
                  setIsMenuOpen(false)
                }}
                className="text-amber-900 hover:text-amber-600 font-medium text-left cursor-pointer"
              >
                Testimoni
              </button>
              <button
                onClick={() => {
                  document.getElementById("kontak")?.scrollIntoView({ behavior: "smooth" })
                  setIsMenuOpen(false)
                }}
                className="text-amber-900 hover:text-amber-600 font-medium text-left cursor-pointer"
              >
                Kontak
              </button>
              <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-amber-900 font-bold w-full">
                <Link href="https://wa.me/6282147566278" target="_blank">
                  Gabung Reseller
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
