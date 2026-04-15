import { motion } from "framer-motion";
import { Clock, UserCheck, Eye, Star } from "lucide-react";

const reasons = [
  { icon: UserCheck, title: "Professional Chauffeurs", desc: "Experienced drivers who put your comfort and safety first." },
  { icon: Clock, title: "Always On Time", desc: "We show up when we say we will — every single time." },
  { icon: Eye, title: "Complete Discretion", desc: "Your privacy matters. Quiet, confidential service guaranteed." },
  { icon: Star, title: "Premium Experience", desc: "Every detail handled so you can sit back and enjoy the ride." },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-base font-semibold mb-4">
            The Difference
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">Why Choose Us</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border border-border p-8 text-center hover:border-primary/30 transition-colors"
            >
              <r.icon className="h-8 w-8 text-primary mx-auto mb-5" />
              <h3 className="text-xl font-semibold mb-3 font-sans">{r.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
