import { Link } from 'react-router-dom'
import Skeleton from '../../components/Skeleton'
import { avatarPath } from '../../utils'

export default function DoctorItem(props: { data: Doctor; disableNavigate?: boolean }) {
  const { _id, fullName, avatar, description } = props.data
  return (
    <Link to={props?.disableNavigate ? '#' : '/doctor/' + _id} className='doctor-card d-flex align-items-start'>
      <div className='pic'>
        <img src={avatarPath(avatar)} className='img-fluid' alt='pic' />
      </div>
      <div className='member-info'>
        <h4>{fullName}</h4>
        <span>{description?.degree}</span>
        <p>{description?.experience}</p>
      </div>
    </Link>
  )
}

export function DoctorItemSkeleton() {
  return (
    <div className='doctor-card d-flex align-items-start'>
      <Skeleton variant='circular' height={170} width={170} />
      <div className='member-info'>
        <Skeleton variant='rounded' />
        <Skeleton variant='rounded' />
        <Skeleton variant='rounded' height={100} />
      </div>
    </div>
  )
}
