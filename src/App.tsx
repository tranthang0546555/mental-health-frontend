import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
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
import Register from "./pages/auth/register";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<HomePage />}>
          <Header />
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<News />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<HomePage />} />
          <Footer />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
