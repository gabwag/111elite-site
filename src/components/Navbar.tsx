import { motion } from "framer-motion";
import { MessageCircle, CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-2.5 md:py-3 bg-background/60 backdrop-blur-md border-b border-border/40"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-end">
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <a
            href="sms:+17326424885"
            className="flex items-center gap-1.5 md:gap-2 text-sm md:text-sm tracking-[0.1em] md:tracking-[0.15em] uppercase text-primary hover:text-primary/80 transition-colors font-semibold border border-primary/30 px-4 py-3 md:px-5 md:py-3 hover:bg-primary/5 whitespace-nowrap"
          >
            <MessageCircle className="h-4 w-4 md:h-4 md:w-4" />
            <span>Contact Us</span>
          </a>
          <Link
            to="/book"
            className="flex items-center gap-1.5 md:gap-2 text-sm md:text-sm tracking-[0.1em] md:tracking-[0.15em] uppercase text-primary-foreground bg-primary hover:bg-primary/90 transition-colors font-semibold px-4 py-3 md:px-5 md:py-3 whitespace-nowrap"
          >
            <CalendarCheck className="h-4 w-4 md:h-4 md:w-4" />
            <span className="md:hidden">Book</span>
            <span className="hidden md:inline">Book Inquiry</span>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
