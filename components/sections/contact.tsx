"use client"

import { useState } from "react"
import RevealOnScroll from "@/components/reveal-on-scroll"
import { motion } from "framer-motion"
import { Mail, MapPin, Phone, Send, Linkedin, Twitter, Github, ArrowUpRight, Facebook } from "lucide-react"
import MagneticButton from "@/components/magnetic-button"

const FloatingInput = ({ id, label, value, onChange, type = "text" }: any) => {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = value.length > 0

  return (
    <div className="relative">
      <motion.label
        htmlFor={id}
        initial={false}
        animate={{
          y: isFocused || hasValue ? -20 : 0,
          scale: isFocused || hasValue ? 0.85 : 1,
          color: isFocused ? "var(--primary)" : "var(--muted-foreground)",
        }}
        className="absolute left-4 top-3 md:left-6 md:top-4 pointer-events-none origin-left transition-colors"
      >
        {label}
      </motion.label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-4 py-3 md:px-6 md:py-4 bg-background/50 border border-border rounded-xl md:rounded-2xl focus:outline-none focus:border-primary/50 focus:bg-background/80 focus:ring-1 focus:ring-primary/20 transition-all text-base min-h-[52px]"
        required
      />
    </div>
  )
}

const FloatingTextarea = ({ id, label, value, onChange }: any) => {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = value.length > 0

  return (
    <div className="relative">
      <motion.label
        htmlFor={id}
        initial={false}
        animate={{
          y: isFocused || hasValue ? -20 : 0,
          scale: isFocused || hasValue ? 0.85 : 1,
          color: isFocused ? "var(--primary)" : "var(--muted-foreground)",
        }}
        className="absolute left-4 top-3 md:left-6 md:top-4 pointer-events-none origin-left transition-colors"
      >
        {label}
      </motion.label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        rows={5}
        className="w-full px-4 py-3 md:px-6 md:py-4 bg-background/50 border border-border rounded-xl md:rounded-2xl focus:outline-none focus:border-primary/50 focus:bg-background/80 focus:ring-1 focus:ring-primary/20 transition-all resize-none text-base min-h-[120px]"
        required
      />
    </div>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setFormData({ name: "", email: "", message: "" })
    alert("Message sent successfully!")
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  }

  return (
    <section id="contact" className="relative min-h-screen py-20 sm:py-28 lg:py-32 px-4 sm:px-6 overflow-hidden bg-background dark:bg-gradient-to-b dark:from-gray-900 dark:via-[#0b0b0f] dark:to-black">


      <div className="max-w-7xl mx-auto relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Let's <span className="text-gradient">Connect</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg sm:text-xl px-4 leading-relaxed">
              Have a project in mind? I'm always open to discussing new ideas, creative opportunities, and collaborations.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Contact Form */}
          <RevealOnScroll delay={0.2}>
            <div className="glass-card p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl relative overflow-hidden group border border-border/50">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 relative z-10 mt-2 md:mt-4">
                <FloatingInput
                  id="name"
                  label="Name"
                  value={formData.name}
                  onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                />
                <FloatingInput
                  id="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
                />
                <FloatingTextarea
                  id="message"
                  label="Message"
                  value={formData.message}
                  onChange={(e: any) => setFormData({ ...formData, message: e.target.value })}
                />

                <MagneticButton className="w-full">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 md:py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl md:rounded-2xl font-bold text-base md:text-lg hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center justify-center gap-2 md:gap-3 disabled:opacity-50 disabled:cursor-not-allowed group/btn relative overflow-hidden min-h-[52px]"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                    <span className="relative z-10 flex items-center gap-2">
                      {isSubmitting ? (
                        <span className="animate-pulse">Sending...</span>
                      ) : (
                        <>
                          Send Message <Send size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </MagneticButton>
              </form>
            </div>
          </RevealOnScroll>

          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={containerVariants}
            className="space-y-10 lg:pt-10"
          >
            <div className="space-y-6">
              <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-8">Contact Details</motion.h3>

              <motion.a variants={itemVariants} href="mailto:rojalmaharjan052@gmail.com" className="group flex items-center gap-6 p-4 rounded-2xl hover:bg-foreground/5 transition-all duration-300 border border-transparent hover:border-border/50">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-primary/10">
                  <Mail size={24} className="text-primary group-hover:text-purple-400 transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="text-lg font-medium group-hover:text-primary transition-colors">rojalmaharjan052@gmail.com</p>
                </div>
                <ArrowUpRight className="ml-auto opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-muted-foreground" />
              </motion.a>

              <motion.a variants={itemVariants} href="tel:+9779843100643" className="group flex items-center gap-6 p-4 rounded-2xl hover:bg-foreground/5 transition-all duration-300 border border-transparent hover:border-border/50">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-primary/10">
                  <Phone size={24} className="text-primary group-hover:text-purple-400 transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <p className="text-lg font-medium group-hover:text-primary transition-colors">(+977) 9843100643</p>
                </div>
                <ArrowUpRight className="ml-auto opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-muted-foreground" />
              </motion.a>

              <motion.div variants={itemVariants} className="group flex items-center gap-6 p-4 rounded-2xl hover:bg-foreground/5 transition-all duration-300 border border-transparent hover:border-border/50">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-primary/10">
                  <MapPin size={24} className="text-primary group-hover:text-purple-400 transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <p className="text-lg font-medium group-hover:text-primary transition-colors">Kathmandu, Nepal</p>
                </div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="pt-8 border-t border-border">
              <h3 className="text-2xl font-bold mb-8">Social Profiles</h3>
              <div className="flex flex-wrap gap-3 md:gap-4">
                {[
                  { icon: Github, href: "#", label: "Github" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Facebook, href: "https://www.facebook.com/nepaetechno", label: "Facebook" }
                ].map((social, i) => (
                  <MagneticButton key={i}>
                    <a
                      href={social.href}
                      className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-foreground/5 border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group relative"
                      aria-label={social.label}
                    >
                      <social.icon size={20} className="md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur px-3 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border pointer-events-none">
                        {social.label}
                      </span>
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-32 pt-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 text-muted-foreground">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            className="flex items-center gap-2"
          >
            <span className="text-sm font-medium">Powered by</span>
            <motion.a
              href="https://www.facebook.com/nepaetechno"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-[length:200%_auto] hover:opacity-80 transition-opacity"
              animate={{
                backgroundPosition: ["0% center", "200% center"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              NEPA E-Techno Center
            </motion.a>
          </motion.div>

          <div className="flex gap-8 text-sm font-medium">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </section>
  )
}
