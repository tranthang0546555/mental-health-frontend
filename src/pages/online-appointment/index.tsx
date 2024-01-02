import { useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ROOM_ACCESS, useApi } from '../../api'
import NotFound from '../not-found'
import Room from './Room'
import './index.css'

export default function OnlineAppointment() {
  const { id = '' } = useParams()
  const [valid, setValid] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useLayoutEffect(() => {
    getPermission()
  }, [])

  const getPermission = async () => {
    setLoading(true)
    await useApi
      .get(ROOM_ACCESS.replace(':id', id))
      .then(() => {
        setValid(true)
        setLoading(false)
      })
      .catch(() => {
        setValid(false)
        setLoading(false)
      })
  }

  if (valid) return <Room room={id} />

  if (loading === false && valid === false)
    return (
      <NotFound
        title='ERROR'
        subTitle='Phòng khám không tồn tại, đã đóng hoặc bạn không có quyền truy cập vào phòng này!'
      />
    )

  return <></>
}
