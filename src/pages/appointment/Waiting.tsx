import { Link } from "react-router-dom";

export default function Waiting() {
  return (
    <div className="appointment-verify">
      <h4>Đặt lịch khám thành công</h4>
      <br />
      <h6>Vui lòng chờ đợi xác nhận của bác sĩ</h6>
      <br />
      <Link
        to="/dashboard"
        type="button"
        className="btn btn-success rounded-pill"
      >
        Dashboard
      </Link>
    </div>
  );
}
