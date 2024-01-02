import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { REGISTER_EMAIL_PASSWORD, useApi } from '../../../api'
import './index.css'

export default function Register() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<RegisterInputs>()
  const handleRegister = async (data: RegisterInputs) => {
    await useApi
      .post(REGISTER_EMAIL_PASSWORD, data)
      .then((res) => {
        toast.success(res.data?.message)
        navigate('/login')
      })
      .catch((err: any) => {
        toast.error(err.response?.data?.message)
      })
  }

  return (
    <section
      onSubmit={handleSubmit(handleRegister)}
      className='section register-form d-flex flex-column align-items-center justify-content-center py-4'
    >
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center'>
            <div className='d-flex justify-content-center py-4'></div>
            <div className='card mb-3'>
              <div className='card-body'>
                <div className='pt-4 pb-2'>
                  <h5 className='card-title text-center pb-0 fs-4'>ĐĂNG KÝ</h5>
                  <p className='text-center small'>Nhập email và mật khẩu của bạn</p>
                </div>

                <form action='#' className='row g-3 needs-validation' noValidate>
                  <div className='col-12'>
                    <label htmlFor='yourEmail' className='form-label'>
                      Email
                    </label>
                    <div className='input-group has-validation'>
                      <span className='input-group-text' id='inputGroupPrepend'>
                        @
                      </span>
                      <input type='email' className='form-control' id='yourEmail' required {...register('email')} />
                      <div className='invalid-feedback'>Xin hãy điền email.</div>
                    </div>
                  </div>

                  <div className='col-12'>
                    <label htmlFor='yourPassword' className='form-label'>
                      Mật khẩu
                    </label>
                    <input
                      type='password'
                      className='form-control'
                      id='yourPassword'
                      required
                      {...register('password')}
                    />
                    <div className='invalid-feedback'>Vui lòng nhập mật khẩu của bạn!</div>
                  </div>

                  <div className='col-12'>
                    <label htmlFor='yourRePassword' className='form-label'>
                      Xác nhận mật khẩu
                    </label>
                    <input
                      type='password'
                      className='form-control'
                      id='yourRePassword'
                      required
                      {...register('confirmPassword')}
                    />
                    <div className='invalid-feedback'>Vui lòng xác nhận mật khẩu của bạn!</div>
                  </div>
                  <div className='col-12 mt-4'>
                    <button className='btn btn-primary w-100' type='submit'>
                      Đăng ký
                    </button>
                  </div>
                  <div className='col-12'>
                    <p className='small mb-0 d-flex justify-content-between'>
                      <Link to='/login' className='text-primary'>
                        Đăng nhập?
                      </Link>
                      <Link to='/forgot-password' className='text-primary'>
                        Quên mật khẩu?
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
