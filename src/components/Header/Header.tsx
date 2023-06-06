import "./index.css";

export default function Header() {
  return (
    <>
      <header id="header" className="fixed-top">
        <div className="container d-flex align-items-center">
          <h1 className="logo me-auto">
            <a href="/">Mental Health</a>
          </h1>
          {/* <a href="/" className="logo me-auto">
            <img
              src="assets/img/apple-touch-icon.png"
              alt=""
              className="img-fluid"
            />
          </a> */}
          <nav id="navbar" className="navbar order-last order-lg-0">
            <ul>
              <li>
                <a className="nav-link scrollto active" href="#hero">
                  Home
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="/about">
                  About
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#services">
                  Services
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#departments">
                  Departments
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="/doctors">
                  Doctors
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="/contact">
                  Contact
                </a>
              </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>

          <a href="#appointment" className="appointment-btn scrollto">
            <span className="d-none d-md-inline">Make an</span> Appointment
          </a>
        </div>
      </header>
    </>
  );
}
