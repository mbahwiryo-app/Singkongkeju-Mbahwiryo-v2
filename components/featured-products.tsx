"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Truck, ShoppingCart } from "lucide-react"
import ShippingCalculator from "./shipping-calculator"

export default function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [showShippingModal, setShowShippingModal] = useState(false)
  const [showOrderModal, setShowOrderModal] = useState(false)

  const products = [
    {
      name: "Singkong Keju Original",
      price: "Rp15.000",
      description: "Singkong lembut isi keju leleh, camilan frozen siap goreng",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Singkong%20Keju%20Frozen%20Mbah%20Wiryo%20Kuning%203.jpg-TpugczoCnhdZiuGLGqnugYOrguglDt.jpeg",
    },
    {
      name: "Kroket Ragout Ayam",
      price: "Rp20.000",
      description: "Kroket isi ragout ayam creamy & gurih. Renyah di luar, creamy di dalam",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kroket%20frozen%20Mbah%20wiryo%201.jpg-UDwDI2RHrV5LSZJGAToiRBHbIVhXel.jpeg",
    },
  ]

  const handleCheckShipping = (productName: string) => {
    setSelectedProduct(productName)
    setShowShippingModal(true)
  }

  const handleOrderNow = (productName: string) => {
    setSelectedProduct(productName)
    setShowOrderModal(true)
  }

  const handleCloseShippingModal = () => {
    setShowShippingModal(false)
    setSelectedProduct(null)
  }

  const handleCloseOrderModal = () => {
    setShowOrderModal(false)
    setSelectedProduct(null)
  }

  const handleDirectOrder = () => {
    const message = `Halo, saya ingin memesan ${selectedProduct}!

Mohon informasi:
- Ketersediaan stok
- Total harga termasuk ongkir
- Estimasi pengiriman

Terima kasih!`

    const whatsappUrl = `https://wa.me/6282147566278?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    handleCloseOrderModal()
  }

  return (
    <>
      <section id="produk" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">Produk Unggulan</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {products.map((product, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="aspect-square relative">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-amber-900 mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-yellow-600 mb-3">{product.price}</p>
                  <p className="text-amber-700 mb-4">{product.description}</p>

                  <div className="space-y-2">
                    <Button
                      onClick={() => handleOrderNow(product.name)}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-amber-900 font-bold"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Pesan Sekarang
                    </Button>

                    <Button
                      onClick={() => handleCheckShipping(product.name)}
                      variant="outline"
                      className="w-full border-yellow-400 text-yellow-700 hover:bg-yellow-50 bg-transparent"
                    >
                      <Truck className="w-4 h-4 mr-2" />
                      Cek Ongkir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 p-4 bg-amber-100 rounded-lg max-w-2xl mx-auto">
            <p className="text-amber-800 font-medium">
              <strong>Harga khusus untuk reseller tersedia!</strong>
              <br />
              Hubungi kami untuk paket 10–50 pak.
            </p>
          </div>
        </div>
      </section>

      {/* Shipping Calculator Modal */}
      <Dialog open={showShippingModal} onOpenChange={setShowShippingModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-amber-900">Kalkulator Ongkos Kirim</DialogTitle>
          </DialogHeader>
          <ShippingCalculator
            isModal={true}
            onClose={handleCloseShippingModal}
            productName={selectedProduct || undefined}
          />
        </DialogContent>
      </Dialog>

      {/* Order Modal */}
      <Dialog open={showOrderModal} onOpenChange={setShowOrderModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-amber-900">Pesan {selectedProduct}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Product Info */}
            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="font-bold text-amber-900 mb-2">Produk yang dipilih:</h3>
              <p className="text-amber-800">{selectedProduct}</p>
              <p className="text-sm text-amber-600 mt-1">
                Harga: {products.find((p) => p.name === selectedProduct)?.price}
              </p>
            </div>

            {/* Order Options */}
            <div className="space-y-4">
              <h3 className="font-bold text-amber-900">Pilih cara pemesanan:</h3>

              {/* Option 1: Direct Order */}
              <Card className="border-2 border-yellow-400 hover:border-yellow-500 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <ShoppingCart className="w-6 h-6 text-yellow-600 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-bold text-amber-900 mb-1">Pesan Langsung via WhatsApp</h4>
                      <p className="text-sm text-amber-700 mb-3">
                        Hubungi kami langsung untuk pemesanan cepat. Kami akan bantu hitung ongkir dan total pembayaran.
                      </p>
                      <Button
                        onClick={handleDirectOrder}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-amber-900 font-bold"
                      >
                        Pesan via WhatsApp
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Option 2: Check Shipping First */}
              <Card className="border-2 border-amber-300 hover:border-amber-400 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Truck className="w-6 h-6 text-amber-600 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-bold text-amber-900 mb-1">Cek Ongkir Dulu</h4>
                      <p className="text-sm text-amber-700 mb-3">
                        Hitung estimasi ongkos kirim ke kota Anda sebelum memesan untuk mengetahui total biaya.
                      </p>
                      <Button
                        onClick={() => {
                          handleCloseOrderModal()
                          handleCheckShipping(selectedProduct!)
                        }}
                        variant="outline"
                        className="w-full border-amber-400 text-amber-700 hover:bg-amber-50 bg-transparent"
                      >
                        <Truck className="w-4 h-4 mr-2" />
                        Cek Ongkir Dulu
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Info */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-bold text-green-800 mb-2">💡 Tips Pemesanan:</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Minimal pemesanan 1 pak</li>
                <li>• Produk frozen dikirim dengan kurir terpercaya</li>
                <li>• Untuk pemesanan 50+ pak, dapatkan harga reseller</li>
                <li>• Pembayaran bisa transfer atau COD (area tertentu)</li>
              </ul>
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
    </>
  )
}
