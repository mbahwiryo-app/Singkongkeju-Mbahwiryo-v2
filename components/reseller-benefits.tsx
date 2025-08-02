import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function ResellerBenefits() {
  const benefits = [
    "Harga khusus reseller mulai Rp10.000",
    "Margin hingga 50%",
    "Materi promosi disediakan (caption, foto, video)",
    "Bisa dropship",
    "Tanpa minimal stok",
    "Dukungan & bimbingan bisnis",
  ]

  return (
    <section id="reseller" className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/keluarga%20santai-reo3KguXdNWtzE57xJhR5nuD5me34h.png"
              alt="Keluarga bahagia menikmati singkong keju"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-6">
              Kenapa Harus Gabung Jadi Reseller Mbah Wiryo?
            </h2>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Check className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-amber-800 text-lg">{benefit}</span>
                </div>
              ))}
            </div>

            <Button
              asChild
              size="lg"
              className="bg-yellow-400 hover:bg-yellow-500 text-amber-900 font-bold px-8 py-4 text-lg rounded-full shadow-lg"
            >
              <Link href="https://wa.me/6282147566278" target="_blank">
                Gabung Reseller Sekarang via WhatsApp
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
