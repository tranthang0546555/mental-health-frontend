type SystemInfo = {
  doctor: number;
  user: number;
  post: number;
};
export default function SystemInfo() {
  const data: SystemInfo = {
    post: 321,
    doctor: 123,
    user: 2312512,
  };
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
                {data.post}
              </span>
              <p>Bài viết</p>
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
                {data.doctor}
              </span>
              <p>Bác sĩ</p>
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
                {data.user}
              </span>
              <p>Người dùng</p>
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
