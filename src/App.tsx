import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero.tsx';
import { Services } from './components/sections/Services.tsx';
import { Portfolio } from './components/sections/Portfolio.tsx';
import { About } from './components/sections/About';
// import { Skills } from './components/sections/Skills';
import { Contact } from './components/sections/Contact.tsx';
import { Testimonials } from './components/sections/Testimonials';
import { AnimatedBackground } from './components/ui/AnimatedBackground';
import { CursorSpotlight } from './components/ui/CursorSpotlight';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { SEO } from './components/SEO';

function App() {
  return (
    <>
      <SEO />
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <CursorSpotlight />
        <ScrollProgress />
        <Header />
        <main>
          <Hero />
          <Services />
          <Portfolio />
          <About />
          {/* <Skills /> - Uncomment if you want to display your tech stack */}
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
