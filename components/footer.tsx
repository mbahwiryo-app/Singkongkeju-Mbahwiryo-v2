"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail, Instagram, ShoppingBag } from "lucide-react"

export default function Footer() {
  return (
    <footer id="kontak" className="bg-white border-t border-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20mbah%20wiryo%20singkong%20keju%20frozen-gTBSLC2iCxKy9d3FkIGInTGNbZ4laQ.png"
                alt="Mbah Wiryo Logo"
                width={60}
                height={60}
                className="mr-3"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900">Mbah Wiryo</h3>
                <p className="text-gray-600">Premium Cassava Cheese</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Singkong keju frozen berkualitas premium dengan peluang bisnis menguntungkan untuk semua kalangan.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-gray-900">Kontak Kami</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-600 text-sm">
                  Jl. Cangkringan, Salakan, Selomartani, Kec. Kalasan, Kabupaten Sleman, DIY 55571
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-600" />
                <Link
                  href="https://wa.me/6282147566278"
                  className="text-gray-600 hover:text-amber-600 transition-colors"
                >
                  0821-4756-6278
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-600" />
                <Link
                  href="mailto:id.mbahwiryo@gmail.com"
                  className="text-gray-600 hover:text-amber-600 transition-colors"
                >
                  id.mbahwiryo@gmail.com
                </Link>
              </div>
            </div>
          </div>

          {/* Social Media & Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-gray-900">Ikuti Kami</h4>
            <div className="space-y-3 mb-6">
              <Link
                href="https://instagram.com/mbahwiryo.official"
                target="_blank"
                className="flex items-center space-x-3 text-gray-600 hover:text-amber-600 transition-colors"
              >
                <Instagram className="w-5 h-5 text-amber-600" />
                <span>@mbahwiryo.official</span>
              </Link>
              <Link
                href="https://shopee.co.id/singkongpremium.mbahwiryo.id"
                target="_blank"
                className="flex items-center space-x-3 text-gray-600 hover:text-amber-600 transition-colors"
              >
                <ShoppingBag className="w-5 h-5 text-amber-600" />
                <span>Shopee Store</span>
              </Link>
            </div>

            <h5 className="font-medium mb-2 text-gray-900">Navigasi Cepat</h5>
            <div className="space-y-1 text-sm">
              <button
                onClick={() => document.getElementById("beranda")?.scrollIntoView({ behavior: "smooth" })}
                className="block text-gray-600 hover:text-amber-600 transition-colors text-left cursor-pointer"
              >
                Beranda
              </button>
              <button
                onClick={() => document.getElementById("produk")?.scrollIntoView({ behavior: "smooth" })}
                className="block text-gray-600 hover:text-amber-600 transition-colors text-left cursor-pointer"
              >
                Produk
              </button>
              <button
                onClick={() => document.getElementById("reseller")?.scrollIntoView({ behavior: "smooth" })}
                className="block text-gray-600 hover:text-amber-600 transition-colors text-left cursor-pointer"
              >
                Reseller
              </button>
              <button
                onClick={() => document.getElementById("testimoni")?.scrollIntoView({ behavior: "smooth" })}
                className="block text-gray-600 hover:text-amber-600 transition-colors text-left cursor-pointer"
              >
                Testimoni
              </button>
              <button
                onClick={() => document.getElementById("kontak")?.scrollIntoView({ behavior: "smooth" })}
                className="block text-gray-600 hover:text-amber-600 transition-colors text-left cursor-pointer"
              >
                Kontak
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500">© 2025 Mbah Wiryo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
