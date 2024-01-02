import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ACCOUNT_ACTIVE, useApi } from '../../../api'

export default function AccountActive() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<ForgotPasswordInputs>()
  const handleActive = async (data: ForgotPasswordInputs) => {
    await useApi
      .get(ACCOUNT_ACTIVE.replace(':id', data.email))
      .then((res) => {
        toast.success(res.data?.message)
        navigate('/login')
      })
      .catch((err: any) => {
        toast.error(err.response?.data?.message)
      })
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
                  <h5 className='card-title text-center pb-0 fs-4'>XÁC NHẬN ĐĂNG KÝ</h5>
                  <p className='text-center small'>Nhập địa chỉ email của bạn</p>
                </div>

                <form className='row g-3' onSubmit={handleSubmit(handleActive)}>
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
                    <button className='btn btn-primary w-100' type='submit'>
                      Xác nhận
                    </button>
                  </div>
                  <div className='col-12'>
                    <p className='small mb-0 d-flex justify-content-between'>
                      <Link to='/login' className='text-primary'>
                        Đăng nhập?
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
