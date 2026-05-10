import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'

function HomeView({ onStartQuiz, onEasterEgg }) {
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.45 }}
      className="space-y-10"
    >
      <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#fff2e8] px-4 py-2 text-sm font-bold text-[#b14f2e]">
            <Heart size={16} />
            Para Elizabeth, con todo nuestro amor
          </p>

          <h1 className="font-display text-4xl leading-tight text-[#4d2d1f] sm:text-5xl cursor-default select-none">
            <span onDoubleClick={onEasterEgg}>
              Feliz
            </span>
            {' '}Día de la Madre
          </h1>

          <p className="mt-4 text-sm italic text-[#a65a48]">
            Hecho con todo nuestro cariño 💖 por John, Andrés y Jeffer.
          </p>

          <p className="mt-3 max-w-xl text-lg leading-relaxed text-[#5b3b2e]">
            Hay un pequeño reto por delante, pensado especialmente para ti en este Día de la
            Madre: responde con calma y sigue las pistas. Debes superar diez preguntas para
            acercarte a una sorpresa que guarda un regalo pensado para celebrar una de tus
            grandes pasiones.
          </p>

          <motion.button
            type="button"
            onClick={onStartQuiz}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ y: 0 }}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="mt-8 relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#ff8a5c] via-[#ff9c73] to-[#f06f43] px-8 py-4 text-lg font-extrabold text-white shadow-[0_14px_32px_-18px_rgba(240,111,67,0.95)] ring-1 ring-white/35 transition btn-sparkle btn-glow"
          >
            <span className="btn-beam beam-1" aria-hidden />
            <span className="btn-beam beam-2" aria-hidden />
            <span className="btn-beam beam-3" aria-hidden />

            <Sparkles size={18} />
            <span className="relative">Empezar reto</span>

            <span className="btn-sparkle-dot dot-1" aria-hidden />
            <span className="btn-sparkle-dot dot-2" aria-hidden />
            <span className="btn-sparkle-dot dot-3" aria-hidden />
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full border-2 border-dashed border-[#f4af8f]" />
          <img
            src="/1.jpg"
            alt="Elizabeth"
            className="h-[410px] w-full rounded-[1.8rem] object-cover shadow-lg"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default HomeView
