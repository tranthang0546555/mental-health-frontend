import { useQuery } from '@tanstack/react-query'
import qs from 'qs'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { POST_LIST, useApi } from '../../api'
import Categories from '../../components/Categories'
import Pagination from '../../components/Pagination'
import RecentNews from '../../components/RecentNews'
import Search from '../../components/Search'
import Skeleton from '../../components/Skeleton'
import PostItem from './Post'
import './index.css'

type Filters = {
  page?: number
  keyword?: string
  category?: string
}

export default function Post() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState<Filters>(Object.fromEntries(searchParams))

  const fetchData = async (queries?: { [key: string]: unknown }) => {
    queries &&
      Object.keys(queries).forEach((key) => {
        if (queries[key] === undefined || queries[key] === '') delete queries[key]
      })
    const queryString = qs.stringify(queries)
    setSearchParams((prev) => ({ ...prev, ...queries }))
    const res = await useApi.get(POST_LIST + (queryString ? '?' + queryString : ''))
    const data = res.data as Data<Post>
    return data
  }

  const { data, isLoading } = useQuery({
    queryKey: ['posts', filters],
    queryFn: () => fetchData(filters)
  })

  return (
    <section id='blog' className='blog'>
      <div className='container' data-aos='fade-up'>
        <div className='row g-5'>
          <div className='col-lg-8'>
            <div className='row gy-4 posts-list'>
              {isLoading ? (
                Array.from(new Array(6)).map((_, idx) => (
                  <div className='col-lg-6' key={idx}>
                    <Skeleton variant='rounded' />
                    <Skeleton variant='text' />
                    <Skeleton variant='rounded' height='120px' />
                    <Skeleton variant='rounded' />
                  </div>
                ))
              ) : (
                <>
                  {data?.data.map((news, idx) => (
                    <div className='col-lg-6' key={idx}>
                      <PostItem data={news} />
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
          <div className='col-lg-4'>
            <div className='sidebar'>
              <Search defaultValue={filters?.keyword} onChange={(keyword) => setFilters({ keyword })} />
              <Categories onChange={(category) => setFilters({ category })} />
              <RecentNews />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
