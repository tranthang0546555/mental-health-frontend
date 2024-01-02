import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { CATEGORY_LIST, useApi } from '../../../../api'

type Inputs = {
  name?: string
  description?: string
}

export default function CategoryCreate() {
  const navigate = useNavigate()
  const schema = yup
    .object<Inputs>({
      name: yup.string().required('Không để trống'),
      description: yup.string().required('Không để trống')
    })
    .required()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: Inputs) => {
    await useApi(CATEGORY_LIST, {
      method: 'POST',
      data: data
    }).then(() => {
      toast.success('Một thể loại mới đã được thêm')
      navigate('/dashboard/post/category')
    })
  }

  return (
    <section className='section'>
      <div className='card' id='profile-edit'>
        <div className='card-body pt-3'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='text-end pb-3'>
              <button type='submit' className='btn btn-primary'>
                Tạo mới
              </button>
            </div>
            <div className='row mb-3'>
              <label htmlFor='name' className='col-md-2 col-lg-2 col-form-label'>
                Tiêu đề
              </label>
              <div className='col-md-10 col-lg-10'>
                <input type='text' id='name' className='form-control' {...register('name')} />
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
