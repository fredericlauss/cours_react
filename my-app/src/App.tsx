import { Link, Route, Routes } from 'react-router';
import { useTranslation } from 'react-i18next';
import './App.css'
import { Game } from './components/game';
import { CGU } from './components/CGU';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="app">
      <nav>
        <Link to="/">{t('nav.home')}</Link> | <Link to="/cgu">{t('nav.terms')}</Link>
        <div className="language-switcher">
          <button onClick={() => changeLanguage('fr')}>🇫🇷 FR</button>
          <button onClick={() => changeLanguage('en')}>🇬🇧 EN</button>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/cgu" element={<CGU />} />
      </Routes>
    </div>
  );
}

export default App;
