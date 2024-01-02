import { format, parse } from 'date-fns'
import {} from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { DOCTOR_TIME_SERVING, useApi } from '../../../../api'
import { SCHEDULE_DAY } from '../../../../constants'
import './index.css'

export default function ScheduleSetting() {
  const [tab, setTab] = useState<keyof typeof SCHEDULE_DAY>('sun')
  const [timeServing, setTimeServing] = useState<TimeServing | null>()

  const { register, handleSubmit } = useForm<Schedule>()
  useEffect(() => {
    getTimeServing()
  }, [])

  const getTimeServing = async () => {
    await useApi.get(DOCTOR_TIME_SERVING).then((res) => {
      setTimeServing(res.data)
    })
  }

  const handleAddTimeServing = async (data: Schedule) => {
    const f = parse(String(data.from), 'HH:mm', new Date())
    console.log(f)
    const from = f.getHours() * 60 * 60 * 1000 + f.getMinutes() * 60 * 1000
    const t = parse(String(data.to), 'HH:mm', new Date())
    const to = t.getHours() * 60 * 60 * 1000 + t.getMinutes() * 60 * 1000
    const valid = to - from > 0
    if (!valid) return toast.warn('Khoảng thời gian không hợp lệ')
    await useApi
      .post(DOCTOR_TIME_SERVING, { day: tab, from, to })
      .then(() => {
        toast.success('Thêm hoàn tất')
        getTimeServing()
      })
      .catch((error: any) => {
        toast.error(error?.response?.data?.message || 'Error')
      })
  }

  const handleResetTimeServing = async () => {
    await useApi.delete(DOCTOR_TIME_SERVING, { data: { day: tab } }).then(() => {
      toast.success('Làm mới hoàn tất')
      getTimeServing()
    })
  }

  const TabList = () => {
    return (
      <>
        {Object.keys(SCHEDULE_DAY).map((day, idx) => {
          const d = day as keyof typeof SCHEDULE_DAY
          return (
            <li key={idx} className='nav-item' role='presentation'>
              <button
                className={`nav-link ${tab === day ? 'active' : ''}`}
                id={`day-tab-${idx}`}
                data-bs-toggle='tab'
                data-bs-target={`#day-${idx}`}
                type='button'
                role='tab'
                aria-controls={`day-${idx}`}
                aria-selected='true'
                onClick={() => setTab(d)}
              >
                {SCHEDULE_DAY[d]}
              </button>
            </li>
          )
        })}
      </>
    )
  }

  const TabContents = () => {
    if (!timeServing) return <></>
    return (
      <>
        {Object.keys(SCHEDULE_DAY).map((d, idx) => {
          const day = d as keyof typeof SCHEDULE_DAY
          const schedule = (timeServing[day] || []) as Schedule[]
          return (
            <div
              className={`tab-pane fade show ${tab === day ? 'active' : ''}`}
              id={`day-${idx}`}
              role='tabpanel'
              aria-labelledby={`day-tab-${idx}`}
            >
              {schedule.map((time) => {
                const from = format(new Date(0, 0, 0).getTime() + time.from, 'HH:mm')
                console.log(from)
                const to = format(new Date(0, 0, 0).getTime() + time.to, 'HH:mm')
                const label = from + ' - ' + to

                return (
                  <span className='time-chip badge bg-secondary' key={label}>
                    {label}
                  </span>
                )
              })}
            </div>
          )
        })}
      </>
    )
  }

  return (
    <section className='section'>
      <div className='time-select'>
        <div className='card-body'>
          <ul className='nav nav-tabs d-flex' id='myTab' role='tablist'>
            {<TabList />}
          </ul>
          <div className='tab-content pt-2' id='myTabContent'>
            {<TabContents />}
          </div>
        </div>
        <form onSubmit={handleSubmit(handleAddTimeServing)}>
          <div className='schedule-select'>
            <div>
              <label htmlFor='schedule-from' className='form-label'>
                Từ
              </label>
              <input
                type='time'
                className='form-control'
                id='schedule-from'
                {...register('from', { required: true })}
              />
            </div>
            <div>
              <label htmlFor='schedule-to' className='form-label'>
                Đến
              </label>
              <input type='time' className='form-control' id='schedule-to' {...register('to', { required: true })} />
            </div>
            <button type='submit' className='btn btn-success'>
              Thêm
            </button>
            <button type='button' className='btn btn-danger' onClick={handleResetTimeServing}>
              Đặt lại
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
