import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { TREATMENT_LIST, useApi } from '../../../api'
import './index.css'

type Inputs = {
  title?: string
  description?: string
  category?: string
  file?: File
  link?: string
}

const videoValid = ['video/mp4', 'video/ogg', 'video/mpeg']
const audioValid = ['audio/ogg', 'audio/mpeg']

export default function TreatmentCreate() {
  const [type, setType] = useState<'video' | 'audio'>('video')
  const [duration, setDuration] = useState<number | undefined>(0)

  const schema = yup
    .object<Inputs>({
      title: yup.string().required('Không để trống'),
      description: yup.string().required('Không để trống'),
      category: yup.string(),
      file: yup.mixed(),
      link: yup.string()
    })
    .required()

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
    setValue
  } = useForm<Inputs>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: Inputs) => {
    if (!data.link) {
      const formData = new FormData()
      formData.append('file', data.file!)
      formData.append('title', data.title!)
      formData.append('description', data.description!)
      formData.append('duration', `${duration}`)
      formData.append('category', data.category!)

      const url = TREATMENT_LIST + '/' + type
      await useApi
        .post(url, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(() => {
          toast.success('Đã thêm mới')
          reset()
        })
    } else {
      const url = TREATMENT_LIST + '/' + 'link'
      await useApi.post(url, data).then(() => {
        toast.success('Đã thêm mới')
        reset()
      })
    }
  }

  const handleFileChange = (file: File, type?: 'video' | 'audio', duration = 0) => {
    if (!type) {
      setError('file', { message: 'Định dạng không hợp lệ' })
      return
    } else {
      setType(type)
      setDuration(duration)
      clearErrors('file')
      setValue('file', file)
    }
  }

  return (
    <section className='section profile'>
      <div className='card'>
        <div className='card-body pt-3'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='text-end pb-3'>
              <button type='submit' className='btn btn-primary'>
                Tạo mới
              </button>
            </div>

            <div className='row mb-3'>
              <label htmlFor='file' className='col-md-2 col-lg-2 col-form-label'>
                File (MP3/MP4)
              </label>
              <div className='col-md-10 col-lg-10'>
                <FileUpload handleChange={handleFileChange} />
                {errors.file && <span className='form-error-message'>{errors.file.message}</span>}
              </div>
            </div>

            <div className='row mb-3'>
              <label htmlFor='link' className='col-md-2 col-lg-2 col-form-label'>
                Hoặc đường dẫn (Youtube)
              </label>
              <div className='col-md-10 col-lg-10'>
                <input type='text' id='link' className='form-control' {...register('link')} />
                {errors.link && <span className='form-error-message'>{errors.link.message}</span>}
              </div>
            </div>

            <div className='row mb-3'>
              <label htmlFor='title' className='col-md-2 col-lg-2 col-form-label'>
                Tiêu đề *
              </label>
              <div className='col-md-10 col-lg-10'>
                <input type='text' id='title' className='form-control' {...register('title')} />
                {errors.title && <span className='form-error-message'>{errors.title.message}</span>}
              </div>
            </div>

            <div className='row mb-3'>
              <label htmlFor='description' className='col-md-2 col-lg-2 col-form-label'>
                Mô tả *
              </label>
              <div className='col-md-10 col-lg-10'>
                <input type='text' id='description' className='form-control' {...register('description')} />
                {errors.description && <span className='form-error-message'>{errors.description.message}</span>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

type FileUploadProps = {
  handleChange: (file: File, type?: 'video' | 'audio', duration?: number) => void
}
const FileUpload = (props: FileUploadProps) => {
  const [duration, setDuration] = useState<number | undefined>()

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return
    const file = e.target.files[0]!
    let _type: 'video' | 'audio' | undefined

    if (videoValid.includes(file.type)) {
      _type = 'video'
      getVideoDuration(file)
    } else if (audioValid.includes(file.type)) {
      _type = 'audio'
      getAudioDuration(file)
    }
    console.log(duration)
    props.handleChange(file, _type, duration)
  }

  const getVideoDuration = (file: File) => {
    const video = document.createElement('video')
    video.preload = 'metadata'

    video.onloadedmetadata = () => {
      setDuration(video.duration)
      URL.revokeObjectURL(video.src)
    }

    video.src = URL.createObjectURL(file)
  }

  const getAudioDuration = (file: File) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const reader = new FileReader()

    reader.onload = async (event) => {
      const buffer = await audioContext.decodeAudioData(event.target!.result as ArrayBuffer)
      setDuration(buffer.duration)
      audioContext.close()
    }

    reader.readAsArrayBuffer(file)
  }

  return (
    <div className='pt-2'>
      <input type='file' name='file' id='upload-file' onChange={onChange} />
    </div>
  )
}
