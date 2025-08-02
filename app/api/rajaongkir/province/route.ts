import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check if API key exists
    const apiKey = process.env.RAJAONGKIR_API_KEY

    if (!apiKey || apiKey === "your_actual_api_key_here") {
      console.log("RajaOngkir API key not configured, using fallback data")
      return NextResponse.json({
        rajaongkir: {
          results: getFallbackProvinces(),
        },
      })
    }

    console.log("Attempting to fetch provinces from RajaOngkir API...")

    const response = await fetch("https://api.rajaongkir.com/starter/province", {
      method: "GET",
      headers: {
        key: apiKey,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    console.log(`RajaOngkir API response status: ${response.status}`)

    if (response.status === 410) {
      console.warn("RajaOngkir API returned 410 (Gone) - API key might be invalid or expired")
      return NextResponse.json({
        rajaongkir: {
          results: getFallbackProvinces(),
        },
      })
    }

    if (response.status === 401) {
      console.warn("RajaOngkir API returned 401 (Unauthorized) - Invalid API key")
      return NextResponse.json({
        rajaongkir: {
          results: getFallbackProvinces(),
        },
      })
    }

    if (!response.ok) {
      console.error(`RajaOngkir API error: ${response.status} ${response.statusText}`)
      return NextResponse.json({
        rajaongkir: {
          results: getFallbackProvinces(),
        },
      })
    }

    const data = await response.json()

    // Check if the response has the expected structure
    if (!data.rajaongkir || !data.rajaongkir.results) {
      console.error("Invalid response structure from RajaOngkir API:", data)
      return NextResponse.json({
        rajaongkir: {
          results: getFallbackProvinces(),
        },
      })
    }

    console.log(`Successfully fetched ${data.rajaongkir.results.length} provinces from RajaOngkir API`)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching provinces:", error)
    return NextResponse.json({
      rajaongkir: {
        results: getFallbackProvinces(),
      },
    })
  }
}

function getFallbackProvinces() {
  return [
    { province_id: "1", province: "Bali" },
    { province_id: "2", province: "Bangka Belitung" },
    { province_id: "3", province: "Banten" },
    { province_id: "4", province: "Bengkulu" },
    { province_id: "5", province: "DI Yogyakarta" },
    { province_id: "6", province: "DKI Jakarta" },
    { province_id: "7", province: "Gorontalo" },
    { province_id: "8", province: "Jambi" },
    { province_id: "9", province: "Jawa Barat" },
    { province_id: "10", province: "Jawa Tengah" },
    { province_id: "11", province: "Jawa Timur" },
    { province_id: "12", province: "Kalimantan Barat" },
    { province_id: "13", province: "Kalimantan Selatan" },
    { province_id: "14", province: "Kalimantan Tengah" },
    { province_id: "15", province: "Kalimantan Timur" },
    { province_id: "16", province: "Kalimantan Utara" },
    { province_id: "17", province: "Kepulauan Bangka Belitung" },
    { province_id: "18", province: "Kepulauan Riau" },
    { province_id: "19", province: "Lampung" },
    { province_id: "20", province: "Maluku" },
    { province_id: "21", province: "Maluku Utara" },
    { province_id: "22", province: "Nusa Tenggara Barat" },
    { province_id: "23", province: "Nusa Tenggara Timur" },
    { province_id: "24", province: "Papua" },
    { province_id: "25", province: "Papua Barat" },
    { province_id: "26", province: "Riau" },
    { province_id: "27", province: "Sulawesi Barat" },
    { province_id: "28", province: "Sulawesi Selatan" },
    { province_id: "29", province: "Sulawesi Tengah" },
    { province_id: "30", province: "Sulawesi Tenggara" },
    { province_id: "31", province: "Sulawesi Utara" },
    { province_id: "32", province: "Sumatera Barat" },
    { province_id: "33", province: "Sumatera Selatan" },
    { province_id: "34", province: "Sumatera Utara" },
  ]
}
