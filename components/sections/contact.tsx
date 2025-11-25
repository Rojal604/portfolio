"use client"

import { useState } from "react"
import RevealOnScroll from "@/components/reveal-on-scroll"
import { motion } from "framer-motion"
import { Mail, MapPin, Phone, Send, Linkedin, Twitter, Github } from "lucide-react"

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

  return (
    <section id="contact" className="relative min-h-screen py-20 sm:py-28 lg:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Let's <span className="text-gradient">Connect</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg px-4">
              Ready to start your next project? I'm currently available for freelance work and open to new opportunities.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24">
          {/* Contact Form */}
          <RevealOnScroll delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-foreground/5 border border-border rounded-xl focus:outline-none focus:border-primary/50 focus:bg-foreground/10 transition-all placeholder:text-muted-foreground text-sm sm:text-base min-h-[48px]"
                  required
                />
              </div>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-foreground/5 border border-border rounded-xl focus:outline-none focus:border-primary/50 focus:bg-foreground/10 transition-all placeholder:text-muted-foreground text-sm sm:text-base min-h-[48px]"
                  required
                />
              </div>
              <div className="space-y-2">
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-foreground/5 border border-border rounded-xl focus:outline-none focus:border-primary/50 focus:bg-foreground/10 transition-all placeholder:text-muted-foreground resize-none text-sm sm:text-base"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 sm:py-4 bg-primary text-primary-foreground rounded-xl font-bold text-base sm:text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 min-h-[48px]"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Sending...</span>
                ) : (
                  <>
                    Send Message <Send size={18} className="sm:w-5 sm:h-5" />
                  </>
                )}
              </button>
            </form>
          </RevealOnScroll>

          {/* Contact Info */}
          <RevealOnScroll delay={0.4}>
            <div className="space-y-8 sm:space-y-12">
              <div className="glass-card p-6 sm:p-8 rounded-2xl">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Contact Details</h3>
                <div className="space-y-4 sm:space-y-6">
                  <a href="mailto:rojalmaharjan052@gmail.com" className="flex items-center gap-3 sm:gap-4 text-muted-foreground hover:text-primary transition-colors min-h-[48px]">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-foreground/5 flex items-center justify-center flex-shrink-0">
                      <Mail size={20} className="sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-muted-foreground">Email</p>
                      <p className="text-sm sm:text-base lg:text-lg font-medium truncate">rojalmaharjan052@gmail.com</p>
                    </div>
                  </a>
                  <a href="tel:+9779843100643" className="flex items-center gap-3 sm:gap-4 text-muted-foreground hover:text-primary transition-colors min-h-[48px]">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-foreground/5 flex items-center justify-center flex-shrink-0">
                      <Phone size={20} className="sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Phone</p>
                      <p className="text-sm sm:text-base lg:text-lg font-medium">(+977) 9843100643</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 sm:gap-4 text-muted-foreground min-h-[48px]">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-foreground/5 flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} className="sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Location</p>
                      <p className="text-sm sm:text-base lg:text-lg font-medium">Kathmandu, Nepal</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Social Profiles</h3>
                <div className="flex gap-3 sm:gap-4">
                  {[
                    { icon: Github, href: "#" },
                    { icon: Linkedin, href: "#" },
                    { icon: Twitter, href: "#" }
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-foreground/5 border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 min-h-[48px] min-w-[48px]"
                      aria-label={`Social profile ${i + 1}`}
                    >
                      <social.icon size={20} className="sm:w-6 sm:h-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        <div className="mt-20 sm:mt-28 lg:mt-32 pt-6 sm:pt-8 border-t border-border text-center text-muted-foreground text-sm sm:text-base">
          <p>© 2025 Rojal Maharjan. All rights reserved.</p>
        </div>
      </div>
    </section>
  )
}
