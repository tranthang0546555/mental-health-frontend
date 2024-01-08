import { format, parse } from 'date-fns'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { DOCTOR_TIME_SERVING, DOCTOR_WORKING_ROOMS, useApi } from '../../../../api'
import { SCHEDULE_DAY } from '../../../../constants'
import './index.css'

const defaultWorkingRooms = {
  rooms: [],
  default: undefined
}

export default function ScheduleSetting() {
  const [tab, setTab] = useState<keyof typeof SCHEDULE_DAY>('sun')
  const [timeServing, setTimeServing] = useState<TimeServing | null>()
  const [workingRooms, setWorkingRooms] = useState<WorkingRooms>(defaultWorkingRooms)
  const [state, setState] = useState<string | undefined>('')

  const { register, handleSubmit, setValue } = useForm<Schedule>()
  useEffect(() => {
    getTimeServing()
    getRooms()
  }, [])

  const getTimeServing = async () => {
    await useApi.get(DOCTOR_TIME_SERVING).then((res) => {
      setTimeServing(res.data)
    })
  }

  const handleAddTimeServing = async (data: Schedule) => {
    const f = parse(String(data.from), 'HH:mm', new Date())
    const from = f.getHours() * 60 * 60 * 1000 + f.getMinutes() * 60 * 1000
    const t = parse(String(data.to), 'HH:mm', new Date())
    const to = t.getHours() * 60 * 60 * 1000 + t.getMinutes() * 60 * 1000
    const valid = to - from > 0
    if (!valid) return toast.warn('Khoảng thời gian không hợp lệ')
    await useApi
      .post(DOCTOR_TIME_SERVING, { day: tab, from, to, room: data?.room })
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

  const getRooms = async () => {
    await useApi.get(DOCTOR_WORKING_ROOMS).then((res) => {
      setWorkingRooms(res.data)
    })
  }

  const handleRoomDefaultSelected = async (n: number) => {
    setWorkingRooms((prev) => ({ ...prev, default: n }))
    await useApi.post(DOCTOR_WORKING_ROOMS, { workingRooms: { ...workingRooms, default: n } })

    setValue('room', workingRooms.rooms[n])
  }

  const handleAddRooms = async () => {
    const invalid = state ? workingRooms.rooms.includes(state.trim()) : true
    if (invalid) return toast.warn('Phòng đã tồn tại')
    await useApi
      .post(DOCTOR_WORKING_ROOMS, { workingRooms: { ...workingRooms, rooms: [...workingRooms.rooms, state] } })
      .then(() => {
        getRooms()
        setState('')
      })
      .catch((error: any) => {
        toast.error(error?.response?.data?.message || 'Error')
      })
  }

  const handleResetRooms = async () => {
    await useApi.post(DOCTOR_WORKING_ROOMS, { workingRooms: defaultWorkingRooms }).then(async () => {
      await Promise.all(
        Object.keys(SCHEDULE_DAY).map(async (d) => {
          await useApi.delete(DOCTOR_TIME_SERVING, { data: { day: d } }).then(() => {})
        })
      )
    })

    toast.success('Hoàn tất')
    getTimeServing()
    getRooms()
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
                onClick={() => setTab(d)}>
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
              aria-labelledby={`day-tab-${idx}`}>
              {schedule.map((time) => {
                const from = format(new Date(0, 0, 0).getTime() + time.from, 'HH:mm')
                console.log(from)
                const to = format(new Date(0, 0, 0).getTime() + time.to, 'HH:mm')
                const label = from + ' - ' + to + ` [${time.room}] `

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
                Từ (h)
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
                Đến (h)
              </label>
              <input type='time' className='form-control' id='schedule-to' {...register('to', { required: true })} />
            </div>
            <div>
              <label className='form-label'>Phòng khám</label>
              <select
                className='form-select'
                aria-label='Default select room'
                value={workingRooms.rooms[workingRooms.default!]}
                {...register('room', { required: true })}>
                {workingRooms.rooms.map((room, idx) => (
                  <option value={room} key={idx} selected={workingRooms.default === idx}>
                    {room}
                  </option>
                ))}
              </select>
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
      <div className='room-select'>
        <span>Phòng làm việc</span>
        {workingRooms.rooms.length == 0 ? (
          <li>Trống</li>
        ) : (
          <ul>
            {workingRooms.rooms.map((room, idx) => (
              <li key={idx}>
                <label>{room} &nbsp;</label>
                <input
                  type='radio'
                  name='room_select'
                  value={room}
                  defaultChecked={idx === workingRooms.default}
                  onChange={() => handleRoomDefaultSelected(idx)}
                />
                {workingRooms.default === idx && <span> &nbsp; (mặc định)</span>}
              </li>
            ))}
          </ul>
        )}

        <br />
        <div className='form'>
          <div>
            <label htmlFor='room-input' className='form-label'>
              Phòng
            </label>
            <input
              id='room-input'
              type='text'
              className='form-control'
              placeholder='Ví dụ: P101'
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <button type='submit' className='btn btn-success' onClick={handleAddRooms}>
            Thêm
          </button>
          <button type='button' className='btn btn-danger' onClick={handleResetRooms}>
            Đặt lại
          </button>
        </div>
      </div>
    </section>
  )
}
