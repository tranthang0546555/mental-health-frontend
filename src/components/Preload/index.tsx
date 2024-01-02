import { useAppSelector } from '../../hooks/store'
import './index.css'

export default function Preload() {
  const { isLoading } = useAppSelector((state) => state.loading)
  return <div id='preloader' className={isLoading ? 'preloader-loading' : 'preloader-stop-loading'}></div>
}
