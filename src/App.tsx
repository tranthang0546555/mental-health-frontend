import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import HomePage from "./pages/home";
import Contact from "./pages/contact";
import FAQ from "./pages/faq";
import About from "./pages/about";
import { ReactNode } from "react";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/contact",
      element: (
        <InnerPage>
          <Contact />
        </InnerPage>
      ),
    },
    {
      path: "/faq",
      element: (
        <InnerPage>
          <FAQ />
        </InnerPage>
      ),
    },
    {
      path: "/about",
      element: (
        <InnerPage>
          <About />
        </InnerPage>
      ),
    },
  ]);

  return (
    <>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;

const InnerPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <section className="breadcrumbs">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Inner Page</h2>
            <ol>
              <li>
                <a href="/">Home</a>
              </li>
              <li>Inner Page</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="inner-page">
        <div className="container">{children}</div>
      </section>
    </>
  );
};
