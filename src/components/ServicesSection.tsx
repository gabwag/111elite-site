import { motion } from "framer-motion";
import { Plane, Briefcase, GlassWater, Crown } from "lucide-react";
import jetImage from "@/assets/jet-tarmac-teaser.jpg";

const services = [
  { icon: Plane, title: "Private Aviation", desc: "We'll get you from your door to the tarmac — no stress, no hassle, just a smooth ride to your jet." },
  { icon: Briefcase, title: "Executive Travel", desc: "On time, every time. Professional rides for busy people who need to get where they're going." },
  { icon: GlassWater, title: "Special Occasions", desc: "Weddings, anniversaries, birthdays — whatever you're celebrating, we'll make sure you arrive in style." },
  { icon: Crown, title: "VIP Concierge", desc: "Need a regular driver who knows your schedule? We've got you covered, your way, every time." },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative">
      {/* Private Jet Hero Banner */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={jetImage}
          alt="Black luxury SUV on private jet tarmac"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/50" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center px-6"
          >
            <p className="text-primary tracking-[0.3em] uppercase text-base font-semibold mb-4">
              Beyond First Class
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              Ride to <span className="text-primary">Takeoff</span>
            </h2>
            <p className="text-foreground/70 text-xl md:text-2xl max-w-2xl mx-auto">
              Direct door-to-jet service for private aviation clients. 
              Your flight begins the moment you step into our vehicle.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="bg-card py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-primary tracking-[0.3em] uppercase text-base font-semibold mb-4">
              What We Offer
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">Our Services</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-6 border border-primary/20 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <s.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 font-sans">{s.title}</h3>
                <p className="text-muted-foreground text-base leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
