import Skeleton from '../../../components/Skeleton'
import { useAppSelector } from '../../../hooks/store'
import { numberFormat } from '../../../utils'
import './index.css'

export default function SystemInfo() {
  const { counts } = useAppSelector((state) => state.info)
  return (
    <section id='counts' className='counts'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-3 col-md-6'>
            <div className='count-box'>
              <i className='fas fa-newspaper'></i>
              {counts ? (
                <span className='purecounter'>{numberFormat(counts.post)}</span>
              ) : (
                <Skeleton variant='rounded' className='mb-2' />
              )}
              <p>Bài viết</p>
            </div>
          </div>

          <div className='col-lg-3 col-md-6 mt-5 mt-md-0'>
            <div className='count-box'>
              <i className='fas fa-user-md'></i>
              {counts ? (
                <span className='purecounter'>{numberFormat(counts.doctor)}</span>
              ) : (
                <Skeleton variant='rounded' className='mb-2' />
              )}
              <p>Bác sĩ</p>
            </div>
          </div>

          <div className='col-lg-3 col-md-6 mt-5 mt-lg-0'>
            <div className='count-box'>
              <i className='fas fa-users'></i>
              {counts ? (
                <span className='purecounter'>{numberFormat(counts.user)}</span>
              ) : (
                <Skeleton variant='rounded' className='mb-2' />
              )}
              <p>Người dùng</p>
            </div>
          </div>

          <div className='col-lg-3 col-md-6 mt-5 mt-lg-0'>
            <div className='count-box'>
              <i className='fas fa-eye'></i>
              {counts ? (
                <span className='purecounter'>{numberFormat(counts.visitor)}</span>
              ) : (
                <Skeleton variant='rounded' className='mb-2' />
              )}
              <p>Lượt truy cập</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
