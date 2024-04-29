import Home from "./components/HomePage";
import Dashboard from "./pages/dashboard";
import ExplainTopic from "./pages/explain-topic";
import Login from "./pages/login";
import News from "./pages/news";
import Roadmaps from "./pages/roadmap";
import SignUp from "./pages/signup";
import UserProfileForm from "./pages/user-profile/userprofile-form";

export const authRoutes = [
  {
    path: "/",
    id: "dashboard",
    element: <Dashboard />,
    breadcrumbName: "Home",
  },
  {
    path: "/userprofile",
    id: "userprofile",
    element: <UserProfileForm />,
    breadcrumbName: "Home",
  },
  {
    path: "/roadmap",
    id: "roadmap",
    element: <Roadmaps />,
    breadcrumbName: "Home",
  },
  {
    path: "/news",
    id: "news",
    element: <News />,
    breadcrumbName: "News",
  },
  {
    path: "/explain-topic",
    id: "news",
    element: <ExplainTopic />,
    breadcrumbName: "explain-topic",
  },
];

export const unAuthRoutes = [
  {
    path: "/login",
    id: "login",
    element: <Login />,
  },
  {
    path: "/signup",
    id: "signup",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <Home />,
    breadcrumbName: "Home",
  },
];
