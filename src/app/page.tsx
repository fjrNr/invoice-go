import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import SocialProof from "./components/SocialProof";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      {/* Noise Texture Overlay */}
      <div className="noise-bg"></div>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <Features />
        <SocialProof />
        <Pricing />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
