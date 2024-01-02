import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import { useAppSelector } from '../../hooks/store'

export default function LoginCheck({ children }: { children: ReactNode }) {
  const { login } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  const navigatePath = location.pathname.substring(1)

  const check = useDebouncedCallback(() => {
    if (!login) navigate(`/login${navigatePath && navigatePath !== 'login' ? '?navigate=' + navigatePath : ''}`)
  }, 3000)

  useEffect(() => {
    !login && check()
  }, [login])

  if (!login) return <div id='preloader' className='preloader-loading'></div>
  return children
}
