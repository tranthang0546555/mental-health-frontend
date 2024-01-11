import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { POST_DETAIL, useApi } from '../../api'
import RecentNews from '../../components/RecentNews'
import { dateFormat } from '../../utils'
import { CommentBar } from './CommentBar'
import './index.css'

export default function PostDetail() {
  const { slug = '' } = useParams()
  const [data, setData] = useState<Post>()

  useEffect(() => {
    getData(slug)
  }, [])

  const getData = async (slug: string) => {
    const data = (await useApi.get(POST_DETAIL.replace(':slug', slug))).data as Post
    setData(data)
  }
  if (!data) return <></>
  const { title, createdAt, createdBy, description, content, viewCount, likeCount, commentCount } = data
  return (
    <section id='blog-detail' className='blog-detail'>
      <div className='container' data-aos='fade-up'>
        <div className='row g-5'>
          <div className='col-lg-8'>
            <h2>{title}</h2>
            <div className='counter'>
              <span>
                <i className='bi bi-person'></i> {createdBy.name?.firstName}
              </span>
              <span>
                <i className='bi bi-clock'></i> <time dateTime='2022-01-01'>{dateFormat(createdAt)}</time>
              </span>
              <ul>
                <li className='d-flex align-items-center'>
                  <i className='bi bi-eye' />
                  {viewCount}
                </li>
                <li className='d-flex align-items-center'>
                  <i className='bi bi-hand-thumbs-up'></i>
                  {likeCount}
                </li>
                <li className='d-flex align-items-center'>
                  <i className='bi bi-chat-dots'></i> {commentCount}
                </li>
              </ul>
            </div>
            <h5>{description}</h5>
            <br />
            <article dangerouslySetInnerHTML={{ __html: content }} />
            <CommentBar postId={data._id} />
          </div>

          <div className='col-lg-4'>
            <div className='sidebar'>
              <RecentNews />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
