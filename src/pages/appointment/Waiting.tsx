import { Link } from 'react-router-dom'

export default function Waiting() {
  return (
    <div className='appointment-verify'>
      <h4>Đặt lịch khám thành công</h4>
      <br />
      <h6>
        Lịch hẹn chỉ có giá trị trong khung giờ đã đặt <br /> Vui lòng đến trước khung giờ hẹn 15p để làm thủ tục.
      </h6>
      <br />
      <Link to='/dashboard/appointment/pending' type='button' className='btn btn-success rounded-pill'>
        Xem chi tiết
      </Link>
    </div>
  )
}
