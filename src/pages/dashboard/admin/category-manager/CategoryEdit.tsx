import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { CATEGORY_DETAIL, useApi } from '../../../../api'

type Inputs = {
  name?: string
  description?: string
}

export default function CategoryEdit() {
  const { id = '' } = useParams()

  const schema = yup
    .object<Inputs>({
      name: yup.string().required('Không để trống'),
      description: yup.string().required('Không để trống')
    })
    .required()

  useEffect(() => {
    getPost()
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(schema)
  })

  const getPost = async () => {
    await useApi(CATEGORY_DETAIL.replace(':id', id)).then((res) => {
      const data = res.data as Category
      reset({
        name: data.name,
        description: data.description
      })
    })
  }

  const onSubmit = async (data: Inputs) => {
    await useApi(CATEGORY_DETAIL.replace(':id', id), {
      method: 'PATCH',
      data: data
    }).then(() => {
      toast.success('Thay đổi đã được lưu')
    })
  }

  return (
    <section className='section'>
      <div className='card' id='profile-edit'>
        <div className='card-body pt-3'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='text-end pb-3'>
              <button type='submit' className='btn btn-primary'>
                Lưu thay đổi
              </button>
            </div>
            <div className='row mb-3'>
              <label htmlFor='title' className='col-md-2 col-lg-2 col-form-label'>
                Tiêu đề
              </label>
              <div className='col-md-10 col-lg-10'>
                <input type='text' id='title' className='form-control' {...register('name')} />
                {errors.name && <span className='form-error-message'>{errors.name.message}</span>}
              </div>
            </div>

            <div className='row mb-3'>
              <label htmlFor='description' className='col-md-2 col-lg-2 col-form-label'>
                Mô tả
              </label>
              <div className='col-md-10 col-lg-10'>
                <textarea
                  className='form-control'
                  id='description'
                  style={{ height: '100px' }}
                  {...register('description')}
                />
                {errors.description && <span className='form-error-message'>{errors.description.message}</span>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
