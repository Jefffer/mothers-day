import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, CircleHelp, XCircle } from 'lucide-react'

function QuizView({
  question,
  currentQuestion,
  totalQuestions,
  progress,
  selectedOption,
  hasAnswered,
  isCorrect,
  onSelectAnswer,
  onNextQuestion,
}) {
  return (
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
                  Pregunta {currentQuestion + 1} de {totalQuestions}
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
                  Cuestionario para la mamita más linda
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
                      onClick={() => onSelectAnswer(optionIndex)}
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
                        Muy bien mami! 🥰
                      </>
                    ) : (
                      <>
                        <XCircle size={20} />
                        ¡Casi! 🙈
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
                onClick={onNextQuestion}
                disabled={!hasAnswered}
                className="w-full rounded-full bg-[#ff8a5c] px-6 py-3 text-base font-extrabold text-white transition hover:bg-[#f27545] disabled:cursor-not-allowed disabled:bg-[#ffc2ab]"
              >
                {currentQuestion < totalQuestions - 1 ? 'Siguiente pregunta' : 'Ver premio final'}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export default QuizView
