import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DOCTOR_DETAIL, useApi } from '../../api'
import { SCHEDULE_TIME_HOOK, SCHEDULE_DAY as SD, defaultSchedule } from '../../constants'
import { avatarPath, hourFormat } from '../../utils'
import './index.css'

export default function DoctorDetail() {
  const { id = '' } = useParams()
  const [data, setData] = useState<Doctor>()

  useEffect(() => {
    getData(id)
  }, [])

  const getData = async (id: string) => {
    const data = (await useApi.get(DOCTOR_DETAIL.replace(':id', id))).data as Doctor
    setData(data)
  }
  if (!data) return <></>
  return (
    <section>
      <div className='container' data-aos='fade-up'>
        <div className='row g-5'>
          <div className='col-lg-4'>
            <div className='box-profile'>
              <div className='content'>
                <div className='image'>
                  <img src={avatarPath(data?.avatar)} alt='Profile Image' />
                </div>
                <div className='text'>
                  <p className='name'>{data?.fullName}</p>
                  <div className='info'>
                    <p>
                      <b>Học vị: </b>
                      {data?.description?.degree}
                    </p>
                    <p>
                      <b>SĐT: </b>
                      {data?.phone}
                    </p>
                    <p>
                      <b>Email: </b>
                      {data?.email}
                    </p>
                    <p>
                      <b>Giới tính: </b>
                      {data?.gender === 1 ? 'Nam' : 'Nữ'}
                    </p>
                    <p>
                      <b>Ngày sinh: </b>
                      {data?.birthday}
                    </p>
                    <p>
                      <b>Địa chỉ: </b>
                      {data?.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-8'>
            <div className='box-profile box-info'>
              <p>
                <b>Giới thiệu về bản thân:</b>
                <br />
                {data?.description?.experience}
              </p>
              <p>
                <b>Thời gian làm việc:</b>
              </p>
              <TimeSelect doctor={data} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

type Props = {
  doctor?: Doctor
}
const SCHEDULE_DAY: { [key: string]: string } = SD

function TimeSelect(props: Props) {
  const { doctor } = props
  const [tab, setTab] = useState<{ day: string; nextweek: boolean }>()

  if (doctor && !doctor?.timeServing) return <h5>Lịch khám bệnh hiện không có hoặc chưa được thiết lập</h5>

  const currentDay = new Date().getDay()
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
                onClick={() => setTab({ day, nextweek: false })}
              >
                {SCHEDULE_DAY[day]}
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
              aria-labelledby={`day-tab-${idx}`}
            >
              {schedule.map((time) => {
                const from = SCHEDULE_TIME_HOOK.getTime() + time.from
                const to = SCHEDULE_TIME_HOOK.getTime() + time.to
                const label = hourFormat(from) + ' - ' + hourFormat(to)
                return <span className='time-chip badge bg-secondary'>{label}</span>
              })}
            </div>
          )
        })}
      </>
    )
  }

  useEffect(() => {
    setTab({ day: Object.keys(SCHEDULE_DAY)[currentDay], nextweek: false })
  }, [doctor])

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
