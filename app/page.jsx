import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import PromoModal from '@/components/PromoModal'
import Hero from '@/components/sections/Hero'
import Paquetes from '@/components/sections/Paquetes'
import Ludoteca from '@/components/sections/Ludoteca'
import Graduaciones from '@/components/sections/Graduaciones'
import Nosotros from '@/components/sections/Nosotros'
import Galeria from '@/components/sections/Galeria'
import Ubicacion from '@/components/sections/Ubicacion'
import FAQ from '@/components/sections/FAQ'
import CTAFinal from '@/components/sections/CTAFinal'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Paquetes />
        <Ludoteca />
        <Graduaciones />
        <Nosotros />
        <Galeria />
        <Ubicacion />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
      <WhatsAppButton />
      <PromoModal />
    </>
  )
}
