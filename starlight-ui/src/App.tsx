import { Route, Routes } from 'react-router-dom';
import './App.css'
import { authRoutes, unAuthRoutes } from './routes'
import { RequireAuth } from './hooks/auth-context';
import PageLayout from './components/page-layout';

function App() {

  const routeItems = authRoutes.map(route => {
    const { id } = route;
    return <Route {...route} id={id} />
  })
  const aunAuthRouteItems = unAuthRoutes.map((route) => {
    const { id } = route;
    return <Route {...route} key={id} />;
  });
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <PageLayout />
            </RequireAuth>
          }
        >
          {routeItems}
        </Route>
        {aunAuthRouteItems}
      </Routes>
    </>
  )
}

export default App
