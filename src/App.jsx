import { useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import HomeView from './components/HomeView'
import QuizView from './components/QuizView'
import ResultView from './components/ResultView'
import { questions } from './data/questions'

function App() {
  const [view, setView] = useState('home')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [score, setScore] = useState(0)

  const totalQuestions = questions.length
  const question = questions[currentQuestion]
  const selectedOption = answers[currentQuestion]
  const hasAnswered = selectedOption !== undefined
  const isCorrect = selectedOption === question?.correctIndex
  const progress = Math.round((currentQuestion / totalQuestions) * 100)

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
    if (currentQuestion < totalQuestions - 1) {
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
          {view === 'home' && <HomeView onStartQuiz={startQuiz} />}

          {view === 'quiz' && (
            <QuizView
              question={question}
              currentQuestion={currentQuestion}
              totalQuestions={totalQuestions}
              progress={progress}
              selectedOption={selectedOption}
              hasAnswered={hasAnswered}
              isCorrect={isCorrect}
              onSelectAnswer={selectAnswer}
              onNextQuestion={nextQuestion}
            />
          )}

          {view === 'result' && (
            <ResultView
              score={score}
              totalQuestions={totalQuestions}
              scoreMessage={scoreMessage}
              onRestart={restartQuiz}
            />
          )}
        </AnimatePresence>
      </section>
    </main>
  )
}

export default App

