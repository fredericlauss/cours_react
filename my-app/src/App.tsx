import { Link, Route, Routes } from 'react-router';
import './App.css'
import { Game } from './components/game';
import { CGU } from './components/CGU';

function App() {

  return (
    <div className="app">
      <nav>
        <Link to="/">Accueil</Link> | <Link to="/cgu">CGU</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/cgu" element={<CGU />} />
      </Routes>
    </div>
  );
}


export default App;
