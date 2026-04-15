import { motion } from "framer-motion";

const WhoWeAre = () => {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-base font-semibold mb-4">
            About
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Who We Are</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-muted-foreground text-xl md:text-2xl leading-relaxed text-center max-w-3xl mx-auto space-y-6"
        >
          <p>
            No third-party contractors. No strangers. When you book with 111 Elite, 
            you get <span className="text-foreground font-medium">your driver</span> — the same 
            trusted professional every time, ready to go the extra mile for your best 
            chauffeur experience.
          </p>
          <p>
            Based in <span className="text-foreground font-medium">Palm City</span>, we're 
            specialists in local airport knowledge — handling every terminal, every gate, 
            and every private aviation facility across Florida's East Coast with precision.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeAre;
