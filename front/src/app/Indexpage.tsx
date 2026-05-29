import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { CTA } from './components/CTA';
import { Vision } from "./components/Vision";
import { Partners } from "./components/Partners";


export function Indexpage() {
  return (
    <div className="size-full">
      
      <Hero />
      <Vision />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Partners />
      <CTA />
      
    </div>
  );
}
