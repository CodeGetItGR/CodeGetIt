import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero.tsx';
import { Services } from './components/sections/Services.tsx';
import { Portfolio } from './components/sections/Portfolio.tsx';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact.tsx';
import { SEO } from './components/SEO';

function App() {
  return (
    <>
      <SEO />
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <Services />
          <Portfolio />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
