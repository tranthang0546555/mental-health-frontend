import { toast } from 'react-toastify'
import { AVATAR_CHANGE, useApi } from '../../../api'
import { useAppDispatch, useAppSelector } from '../../../hooks/store'
import { getProfile } from '../../../store/authSlice'
import { avatarPath } from '../../../utils'
import './index.css'

export default function AvatarForm() {
  const avatar = useAppSelector((state) => state.auth.user?.avatar)
  const dispatch = useAppDispatch()
  const handleChange = async (e: any) => {
    const file = e.target.files[0]

    const formData = new FormData()
    formData.append('file', file)

    await useApi
      .post(AVATAR_CHANGE, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(() => {
        dispatch(getProfile())
      })
      .catch((error) => {
        toast.error(error.response.data.message)
      })
  }

  return (
    <div>
      <img src={avatarPath(avatar)} alt={avatar} className='avatar-img' />
      <div className='pt-2'>
        <label htmlFor='upload-photo' className='upload-photo-btn'>
          <i className='bi bi-upload'></i>
        </label>
        <input type='file' name='photo' id='upload-photo' onChange={handleChange} />
      </div>
    </div>
  )
}
