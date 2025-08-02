import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { origin, destination, weight, courier } = body

    if (!origin || !destination || !weight || !courier) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const apiKey = process.env.RAJAONGKIR_API_KEY

    if (!apiKey || apiKey === "your_actual_api_key_here") {
      console.log(`Using fallback shipping costs for ${courier}`)
      const fallbackCosts = getFallbackShippingCosts(courier, weight)
      return NextResponse.json({
        rajaongkir: {
          results: [fallbackCosts],
        },
      })
    }

    console.log(`Calculating shipping cost for ${courier} from ${origin} to ${destination}, weight: ${weight}g`)

    const formData = new FormData()
    formData.append("origin", origin)
    formData.append("destination", destination)
    formData.append("weight", weight.toString())
    formData.append("courier", courier)

    const response = await fetch("https://api.rajaongkir.com/starter/cost", {
      method: "POST",
      headers: {
        key: apiKey,
      },
      body: formData,
    })

    console.log(`RajaOngkir cost API response status: ${response.status}`)

    if (response.status === 410 || response.status === 401 || !response.ok) {
      console.warn(`RajaOngkir API error ${response.status}, using fallback costs`)
      const fallbackCosts = getFallbackShippingCosts(courier, weight)
      return NextResponse.json({
        rajaongkir: {
          results: [fallbackCosts],
        },
      })
    }

    const data = await response.json()

    if (!data.rajaongkir || !data.rajaongkir.results) {
      console.error("Invalid response structure from RajaOngkir API:", data)
      const fallbackCosts = getFallbackShippingCosts(courier, weight)
      return NextResponse.json({
        rajaongkir: {
          results: [fallbackCosts],
        },
      })
    }

    console.log(`Successfully calculated shipping cost for ${courier}`)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching shipping cost:", error)

    try {
      const body = await request.json()
      const { courier, weight } = body
      const fallbackCosts = getFallbackShippingCosts(courier, weight)
      return NextResponse.json({
        rajaongkir: {
          results: [fallbackCosts],
        },
      })
    } catch {
      return NextResponse.json({ error: "Failed to calculate shipping cost" }, { status: 500 })
    }
  }
}

function getFallbackShippingCosts(courier: string, weight: number) {
  const weightInKg = Math.ceil(weight / 1000)

  const baseRates: Record<string, any> = {
    jne: {
      code: "jne",
      name: "Jalur Nugraha Ekakurir (JNE)",
      costs: [
        {
          service: "REG",
          description: "Layanan Reguler",
          cost: [{ value: weightInKg * 9000 + 15000, etd: "2-3", note: "Estimasi berdasarkan jarak dan berat" }],
        },
        {
          service: "YES",
          description: "Yakin Esok Sampai",
          cost: [{ value: weightInKg * 15000 + 25000, etd: "1-1", note: "Layanan express" }],
        },
      ],
    },
    pos: {
      code: "pos",
      name: "POS Indonesia (POS)",
      costs: [
        {
          service: "Paket Kilat Khusus",
          description: "Paket Kilat Khusus",
          cost: [{ value: weightInKg * 8000 + 12000, etd: "2-4", note: "Layanan pos kilat" }],
        },
        {
          service: "Express Next Day",
          description: "Express Next Day",
          cost: [{ value: weightInKg * 12000 + 20000, etd: "1-1", note: "Pengiriman hari berikutnya" }],
        },
      ],
    },
    tiki: {
      code: "tiki",
      name: "Citra Van Titipan Kilat (TIKI)",
      costs: [
        {
          service: "REG",
          description: "Regular Service",
          cost: [{ value: weightInKg * 10000 + 18000, etd: "2-3", note: "Layanan reguler TIKI" }],
        },
        {
          service: "ONS",
          description: "Over Night Service",
          cost: [{ value: weightInKg * 18000 + 30000, etd: "1-1", note: "Pengiriman semalam" }],
        },
      ],
    },
  }

  return baseRates[courier] || baseRates.jne
}
