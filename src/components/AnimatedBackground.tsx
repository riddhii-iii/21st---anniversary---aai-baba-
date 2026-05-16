import { motion } from 'framer-motion'

const particles = Array.from({ length: 18 }, (_, index) => ({
  left: `${(index * 17) % 96}%`,
  top: `${12 + ((index * 23) % 76)}%`,
  delay: index * 0.35,
  duration: 8 + (index % 5),
}))

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(197,166,126,0.15),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(248,240,229,0.16),_transparent_24%),radial-gradient(circle_at_20%_82%,_rgba(220,0,0,0.12),_transparent_28%)]"
        animate={{ opacity: [0.82, 1, 0.9] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: 'mirror' }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,4,5,0.34),rgba(45,0,0,0.88))] mix-blend-overlay" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22140%22 height=%22140%22 viewBox=%220 0 140 140%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22140%22 height=%22140%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')] opacity-[0.08] mix-blend-screen" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,240,229,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(248,240,229,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute h-1 w-1 rounded-full bg-beige-300/40 shadow-[0_0_18px_rgba(248,240,229,0.36)]"
          style={{ left: particle.left, top: particle.top }}
          animate={{ opacity: [0, 0.75, 0], y: [0, -42, -84] }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
