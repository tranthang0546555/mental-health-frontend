import { useEffect, useState } from 'react'
import { POST_LIST, useApi } from '../../api'
import { dateFormat } from '../../utils'
import './index.css'

export default function RecentNews() {
  const [newsList, setNewList] = useState<Post[]>([])
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    const res: Data<Post> = (await useApi(POST_LIST)).data
    setNewList(res.data)
  }
  return (
    <div className='sidebar-item recent-posts'>
      <h3 className='sidebar-title'>Bài viết gần đây</h3>

      <div className='mt-3'>
        {newsList.map(({ _id, title, createdAt }) => (
          <div className='post-item' key={_id}>
            {/* <img
              src="assets/img/blog/blog-recent-1.jpg"
              alt=""
              className="flex-shrink-0"
            /> */}
            <div>
              <h4>
                <a href='blog-post.html'>{title}</a>
              </h4>
              <time dateTime='2020-01-01'>{dateFormat(createdAt)}</time>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
