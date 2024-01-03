import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RECORD_BY_DOCTOR, RECORD_BY_NUMBERID, RECORD_BY_USER, useApi } from '../../../api'
import Search from '../../../components/Search'
import { useAppSelector } from '../../../hooks/store'
import { dateFormat, getQuery } from '../../../utils'

export default function MedicalRecords() {
  const uId = useAppSelector((state) => state.auth.user?._id)!
  const [data, setData] = useState<MedicalRecord[]>([])
  const role = useAppSelector((state) => state.auth.user?.role)
  const navigate = useNavigate()
  const numberId = getQuery('numberId')

  const columns = useMemo<MRT_ColumnDef<MedicalRecord>[]>(
    () => [
      {
        header: 'Thời gian khám bệnh',
        accessorFn: ({ data }) => dateFormat(data.dayIn)
      },
      {
        header: role === 'user' ? 'Bác sĩ' : 'Bệnh nhân',
        accessorFn: ({ data: { user, doctor } }) => (role === 'user' ? doctor?.fullName : user?.fullName)
      },
      {
        header: 'Email',
        accessorFn: ({ data: { user, doctor } }) => (role === 'user' ? doctor?.email : user?.email)
      },
      {
        header: 'Tạo',
        accessorFn: ({ createdAt }) => dateFormat(createdAt)
      },
      {
        header: 'Cập nhật',
        accessorFn: ({ updatedAt }) => updatedAt && dateFormat(updatedAt)
      }
    ],
    []
  )

  useEffect(() => {
    if (numberId) handleSearch(numberId)
    else fetch()
  }, [])

  const fetch = async () => {
    const url = role == 'doctor' ? RECORD_BY_DOCTOR : RECORD_BY_USER
    const data = await useApi.get(url.replace(':id', uId))
    setData(data.data)
  }

  const handleSearch = async (text: string) => {
    const _text = text.trim()
    if (text) {
      const data = await useApi.get(RECORD_BY_NUMBERID.replace(':id', _text))
      setData(data.data)
    } else fetch()
  }

  return (
    <section className='section record-list'>
      <div>
        {(role === 'doctor' || role === 'admin') && (
          <div className='search-box'>
            <Search
              placeholder='Nhập số CMND/CCCD của bệnh nhân'
              title=''
              onChange={handleSearch}
              defaultValue={numberId!}
            />
          </div>
        )}
        <MaterialReactTable
          columns={columns}
          data={data}
          enableFilters={false}
          enableRowNumbers
          muiTableBodyRowProps={({ row }) => ({
            onClick: () => navigate('/dashboard/medical-record/' + row.original.id),
            sx: { cursor: 'pointer' }
          })}
        />
      </div>
    </section>
  )
}
