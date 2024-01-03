import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RECORD_BY_DOCTOR, RECORD_BY_USER, useApi } from '../../../api'
import Search from '../../../components/Search'
import { useAppSelector } from '../../../hooks/store'
import { dateFormat } from '../../../utils'

export default function RecordList() {
  const uId = useAppSelector((state) => state.auth.user?._id)!
  const [data, setData] = useState<MedicalRecord[]>([])
  const role = useAppSelector((state) => state.auth.user?.role)
  const navigate = useNavigate()

  const columns = useMemo<MRT_ColumnDef<MedicalRecord>[]>(
    () => [
      {
        header: 'Thời gian khám bệnh',
        accessorFn: ({ data }) => dateFormat(data.dayIn)
      },
      {
        header: role === 'user' ? 'Bác sĩ' : 'Bệnh nhân',
        accessorFn: ({ user, doctor }) => (role === 'user' ? doctor?.fullName : user?.fullName)
      },
      {
        header: 'Email',
        accessorFn: ({ user, doctor }) => (role === 'user' ? doctor?.email : user?.email)
      },
      {
        header: 'Tạo',
        accessorFn: ({ createdAt }) => dateFormat(createdAt)
      },
      {
        header: 'Cập nhật',
        accessorFn: ({ updatedAt }) => updatedAt && dateFormat(updatedAt)
      }
      // {
      //   header: "Trạng thái",
      //   accessorFn: ({ isDeleted }) => isDeleted && "Đã xóa",
      // },
    ],
    []
  )

  useEffect(() => {
    ;(async () => {
      const url = role == 'doctor' ? RECORD_BY_DOCTOR : RECORD_BY_USER
      const data = await useApi.get(url.replace(':id', uId))
      setData(data.data)
    })()
  }, [])

  return (
    <section className='section'>
      <Search />
      <MaterialReactTable
        columns={columns}
        data={data}
        enableFilters={false}
        enableRowNumbers
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => navigate('/dashboard/medical-record/' + row.id),
          sx: { cursor: 'pointer' }
        })}
      />
    </section>
  )
}
