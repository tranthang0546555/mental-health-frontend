import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../../../hooks/store'
import { login } from '../../../store/authSlice'
import './index.css'
import { Link } from 'react-router-dom'

export default function Login() {
  const { register, handleSubmit } = useForm<LoginInputs>()
  const dispatch = useAppDispatch()

  const handleLogin = (data: LoginInputs) => {
    dispatch(login(data))
  }

  return (
    <section className='section login-form d-flex flex-column align-items-center justify-content-center py-4'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center'>
            <div className='d-flex justify-content-center py-4'></div>
            <div className='card mb-3'>
              <div className='card-body'>
                <div className='pt-4 pb-2'>
                  <h5 className='card-title text-center pb-0 fs-4'>ĐĂNG NHẬP</h5>
                  <p className='text-center small'>Nhập email và mật khẩu của bạn</p>
                </div>

                <form className='row g-3' onSubmit={handleSubmit(handleLogin)}>
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
                    <button className='btn btn-primary w-100' type='submit'>
                      Đăng nhập
                    </button>
                  </div>
                  <div className='col-12'>
                    <p className='small mb-0 d-flex justify-content-between'>
                      <Link to='/register' className='text-primary'>
                        Đăng ký tài khoản?
                      </Link>
                      <div style={{ textAlign: 'right' }}>
                        <Link to='/forgot-password' className='text-primary'>
                          Quên mật khẩu?
                        </Link>
                        <br />
                        <Link to='/change-password' className='text-primary'>
                          Đổi mật khẩu?
                        </Link>
                        <br />
                        <Link to='/account-active' className='text-primary'>
                          Tài khoản chưa kích hoạt?
                        </Link>
                      </div>
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
