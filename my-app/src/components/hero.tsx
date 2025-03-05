import './Hero.css';

interface HeroProps {
  type: string;
}

export function Hero({ type }: HeroProps) {
  return (
    <div className="hero">
      <div className="unit-type">{type}</div>
    </div>
  );
}