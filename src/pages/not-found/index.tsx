import { Link } from 'react-router-dom'
import './index.css'

type Props = {
  title?: string
  subTitle?: string
}
export default function NotFound(props: Props) {
  const { title = '404', subTitle = "The page you are looking for doesn't exist." } = props
  return (
    <section className='section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center'>
      <h1>{title}</h1>
      <h2>{subTitle}</h2>
      <Link className='btn' to='/'>
        Back to home
      </Link>
      <img src='/assets/img/not-found.svg' className='img-fluid py-5' alt='Page Not Found' />
    </section>
  )
}
