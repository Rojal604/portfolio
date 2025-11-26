import { SectionBackground } from "@/components/ui/section-background"
import AnimatedText from "@/components/animated-text"
import { useRef } from "react"
import RevealOnScroll from "@/components/reveal-on-scroll"
import AvatarCard from "@/components/ui/avatar-card"
import { Code2, Rocket, Sparkles, Zap } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import BlurText from "@/components/ui/blur-text"

export default function About() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const highlights = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and performant code",
    },
    {
      icon: Rocket,
      title: "Fast Delivery",
      description: "Rapid prototyping and efficient project execution",
    },
    {
      icon: Sparkles,
      title: "Creative Solutions",
      description: "Innovative approaches to complex problems",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimized for speed and user experience",
    },
  ]

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen py-20 sm:py-28 px-4 sm:px-6 overflow-hidden transition-colors duration-300 dark:bg-gradient-to-b dark:from-gray-900 dark:via-[#0b0b0f] dark:to-black"
    >


      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 sm:mb-20">
          <div className="flex justify-center items-center gap-2 mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-gray-900 dark:text-white">
            <BlurText
              text="About"
              className="inline-flex"
              delay={150}
              animateBy="letters"
              direction="top"
              as="span"
            />
            <BlurText
              text="Me"
              className="inline-block"
              childClassName="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 dark:to-purple-400 animate-gradient-x"
              delay={150}
              animateBy="words"
              direction="top"
              as="span"
            />
          </div>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="h-1 w-24 bg-gradient-to-r from-primary to-purple-600 dark:to-purple-500 mx-auto rounded-full"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          <div className="space-y-8 relative">
            {/* Decorative quote mark */}
            <div className="absolute -top-10 -left-6 text-8xl text-primary/10 font-serif font-bold -z-10">
              &ldquo;
            </div>

            <div className="backdrop-blur-md bg-white/80 dark:bg-background/30 p-6 rounded-2xl border border-gray-200 dark:border-white/5 shadow-xl dark:shadow-none hover:shadow-2xl transition-shadow duration-300">
              <div className="text-lg sm:text-xl text-gray-800 dark:text-foreground/90 leading-relaxed font-light">
                <AnimatedText
                  text="I'm a passionate full-stack developer with a focus on creating"
                  className="inline"
                  inline
                />{" "}
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-primary font-semibold relative inline-block"
                >
                  immersive 3D web experiences
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/50 rounded-full"></span>
                </motion.span>
                <AnimatedText
                  text=". My expertise lies in combining cutting-edge technologies like Three.js, React, and Next.js to build performant and visually stunning applications."
                  className="inline"
                  inline
                  delay={0.6}
                />
              </div>
            </div>

            <div className="backdrop-blur-md bg-white/80 dark:bg-background/30 p-6 rounded-2xl border border-gray-200 dark:border-white/5 shadow-xl dark:shadow-none hover:shadow-2xl transition-shadow duration-300">
              <div className="text-lg sm:text-xl text-gray-800 dark:text-foreground/90 leading-relaxed font-light">
                <AnimatedText
                  text="With years of experience in web development, I specialize in transforming complex ideas into elegant, user-friendly interfaces that push the boundaries of what's possible on the web. Every project is an opportunity to create something extraordinary."
                  delay={0.2}
                />
              </div>
            </div>

            <div className="backdrop-blur-md bg-white/80 dark:bg-background/30 p-6 rounded-2xl border border-gray-200 dark:border-white/5 shadow-xl dark:shadow-none hover:shadow-2xl transition-shadow duration-300">
              <div className="text-lg sm:text-xl text-gray-800 dark:text-foreground/90 leading-relaxed font-light">
                <AnimatedText
                  text="My approach combines technical excellence with creative vision, ensuring that every line of code serves both functionality and aesthetics. I believe in the power of"
                  className="inline"
                  inline
                  delay={0.2}
                />{" "}
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="text-primary font-semibold inline-block"
                >
                  performance-first development
                </motion.span>{" "}
                <AnimatedText
                  text="and creating experiences that delight users."
                  className="inline"
                  inline
                  delay={1.6}
                />
              </div>
            </div>
          </div>

          <motion.div
            style={{ y, opacity }}
            className="flex flex-col items-center lg:items-end relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 rounded-full blur-[100px] -z-10" />
            <AvatarCard
              imageSrc="/avatar.png"
              altText="Digital Avatar"
              captionText="Hover to interact! 🎮"
              containerHeight="450px"
              containerWidth="100%"
              imageHeight="450px"
              imageWidth="360px"
              scaleOnHover={1.05}
              rotateAmplitude={15}
              showMobileWarning={false}
              showTooltip={true}
            />
          </motion.div>
        </div>

        <RevealOnScroll delay={0.4}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-full bg-white dark:bg-card/40 backdrop-blur-md rounded-xl p-6 border border-gray-200 dark:border-white/10 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-2xl dark:shadow-lg overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <highlight.icon className="w-24 h-24 text-gray-900 dark:text-white" />
                  </div>

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-gray-200 dark:border-white/5">
                      <highlight.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-foreground group-hover:text-primary transition-colors">{highlight.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-muted-foreground leading-relaxed font-medium">{highlight.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
