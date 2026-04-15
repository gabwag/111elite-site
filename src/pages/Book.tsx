import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

type SubmitState = "idle" | "loading" | "success" | "error";

export default function Book() {
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [passengers, setPassengers] = useState("1");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name") as string,
      phone: fd.get("phone") as string,
      email: fd.get("email") as string,
      pickup: fd.get("pickup") as string,
      dropoff: fd.get("dropoff") as string,
      date: fd.get("date") as string,
      time: fd.get("time") as string,
      passengers,
      notes: fd.get("notes") as string,
      website: fd.get("website") as string, // honeypot
    };

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setState("success");
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg((data as { error?: string }).error || "Something went wrong. Please try again or call us directly.");
        setState("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setState("error");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm mb-8 tracking-widest uppercase">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <div className="text-center mb-12">
              <p className="text-primary tracking-[0.3em] uppercase text-sm font-semibold mb-4">
                Reserve Your Ride
              </p>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">Book an Inquiry</h1>
              <div className="w-16 h-px bg-primary mx-auto mb-6" />
              <p className="text-muted-foreground max-w-md mx-auto">
                Complete the form and Alex will be in touch within a few hours to confirm your reservation.
              </p>
            </div>

            {/* Success */}
            {state === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card border border-primary/30 p-12 text-center"
              >
                <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-3">Inquiry Received</h2>
                <p className="text-muted-foreground mb-8">
                  Thank you! Alex will be in touch within a few hours to confirm your reservation. A confirmation email is on its way.
                </p>
                <Link to="/" className="text-primary hover:text-primary/80 transition-colors tracking-widest uppercase text-sm">
                  ← Return Home
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot */}
                <div style={{ display: "none" }} aria-hidden="true">
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="tracking-widest uppercase text-xs text-muted-foreground">Full Name *</Label>
                    <Input id="name" name="name" placeholder="John Smith" required className="rounded-none bg-card border-border focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="tracking-widest uppercase text-xs text-muted-foreground">Phone *</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="(555) 000-0000" required className="rounded-none bg-card border-border focus:border-primary" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="tracking-widest uppercase text-xs text-muted-foreground">Email *</Label>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" required className="rounded-none bg-card border-border focus:border-primary" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pickup" className="tracking-widest uppercase text-xs text-muted-foreground">Pickup Address *</Label>
                  <Input id="pickup" name="pickup" placeholder="Hotel, address, or airport terminal" required className="rounded-none bg-card border-border focus:border-primary" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dropoff" className="tracking-widest uppercase text-xs text-muted-foreground">Dropoff Address</Label>
                  <Input id="dropoff" name="dropoff" placeholder="Destination address or airport terminal" className="rounded-none bg-card border-border focus:border-primary" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="tracking-widest uppercase text-xs text-muted-foreground">Date *</Label>
                    <Input id="date" name="date" type="date" required className="rounded-none bg-card border-border focus:border-primary" style={{ colorScheme: "dark" }} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time" className="tracking-widest uppercase text-xs text-muted-foreground">Time *</Label>
                    <Input id="time" name="time" type="time" required className="rounded-none bg-card border-border focus:border-primary" style={{ colorScheme: "dark" }} />
                  </div>
                  <div className="space-y-2">
                    <Label className="tracking-widest uppercase text-xs text-muted-foreground">Passengers</Label>
                    <Select value={passengers} onValueChange={setPassengers}>
                      <SelectTrigger className="rounded-none bg-card border-border focus:border-primary">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["1","2","3","4","5","6","7","8"].map(n => (
                          <SelectItem key={n} value={n}>{n} passenger{n !== "1" ? "s" : ""}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="tracking-widest uppercase text-xs text-muted-foreground">Additional Notes</Label>
                  <Textarea id="notes" name="notes" rows={4} placeholder="Flight number, special requests, luggage, etc." className="rounded-none bg-card border-border focus:border-primary resize-none" />
                </div>

                {state === "error" && (
                  <p className="text-destructive text-sm text-center">{errorMsg}</p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={state === "loading"}
                  className="w-full rounded-none text-base tracking-[0.15em] uppercase py-8 font-semibold"
                >
                  {state === "loading" ? "Submitting..." : "Submit Inquiry"}
                </Button>

                <p className="text-muted-foreground text-xs text-center">
                  By submitting, you agree to be contacted by 111 Elite Car Service.
                </p>
              </form>
            )}

            {/* Direct contact */}
            <div className="mt-12 pt-12 border-t border-border text-center">
              <p className="text-muted-foreground text-sm mb-4">Prefer to call directly?</p>
              <a href="tel:+17326424885" className="inline-flex items-center gap-3 text-primary hover:text-primary/80 transition-colors text-2xl font-bold">
                <Phone className="h-6 w-6" />
                732-642-4885
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
