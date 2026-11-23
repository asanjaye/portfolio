import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import PipelineExplorer from './components/PipelineExplorer';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-70" aria-hidden="true" />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <PipelineExplorer />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
