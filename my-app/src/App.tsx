import './App.css'
import { Hero } from './components/hero';

const TITLE = 'Chronomètre';

function App() {
  const handleProgressComplete = () => {
    console.log('Progress completed!');
  };

  return (
    <div className="app">
      <h1>{TITLE}</h1>
      <Hero onProgressComplete={handleProgressComplete} />
    </div>
  );
}

export default App;
