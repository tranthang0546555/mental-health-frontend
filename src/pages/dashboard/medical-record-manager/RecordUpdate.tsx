import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { RECORD_DETAIL, useApi } from '../../../api'
import { avatarPath, dateFormat } from '../../../utils'

export default function RecordUpdate() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const [state, setState] = useState<MedicalRecordWithHistory>()

  useEffect(() => {
    ;(async () => {
      const data = await useApi.get(RECORD_DETAIL.replace(':id', id))
      setState(data.data)
      reset(data.data?.record.data)
    })()
  }, [])

  const schema = yup
    .object<MedicalRecordData>({
      medicalHistory: yup.string().required('Không để trống'),
      reason: yup.string().required('Không để trống'),
      status: yup.string().required('Không để trống'),
      diagnostic: yup.string().required('Không để trống'),
      treatment: yup.string().required('Không để trống')
    })
    .required()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<MedicalRecordData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: MedicalRecordData) => {
    await useApi.patch(RECORD_DETAIL.replace(':id', id), data)
    toast.success('Hoàn tất, dữ liệu sẽ cập nhật trong chốc lát')
    navigate('/dashboard/medical-record/')
  }

  if (!state) return <></>
  const {
    record: { data },
    user
  } = state

  return (
    <section className='section profile'>
      <div className='row'>
        <div className='col-xl-12'>
          <div className='card' id='profile-edit'>
            <div className='card-body pt-3'>
              <form onSubmit={handleSubmit(onSubmit, (invalid) => console.log(invalid))}>
                <div className='row mb-3'>
                  <label htmlFor='profileImage' className='col-md-4 col-lg-3 col-form-label'>
                    {/* Ảnh đại diện */}
                  </label>
                  <div className='col-md-8 col-lg-9'>
                    <img src={avatarPath(user?.avatar)} alt={user?.avatar} className='avatar-img' />
                  </div>
                </div>

                <div className='row mb-3'>
                  <label htmlFor='dayIn' className='col-md-4 col-lg-3 col-form-label'>
                    Thời gian
                  </label>
                  <div className='col-md-8 col-lg-9'>
                    <input
                      type='text'
                      id='dayIn'
                      className='form-control'
                      placeholder='DD/MM/YYYY'
                      disabled
                      value={dateFormat(data.dayIn)}
                    />
                  </div>
                </div>

                <hr />

                <div className='row mb-3'>
                  <label htmlFor='fullName' className='col-md-4 col-lg-3 col-form-label'>
                    Họ và tên
                  </label>
                  <div className='col-md-8 col-lg-9'>
                    <input type='text' id='fullName' className='form-control' disabled value={user?.fullName} />
                  </div>
                </div>

                <div className='row mb-3'>
                  <label htmlFor='phone' className='col-md-4 col-lg-3 col-form-label'>
                    Số điện thoại
                  </label>
                  <div className='col-md-8 col-lg-9'>
                    <input type='tel' id='phone' className='form-control' disabled value={user?.phone} />
                  </div>
                </div>

                <div className='row mb-3'>
                  <label htmlFor='gender' className='col-md-4 col-lg-3 col-form-label'>
                    Giới tính
                  </label>
                  <div className='col-md-8 col-lg-9'>
                    <select
                      id='gender'
                      className='form-select'
                      aria-label='Default select example'
                      disabled
                      value={user?.gender}>
                      <option value='1'>Nam</option>
                      <option value='2'>Nữ</option>
                      <option value='3'>Ẩn</option>
                    </select>
                  </div>
                </div>

                <div className='row mb-3'>
                  <label htmlFor='numberId' className='col-md-4 col-lg-3 col-form-label'>
                    Mã định danh
                  </label>
                  <div className='col-md-8 col-lg-9'>
                    <input type='tel' id='numberId' className='form-control' disabled value={user?.numberId} />
                  </div>
                </div>

                <div className='row mb-3'>
                  <label htmlFor='birthday' className='col-md-4 col-lg-3 col-form-label'>
                    Ngày sinh
                  </label>
                  <div className='col-md-8 col-lg-9'>
                    <input
                      type='date'
                      id='birthday'
                      className='form-control'
                      placeholder='DD/MM/YYYY'
                      disabled
                      value={user?.birthday}
                    />
                  </div>
                </div>

                <div className='row mb-3'>
                  <label htmlFor='address' className='col-md-4 col-lg-3 col-form-label'>
                    Địa chỉ
                  </label>
                  <div className='col-md-8 col-lg-9'>
                    <input type='text' id='address' className='form-control' disabled value={user?.address} />
                  </div>
                </div>
                <hr />

                <div className='row mb-3'>
                  <label htmlFor='medicalHistory' className='col-md-4 col-lg-3 col-form-label'>
                    Bệnh sử
                  </label>
                  <div className='col-md-8 col-lg-9'>
                    <textarea className='form-control' id='medicalHistory' rows={5} {...register('medicalHistory')} />
                    {errors.medicalHistory && (
                      <span className='form-error-message'>{errors.medicalHistory.message}</span>
                    )}
                  </div>
                </div>

                <div className='row mb-3'>
                  <label htmlFor='reason' className='col-md-4 col-lg-3 col-form-label'>
                    Lý do khám bệnh
                  </label>
                  <div className='col-md-8 col-lg-9'>
                    <textarea className='form-control' id='reason' rows={5} {...register('reason')} />
                    {errors.reason && <span className='form-error-message'>{errors.reason.message}</span>}
                  </div>
                </div>

                <div className='row mb-3'>
                  <label htmlFor='status' className='col-md-4 col-lg-3 col-form-label'>
                    Tình trạng ban đầu
                  </label>
                  <div className='col-md-8 col-lg-9'>
                    <textarea className='form-control' id='status' rows={5} {...register('status')} />
                    {errors.status && <span className='form-error-message'>{errors.status.message}</span>}
                  </div>
                </div>

                <div className='row mb-3'>
                  <label htmlFor='diagnostic' className='col-md-4 col-lg-3 col-form-label'>
                    Chẩn đoán bệnh
                  </label>
                  <div className='col-md-8 col-lg-9'>
                    <textarea className='form-control' id='diagnostic' rows={5} {...register('diagnostic')} />
                    {errors.diagnostic && <span className='form-error-message'>{errors.diagnostic.message}</span>}
                  </div>
                </div>

                <div className='row mb-3'>
                  <label htmlFor='treatment' className='col-md-4 col-lg-3 col-form-label'>
                    Phương pháp điều trị
                  </label>
                  <div className='col-md-8 col-lg-9'>
                    <textarea className='form-control' id='treatment' rows={5} {...register('treatment')} />
                    {errors.treatment && <span className='form-error-message'>{errors.treatment.message}</span>}
                  </div>
                </div>

                <div className='text-center'>
                  <button type='submit' className='btn btn-primary'>
                    Xác nhận
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
