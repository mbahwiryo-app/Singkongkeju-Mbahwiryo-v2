import { Wheat, ChevronsUpIcon as Cheese, TrendingUp } from "lucide-react"

export default function ProductAdvantages() {
  const advantages = [
    {
      icon: <Wheat className="w-12 h-12 text-yellow-600" />,
      title: "Singkong Premium",
      description: "Bahan pilihan, empuk dan gurih",
    },
    {
      icon: <Cheese className="w-12 h-12 text-yellow-600" />,
      title: "Keju Leleh Asli",
      description: "Bukan bubuk, leleh saat digoreng",
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-yellow-600" />,
      title: "Peluang Usaha",
      description: "Harga reseller menguntungkan",
    },
  ]

  return (
    <section id="tentang" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">{advantage.icon}</div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">{advantage.title}</h3>
              <p className="text-amber-700">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
