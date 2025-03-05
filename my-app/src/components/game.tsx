import { useState } from 'react';
import { Hero } from './hero';
import './Game.css';

export function Game() {
  const [money, setMoney] = useState(0);

  const handleHeroComplete = () => {
    setMoney(prev => prev + 1);
  };

  return (
    <div className="game">
      <div className="money-display">
        💰 {money} pièces
      </div>
      <Hero onProgressComplete={handleHeroComplete} />
    </div>
  );
}