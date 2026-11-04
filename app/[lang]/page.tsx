import { ViewTransition } from "react";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Marquee } from "@/components/sections/Marquee";
import { Process } from "@/components/sections/Process";
import { Skills } from "@/components/sections/Skills";
import { Work } from "@/components/sections/Work";
import { pageTransition } from "@/lib/transitions";

export default function HomePage() {
  return (
    <ViewTransition {...pageTransition}>
      <div>
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Skills />
        <Process />
        <Contact />
      </div>
    </ViewTransition>
  );
}
