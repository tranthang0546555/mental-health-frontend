import { useQuery } from '@tanstack/react-query'
import { Link, useLocation } from 'react-router-dom'
import { TREATMENT_LIST, useApi } from '../../api'
import Skeleton from '../../components/Skeleton'
import { audioPath, videoPath } from '../../utils'
import './index.css'

export default function Watch() {
  const { search } = useLocation()
  const id = new URLSearchParams(search).get('id')
  console.log('id', id)

  const fetchData = async () => {
    const res = await useApi.get(TREATMENT_LIST)
    const data = res.data as Data<Treatment>
    return data
  }

  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchData()
  })

  const currentPlay = data?.data.find((i) => i._id === id)!
  const another = data?.data.filter((i) => i._id !== id)

  return (
    <section id='treatment' className='treatment'>
      <div className='container'>
        {isLoading ? (
          <div className='row'>
            <div className='col-9'>
              <Skeleton variant='rounded' height='500px' />
              <Skeleton variant='rounded' height='50px' />
              <Skeleton variant='rounded' height='30px' />
            </div>
            <div className='col-3'>
              {Array.from(new Array(3)).map((_, idx) => (
                <div className='col-lg-12 mb-5' key={idx}>
                  <Skeleton variant='rounded' height='120px' />
                  <Skeleton variant='rounded' />
                  <Skeleton variant='text' />
                  <Skeleton variant='rounded' />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className='row'>
              <div className='col-lg-9'>
                {currentPlay?.link ? (
                  <iframe src={currentPlay.link} className='card-img-top' />
                ) : (
                  <video
                    src={currentPlay.type === 'video' ? videoPath(currentPlay.file) : audioPath(currentPlay.file)}
                    className='card-img-top'
                    controls></video>
                )}
                <br />
                <h5 className='pt-2'>
                  <p>{currentPlay.title}</p>
                </h5>
                <p>{currentPlay.description}</p>
                <hr />
              </div>
              <div className='col-lg-3 another'>
                <div className='row'>
                  {another?.map((item) => {
                    return (
                      <div className='col-4 col-lg-12 mb-2' key={item._id}>
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
                            <h5 className='card-title-2'>
                              <Link to={`/treatment/watch?id=${item._id}`}>{item.title}</Link>
                            </h5>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </>
        )}
        {data?.totalRecords === 0 && <h4>Không tìm thấy kết quả nào!</h4>}
      </div>
    </section>
  )
}
