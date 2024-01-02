import SystemInfo from './SystemInfo'
import Doctor from './Doctor'
import HeroSection from './Hero'
import Services from './Services'
import WhyUs from './WhyUs'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <main id='main'>
        <WhyUs />
        <SystemInfo />
        <Doctor />
        <Services />
      </main>
    </>
  )
}
