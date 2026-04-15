import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Eye, Mountain, Users, Zap, Volume2, Gem, Armchair, X } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import suvTeaser from "@/assets/fleet-suv-teaser.jpg";
import sedanTeaser from "@/assets/fleet-sedan-teaser.jpg";
import sedanInterior from "@/assets/sedan-interior.jpg";

const vehicles = [
  {
    name: "Full-Size SUV",
    tagline: "The Powerhouse",
    image: suvTeaser,
    alt: "Luxury SUV silhouette teaser with golden underglow",
    description:
      "The ultimate feeling of safety with a higher ground view, privacy windows, and room for the whole crew.",
    features: [
      { icon: Shield, title: "Ultimate Safety", desc: "Advanced safety systems you can count on" },
      { icon: Mountain, title: "Higher Ground", desc: "Elevated seating with a clear view of the road" },
      { icon: Eye, title: "Privacy Windows", desc: "Fully tinted for complete discretion" },
      { icon: Users, title: "6+ Seats", desc: "Plenty of room for groups and families" },
    ],
  },
  {
    name: "Electric Luxury Sedan",
    tagline: "Silent Luxury",
    image: sedanTeaser,
    interiorImage: sedanInterior,
    alt: "Luxury sedan silhouette teaser with golden underglow",
    description:
      "A whisper-quiet, fully electric ride where silence speaks louder than anything else.",
    features: [
      { icon: Zap, title: "Fully Electric", desc: "Zero emissions, zero engine noise. Pure comfort." },
      { icon: Volume2, title: "Silent Ride", desc: "Near-total cabin silence for the most peaceful journey" },
      { icon: Gem, title: "Premium Interior", desc: "High Quality interiors, ambient lighting, every detail refined" },
      { icon: Armchair, title: "Executive Comfort", desc: "Approved by the most demanding clients, climate zones, and panoramic views" },
    ],
  },
];

const VehicleSpotlight = () => {
  const [interiorOpen, setInteriorOpen] = useState(false);

  return (
    <>
      <section id="vehicle" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <p className="text-primary tracking-[0.3em] uppercase text-base font-semibold mb-4">
              The Fleet
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">Our Vehicles</h2>
          </motion.div>

          <div className="space-y-32">
            {vehicles.map((v) => (
              <div key={v.name} className="space-y-12">
                {/* Image hero */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="relative overflow-hidden border border-border aspect-[16/10] md:aspect-[16/8]"
                >
                  <img
                    src={v.image}
                    alt={v.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 md:p-12 flex items-end justify-between w-full">
                    <div>
                      <p className="text-primary tracking-[0.3em] uppercase text-base font-semibold mb-2">
                        {v.tagline}
                      </p>
                      <h3 className="text-3xl md:text-5xl font-bold">{v.name}</h3>
                    </div>
                    {v.interiorImage && (
                      <button
                        onClick={() => setInteriorOpen(true)}
                        className="border border-white/60 bg-transparent text-primary font-bold text-xs md:text-xl px-3 py-2 md:px-8 md:py-4 rounded md:rounded-lg hover:bg-white/10 transition-colors flex items-center gap-1 md:gap-2 tracking-wide"
                      >
                        <Eye className="h-4 w-4 md:h-7 md:w-7" />
                        SEE INTERIOR
                      </button>
                    )}
                  </div>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-muted-foreground text-lg md:text-xl leading-relaxed text-center max-w-3xl mx-auto"
                >
                  {v.description}
                </motion.p>

                {/* Desktop: grid cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="hidden md:grid grid-cols-4 gap-6"
                >
                  {v.features.map((f, i) => (
                    <motion.div
                      key={f.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="bg-card border border-border p-8 text-center hover:border-primary/30 transition-colors"
                    >
                      <f.icon className="h-8 w-8 text-primary mx-auto mb-5" />
                      <h4 className="text-xl font-semibold mb-3 font-sans">{f.title}</h4>
                      <p className="text-muted-foreground text-base leading-relaxed">{f.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Mobile: all items open */}
                <div className="md:hidden space-y-0">
                  {v.features.map((f) => (
                    <div
                      key={f.title}
                      className="border-b border-border py-5 text-center"
                    >
                      <div className="flex items-center justify-center gap-4 mb-3">
                        <f.icon className="h-6 w-6 text-primary shrink-0" />
                        <span className="text-base font-semibold font-sans">{f.title}</span>
                      </div>
                      <p className="text-muted-foreground text-base leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interior fullscreen modal */}
      <AnimatePresence>
        {interiorOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
            onClick={() => setInteriorOpen(false)}
          >
            <button
              onClick={() => setInteriorOpen(false)}
              className="absolute top-6 right-6 bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/90 transition-colors z-10"
              aria-label="Close interior view"
            >
              <X className="h-8 w-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={sedanInterior}
              alt="Electric Luxury Sedan interior with ambient lighting and premium leather seats"
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VehicleSpotlight;
