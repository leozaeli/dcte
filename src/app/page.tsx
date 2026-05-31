import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Security from "@/components/Security";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Security />
        <Portfolio />
        <Contact />
      </main>
      <Footer />

      <a
        href="https://wa.me/5571999142157?text=Olá%20Deividson,%20estou%20no%20seu%20site%20e%20gostaria%20de%20um%20atendimento%20técnico%20especializado."
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
      >
        <i className="fab fa-whatsapp" />
      </a>
    </>
  );
}
