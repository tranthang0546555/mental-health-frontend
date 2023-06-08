import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import InnerPage from "./components/InnerPage";
import About from "./pages/about";
import Contact from "./pages/contact";
import FAQ from "./pages/faq";
import HomePage from "./pages/home";
import News from "./pages/news";
import Login from "./pages/auth/login";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/dashboard/profile";
import Register from "./pages/auth/register";
import HeaderDashboard from "./components/Dashboard/Header";
import SidebarDashboard from "./components/Dashboard/Sidebar";
import BlankPage from "./pages/dashboard/blank";

const Root = ({ children }: { children?: React.ReactNode }) => {
  return <div className="rr">{children}</div>;
};
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      ),
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "news",
          element: (
            <InnerPage title="News">
              <News />
            </InnerPage>
          ),
        },
        {
          path: "contact",
          element: (
            <InnerPage title="Contact">
              <Contact />
            </InnerPage>
          ),
        },
        {
          path: "about",
          element: (
            <InnerPage title="About">
              <About />
            </InnerPage>
          ),
        },
        {
          path: "faq",
          element: (
            <InnerPage title="FAQ">
              <FAQ />
            </InnerPage>
          ),
        },
        {
          path: "login",
          element: (
            <InnerPage title="Login">
              <Login />
            </InnerPage>
          ),
        },
        {
          path: "register",
          element: (
            <InnerPage title="Register">
              <Register />,
            </InnerPage>
          ),
        },
      ],
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        { index: true, element: <BlankPage /> },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
