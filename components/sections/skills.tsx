import { SectionBackground } from "@/components/ui/section-background"
import RevealOnScroll from "@/components/reveal-on-scroll"
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Code2, Palette, Database, Terminal, Layout, Cpu, Globe, Server, Smartphone, Cloud } from "lucide-react"
import { MouseEvent } from "react"

export default function Skills() {
  const skills = [
    {
      category: "Frontend",
      icon: <Layout className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      description: "Building immersive user interfaces",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Zustand", "Three.js"]
    },
    {
      category: "Backend",
      icon: <Database className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
      description: "Robust server-side architecture",
      items: ["Node.js", "PostgreSQL", "Prisma", "GraphQL", "Redis", "Docker"]
    },
    {
      category: "Design",
      icon: <Palette className="w-8 h-8 text-pink-600 dark:text-pink-400" />,
      description: "Crafting beautiful experiences",
      items: ["Figma", "UI/UX", "Prototyping", "Wireframing", "Blender", "Adobe Suite"]
    },
    {
      category: "DevOps",
      icon: <Terminal className="w-8 h-8 text-green-600 dark:text-green-400" />,
      description: "Streamlining deployment pipelines",
      items: ["Git", "VS Code", "GitHub Actions", "AWS", "Jest", "CI/CD"]
    }
  ]

  return (
    <section id="skills" className="sticky top-0 min-h-screen relative py-32 px-4 overflow-hidden transition-colors duration-500 bg-background dark:bg-gradient-to-b dark:from-black dark:via-[#0b0b0f] dark:to-gray-900">


      <div className="max-w-7xl mx-auto relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4 px-4 py-1.5 rounded-full border border-purple-200/50 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm text-sm font-medium text-purple-700 dark:text-purple-300 shadow-sm dark:shadow-none"
            >
              My Expertise
            </motion.div >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 dark:from-white dark:via-purple-200 dark:to-blue-200">
              Technical Arsenal
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              A curated stack of modern technologies I use to bring creative visions to life,
              combining performance with aesthetic excellence.
            </p>
          </div >
        </RevealOnScroll >

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={skill.category} skill={skill} index={index} />
          ))}
        </div>

        {/* Floating Background Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <FloatingIcon icon={<Code2 size={120} />} initialX={10} initialY={20} duration={5} delay={0} className="top-1/4 left-10 text-purple-500/10 dark:text-purple-500/5" />
          <FloatingIcon icon={<Cpu size={120} />} initialX={-10} initialY={-20} duration={7} delay={1} className="bottom-1/4 right-10 text-blue-500/10 dark:text-blue-500/5" />
          <FloatingIcon icon={<Cloud size={80} />} initialX={15} initialY={15} duration={6} delay={2} className="top-3/4 left-1/4 text-pink-500/10 dark:text-pink-500/5" />
          <FloatingIcon icon={<Globe size={80} />} initialX={-15} initialY={-15} duration={8} delay={0.5} className="top-10 right-1/4 text-green-500/10 dark:text-green-500/5" />
        </div>
      </div >
    </section >
  )
}

function SkillCard({ skill, index }: { skill: any; index: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

  function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    x.set(clientX - left)
    y.set(clientY - top)
  }

  const rotateX = useTransform(mouseY, [0, 400], [5, -5])
  const rotateY = useTransform(mouseX, [0, 300], [-5, 5])

  return (
    <RevealOnScroll delay={index * 0.1}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={onMouseMove}
        onMouseLeave={() => {
          x.set(150)
          y.set(200)
        }}
        className="group relative h-full bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-purple-100/50 dark:border-white/10 hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl dark:hover:shadow-purple-500/10"
      >
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(168, 85, 247, 0.15), transparent 80%)`
          }}
        />

        <div className="relative z-10 transform-style-3d group-hover:translate-z-10 transition-transform duration-300">
          <div className="mb-6 inline-block p-4 rounded-xl bg-purple-50 dark:bg-white/5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm dark:shadow-none border border-purple-100 dark:border-white/5">
            {skill.icon}
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {skill.category}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            {skill.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {skill.items.map((item: string, i: number) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="px-3 py-1 text-xs font-medium rounded-full bg-purple-50/50 dark:bg-white/5 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-white/5 group-hover:border-purple-200 dark:group-hover:border-purple-500/30 transition-colors"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </RevealOnScroll>
  )
}

function FloatingIcon({ icon, initialX, initialY, duration, delay, className }: { icon: any, initialX: number, initialY: number, duration: number, delay: number, className: string }) {
  return (
    <motion.div
      initial={{ x: initialX, y: initialY }}
      animate={{
        y: [initialY, initialY - 20, initialY],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
      className={`absolute ${className}`}
    >
      {icon}
    </motion.div>
  )
}
