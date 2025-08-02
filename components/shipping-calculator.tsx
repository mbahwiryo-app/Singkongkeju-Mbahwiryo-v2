"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Truck, Clock, Package, MapPin, Phone, AlertTriangle, Loader2, Info } from "lucide-react"
import Link from "next/link"

interface Province {
  province_id: string
  province: string
}

interface City {
  city_id: string
  province_id: string
  province: string
  type: string
  city_name: string
  postal_code: string
}

interface ShippingCost {
  service: string
  description: string
  cost: Array<{
    value: number
    etd: string
    note: string
  }>
}

interface CourierResult {
  code: string
  name: string
  costs: ShippingCost[]
}

interface ShippingCalculatorProps {
  isModal?: boolean
  onClose?: () => void
  productName?: string
}

export default function ShippingCalculator({ isModal = false, onClose, productName }: ShippingCalculatorProps) {
  const [provinces, setProvinces] = useState<Province[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [selectedProvince, setSelectedProvince] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [quantity, setQuantity] = useState("")
  const [results, setResults] = useState<CourierResult[]>([])
  const [totalWeight, setTotalWeight] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingProvinces, setLoadingProvinces] = useState(true)
  const [loadingCities, setLoadingCities] = useState(false)
  const [isUsingFallback, setIsUsingFallback] = useState(false)

  // Origin city (Sleman, Yogyakarta)
  const originCityId = "419" // Sleman city ID in RajaOngkir

  // Available couriers for frozen products
  const frozenCouriers = ["jne", "pos", "tiki"]

  // Fetch provinces on component mount
  useEffect(() => {
    fetchProvinces()
  }, [])

  const fetchProvinces = async () => {
    try {
      setLoadingProvinces(true)

      const response = await fetch("/api/rajaongkir/province")

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.rajaongkir?.results) {
        setProvinces(data.rajaongkir.results)
        // Check if we're using fallback data (less than 10 provinces means likely fallback)
        setIsUsingFallback(data.rajaongkir.results.length <= 10)
      } else {
        throw new Error("Invalid response format")
      }
    } catch (error) {
      console.error("Error fetching provinces:", error)
      setIsUsingFallback(true)

      // Set minimal fallback provinces
      setProvinces([
        { province_id: "5", province: "DI Yogyakarta" },
        { province_id: "6", province: "DKI Jakarta" },
        { province_id: "9", province: "Jawa Barat" },
        { province_id: "10", province: "Jawa Tengah" },
        { province_id: "11", province: "Jawa Timur" },
      ])
    } finally {
      setLoadingProvinces(false)
    }
  }

  const fetchCities = async (provinceId: string) => {
    try {
      setLoadingCities(true)

      const response = await fetch(`/api/rajaongkir/city?province=${provinceId}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.rajaongkir?.results) {
        setCities(data.rajaongkir.results)
      } else {
        throw new Error("Invalid response format")
      }
    } catch (error) {
      console.error("Error fetching cities:", error)
      setCities([])
    } finally {
      setLoadingCities(false)
    }
  }

  const calculateShipping = async () => {
    if (!selectedCity || !quantity) return

    try {
      setLoading(true)

      const qty = Number.parseInt(quantity)
      const weight = qty * 250 // 250 gram per pak
      setTotalWeight(weight)

      const shippingResults: CourierResult[] = []

      // Fetch shipping costs for each courier
      for (const courier of frozenCouriers) {
        try {
          const response = await fetch("/api/rajaongkir/cost", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              origin: originCityId,
              destination: selectedCity,
              weight: weight,
              courier: courier,
            }),
          })

          if (!response.ok) {
            console.warn(`Failed to fetch ${courier} rates: ${response.status}`)
            continue
          }

          const data = await response.json()

          if (data.rajaongkir?.results?.[0]) {
            const result = data.rajaongkir.results[0]
            shippingResults.push(result)
          }
        } catch (error) {
          console.error(`Error fetching ${courier} rates:`, error)
        }
      }

      setResults(shippingResults)
      setShowResults(true)
    } catch (error) {
      console.error("Error calculating shipping:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatWeight = (grams: number) => {
    if (grams >= 1000) {
      return `${(grams / 1000).toFixed(1)} kg`
    }
    return `${grams} gram`
  }

  const handleProvinceChange = (provinceId: string) => {
    setSelectedProvince(provinceId)
    setSelectedCity("")
    setCities([])
    setShowResults(false)
    fetchCities(provinceId)
  }

  const handleCityChange = (cityId: string) => {
    setSelectedCity(cityId)
    setShowResults(false)
  }

  const selectedCityName = cities.find((city) => city.city_id === selectedCity)?.city_name || ""

  const content = (
    <div className="max-w-4xl mx-auto">
      {!isModal && (
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">Kalkulator Ongkos Kirim</h2>
          <p className="text-amber-700 text-lg">Hitung estimasi biaya pengiriman Singkong Keju Frozen ke kota Anda</p>
        </div>
      )}

      {isModal && productName && (
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-amber-900 mb-2">Cek Ongkir untuk {productName}</h3>
          <p className="text-amber-700">Hitung estimasi biaya pengiriman ke kota Anda</p>
        </div>
      )}

      {/* Fallback mode notification */}
      {isUsingFallback && (
        <Alert className="mb-6 border-blue-400 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Mode Offline:</strong> Menggunakan data estimasi. Untuk harga akurat, silakan hubungi kami via
            WhatsApp.
          </AlertDescription>
        </Alert>
      )}

      {/* Alert untuk produk frozen */}
      <Alert className="mb-8 border-yellow-400 bg-yellow-50">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <strong>Penting:</strong> Produk frozen hanya dikirim dengan kurir terpercaya untuk menjaga kualitas dan
          kesegaran.
        </AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-yellow-400 to-amber-400 text-amber-900 rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5" />
              <span>Hitung Ongkir</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div>
              <Label htmlFor="province" className="text-amber-900 font-medium flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Provinsi Tujuan</span>
              </Label>
              <Select onValueChange={handleProvinceChange} disabled={loadingProvinces}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder={loadingProvinces ? "Memuat provinsi..." : "Pilih provinsi tujuan"} />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((province) => (
                    <SelectItem key={province.province_id} value={province.province_id}>
                      {province.province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="city" className="text-amber-900 font-medium flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Kota/Kabupaten Tujuan</span>
              </Label>
              <Select onValueChange={handleCityChange} disabled={!selectedProvince || loadingCities}>
                <SelectTrigger className="mt-2">
                  <SelectValue
                    placeholder={
                      !selectedProvince
                        ? "Pilih provinsi terlebih dahulu"
                        : loadingCities
                          ? "Memuat kota..."
                          : "Pilih kota/kabupaten tujuan"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.city_id} value={city.city_id}>
                      {city.type} {city.city_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="quantity" className="text-amber-900 font-medium flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <span>Jumlah Pesanan</span>
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="mt-2"
                placeholder="Masukkan jumlah pak"
              />
              {quantity && (
                <p className="text-sm text-amber-600 mt-1">
                  Estimasi berat: {formatWeight(Number.parseInt(quantity) * 250)}
                </p>
              )}
            </div>

            <Button
              onClick={calculateShipping}
              disabled={!selectedCity || !quantity || loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-amber-900 font-bold py-3 text-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Menghitung...
                </>
              ) : (
                <>
                  <Truck className="w-5 h-5 mr-2" />
                  Hitung Ongkir
                </>
              )}
            </Button>

            {/* Manual option */}
            <div className="border-t pt-4">
              <p className="text-sm text-amber-700 mb-3">
                Butuh bantuan atau ingin harga yang lebih akurat? Hubungi kami:
              </p>
              <Button
                asChild
                variant="outline"
                className="w-full border-yellow-400 text-yellow-700 hover:bg-yellow-50 bg-transparent"
              >
                <Link href="https://wa.me/6282147566278" target="_blank">
                  <Phone className="w-4 h-4 mr-2" />
                  WhatsApp: 0821-4756-6278
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          {showResults && results.length > 0 && (
            <>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-bold text-amber-900 mb-2">Detail Pengiriman</h3>
                <div className="text-sm text-amber-700 space-y-1">
                  <p>
                    <strong>Dari:</strong> Sleman, Yogyakarta
                  </p>
                  <p>
                    <strong>Ke:</strong> {selectedCityName}
                  </p>
                  <p>
                    <strong>Berat:</strong> {formatWeight(totalWeight)}
                  </p>
                  <p>
                    <strong>Jumlah:</strong> {quantity} pak
                  </p>
                </div>
              </div>

              {results.map((courier, courierIndex) => (
                <div key={courierIndex} className="space-y-2">
                  <h4 className="font-bold text-amber-900 text-lg">{courier.name}</h4>
                  {courier.costs.map((cost, costIndex) => (
                    <Card key={costIndex} className="shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-bold text-amber-900">{cost.service}</h5>
                            <p className="text-sm text-amber-600">{cost.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-green-600">{formatCurrency(cost.cost[0].value)}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-amber-700">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>Estimasi: {cost.cost[0].etd} hari</span>
                        </div>
                        {cost.cost[0].note && <p className="text-xs text-gray-500 mt-1">{cost.cost[0].note}</p>}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ))}

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  <strong>💡 Tips:</strong> Untuk pemesanan dalam jumlah besar (50+ pak), hubungi kami untuk mendapatkan
                  harga khusus reseller dan diskon ongkir!
                </p>
              </div>
            </>
          )}

          {showResults && results.length === 0 && !loading && (
            <Card className="shadow-md">
              <CardContent className="p-6 text-center">
                <p className="text-amber-700 mb-4">
                  Tidak ada layanan pengiriman yang tersedia ke {selectedCityName}. Silakan hubungi kami via WhatsApp
                  untuk informasi lebih lanjut.
                </p>
                <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-amber-900">
                  <Link href="https://wa.me/6282147566278" target="_blank">
                    <Phone className="w-4 h-4 mr-2" />
                    Hubungi WhatsApp
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {isModal && (
        <div className="flex justify-end mt-6">
          <Button onClick={onClose} variant="outline" className="mr-2 bg-transparent">
            Tutup
          </Button>
        </div>
      )}
    </div>
  )

  if (isModal) {
    return content
  }

  return (
    <section id="ongkir" className="py-16 bg-gradient-to-br from-amber-50 to-yellow-50">
      <div className="container mx-auto px-4">{content}</div>
    </section>
  )
}
