import { useState } from 'react'
import { Stopwatch } from './components/Stopwatch'
import './App.css'

const TITLE = 'Chronomètre';

function App() {
  const [isStopwatchPaused, setIsStopwatchPaused] = useState<boolean>(false);

  const stopwatchStatus = isStopwatchPaused ? 'En pause' : 'En marche';

  return (
    <div className="app">
      <h1>{TITLE}</h1>
      <Stopwatch onPauseChange={setIsStopwatchPaused} />
      <p aria-live="polite">
        État du chronomètre : {stopwatchStatus}
      </p>
    </div>
  );
}

export default App;
