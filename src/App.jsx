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
    question: '1. Como se llama el sistema de telefericos urbano de Medellin?',
    image:
      'https://medellin-tours.com/wp-content/uploads/2023/07/image3.jpg',
    imageAlt: 'Cabinas del teleferico sobre Medellin',
    options: ['Metrocable', 'Metroplus', 'Tranvia Verde', 'Aero Metro'],
    correctIndex: 0,
    explanation:
      'El Metrocable conecta varios barrios de ladera con el sistema integrado de transporte.',
  },
  {
    question: '2. En que plaza se encuentran las famosas esculturas de Fernando Botero?',
    image:
      'https://blog.wynwood-house.com/hubfs/plaza-botero-como-llegar.jpg',
    imageAlt: 'Esculturas y plaza en el centro de Medellin',
    options: ['Parque Berrio', 'Parque de los Deseos', 'Plaza Botero', 'Plaza Mayor'],
    correctIndex: 2,
    explanation:
      'La Plaza Botero exhibe esculturas monumentales del artista antioqueño y es un punto turistico clave.',
  },
  {
    question: '3. La Piedra del Penol se encuentra cerca de que municipio?',
    image:
      'https://www.viajesyfotografia.com/wp-content/uploads/2018/02/guatape-13h31m28s136.jpg',
    imageAlt: 'La Piedra del Penol y el embalse alrededor',
    options: ['Jardin', 'Santa Elena', 'Guatape', 'Sabaneta'],
    correctIndex: 2,
    explanation:
      'La Piedra del Penol esta entre El Penol y Guatape, una excursion clasica desde Medellin.',
  },
  {
    question: '4. En que lugar esta el tradicional Pueblito Paisa?',
    image:
      'https://imagenes2.eltiempo.com/files/og_thumbnail/uploads/2022/04/06/624db3d2d6035.jpeg',
    imageAlt: 'Vista del Pueblito Paisa en el cerro',
    options: ['Parque Arvi', 'Cerro El Volador', 'Envigado', 'Cerro Nutibara'],
    correctIndex: 3,
    explanation:
      'El Pueblito Paisa se ubica en el Cerro Nutibara y representa una plaza tipica antioqueña.',
  },
  {
    question: '5. Cual es la feria mas emblematicamente floral de Medellin?',
    image:
      'https://colombia.travel/sites/default/files/inline-images/FFDS021%20Cortes%C3%ADa%20Bureau%20de%20Medell%C3%ADn%2C%20Medell%C3%ADn_opt_opt.jpg',
    imageAlt: 'Flores y ambiente festivo de la feria',
    options: ['Feria de la Cosecha', 'Fiesta del Sol', 'Feria de las Flores', 'Carnaval Paisa'],
    correctIndex: 2,
    explanation:
      'La Feria de las Flores es una celebracion iconica con silleteros, musica y desfiles.',
  },
  {
    question: '6. Santa Fe de Antioquia es famosa, entre otras cosas, por:',
    image:
      'https://realcitytours.com/wp-content/uploads/2024/09/Santa-Fe-de-Antioquia-scaled-1.jpg',
    imageAlt: 'Puente historico en Santa Fe de Antioquia',
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
    image:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/5d/d6/a7/caption.jpg?w=500&h=400&s=1',
    imageAlt: 'Paisaje rural con flores y montanas',
    options: ['San Cristobal', 'Palmitas', 'Altavista', 'Santa Elena'],
    correctIndex: 3,
    explanation:
      'Santa Elena destaca por su tradicion silletera y paisajes naturales muy visitados.',
  },
  {
    question: '8. En que zona estan las escaleras electricas al aire libre mas famosas?',
    image:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/6c/a5/ef/ven-y-dejate-contar-la.jpg?w=900&h=500&s=1',
    imageAlt: 'Escaleras electricas y murales coloridos en Comuna 13',
    options: ['Laureles', 'Comuna 13', 'Belen', 'El Poblado'],
    correctIndex: 1,
    explanation:
      'En Comuna 13 las escaleras electricas se volvieron simbolo de transformacion social y turismo.',
  },
  {
    question: '9. El Parque Arvi puede visitarse facilmente usando:',
    image:
      'https://www.semana.com/resizer/v2/4V3JJQKWYJGTRADFWGPYHPOCH4.jpg?auth=f8c98116caab4e67f0b9338751b204ff0c4502498792e047108dbe91cde7de24&smart=true&quality=75&width=1920&height=1080',
    imageAlt: 'Teleferico avanzando hacia una zona montañosa',
    options: ['Un ferry', 'Un monorriel', 'El Metrocable', 'Un tranvia maritimo'],
    correctIndex: 2,
    explanation:
      'Una de las formas mas especiales de llegar al Parque Arvi es en Metrocable.',
  },
  {
    question: '10. Cual de estos platos es un clasico antioqueno?',
    image:
      'https://recetasdecocina.elmundo.es/wp-content/uploads/2025/05/bandeja-paisa-1024x683.jpg',
    imageAlt: 'Mesa con comida tradicional colombiana',
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
      return 'Eres un amor de persona y una experta total. Medellin ya te espera con abrazo incluido.'
    }
    if (score >= 7) {
      return 'Lo hiciste increíble. Tienes un corazón curioso y un encanto viajero precioso.'
    }
    if (score >= 5) {
      return 'Muy bien. Ya tienes una base hermosa para disfrutar el viaje y sonreir mucho.'
    }
    return 'Cada respuesta fue una pista bonita. Lo mas importante es que este viaje ya esta lleno de cariño.'
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
                    Hecho con amor por Andrés, John y Jeffer. Debes
                    completar un cuestionario para ganarte un premio sorpresa.
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
                                Opcion {String.fromCharCode(65 + optionIndex)}
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
                                Muy bien mami
                              </>
                            ) : (
                              <>
                                <XCircle size={20} />
                                Casi, jaja
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

              <div className="mx-auto mt-3 max-w-2xl rounded-[2rem] border border-[#f8d6b7] bg-gradient-to-br from-[#fff9f0] to-[#ffe9d8] p-8 shadow-[0_20px_50px_-35px_rgba(170,89,45,0.5)]">
                <p className="mb-3 inline-flex items-center gap-2 text-xl font-black text-[#ae582f]">
                  <Gift size={24} />
                  Sorpresa para Elizabeth
                </p>
                <p className="text-3xl font-black text-[#6c3f2b] sm:text-4xl">
                  Te espera un viaje hecho con mucho amor
                </p>
                <p className="mt-4 text-base leading-relaxed text-[#7a5847] sm:text-lg">
                  Porque mereces celebrar bonito, descansar y sentirte muy querida.
                  Este detalle es un abrazo largo, una sonrisa tranquila y una aventura
                  pensada solo para ti.
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
