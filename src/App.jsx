import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  CheckCircle2,
  CircleHelp,
  Gift,
  Heart,
  MapPinned,
  Sparkles,
  XCircle,
} from 'lucide-react'

const travelSpots = [
  {
    name: 'Guatape',
    description: 'Calles coloridas, embalse y vistas inolvidables.',
    image:
      'https://images.unsplash.com/photo-1576020799627-aeac74d58064?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Comuna 13',
    description: 'Arte urbano, musica, historia y energia local.',
    image:
      'https://images.unsplash.com/photo-1708633623355-89f8f2ec6a92?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Piedra del Penol',
    description: 'Una panoramica espectacular para celebrar en familia.',
    image:
      'https://images.unsplash.com/photo-1662908904604-1c5ab63f8337?auto=format&fit=crop&w=900&q=80',
  },
]

const questions = [
  {
    question: '1. Como se llama el sistema de telefericos urbano de Medellin?',
    options: ['Metroplus', 'Metrocable', 'Tranvia Verde', 'Aero Metro'],
    correctIndex: 1,
    explanation:
      'El Metrocable conecta varios barrios de ladera con el sistema integrado de transporte.',
  },
  {
    question: '2. En que plaza se encuentran las famosas esculturas de Fernando Botero?',
    options: ['Parque Berrio', 'Plaza Botero', 'Parque de los Deseos', 'Plaza Mayor'],
    correctIndex: 1,
    explanation:
      'La Plaza Botero exhibe esculturas monumentales del artista antioqueno y es un punto turistico clave.',
  },
  {
    question: '3. La Piedra del Penol se encuentra cerca de que municipio?',
    options: ['Jardin', 'Guatape', 'Sabaneta', 'Santa Elena'],
    correctIndex: 1,
    explanation:
      'La Piedra del Penol esta entre El Penol y Guatape, una excursion clasica desde Medellin.',
  },
  {
    question: '4. En que lugar esta el tradicional Pueblito Paisa?',
    options: ['Cerro Nutibara', 'Parque Arvi', 'Cerro El Volador', 'Envigado'],
    correctIndex: 0,
    explanation:
      'El Pueblito Paisa se ubica en el Cerro Nutibara y representa una plaza tipica antioquena.',
  },
  {
    question: '5. Cual es la feria mas emblematicamente floral de Medellin?',
    options: ['Feria de la Cosecha', 'Feria de las Flores', 'Fiesta del Sol', 'Carnaval Paisa'],
    correctIndex: 1,
    explanation:
      'La Feria de las Flores es una celebracion iconica con silleteros, musica y desfiles.',
  },
  {
    question: '6. Santa Fe de Antioquia es famosa, entre otras cosas, por:',
    options: [
      'El Puente de Occidente',
      'Las escaleras electricas',
      'La Plaza Botero',
      'El Tranvia de Ayacucho',
    ],
    correctIndex: 0,
    explanation:
      'El Puente de Occidente es una obra historica y uno de los simbolos de Santa Fe de Antioquia.',
  },
  {
    question: '7. Que corregimiento de Medellin es conocido por sus flores y fincas?',
    options: ['San Cristobal', 'Santa Elena', 'Palmitas', 'Altavista'],
    correctIndex: 1,
    explanation:
      'Santa Elena destaca por su tradicion silletera y paisajes naturales muy visitados.',
  },
  {
    question: '8. En que zona estan las escaleras electricas al aire libre mas famosas?',
    options: ['Laureles', 'Comuna 13', 'Belen', 'El Poblado'],
    correctIndex: 1,
    explanation:
      'En Comuna 13 las escaleras electricas se volvieron simbolo de transformacion social y turismo.',
  },
  {
    question: '9. El Parque Arvi puede visitarse facilmente usando:',
    options: ['Un ferry', 'El Metrocable', 'Un tranvia maritimo', 'Un monorriel'],
    correctIndex: 1,
    explanation:
      'Una de las formas mas especiales de llegar al Parque Arvi es en Metrocable.',
  },
  {
    question: '10. Cual de estos platos es un clasico antioqueno?',
    options: ['Ajiaco santafereno', 'Bandeja paisa', 'Lechona tolimense', 'Changua'],
    correctIndex: 1,
    explanation:
      'La bandeja paisa es una preparacion representativa de Antioquia y su cultura gastronomica.',
  },
]

function App() {
  const [view, setView] = useState('home')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [score, setScore] = useState(0)

  const question = questions[currentQuestion]
  const selectedOption = answers[currentQuestion]
  const hasAnswered = selectedOption !== undefined
  const isCorrect = selectedOption === question?.correctIndex
  const progress = Math.round((currentQuestion / questions.length) * 100)

  const scoreMessage = useMemo(() => {
    if (score >= 9) {
      return 'Eres una experta total. Medellin ya te espera con aplausos.'
    }
    if (score >= 7) {
      return 'Lo hiciste increible. Tienes muy buen ojo viajero.'
    }
    if (score >= 5) {
      return 'Muy bien. Ya tienes una excelente base para disfrutar el viaje.'
    }
    return 'Cada respuesta fue una pista bonita del destino. Lo importante: vamos a viajar.'
  }, [score])

  const startQuiz = () => {
    setView('quiz')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const selectAnswer = (optionIndex) => {
    if (hasAnswered) return

    setAnswers((previous) => {
      const updated = [...previous]
      updated[currentQuestion] = optionIndex
      return updated
    })

    if (optionIndex === question.correctIndex) {
      setScore((previous) => previous + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1)
      return
    }

    setView('result')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setScore(0)
    setView('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-8">
      <div className="pointer-events-none absolute inset-0 pattern-bg" />
      <div className="pointer-events-none absolute -left-24 top-4 h-64 w-64 rounded-full bg-[#ffd7cc] blur-3xl animate-float" />
      <div className="pointer-events-none absolute -right-20 top-56 h-72 w-72 rounded-full bg-[#ffeeb3] blur-3xl animate-float-delay" />

      <section className="relative mx-auto w-full max-w-5xl rounded-[2rem] border border-[#ffffffa6] bg-white/75 p-5 shadow-[0_20px_80px_-30px_rgba(140,58,38,0.35)] backdrop-blur-md sm:p-10">
        <AnimatePresence mode="wait">
          {view === 'home' && (
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

                  <h1 className="font-display text-4xl leading-tight text-[#4d2d1f] sm:text-5xl">
                    Feliz Dia de la Madre
                  </h1>

                  <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#6c4b3d]">
                    Este detalle fue hecho con amor por tus hijos. Queremos
                    regalarte sonrisas, recuerdos y una aventura inolvidable.
                  </p>

                  <button
                    type="button"
                    onClick={startQuiz}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ff8a5c] px-7 py-4 text-lg font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#f1784a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff8a5c]"
                  >
                    <CircleHelp size={20} />
                    Empezar cuestionario
                  </button>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.96, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="relative mx-auto w-full max-w-sm"
                >
                  <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full border-2 border-dashed border-[#f4af8f]" />
                  <img
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80"
                    alt="Retrato de una madre sonriente"
                    className="h-[410px] w-full rounded-[1.8rem] object-cover shadow-lg"
                  />
                  <p className="absolute -bottom-4 right-4 rounded-2xl bg-white/90 px-4 py-2 text-sm font-bold text-[#6d4a3a] shadow">
                    Tu foto va aqui
                  </p>
                </motion.div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {travelSpots.map((spot, index) => (
                  <motion.article
                    key={spot.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                    className="overflow-hidden rounded-3xl border border-[#f7d4c2] bg-[#fff9f5]"
                  >
                    <img
                      src={spot.image}
                      alt={spot.name}
                      className="h-40 w-full object-cover"
                    />
                    <div className="p-4">
                      <h2 className="font-display text-2xl text-[#5d3625]">
                        {spot.name}
                      </h2>
                      <p className="mt-2 text-sm text-[#7a5b4d]">
                        {spot.description}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          )}

          {view === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <p className="inline-flex items-center gap-2 rounded-full bg-[#fff4ed] px-4 py-2 text-sm font-bold text-[#ad5939]">
                  <MapPinned size={16} />
                  Pregunta {currentQuestion + 1} de {questions.length}
                </p>
                <p className="text-sm font-bold text-[#87523f]">
                  Progreso: {progress}%
                </p>
              </div>

              <div className="mb-8 h-3 w-full overflow-hidden rounded-full bg-[#ffe2d2]">
                <motion.div
                  className="h-full bg-[#ff8d61]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={question.question}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  <h2 className="font-display text-3xl leading-tight text-[#4f2f21]">
                    {question.question}
                  </h2>

                  <div className="grid gap-3">
                    {question.options.map((option, optionIndex) => {
                      const optionIsCorrect = optionIndex === question.correctIndex
                      const optionIsSelected = optionIndex === selectedOption

                      let optionClass =
                        'border-[#f2cbb7] bg-white hover:border-[#ff9c74] hover:bg-[#fff7f3]'

                      if (hasAnswered && optionIsSelected && isCorrect) {
                        optionClass = 'border-[#5fb47a] bg-[#ebf9f0] text-[#215532]'
                      }

                      if (hasAnswered && optionIsSelected && !isCorrect) {
                        optionClass = 'border-[#d96666] bg-[#ffeef0] text-[#6b2424]'
                      }

                      if (hasAnswered && optionIsCorrect && !isCorrect) {
                        optionClass = 'border-[#5fb47a] bg-[#ebf9f0] text-[#215532]'
                      }

                      return (
                        <button
                          type="button"
                          key={option}
                          onClick={() => selectAnswer(optionIndex)}
                          className={`w-full rounded-2xl border px-5 py-4 text-left text-lg font-semibold transition ${optionClass}`}
                          disabled={hasAnswered}
                        >
                          {option}
                        </button>
                      )
                    })}
                  </div>

                  {hasAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`rounded-3xl border p-5 ${
                        isCorrect
                          ? 'border-[#8fd3a5] bg-[#effcf3] text-[#255236]'
                          : 'border-[#f2a6a6] bg-[#fff1f3] text-[#6b2b2b]'
                      }`}
                    >
                      <p className="mb-2 inline-flex items-center gap-2 text-lg font-extrabold">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 size={20} />
                            Excelente, respuesta correcta
                          </>
                        ) : (
                          <>
                            <XCircle size={20} />
                            Casi, pero no era esa
                          </>
                        )}
                      </p>

                      {!isCorrect && (
                        <p className="mb-2 font-bold">
                          Respuesta correcta: {question.options[question.correctIndex]}
                        </p>
                      )}

                      <p className="leading-relaxed">{question.explanation}</p>
                    </motion.div>
                  )}

                  <button
                    type="button"
                    onClick={nextQuestion}
                    disabled={!hasAnswered}
                    className="rounded-full bg-[#ff8a5c] px-6 py-3 text-base font-extrabold text-white transition hover:bg-[#f27545] disabled:cursor-not-allowed disabled:bg-[#ffc2ab]"
                  >
                    {currentQuestion < questions.length - 1
                      ? 'Siguiente pregunta'
                      : 'Ver premio final'}
                  </button>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {view === 'result' && (
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
                Resultado final: {score}/{questions.length}
              </p>

              <h2 className="font-display text-4xl text-[#4f2e20] sm:text-5xl">
                Premio desbloqueado
              </h2>

              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#6f4f41]">
                {scoreMessage}
              </p>

              <div className="mx-auto mt-3 max-w-2xl rounded-[2rem] border border-[#f8d6b7] bg-gradient-to-br from-[#fff9f0] to-[#ffe9d8] p-8 shadow-[0_20px_50px_-35px_rgba(170,89,45,0.5)]">
                <p className="mb-3 inline-flex items-center gap-2 text-xl font-black text-[#ae582f]">
                  <Gift size={24} />
                  Sorpresa para Elizabeth
                </p>
                <p className="text-3xl font-black text-[#6c3f2b] sm:text-4xl">
                  Nos vamos de viaje a Medellin
                </p>
                <p className="mt-4 text-base leading-relaxed text-[#7a5847] sm:text-lg">
                  Porque mereces celebrar bonito, descansar y vivir nuevas
                  experiencias. Este viaje es nuestro abrazo en forma de aventura.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={restartQuiz}
                  className="rounded-full border border-[#f2b89f] bg-white px-6 py-3 text-base font-bold text-[#8e4e37] transition hover:bg-[#fff6f1]"
                >
                  Volver al inicio
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  )
}

export default App
