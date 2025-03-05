import { useState } from 'react'
import { Stopwatch } from './components/Stopwatch'
import './App.css'

function App() {
  const [isStopwatchPaused, setIsStopwatchPaused] = useState(false);

  return (
    <>
      <h1>Chronomètre</h1>
      <Stopwatch onPauseChange={setIsStopwatchPaused} />
      <p>
        État du chronomètre : {isStopwatchPaused ? 'En pause' : 'En marche'}
      </p>
    </>
  )
}

export default App
