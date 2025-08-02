"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ResellerForm() {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    city: "",
    quantity: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `Halo, saya ingin gabung jadi reseller Mbah Wiryo!

Nama: ${formData.name}
WhatsApp: ${formData.whatsapp}
Kota: ${formData.city}
Rencana Pembelian: ${formData.quantity} pak
${formData.message ? `Pesan: ${formData.message}` : ""}

Terima kasih!`

    const whatsappUrl = `https://wa.me/6282147566278?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="text-center bg-gradient-to-r from-yellow-400 to-amber-400 text-amber-900 rounded-t-lg">
              <CardTitle className="text-2xl md:text-3xl font-bold">
                Gabung Sekarang & Mulai Jualan dari Rumah!
              </CardTitle>
            </CardHeader>

            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-amber-900 font-medium">
                    Nama Lengkap *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>

                <div>
                  <Label htmlFor="whatsapp" className="text-amber-900 font-medium">
                    No. WhatsApp *
                  </Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="mt-1"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>

                <div>
                  <Label htmlFor="city" className="text-amber-900 font-medium">
                    Kota / Domisili *
                  </Label>
                  <Input
                    id="city"
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="mt-1"
                    placeholder="Contoh: Yogyakarta"
                  />
                </div>

                <div>
                  <Label htmlFor="quantity" className="text-amber-900 font-medium">
                    Rencana Pembelian *
                  </Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, quantity: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Pilih jumlah paket" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 pak</SelectItem>
                      <SelectItem value="20">20 pak</SelectItem>
                      <SelectItem value="50">50 pak</SelectItem>
                      <SelectItem value="100+">100+ pak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message" className="text-amber-900 font-medium">
                    Pertanyaan / Komentar (Opsional)
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-1"
                    placeholder="Ada pertanyaan khusus?"
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-amber-900 font-bold py-3 text-lg rounded-full shadow-lg"
                >
                  Kirim Sekarang
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-amber-700 mb-2">Atau chat WhatsApp langsung:</p>
                <Button
                  asChild
                  variant="outline"
                  className="border-yellow-400 text-yellow-600 hover:bg-yellow-50 bg-transparent"
                >
                  <Link href="https://wa.me/6282147566278" target="_blank">
                    Chat WhatsApp Langsung
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
