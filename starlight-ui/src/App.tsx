import { Route, Routes } from "react-router-dom";
import "./App.css";
import { authRoutes, unAuthRoutes } from "./routes";
import { RequireAuth, useAuth } from "./hooks/auth-context";
import { useEffect } from "react";
import AppShell from "./components/page-layout";

function App() {
  const { setCurrentUser } = useAuth();
  useEffect(() => {
    setCurrentUser();
    // eslint-disable-next-line
  }, []);
  const routeItems = authRoutes.map((route) => (
    <Route
      key={route.id} // Provide a unique key for each route
      path={route.path}
      element={<RequireAuth>{route.element}</RequireAuth>}
    />
  ));
  const aunAuthRouteItems = unAuthRoutes.map((route) => {
    const { id } = route;
    return <Route {...route} key={id} />;
  });
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={window.location.pathname === "/home" ? null : <AppShell />}
        >
          {routeItems}
          {/* Define the route for PopcodeList */}
        </Route>

        {/* {routeItems} */}
        {aunAuthRouteItems}
      </Routes>
    </>
  );
}

export default App;
