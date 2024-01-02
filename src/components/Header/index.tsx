import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/store'
import LoginRegisterButton from '../LoginRegisterButton'
import ThemeSwitch from '../ThemeSwitch'
import Logo from './Logo'
import './index.css'

const maps: {
  path: string
  name: string
}[] = [
  { path: '/', name: 'Trang chủ' },
  { path: '/post', name: 'Bài viết' },
  { path: '/doctor', name: 'Bác sĩ' },
  { path: '/treatment', name: 'Trị liệu' }
  // { path: "/contact", name: "Liên hệ" },
]
export default function Header() {
  const login = useAppSelector((state) => state.auth.login)
  const handleNavbarMobileToggle = () => {
    const nav = document.getElementById('navbar')?.classList
    const navToggle = document.getElementById('nav-toggle')?.classList
    if (nav?.contains('navbar-mobile')) {
      nav.remove('navbar-mobile')
      navToggle?.replace('bi-x', 'bi-list')
    } else {
      nav?.add('navbar-mobile')
      navToggle?.replace('bi-list', 'bi-x')
    }
  }

  const handleClose = () => {
    const nav = document.getElementById('navbar')?.classList
    const navToggle = document.getElementById('nav-toggle')?.classList
    nav?.remove('navbar-mobile')
    navToggle?.replace('bi-x', 'bi-list')
  }

  return (
    <>
      <header id='header' className='fixed-top'>
        <div className='container d-flex align-items-center'>
          <h1 className='logo me-auto'>
            <Logo />
            <a href='/' className='site'>
              Mental Health
            </a>
          </h1>
          {/* <a href="/" className="logo me-auto">
            <img
              src="assets/img/apple-touch-icon.png"
              alt=""
              className="img-fluid"
            />
          </a> */}
          <nav id='navbar' className='navbar order-last order-lg-0'>
            <ul>
              {maps.map(({ path, name }) => {
                const currentPath = location.pathname.split('/')?.[1]
                const p = path.split('/')?.[1]
                // console.log(currentPath, p);

                return (
                  <li key={name}>
                    {/* <a
                      className={`nav-link scrollto ${
                        currentPath === p ? "active" : ""
                      }`}
                      href={path}
                    >
                      {name}
                    </a> */}
                    <Link
                      className={`nav-link scrollto ${currentPath === p ? 'active' : ''}`}
                      onClick={handleClose}
                      to={path}
                    >
                      {name}
                    </Link>
                  </li>
                )
              })}
              <li>
                {login && (
                  <Link className={`dashboard-button active}`} to='/dashboard'>
                    Dashboard
                  </Link>
                )}
              </li>
            </ul>
            <i id='nav-toggle' className='bi bi-list mobile-nav-toggle' onClick={handleNavbarMobileToggle}></i>
          </nav>

          <Link to='/appointment' className='appointment-btn scrollto'>
            Đặt lịch <span className='d-none d-md-inline'>khám Online</span>
          </Link>

          <LoginRegisterButton />
          <ThemeSwitch />
        </div>
      </header>
    </>
  )
}
