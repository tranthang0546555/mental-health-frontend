import { Link } from "react-router-dom";
import "./index.css";

export default function Footer() {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 footer-contact">
              <h3>Mental Health</h3>
              <p>
                Cam Le <br />
                Da Nang
                <br />
                Viet Nam <br />
                <br />
                <strong>Điện thoại:</strong> 0336721xxx
                <br />
                <strong>Email:</strong> tnthang.18it5@vku.udn.vn
                <br />
              </p>
            </div>

            <div className="col-lg-2 col-md-6 footer-links">
              <h4>Liên kết</h4>
              <ul>
                <li>
                  <i className="bx bx-chevron-right"></i>
                  <Link to="/">Trang chủ</Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                  <Link to="/post">Bài viết</Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                  <Link to="/doctor">Bác sĩ</Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Thông tin</h4>
              <ul>
                <li>
                  <i className="bx bx-chevron-right"></i>
                  <Link to="/about">Về chúng tôi</Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                  <Link to="/contact">Liên hệ</Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                  <Link to="/privacy-policy">Chính sách bảo mật</Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                  <Link to="/faq">Các câu hỏi thường gặp</Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 footer-newsletter">
              <h4>Tham gia bản tin của chúng tôi</h4>
              <p>
                Đăng ký bản tin của Mental Health để cập nhật tin tức mới nhất.
              </p>
              <form action="" method="post">
                <input type="email" name="email" placeholder="Email" />
                <input type="submit" value="Đăng ký" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
