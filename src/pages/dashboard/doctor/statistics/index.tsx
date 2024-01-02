import { useAppSelector } from '../../../../hooks/store'
import HeroSection from '../../../home/Hero'
import PostView from './PostView'
import ScheduleView from './ScheduleView'
import UserOverView from './UserOverView'
import './index.css'

export default function Statistics() {
  const role = useAppSelector((state) => state.auth.user?.role)
  if (role && role == 'user')
    return (
      <section>
        <HeroSection />
      </section>
    )
  return (
    <section className='section statistics'>
      <div className='row'>
        <div className='col col-md-5'>
          <div className='p-3'>
            <UserOverView />
          </div>
        </div>
        <div className='col col-md-7'>
          <div className='row p-3'>
            <div className='col col-md-12'>
              <PostView />
            </div>
            <div className='col col-md-12'>
              <ScheduleView />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
