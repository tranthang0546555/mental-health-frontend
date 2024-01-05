import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { TREATMENT_LIST, useApi } from '../../api'
import Skeleton from '../../components/Skeleton'
import { audioPath, videoPath } from '../../utils'
import './index.css'

export default function Treatment() {
  const fetchData = async () => {
    const res = await useApi.get(TREATMENT_LIST)
    const data = res.data as Data<Treatment>
    return data
  }

  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchData()
  })

  return (
    <section id='treatment' className='treatment'>
      <div className='container'>
        <div className='row'>
          {isLoading ? (
            Array.from(new Array(6)).map((_, idx) => (
              <div className='col-lg-4' key={idx}>
                <Skeleton variant='rounded' height='120px' />
                <Skeleton variant='rounded' />
                <Skeleton variant='text' />
                <Skeleton variant='rounded' />
              </div>
            ))
          ) : (
            <>
              {data?.data.map((item) => {
                return (
                  <div className='col-lg-4 p-3 ' key={item._id}>
                    <div className='card'>
                      <div className='preview'>
                        {item?.link ? (
                          <iframe
                            src={item.link + '&autoplay=0&showinfo=0&controls=0&autohide=1'}
                            className='card-img-top'
                          />
                        ) : (
                          <video
                            src={item.type === 'video' ? videoPath(item.file) : audioPath(item.file)}
                            className='card-img-top'
                            controls></video>
                        )}
                      </div>
                      <div className='card-body'>
                        <h5 className='card-title'>
                          <Link to={`/treatment/watch?id=${item._id}`}>{item.title}</Link>
                        </h5>
                        <p className='card-text'>{item.description}</p>
                        <Link to={`/treatment/watch?id=${item._id}`} className='btn btn-primary'>
                          Phát ngay
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </>
          )}
          {data?.totalRecords === 0 && <h4>Không tìm thấy kết quả nào!</h4>}
        </div>
      </div>
    </section>
  )
}
