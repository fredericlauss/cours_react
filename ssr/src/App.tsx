import { Link, Route, Routes } from 'react-router-dom';
import { Game } from './pages/components/game';
import { CGU } from './pages/components/CGU';

const routes = [
  {
    name: 'Home',
    path: '/',
    component: () => {
      return (
        <div className="app">
          <Game />
        </div>
      );
    }
  },
  {
    name: 'CGU',
    path: '/cgu',
    component: CGU
  }
];

export function App() {
  return (
    <>
      <nav>
        <ul>
          {routes.map(({ name, path }) => {
            return (
              <li key={path}>
                <Link to={path}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <Routes>
        {routes.map(({ path, component: RouteComp }) => {
          return <Route key={path} path={path} element={<RouteComp />} />;
        })}
      </Routes>
    </>
  );
}