import { motion } from "framer-motion";
import { Phone, MapPin } from "lucide-react";

const ContactFooter = () => {
  return (
    <footer id="contact" className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-base font-semibold mb-4">
            Get in Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Ride?
          </h2>
          <p className="text-muted-foreground text-xl max-w-xl mx-auto">
            Contact us to arrange your luxury chauffeur experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center gap-8 mb-16"
        >
          <a
            href="tel:+17326424885"
            className="flex items-center gap-4 text-foreground hover:text-primary transition-colors text-3xl md:text-5xl font-bold"
          >
            <Phone className="h-10 w-10 md:h-14 md:w-14 text-primary" />
            732-642-4885
          </a>
          <div className="flex items-center gap-3 text-muted-foreground text-lg">
            <MapPin className="h-6 w-6 text-primary" />
            Based in Palm City · Serving Florida's East Coast
          </div>
        </motion.div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} 111 Elite Car Service. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
