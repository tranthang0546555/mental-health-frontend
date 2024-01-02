import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { CATEGORY_LIST, POST_DETAIL, useApi } from '../../../../api'
import { PostInputs } from './PostCreate'
import './index.css'

export default function PostEdit() {
  const { slug = '' } = useParams()
  const [categories, setCategories] = useState<Category[]>([])

  const schema = yup
    .object<PostInputs>({
      title: yup.string().required('Không để trống'),
      description: yup.string().required('Không để trống'),
      content: yup.string().required('Không để trống'),
      category: yup.string().required('Không để trống')
    })
    .required()

  useEffect(() => {
    getPost()
    getCategoriest()
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
    setValue
  } = useForm<PostInputs>({
    resolver: yupResolver(schema)
  })

  const getCategoriest = async () => {
    await useApi.get(CATEGORY_LIST).then((res) => {
      const data = res.data as Data<Category>
      setCategories(data.data)
    })
  }

  const getPost = async () => {
    await useApi.get(POST_DETAIL.replace(':slug', slug)).then((res) => {
      const data = res.data as Post
      reset({
        title: data.title,
        description: data.description,
        content: data.content,
        category: data.category._id
      })
    })
  }

  const onSubmit = async (data: PostInputs) => {
    await useApi.patch(POST_DETAIL.replace(':slug', slug), data).then(() => {
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
                <input type='text' id='title' className='form-control' {...register('title')} />
                {errors.title && <span className='form-error-message'>{errors.title.message}</span>}
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

            <div className='row mb-3'>
              <label htmlFor='category' className='col-md-2 col-lg-2 col-form-label'>
                Thể loại
              </label>
              <div className='col-md-10 col-lg-10'>
                <select className='form-control' {...register('category')}>
                  <option value=''>Chọn</option>
                  {categories.map(({ _id, name }) => (
                    <option key={_id} value={_id}>
                      {name}
                    </option>
                  ))}
                </select>
                {errors.category && <span className='form-error-message'>{errors.category.message}</span>}
              </div>
            </div>

            <div className='row mb-3'>
              <label htmlFor='content' className='col-md-2 col-lg-2 col-form-label'>
                Nội dung
              </label>
              <div className='content-editor'>
                <CKEditor
                  editor={ClassicEditor}
                  data={getValues('content')}
                  onBlur={(_, editor) => {
                    setValue('content', editor.getData())
                  }}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
