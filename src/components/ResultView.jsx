import { motion } from 'framer-motion'
import { Gift, Sparkles } from 'lucide-react'

function ResultView({ score, totalQuestions, scoreMessage, onRestart }) {
  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.45 }}
      className="space-y-6 text-center"
    >
      <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-[#fff3d7] px-4 py-2 text-sm font-bold text-[#9b6a1b]">
        <Sparkles size={16} />
        Resultado final: {score}/{totalQuestions}
      </p>

      <h2 className="font-display text-4xl text-[#4f2e20] sm:text-5xl">Premio desbloqueado</h2>

      <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#6f4f41]">{scoreMessage}</p>

      <div className="mx-auto mt-3 grid max-w-4xl gap-0 overflow-hidden rounded-[2rem] border border-[#f8d6b7] bg-gradient-to-br from-[#fff9f0] to-[#ffe9d8] shadow-[0_20px_50px_-35px_rgba(170,89,45,0.5)] lg:grid-cols-[0.96fr_1.04fr] lg:text-left">
        <div className="relative flex h-full min-h-[320px] items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.55),_rgba(255,244,228,0.92))] p-4 sm:min-h-[420px] lg:min-h-[560px]">
          <img
            src="/5.png"
            alt="Elizabeth celebrando su premio"
            className="h-full w-full rounded-[1.5rem] object-contain shadow-[0_18px_40px_-30px_rgba(0,0,0,0.45)]"
          />
          <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-white/35" />
          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.22em] text-[#8b4a31] shadow-sm">
            <Gift size={14} />
            Premio final
          </div>
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <p className="mb-3 inline-flex items-center gap-2 text-xl font-black text-[#ae582f]">
            <Gift size={24} />
            Sorpresa para la mamita más linda
          </p>
          <p className="text-3xl font-black text-[#6c3f2b] sm:text-4xl">
            Te espera un viaje hecho con mucho amor 💖
          </p>

          <p className="mt-4 text-base leading-relaxed text-[#7a5847] sm:text-lg">
            Porque mereces celebrar bonito, descansar y sentirte muy querida. Este detalle es
            un abrazo largo, una sonrisa tranquila y una aventura pensada solo para ti.
          </p>

          <p className="mt-5 inline-block rounded-lg bg-[#fff4ed] px-4 py-3 text-lg font-extrabold text-[#9b4a2f] shadow-sm">
            Te has ganado un increible Tour a Medellín con visita a la Piedra del Peñol y un
            día mágico en Guatapé. Te espera una gran aventura!
          </p>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onRestart}
          className="rounded-full border border-[#f2b89f] bg-white px-6 py-3 text-base font-bold text-[#8e4e37] transition hover:bg-[#fff6f1]"
        >
          Volver al inicio
        </button>
      </div>
    </motion.div>
  )
}

export default ResultView
