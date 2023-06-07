import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import InnerPage from "./components/InnerPage";
import About from "./pages/about";
import Contact from "./pages/contact";
import FAQ from "./pages/faq";
import HomePage from "./pages/home";
import News from "./pages/news";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      id: "Home",
    },
    {
      path: "/contact",
      element: (
        <InnerPage title="Contact">
          <Contact />
        </InnerPage>
      ),
      id: "Contact",
    },
    {
      path: "/faq",
      element: (
        <InnerPage title="FAQ">
          <FAQ />
        </InnerPage>
      ),
    },
    {
      path: "/about",
      element: (
        <InnerPage title="About">
          <About />
        </InnerPage>
      ),
    },
    {
      path: "/news",
      element: (
        <InnerPage title="News">
          <News />
        </InnerPage>
      ),
    },
  ]);
  console.log("router", router);
  return (
    <>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
