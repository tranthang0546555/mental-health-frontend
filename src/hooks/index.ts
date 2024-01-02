import { useEffect } from 'react'
import { useAppDispatch } from './store'
import { getProfile } from '../store/authSlice'
import { countsInfo } from '../store/infoSlice'

export const usePreLoadPage = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getProfile())
    dispatch(countsInfo())
  }, [])
}
