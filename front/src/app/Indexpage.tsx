import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';

export function Indexpage() {
  return (
    <div className="size-full">
      <Hero />
      <Features />
      <HowItWorks />
    </div>
  );
}

