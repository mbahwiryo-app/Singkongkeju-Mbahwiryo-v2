import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import ProductAdvantages from "@/components/product-advantages"
import ResellerBenefits from "@/components/reseller-benefits"
import FeaturedProducts from "@/components/featured-products"
import ShippingCalculator from "@/components/shipping-calculator"
import Testimonials from "@/components/testimonials"
import ResellerForm from "@/components/reseller-form"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-amber-50">
      <Header />
      <main>
        <HeroSection />
        <ProductAdvantages />
        <ResellerBenefits />
        <FeaturedProducts />
        <ShippingCalculator />
        <Testimonials />
        <ResellerForm />
      </main>
      <Footer />
    </div>
  )
}
