import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { RECORD_DETAIL, useApi } from '../../../api'
import { useAppSelector } from '../../../hooks/store'
import { dateFormat } from '../../../utils'
import './index.css'

export default function RecordDetail() {
  const { id = '' } = useParams()
  const [state, setState] = useState<MedicalRecordWithHistory>()
  const [historyIndex, setHistoryIndex] = useState<number | undefined>()
  const role = useAppSelector((state) => state.auth.user?.role)

  useEffect(() => {
    ;(async () => {
      const data = await useApi.get(RECORD_DETAIL.replace(':id', id))
      setState(data.data)
    })()
  }, [id])

  if (!state) return <></>
  const { record, histories } = state
  const data = historyIndex === undefined ? record.data : histories[historyIndex].data
  const { user, doctor } = data
  return (
    <section className='section record-detail'>
      <div className='p-3 header'>
        <div>
          <span>Lịch sử thay đổi: </span>
          <br />
          <span>
            {histories.map((record, idx) => {
              return (
                <>
                  <b>{`[${idx + 1}] `}</b>
                  <span
                    onClick={() => setHistoryIndex(idx)}
                    className={`history ${historyIndex === idx && 'active'}`}
                    key={idx}>
                    {dateFormat(record.pushedAt)}
                  </span>
                </>
              )
            })}
            <span
              onClick={() => setHistoryIndex(undefined)}
              className={`history ${historyIndex === undefined && 'active'}`}>
              Hiện tại
            </span>
          </span>
          <br />
          <br />
          {role === 'doctor' && (
            <Link to={`/dashboard/medical-record?numberId=${user?.numberId}`}>
              <u>
                <i>Xem tất cả bệnh án của bệnh nhân</i>
              </u>
            </Link>
          )}
        </div>
        {role === 'doctor' && (
          <Link to={`/dashboard/medical-record/update/${record.id}`} type='submit' className='btn btn-primary'>
            Chỉnh sửa
          </Link>
        )}
      </div>
      <div className='card'>
        <div className='card-body pt-3'>
          <h4 className='text-center'>BỆNH ÁN TÂM THẦN {historyIndex != undefined && `[${historyIndex + 1}]`}</h4>
          <h5>THÔNG TIN CÁ NHÂN</h5>
          <ul className='p-3'>
            <ol className='row g-3'>
              <li>Họ và tên bệnh nhân: {user?.fullName}</li>
              <li>Giới tính: {user?.gender == 1 ? 'Nam' : 'Nữ'}</li>
              <li>Ngày sinh: {dateFormat(user?.birthday, 'dd/MM/yyy')}</li>
              <li>Mã định danh: {user?.numberId}</li>
              <li>Nghề nghiệp: {user?.job}</li>
              <li>Địa chỉ: {user?.address}</li>
              <li>Số điện thoại liên hệ: {user?.phone}</li>
              <li>Địa chỉ email (nếu có): {user?.email}</li>
              <li>Ngày khám bệnh: {dateFormat(data.dayIn)}</li>
              <hr />
            </ol>
            <ol className='row g-3'>
              <li>Bác sĩ khám bệnh: {doctor?.fullName}</li>
              <li>Số điện thoại liên hệ: {doctor?.phone}</li>
              <li>Địa chỉ email: {doctor?.email}</li>
            </ol>
          </ul>
          <hr />
          <h5>Bệnh sử</h5>
          <p>{data.medicalHistory}</p>
          <h5>Lý do khám bệnh</h5>
          <p>{data.reason}</p>
          <h5>Tình trạng ban đầu</h5>
          <p>{data.status}</p>
          <h5>Chuẩn đoán bệnh</h5>
          <p>{data.diagnostic}</p>
          <h5>Phương pháp điều trị</h5>
          <p>{data.treatment}</p>
        </div>
      </div>
    </section>
  )
}
