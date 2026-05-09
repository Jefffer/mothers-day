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

const questions = [
  {
    question: '1. ¿Cómo se llama el sistema de teleféricos urbano de Medellín?',
    image:
      'https://medellin-tours.com/wp-content/uploads/2023/07/image3.jpg',
    imageAlt: 'Cabinas del teleférico sobre Medellín',
    options: ['Metrocable', 'Metroplus', 'Tranvía Verde', 'Aero Metro'],
    correctIndex: 0,
    explanation:
      'El Metrocable conecta varios barrios de ladera con el sistema integrado de transporte.',
  },
  {
    question: '2. ¿En qué plaza se encuentran las famosas esculturas de Fernando Botero?',
    image:
      'https://blog.wynwood-house.com/hubfs/plaza-botero-como-llegar.jpg',
    imageAlt: 'Esculturas y plaza en el centro de Medellín',
    options: ['Parque Berrío', 'Parque de los Deseos', 'Plaza Botero', 'Plaza Mayor'],
    correctIndex: 2,
    explanation:
      'La Plaza Botero exhibe esculturas monumentales del artista antioqueño y es un punto turístico clave.',
  },
  {
    question: '3. ¿La Piedra del Peñol se encuentra cerca de qué municipio?',
    image:
      'https://www.viajesyfotografia.com/wp-content/uploads/2018/02/guatape-13h31m28s136.jpg',
    imageAlt: 'La Piedra del Peñol y el embalse alrededor',
    options: ['Jardín', 'Santa Elena', 'Guatapé', 'Sabaneta'],
    correctIndex: 2,
    explanation:
      'La Piedra del Peñol está entre El Peñol y Guatapé, una excursión clásica desde Medellín.',
  },
  {
    question: '4. ¿En qué lugar está el tradicional Pueblito Paisa?',
    image:
      'https://imagenes2.eltiempo.com/files/og_thumbnail/uploads/2022/04/06/624db3d2d6035.jpeg',
    imageAlt: 'Vista del Pueblito Paisa en el cerro',
    options: ['Parque Arví', 'Cerro El Volador', 'Envigado', 'Cerro Nutibara'],
    correctIndex: 3,
    explanation:
      'El Pueblito Paisa se ubica en el Cerro Nutibara y representa una plaza típica antioqueña.',
  },
  {
    question: '5. ¿Cuál es la feria más emblemática y floral de Medellín?',
    image:
      'https://colombia.travel/sites/default/files/inline-images/FFDS021%20Cortes%C3%ADa%20Bureau%20de%20Medell%C3%ADn%2C%20Medell%C3%ADn_opt_opt.jpg',
    imageAlt: 'Flores y ambiente festivo de la feria',
    options: ['Feria de la Cosecha', 'Fiesta del Sol', 'Feria de las Flores', 'Carnaval Paisa'],
    correctIndex: 2,
    explanation:
      'La Feria de las Flores es una celebración icónica con silleteros, música y desfiles.',
  },
  {
    question: '6. Santa Fe de Antioquia es famosa, entre otras cosas, por:',
    image:
      'https://realcitytours.com/wp-content/uploads/2024/09/Santa-Fe-de-Antioquia-scaled-1.jpg',
    imageAlt: 'Puente histórico en Santa Fe de Antioquia',
    options: [
      'El Puente de Occidente',
      'Las escaleras eléctricas',
      'La Plaza Botero',
      'El Tranvía de Ayacucho',
    ],
    correctIndex: 0,
    explanation:
      'El Puente de Occidente es una obra histórica y uno de los símbolos de Santa Fe de Antioquia.',
  },
  {
    question: '7. ¿Qué corregimiento de Medellín es conocido por sus flores y fincas?',
    image:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/5d/d6/a7/caption.jpg?w=500&h=400&s=1',
    imageAlt: 'Paisaje rural con flores y montañas',
    options: ['San Cristóbal', 'Palmitas', 'Altavista', 'Santa Elena'],
    correctIndex: 3,
    explanation:
      'Santa Elena destaca por su tradición silletera y paisajes naturales muy visitados.',
  },
  {
    question: '8. ¿En qué zona están las escaleras eléctricas al aire libre más famosas?',
    image:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/6c/a5/ef/ven-y-dejate-contar-la.jpg?w=900&h=500&s=1',
    imageAlt: 'Escaleras eléctricas y murales coloridos en la Comuna 13',
    options: ['Laureles', 'Comuna 13', 'Belén', 'El Poblado'],
    correctIndex: 1,
    explanation:
      'En la Comuna 13 las escaleras eléctricas se volvieron símbolo de transformación social y turismo.',
  },
  {
    question: '9. ¿El Parque Arví puede visitarse fácilmente usando el Metrocable?',
    image:
      'https://www.semana.com/resizer/v2/4V3JJQKWYJGTRADFWGPYHPOCH4.jpg?auth=f8c98116caab4e67f0b9338751b204ff0c4502498792e047108dbe91cde7de24&smart=true&quality=75&width=1920&height=1080',
    imageAlt: 'Teleférico avanzando hacia una zona montañosa',
    options: ['Un ferry', 'Un monorriel', 'El Metrocable', 'Un tranvía marítimo'],
    correctIndex: 2,
    explanation:
      'Una de las formas más especiales de llegar al Parque Arví es en Metrocable.',
  },
  {
    question: '10. ¿Cuál de estos platos es un clásico antioqueño?',
    image:
      'https://recetasdecocina.elmundo.es/wp-content/uploads/2025/05/bandeja-paisa-1024x683.jpg',
    imageAlt: 'Mesa con comida tradicional colombiana',
    options: ['Ajiaco santafereño', 'Bandeja paisa', 'Lechona tolimense', 'Changua'],
    correctIndex: 1,
    explanation:
      'La bandeja paisa es una preparación representativa de Antioquia y su cultura gastronómica.',
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
      return 'Eres un amor de persona y una experta total. Medellín ya te espera con abrazo incluido.'
    }
    if (score >= 7) {
      return 'Lo hiciste increíble. Tienes un corazón curioso y un encanto viajero precioso.'
    }
    if (score >= 5) {
      return 'Muy bien. Ya tienes una base hermosa para disfrutar el viaje y sonreír mucho.'
    }
    return 'Cada respuesta fue una pista bonita. Lo más importante es que este viaje ya está lleno de cariño.'
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
                    Feliz Día de la Madre
                  </h1>

                  <p className="mt-4 text-sm italic text-[#a65a48]">
                    Hecho con todo nuestro cariño 💖 por John, Andrés y Jeffer.
                  </p>

                  <p className="mt-3 max-w-xl text-lg leading-relaxed text-[#5b3b2e]">
                    Hay un pequeño reto por delante, pensado especialmente para
                    ti en este Día de la Madre: responde con calma y sigue las
                    pistas. Debes superar diez preguntas para acercarte a una
                    sorpresa que guarda un regalo pensado para
                    celebrar una de tus grandes pasiones.
                  </p>

                  <button
                    type="button"
                    onClick={startQuiz}
                    className="mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#ff8a5c] via-[#ff9c73] to-[#f06f43] px-8 py-4 text-lg font-extrabold text-white shadow-[0_14px_32px_-18px_rgba(240,111,67,0.95)] ring-1 ring-white/35 transition hover:-translate-y-0.5 hover:shadow-[0_18px_38px_-18px_rgba(240,111,67,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff8a5c]"
                  >
                    <Sparkles size={20} />
                    Empezar reto
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
                    src="/1.jpg"
                    alt="Elizabeth"
                    className="h-[410px] w-full rounded-[1.8rem] object-cover shadow-lg"
                  />
                </motion.div>
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
              <AnimatePresence mode="wait">
                <motion.div
                  key={question.question}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden rounded-[2rem] border border-[#f5d0bf] bg-white/85 shadow-[0_20px_60px_-35px_rgba(138,73,45,0.45)]"
                >
                  <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
                    <div className="relative h-[270px] overflow-hidden sm:h-[320px] lg:h-[560px]">
                      <img
                        src={question.image}
                        alt={question.imageAlt}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#45261d]/55 via-[#45261d]/10 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 rounded-[1.35rem] border border-white/30 bg-[#fffaf5]/92 p-4 shadow-[0_12px_30px_-20px_rgba(0,0,0,0.45)] backdrop-blur-md">
                        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#9d614b]">
                          Pregunta {currentQuestion + 1} de {questions.length}
                        </p>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#ffe1d0]">
                          <motion.div
                            className="h-full rounded-full bg-[#ff8d61]"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-5 p-5 sm:p-7 lg:flex lg:flex-col lg:justify-center">
                      <div className="space-y-3">
                        <p className="inline-flex items-center gap-2 rounded-full bg-[#fff4ed] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-[#ad5939]">
                          <CircleHelp size={14} />
                          Cuestionario de Elizabeth
                        </p>

                        <h2 className="font-display text-3xl leading-tight text-[#4f2f21] sm:text-[2.15rem]">
                          {question.question}
                        </h2>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {question.options.map((option, optionIndex) => {
                          const optionIsCorrect = optionIndex === question.correctIndex
                          const optionIsSelected = optionIndex === selectedOption

                          let optionClass =
                            'border-[#f2cbb7] bg-white/95 hover:border-[#ff9c74] hover:bg-[#fff7f3]'

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
                              className={`min-h-[74px] w-full rounded-[1.35rem] border px-4 py-4 text-left text-base font-semibold leading-snug transition sm:text-[1.05rem] ${optionClass}`}
                              disabled={hasAnswered}
                            >
                              <span className="block text-sm font-extrabold uppercase tracking-[0.18em] text-[#b87456]">
                                Opción {String.fromCharCode(65 + optionIndex)}
                              </span>
                              <span className="mt-1 block">{option}</span>
                            </button>
                          )
                        })}
                      </div>

                      {hasAnswered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`rounded-[1.5rem] border p-5 ${
                            isCorrect
                              ? 'border-[#8fd3a5] bg-[#effcf3] text-[#255236]'
                              : 'border-[#f2a6a6] bg-[#fff1f3] text-[#6b2b2b]'
                          }`}
                        >
                          <p className="mb-2 inline-flex items-center gap-2 text-lg font-extrabold">
                            {isCorrect ? (
                              <>
                                <CheckCircle2 size={20} />
                                Muy bien, mami
                              </>
                            ) : (
                              <>
                                <XCircle size={20} />
                                Casi, jajá
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
                        className="w-full rounded-full bg-[#ff8a5c] px-6 py-3 text-base font-extrabold text-white transition hover:bg-[#f27545] disabled:cursor-not-allowed disabled:bg-[#ffc2ab]"
                      >
                        {currentQuestion < questions.length - 1
                          ? 'Siguiente pregunta'
                          : 'Ver premio final'}
                      </button>
                    </div>
                  </div>
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

              <div className="mx-auto mt-3 grid max-w-4xl gap-0 overflow-hidden rounded-[2rem] border border-[#f8d6b7] bg-gradient-to-br from-[#fff9f0] to-[#ffe9d8] shadow-[0_20px_50px_-35px_rgba(170,89,45,0.5)] lg:grid-cols-[0.96fr_1.04fr] lg:text-left">
                <div className="relative flex h-full min-h-[320px] items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.55),_rgba(255,244,228,0.92))] p-4 sm:min-h-[420px] lg:min-h-[560px]">
                  <img
                    src="/3.png"
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
                  <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-extrabold uppercase tracking-[0.22em] text-[#9d614b]">
                    Para Elizabeth, con amor
                  </p>
                  <p className="mb-3 inline-flex items-center gap-2 text-xl font-black text-[#ae582f]">
                    <Gift size={24} />
                    Sorpresa para Elizabeth
                  </p>
                  <p className="text-3xl font-black text-[#6c3f2b] sm:text-4xl">
                    Te espera un viaje hecho con mucho amor 💖
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-[#7a5847] sm:text-lg">
                    Porque mereces celebrar bonito, descansar y sentirte muy querida.
                    Este detalle es un abrazo largo, una sonrisa tranquila y una aventura
                    pensada solo para ti.
                  </p>
                </div>
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
