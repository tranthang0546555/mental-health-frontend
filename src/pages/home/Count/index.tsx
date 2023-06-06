export default function Count() {
  return (
    <section id="counts" className="counts">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="count-box">
              <i className="fas fa-user-md"></i>
              <span
                data-purecounter-start="0"
                data-purecounter-end="85"
                data-purecounter-duration="1"
                className="purecounter"
              >
                15
              </span>
              <p>Doctors</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
            <div className="count-box">
              <i className="far fa-hospital"></i>
              <span
                data-purecounter-start="0"
                data-purecounter-end="18"
                data-purecounter-duration="1"
                className="purecounter"
              >
                14
              </span>
              <p>Departments</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
            <div className="count-box">
              <i className="fas fa-flask"></i>
              <span
                data-purecounter-start="0"
                data-purecounter-end="12"
                data-purecounter-duration="1"
                className="purecounter"
              >
                13
              </span>
              <p>Research Labs</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
            <div className="count-box">
              <i className="fas fa-award"></i>
              <span
                data-purecounter-start="0"
                data-purecounter-end="150"
                data-purecounter-duration="1"
                className="purecounter"
              >
                12
              </span>
              <p>Awards</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
