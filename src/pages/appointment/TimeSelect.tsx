import { addDays, format, sub } from 'date-fns'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { PATIENT_REGISTRATION_BOOKED, useApi } from '../../api'
import { SCHEDULE_TIME_HOOK, SCHEDULE_DAY as SD, defaultSchedule } from '../../constants'
import { useAppSelector } from '../../hooks/store'
import { hourFormat } from '../../utils'
import './index.css'

type Props = {
  doctor?: Doctor
  onSelect: (time: Schedule) => void
}

const SCHEDULE_DAY: { [key: string]: string } = SD

export default function TimeSelect(props: Props) {
  const { doctor, onSelect } = props
  const [tab, setTab] = useState<{ day: string; nextweek: boolean }>()
  const [booked, setBooked] = useState<string[]>([])
  const role = useAppSelector((state) => state.auth.user?.role)

  if (doctor && !doctor?.timeServing) return <h5>Lịch khám bệnh hiện không có hoặc chưa được thiết lập</h5>

  const now = new Date()
  const toDay = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  const currentDay = new Date().getDay()
  const currentTab = Object.keys(SCHEDULE_DAY).findIndex((v) => v == tab?.day) + (tab?.nextweek === true ? 7 : 0)

  const TabList = () => {
    return (
      <>
        {Object.keys(SCHEDULE_DAY).map((day, idx) => {
          return (
            <li className='nav-item' role='presentation'>
              <button
                className={`nav-link ${tab?.day === day && tab.nextweek === false ? 'active' : ''}`}
                id={`day-tab-${idx}`}
                data-bs-toggle='tab'
                data-bs-target={`#day-${idx}`}
                type='button'
                role='tab'
                aria-controls={`day-${idx}`}
                aria-selected='true'
                onClick={() => setTab({ day, nextweek: false })}>
                {SCHEDULE_DAY[day] + ' - ' + format(sub(toDay, { days: now.getDay() - idx }), 'dd/MM')}
              </button>
            </li>
          )
        })}
        {Object.keys(SCHEDULE_DAY).map((day, i) => {
          const idx = 7 + i
          return (
            <li className='nav-item' role='presentation'>
              <button
                className={`nav-link ${tab?.day === day && tab.nextweek === true ? 'active' : ''}`}
                id={`day-tab-${idx}`}
                data-bs-toggle='tab'
                data-bs-target={`#day-${idx}`}
                type='button'
                role='tab'
                aria-controls={`day-${idx}`}
                aria-selected='true'
                onClick={() => setTab({ day, nextweek: true })}>
                {SCHEDULE_DAY[day] + ' - ' + format(sub(toDay, { days: now.getDay() - idx }), 'dd/MM')}
              </button>
            </li>
          )
        })}
      </>
    )
  }

  const TabContents = () => {
    return (
      <>
        {Object.keys(SCHEDULE_DAY).map((d, idx) => {
          const day = d as keyof typeof SD
          const schedule = doctor ? doctor?.timeServing?.[day] || [] : defaultSchedule[day]
          return (
            <div
              className={`tab-pane fade show ${tab?.day === day && tab.nextweek === false ? 'active' : ''}`}
              id={`day-${idx}`}
              role='tabpanel'
              aria-labelledby={`day-tab-${idx}`}>
              {schedule.map((time) => {
                const from = SCHEDULE_TIME_HOOK.getTime() + time.from
                const to = SCHEDULE_TIME_HOOK.getTime() + time.to
                const label = hourFormat(from) + ' - ' + hourFormat(to) + (time?.room ? ` [${time?.room}] ` : '')

                const isBooked = booked.some(
                  (v) =>
                    new Date(v).getTime() === addDays(toDay.getTime() + time.from, currentTab - currentDay).getTime()
                )

                return (
                  <>
                    {isBooked ? (
                      <span
                        onClick={() => toast.warn('Đã có ai đó đặt lịch vào thời gian này')}
                        className='time-chip time-chip-error badge bg-danger'>
                        {label}
                      </span>
                    ) : (
                      <span onClick={() => handleSelect(time)} className='time-chip badge bg-secondary'>
                        {label}
                      </span>
                    )}
                  </>
                )
              })}
            </div>
          )
        })}
        {Object.keys(SCHEDULE_DAY).map((d, i) => {
          const idx = 7 + i
          const day = d as keyof typeof SD
          const schedule = doctor ? doctor?.timeServing?.[day] || [] : defaultSchedule[day]
          return (
            <div
              className={`tab-pane fade show ${tab?.day === day && tab.nextweek === true ? 'active' : ''}`}
              id={`day-${idx}`}
              role='tabpanel'
              aria-labelledby={`day-tab-${idx}`}>
              {schedule.map((time) => {
                const from = SCHEDULE_TIME_HOOK.getTime() + time.from + 7 * 24 * 60 * 60 * 1000
                const to = SCHEDULE_TIME_HOOK.getTime() + time.to + 7 * 24 * 60 * 60 * 1000
                const label = hourFormat(from) + ' - ' + hourFormat(to) + (time?.room ? ` [${time?.room}] ` : '')
                console.log('booked', booked)
                const isBooked = booked.some(
                  (v) =>
                    new Date(v).getTime() === addDays(toDay.getTime() + time.from, currentTab - currentDay).getTime()
                )

                return (
                  <>
                    {isBooked ? (
                      <span
                        onClick={() => toast.warn('Đã có ai đó đặt lịch vào thời gian này')}
                        className='time-chip time-chip-error badge bg-danger'>
                        {label}
                      </span>
                    ) : (
                      <span onClick={() => handleSelect(time, true)} className='time-chip badge bg-secondary'>
                        {label}
                      </span>
                    )}
                  </>
                )
              })}
            </div>
          )
        })}
      </>
    )
  }

  const handleSelect = (schedule: Schedule, nextweek?: boolean) => {
    if (role !== 'user') return toast.warn('Chỉ bệnh nhận mới có thể đặt lịch khám, vui lòng kiểm tra lại!')
    const bookingFrom = addDays(new Date(toDay.getTime() + schedule.from), currentTab - currentDay)
    const bookingTo = addDays(new Date(toDay.getTime() + schedule.to), currentTab - currentDay)

    if (bookingFrom.getTime() < now.getTime() + 24 * 60 * 60 * 1000 && !nextweek)
      return toast.warn('Bạn phải đặt sớm hơn ít nhất hai ngày, vui lòng chọn thời gian khác')
    onSelect({ from: bookingFrom.getTime(), to: bookingTo.getTime(), room: schedule.room })
  }

  useEffect(() => {
    doctor && getBooked()
    setTab({ day: Object.keys(SCHEDULE_DAY)[currentDay], nextweek: false })
  }, [doctor])

  const getBooked = async () => {
    await useApi.get(PATIENT_REGISTRATION_BOOKED.replace(':id', doctor?._id || '')).then((res) => {
      setBooked(res.data)
    })
  }

  return (
    <div className='card time-select'>
      <div className='card-body'>
        <ul className='nav nav-tabs d-flex justify-content-center' id='myTab' role='tablist'>
          {<TabList />}
        </ul>
        <div className='tab-content pt-2' id='myTabContent'>
          {<TabContents />}
        </div>
      </div>
    </div>
  )
}
