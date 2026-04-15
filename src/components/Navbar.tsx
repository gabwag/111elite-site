import { motion } from "framer-motion";
import { MessageCircle, Phone, CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";
import logoSquare from "@/assets/logo-square.png";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-2 md:py-3 bg-background/60 backdrop-blur-md border-b border-border/40"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center shrink-0">
          <img
            src={logoSquare}
            alt="111 Elite Car Service"
            className="h-[60px] md:h-16 w-auto object-contain"
          />
        </a>
        <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
          <Link
            to="/book"
            className="hidden md:flex items-center gap-2 text-xs md:text-sm tracking-[0.05em] md:tracking-[0.15em] uppercase text-primary hover:text-primary/80 transition-colors font-semibold border border-primary/30 px-3 py-2.5 md:px-5 md:py-3 hover:bg-primary/5 whitespace-nowrap"
          >
            <CalendarCheck className="h-3.5 w-3.5 md:h-4 md:w-4" />
            Book Inquiry
          </Link>
          <a
            href="sms:+17326424885"
            className="flex items-center gap-1 md:gap-2 text-xs md:text-sm tracking-[0.05em] md:tracking-[0.15em] uppercase text-primary hover:text-primary/80 transition-colors font-semibold border border-primary/30 px-3 py-2.5 md:px-5 md:py-3 hover:bg-primary/5 whitespace-nowrap"
          >
            <MessageCircle className="h-3.5 w-3.5 md:h-4 md:w-4" />
            Text Us
          </a>
          <a
            href="tel:+17326424885"
            className="flex items-center gap-1 md:gap-2 text-xs md:text-sm tracking-[0.05em] md:tracking-[0.15em] uppercase text-primary-foreground bg-primary hover:bg-primary/90 transition-colors font-semibold px-3 py-2.5 md:px-5 md:py-3 whitespace-nowrap"
          >
            <Phone className="h-3.5 w-3.5 md:h-4 md:w-4" />
            Call Now
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
