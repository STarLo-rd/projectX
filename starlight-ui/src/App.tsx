import { Route, Routes } from 'react-router-dom';
import './App.css'
import { authRoutes, unAuthRoutes } from './routes'
import { RequireAuth } from './hooks/auth-context';


function App() {


  const routeItems = authRoutes.map((route) => (
    <Route
      key={route.id} // Provide a unique key for each route
      path={route.path}
      element={
        <RequireAuth>
          {route.element}
        </RequireAuth>
      }
    />
  ));
  const aunAuthRouteItems = unAuthRoutes.map((route) => {
    const { id } = route;
    return <Route {...route} key={id} />;
  });
  return (
    <>
      <Routes>
        {routeItems}
        {aunAuthRouteItems}
      </Routes>
    </>
  )
}

export default App
