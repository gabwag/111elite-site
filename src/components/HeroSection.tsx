import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import logoWide from "@/assets/logo-wide.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Premium luxury background with golden light"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-6"
        >
          <img
            src={logoWide}
            alt="111 Elite Car Service"
            className="w-44 h-44 md:w-96 md:h-96 mx-auto object-contain"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight"
        >
          Arrive in{" "}
          <span className="text-primary">Style</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 whitespace-pre-line"
        >
          Professional chauffeur service. Premium vehicles. Seamless service—every time.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="text-lg md:text-xl px-10 py-8 tracking-[0.15em] uppercase font-semibold rounded-none"
            asChild
          >
            <a href="tel:+17326424885">
              <Phone className="mr-3 h-6 w-6" />
              732-642-4885
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-base px-10 py-8 tracking-[0.15em] uppercase font-semibold rounded-none border-primary/30 text-primary hover:bg-primary/10"
            asChild
          >
            <a href="#vehicle">Our Fleet</a>
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border border-primary/40 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-1 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
