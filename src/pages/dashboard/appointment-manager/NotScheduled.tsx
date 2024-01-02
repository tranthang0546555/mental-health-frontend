import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table'
import { useLayoutEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { DOCTOR_LIST, NOT_YET_SCHEDULED, SET_DOCTOR_SCHEDULE, useApi } from '../../../api'
import Modal from '../../../components/Modal'
import { dateFormat, hourFormat } from '../../../utils'

export default function NotYetScheduled() {
  const [data, setData] = useState<Appointment[]>([])
  const [doctors, setDoctors] = useState<Doctor[]>([])

  useLayoutEffect(() => {
    getData()
  }, [])

  const columns = useMemo<MRT_ColumnDef<Appointment>[]>(
    () => [
      {
        header: 'Tên',
        accessorFn: (originalRow) => originalRow.user.fullName
      },
      {
        header: 'Tạo lúc',
        accessorFn: (originalRow) => dateFormat(originalRow.createdAt)
      },
      {
        header: 'Thời gian khám',
        accessorFn: (originalRow) => hourFormat(originalRow.from) + ' - ' + dateFormat(originalRow.to)
      },
      {
        id: 'room',
        header: 'Phòng',
        accessorFn({ code }) {
          return (
            <Link to={`/online-appointment/${code}`}>
              <b style={{ color: 'var(--color-default)' }}>{code}</b>
            </Link>
          )
        },
        size: 1
      },
      {
        id: 'success',
        header: 'Chọn bác sĩ',
        accessorFn({ _id }) {
          return (
            <div className='group-btn'>
              <Modal
                id={_id}
                name='accept'
                onSubmit={(doctorId: any) => handleSuccess(_id, doctorId)}
                title={'Sắp xếp bác sĩ cho bệnh nhân'}
                description='Bác sĩ'
                button={
                  <button className='btn btn-success'>
                    <i className='bi bi-person-plus-fill'></i>
                  </button>
                }
                optional={{
                  select: {
                    options: doctors.map((d: any) => ({
                      name: d.fullName,
                      value: d._id
                    })),
                    attributes: {
                      defaultValue: doctors?.[0]._id
                    }
                  }
                }}
              />
            </div>
          )
        }
      }
    ],
    [doctors]
  )

  const getData = async () => {
    await useApi
      .get(NOT_YET_SCHEDULED)
      .then((res) => {
        const data = res.data as Data<Appointment>
        setData(data.data)
      })
      .catch()

    await useApi
      .get(DOCTOR_LIST)
      .then((res) => {
        const data = res.data as Data<Doctor>
        setDoctors(data.data)
      })
      .catch()
  }

  const handleSuccess = async (id: string, doctorId: string) => {
    await useApi
      .patch(SET_DOCTOR_SCHEDULE.replace(':id', id), {
        doctorId
      })
      .then(() => {
        getData()
        toast.success('Thao tác thành công')
      })
  }
  if (!doctors.length) return <></>
  return (
    <section className='section'>
      <MaterialReactTable columns={columns} data={data} enableFilters={false} enableRowNumbers state={{}} />
    </section>
  )
}
