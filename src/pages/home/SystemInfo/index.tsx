import { useAppSelector } from "../../../hooks/store";
import { numberFormat } from "../../../utils";
import "./index.css";

export default function SystemInfo() {
  const { counts } = useAppSelector((state) => state.info);
  return (
    <section id="counts" className="counts">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="count-box">
              <i className="fas fa-newspaper"></i>
              <span className="purecounter">{numberFormat(counts?.post)}</span>
              <p>Bài viết</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
            <div className="count-box">
              <i className="fas fa-user-md"></i>
              <span className="purecounter">
                {numberFormat(counts?.doctor)}
              </span>
              <p>Bác sĩ</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
            <div className="count-box">
              <i className="fas fa-users"></i>
              <span className="purecounter">{numberFormat(counts?.user)}</span>
              <p>Người dùng</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
            <div className="count-box">
              <i className="fas fa-eye"></i>
              {/* <span className="purecounter">{counts?.visitor}</span> */}
              <span className="purecounter">
                {numberFormat(counts?.visitor)}
              </span>
              <p>Lượt truy cập</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
