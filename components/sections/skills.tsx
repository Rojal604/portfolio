"use client"

import RevealOnScroll from "@/components/reveal-on-scroll"
import { motion } from "framer-motion"
import { Code2, Palette, Database, Terminal, Layout, Cpu } from "lucide-react"

export default function Skills() {
  const skills = [
    {
      category: "Frontend",
      icon: <Layout className="w-8 h-8 text-primary" />,
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"]
    },
    {
      category: "Backend",
      icon: <Database className="w-8 h-8 text-accent" />,
      items: ["Node.js", "PostgreSQL", "Prisma", "GraphQL", "Redis", "Docker"]
    },
    {
      category: "Design",
      icon: <Palette className="w-8 h-8 text-pink-500" />,
      items: ["Figma", "UI/UX", "Prototyping", "Wireframing", "Blender", "Adobe Suite"]
    },
    {
      category: "Tools",
      icon: <Terminal className="w-8 h-8 text-green-500" />,
      items: ["Git", "VS Code", "Vercel", "AWS", "Jest", "CI/CD"]
    }
  ]

  return (
    <section id="skills" className="relative py-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Technical <span className="text-gradient">Arsenal</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              A curated stack of modern technologies I use to bring creative visions to life.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <RevealOnScroll key={skill.category} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className="h-full p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/50 transition-colors duration-300 group"
              >
                <div className="mb-6 p-4 rounded-xl bg-white/5 w-fit group-hover:bg-primary/20 transition-colors duration-300">
                  {skill.icon}
                </div>

                <h3 className="text-xl font-bold mb-6 text-foreground">{skill.category}</h3>

                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 text-sm rounded-lg bg-white/5 text-muted-foreground border border-white/5 group-hover:border-primary/20 group-hover:text-primary transition-colors duration-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Floating Background Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-10 text-primary opacity-10"
          >
            <Code2 size={120} />
          </motion.div>
          <motion.div
            animate={{
              y: [0, 20, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-10 text-accent opacity-10"
          >
            <Cpu size={120} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
