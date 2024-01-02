import { useQuery } from '@tanstack/react-query'
import qs from 'qs'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DOCTOR_LIST, useApi } from '../../api'
import Pagination from '../../components/Pagination'
import Search from '../../components/Search'
import Skeleton from '../../components/Skeleton'
import DoctorItem from './DoctorItem'
import './index.css'

export default function Doctor() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState<{ page?: number; keyword?: string }>(Object.fromEntries(searchParams))

  const fetchData = async (queries?: { [key: string]: unknown }) => {
    queries &&
      Object.keys(queries).forEach((key) => {
        if (queries[key] === undefined || queries[key] === '') delete queries[key]
      })
    setSearchParams((prev) => ({ ...prev, ...queries }))
    const queriesString = qs.stringify(queries)
    const data = (await useApi.get(DOCTOR_LIST + (queriesString ? '?' + queriesString : ''))).data as Data<Doctor>
    return data
  }

  const { data, isLoading } = useQuery({
    queryKey: ['doctors', filters],
    queryFn: () => fetchData(filters)
  })

  return (
    <section id='blog' className='blog'>
      <div className='container' data-aos='fade-up'>
        <div className='row g-5'>
          <div className='col-lg-9'>
            <div className='row gy-4 posts-list'>
              {isLoading ? (
                Array.from(new Array(6)).map((_, idx) => (
                  <div className='col-lg-6 row p-3' key={idx}>
                    <div className='col d-flex align-items-center'>
                      <Skeleton variant='circular' height='120px' width='120px' />
                    </div>
                    <div className='col-8'>
                      <Skeleton variant='rounded' />
                      <Skeleton variant='text' />
                      <Skeleton variant='rounded' height='120px' />
                    </div>
                  </div>
                ))
              ) : (
                <>
                  {data?.data.map((doctor, idx) => (
                    <div className='col-lg-6' key={idx}>
                      <DoctorItem data={doctor} />
                    </div>
                  ))}
                  <Pagination
                    pagination={data as Pagination}
                    onChange={(page) => setFilters((prev) => ({ ...prev, page }))}
                  />
                </>
              )}
              {data?.totalRecords === 0 && <h4>Không tìm thấy kết quả nào!</h4>}
            </div>
          </div>

          <div className='col-lg-3'>
            <div className='sidebar'>
              <Search defaultValue={filters?.keyword} onChange={(keyword) => setFilters({ keyword, page: 1 })} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
