"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Truck } from "lucide-react"
import ShippingCalculator from "./shipping-calculator"

export default function HeroSection() {
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [showShippingModal, setShowShippingModal] = useState(false)

  const handleOrderNow = () => {
    setShowOrderModal(true)
  }

  const handleCheckShipping = () => {
    setShowShippingModal(true)
  }

  const handleCloseOrderModal = () => {
    setShowOrderModal(false)
  }

  const handleCloseShippingModal = () => {
    setShowShippingModal(false)
  }

  const handleDirectOrder = () => {
    const message = `Halo, saya tertarik dengan produk Singkong Keju Frozen Mbah Wiryo!

Mohon informasi:
- Produk yang tersedia
- Harga dan paket pembelian
- Ongkos kirim ke kota saya
- Cara pemesanan

Terima kasih!`

    const whatsappUrl = `https://wa.me/6282147566278?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    handleCloseOrderModal()
  }

  return (
    <>
      <section id="beranda" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tekstur%20sempurna-yhyFscyAZt50U9ydWoCKp17GtKCiLg.png"
            alt="Singkong Keju Lezat"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-amber-800/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Singkong Keju Lezat, <span className="text-yellow-400">Untungnya Dahsyat!</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-amber-100 max-w-2xl mx-auto">
              Camilan frozen praktis dan peluang usaha rumahan tanpa modal besar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={handleOrderNow}
                size="lg"
                className="bg-white text-amber-900 hover:bg-amber-50 font-bold px-8 py-4 text-lg rounded-full shadow-xl cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Pesan Sekarang
              </Button>

              <Button
                asChild
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-500 text-amber-900 font-bold px-8 py-4 text-lg rounded-full shadow-xl"
              >
                <Link href="https://wa.me/6282147566278" target="_blank">
                  Gabung Reseller Sekarang
                </Link>
              </Button>
            </div>

            <div className="mt-6">
              <Button
                onClick={handleCheckShipping}
                variant="outline"
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-amber-900 font-bold px-6 py-3 rounded-full"
              >
                <Truck className="w-5 h-5 mr-2" />
                Cek Ongkir
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Order Modal */}
      <Dialog open={showOrderModal} onOpenChange={setShowOrderModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-amber-900">Pesan Singkong Keju Frozen Mbah Wiryo</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Welcome Message */}
            <div className="bg-amber-50 p-4 rounded-lg text-center">
              <h3 className="font-bold text-amber-900 mb-2">Selamat datang di Mbah Wiryo! 🎉</h3>
              <p className="text-amber-800">Pilih cara pemesanan yang paling mudah untuk Anda:</p>
            </div>

            {/* Order Options */}
            <div className="space-y-4">
              {/* Option 1: Direct Order */}
              <Card className="border-2 border-yellow-400 hover:border-yellow-500 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <ShoppingCart className="w-6 h-6 text-yellow-600 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-bold text-amber-900 mb-1">Pesan Langsung via WhatsApp</h4>
                      <p className="text-sm text-amber-700 mb-3">
                        Hubungi kami langsung untuk konsultasi produk, harga, dan pengiriman. Tim kami siap membantu!
                      </p>
                      <Button
                        onClick={handleDirectOrder}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-amber-900 font-bold"
                      >
                        Chat WhatsApp Sekarang
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Option 2: Check Products First */}
              <Card className="border-2 border-amber-300 hover:border-amber-400 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center mt-1">
                      <span className="text-white text-xs font-bold">📦</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-amber-900 mb-1">Lihat Produk Dulu</h4>
                      <p className="text-sm text-amber-700 mb-3">
                        Jelajahi koleksi produk kami dan cek ongkir sebelum memesan.
                      </p>
                      <Button
                        onClick={() => {
                          handleCloseOrderModal()
                          document.getElementById("produk")?.scrollIntoView({ behavior: "smooth" })
                        }}
                        variant="outline"
                        className="w-full border-amber-400 text-amber-700 hover:bg-amber-50 bg-transparent"
                      >
                        Lihat Produk
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Option 3: Check Shipping */}
              <Card className="border-2 border-green-300 hover:border-green-400 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Truck className="w-6 h-6 text-green-600 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-bold text-amber-900 mb-1">Cek Ongkir Dulu</h4>
                      <p className="text-sm text-amber-700 mb-3">
                        Hitung estimasi ongkos kirim ke kota Anda untuk perencanaan budget.
                      </p>
                      <Button
                        onClick={() => {
                          handleCloseOrderModal()
                          handleCheckShipping()
                        }}
                        variant="outline"
                        className="w-full border-green-400 text-green-700 hover:bg-green-50 bg-transparent"
                      >
                        <Truck className="w-4 h-4 mr-2" />
                        Cek Ongkir
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Products Preview */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold text-amber-900 mb-3">Produk Unggulan Kami:</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white p-3 rounded border">
                  <p className="font-medium text-amber-900">Singkong Keju Original</p>
                  <p className="text-yellow-600 font-bold">Rp15.000</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="font-medium text-amber-900">Kroket Ragout Ayam</p>
                  <p className="text-yellow-600 font-bold">Rp20.000</p>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="flex justify-end">
              <Button onClick={handleCloseOrderModal} variant="outline" className="bg-transparent">
                Tutup
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Shipping Calculator Modal */}
      <Dialog open={showShippingModal} onOpenChange={setShowShippingModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-amber-900">Kalkulator Ongkos Kirim</DialogTitle>
          </DialogHeader>
          <ShippingCalculator isModal={true} onClose={handleCloseShippingModal} />
        </DialogContent>
      </Dialog>
    </>
  )
}
