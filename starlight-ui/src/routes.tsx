import Dashboard from "./pages/dashboard";
import Login from "./pages/login";

export const authRoutes = [
    {
        path: "/",
        id: "dashboard",
        element: <Dashboard />,
        breadcrumbName: "Home",
    },
    // {
    //     path: "/",
    //     element: <Dashboard />,
    //     breadcrumbName: "Home",
    // },
    // {
    //     path: "/",
    //     element: <Dashboard />,
    //     breadcrumbName: "Home",
    // },
]

export const unAuthRoutes = [
    {
        path: "/login",
        id: "login",
        element: <Login />
    }
]