import { Fragment, useEffect, useState } from 'react'
import { NOTIFICATION, useApi } from '../../../api'
import { distanceFormat } from '../../../utils'

export default function Notification() {
  const [state, setState] = useState<Noti[]>([])

  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    useApi.get(NOTIFICATION).then((res) => {
      setState(res.data.data)
    })
  }
  const newNoti = state.filter((n) => n.isRead === false).length

  const Icon = ({ type }: { type: NotiType }) => {
    switch (type) {
      case 'success':
        return <i className='bi bi-check-circle text-success'></i>
      case 'warning':
        return <i className='bi bi-exclamation-circle text-warning'></i>
      case 'danger':
        return <i className='bi bi-x-circle text-danger'></i>
      case 'info':
        return <i className='bi bi-info-circle text-primary'></i>
      default:
        return <i className='bi bi-info-circle text-primary'></i>
    }
  }

  const handleClick = (id: string) => {
    useApi.get(NOTIFICATION + '/' + id).then(() => {
      fetchData()
    })
  }

  return (
    <li className='nav-item dropdown'>
      <a className='nav-link nav-icon' href='#' data-bs-toggle='dropdown'>
        <i className='bi bi-bell'></i>
        <span className='badge bg-primary badge-number'>{newNoti}</span>
      </a>

      <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications'>
        <li className='dropdown-header'>
          {newNoti !== 0 ? `Bạn có ${newNoti} thông báo mới` : 'Bạn không có thông báo mới nào'}
        </li>
        {state.map(({ _id, title, description, createdAt, type, isRead }) => {
          return (
            <Fragment key={_id}>
              <li>
                <hr className='dropdown-divider' />
              </li>
              <li
                className={`notification-item ${isRead ? 'readed' : ''}`}
                onClick={() => {
                  !isRead && handleClick(_id)
                }}
              >
                <Icon type={type} />
                <div>
                  <h4>{title}</h4>
                  <p className='text-line-clamp-2'>{description}</p>
                  <p>{distanceFormat(createdAt)}</p>
                </div>
              </li>
            </Fragment>
          )
        })}
      </ul>
    </li>
  )
}
