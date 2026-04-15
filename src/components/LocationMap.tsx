import { motion } from "framer-motion";

const LocationMap = () => {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-base font-semibold mb-4">
            Service Area
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">East Coast of Florida</h2>
          <p className="text-foreground font-semibold text-2xl mb-2">Based in Palm City</p>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Proudly serving the entire East Coast of Florida with reliable, 
            professional luxury transportation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="overflow-hidden border border-border aspect-video"
        >
          <iframe
            title="Miami to Orlando service area"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d900000!2d-80.3!3d27.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.3) brightness(0.8)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default LocationMap;
