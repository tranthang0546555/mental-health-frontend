import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import "./index.css";

type Props = {
  title?: string;
  children?: React.ReactNode;
};
export default function Layout(props: Props) {
  const { title, children } = props;
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      {title ? (
        <>
          <section className="breadcrumbs">
            <div className="container">
              <div className="d-flex justify-content-between align-items-center">
                <h2>{title}</h2>
                <ol>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>{title}</li>
                </ol>
              </div>
            </div>
          </section>
          <section className="inner-page">
            <div className="container">{children}</div>
          </section>
        </>
      ) : (
        children
      )}
      <Footer />
    </>
  );
}
