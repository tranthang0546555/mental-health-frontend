import { useState } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import { useAppSelector } from '../../hooks/store'

export default function LoginRegisterButton() {
  const login = useAppSelector((state) => state.auth.login)
  const [button, setButton] = useState<'login' | 'register'>('login')

  return (
    <>
      {!login && (
        <div className='login-register-switch'>
          <Link
            className={`login-button ${button === 'register' ? 'active' : ''}`}
            to='/register'
            onClick={() => setButton('register')}
          >
            Đăng ký
          </Link>
          <Link
            className={`register-button ${button === 'login' ? 'active' : ''}`}
            to='/login'
            onClick={() => setButton('login')}
          >
            Đăng nhập
          </Link>
        </div>
      )}
    </>
  )
}
