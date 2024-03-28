import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import RoadMap from "./pages/roadmap";
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
    id: "userprofile",
    element: <RoadMap />,
    breadcrumbName: "Home",
  },
  // {
  //     path: "/",
  //     element: <Dashboard />,
  //     breadcrumbName: "Home",
  // },
];

export const unAuthRoutes = [
  {
    path: "/login",
    id: "login",
    element: <Login />,
  },
];
