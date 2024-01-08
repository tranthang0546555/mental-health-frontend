import { toast } from 'react-toastify'
import { PATIENT_REGISTRATION, useApi } from '../../api'
import { dateFormat } from '../../utils'

type Props = {
  doctor?: Doctor
  timeSelect: Schedule
  onSubmit?: () => void
}

export default function VerifyAppointment(props: Props) {
  const { doctor, timeSelect, onSubmit } = props
  // if (!doctor || !timeSelect) return <></>;

  const handleSubmit = async () => {
    const data = {
      doctorId: doctor ? doctor._id : undefined,
      from: new Date(timeSelect.from),
      to: new Date(timeSelect.to),
      room: timeSelect.room
    }

    await useApi
      .post(PATIENT_REGISTRATION, data)
      .then((res: any) => {
        toast.success(res.data?.message)
        onSubmit && onSubmit()
      })
      .catch((error: any) => {
        toast.error(error?.response?.data?.message)
      })
  }

  return (
    <div className='appointment-verify'>
      <h4>Xác nhận lịch khám</h4>
      <br />
      <h5>Bác sĩ: {doctor ? doctor?.fullName : 'được sắp xếp sau'}</h5>
      <h6>Thời gian: {dateFormat(timeSelect?.from || '')}</h6>
      <br />
      <button onClick={handleSubmit} type='button' className='btn btn-success rounded-pill'>
        Hoàn tất
      </button>
    </div>
  )
}
