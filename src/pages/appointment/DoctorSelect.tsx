import qs from 'qs'
import { useEffect, useState } from 'react'
import { DOCTOR_LIST, useApi } from '../../api'
import Pagination from '../../components/Pagination'
import Search from '../../components/Search'
import DoctorItem from '../doctor/DoctorItem'

type Props = {
  onSelect: (doctor?: Doctor) => void
}

export default function DoctorSelect(props: Props) {
  const [data, setData] = useState<Data<Doctor>>()
  const [filters, setFilters] = useState<{ keyword?: string }>()

  useEffect(() => {
    getData()
  }, [])

  const getData = async (text?: string, page?: number) => {
    const keyword = (page ? filters?.keyword : text) || ''
    const query = qs.stringify({ keyword, page })
    setFilters({ keyword })
    const data = (await useApi.get(DOCTOR_LIST + (query ? '?' + query : ''))).data as Data<Doctor>
    setData(data)
  }

  return (
    <div id='blog' className='blog'>
      <div className='d-flex justify-content-between'>
        Chúng tôi sẽ sắp xếp Bác sĩ giúp bạn, nhấn vào đây để tiếp tục!
        <button className='btn btn-secondary' onClick={() => props.onSelect(undefined)}>
          Tiếp tục
        </button>
      </div>
      <hr />
      <Search defaultValue={filters?.keyword} onChange={(text) => getData(text)} />
      <br />
      <div className='row gy-4 posts-list'>
        {data?.data.map((doctor, idx) => (
          <div className='col-lg-6' key={idx} style={{ cursor: 'copy' }} onClick={() => props.onSelect(doctor)}>
            <DoctorItem data={doctor} disableNavigate />
          </div>
        ))}
      </div>
      <Pagination pagination={data as Pagination} onChange={(page) => getData(undefined, page)} />
    </div>
  )
}
