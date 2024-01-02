import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Footer from '../Footer'
import Header from '../Header'
import './index.css'

type Props = {
  title?: string
  children?: React.ReactNode
}
export default function Layout(props: Props) {
  const { title, children } = props
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Header />
      {title ? (
        <>
          <section className='breadcrumbs'>
            <div className='container'>
              <div className='d-flex justify-content-between align-items-center'>
                <h2>{title}</h2>
                <ol>
                  <li>
                    <a href='/'>Home</a>
                  </li>
                  <li>{title}</li>
                </ol>
              </div>
            </div>
          </section>
          <section className='inner-page'>
            <div className='container'>{children}</div>
          </section>
        </>
      ) : (
        children
      )}
      <ContactIcon />
      <Footer />
    </>
  )
}

const ContactIcon = () => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 300) {
      setVisible(true)
    } else if (scrolled <= 300) {
      setVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
      /* you can also use 'auto' behavior 
         in place of 'smooth' */
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible)
    return () => window.removeEventListener('scroll', toggleVisible)
  }, [])

  return (
    <>
      <div className='scroll-top' onClick={scrollToTop} style={{ display: visible ? 'inline' : 'none' }}>
        <i className='bi bi-chevron-double-up' />
      </div>
      <Link className='contact-icon' to='/contact'>
        <i className='bi bi-telephone' />
      </Link>
    </>
  )
}
