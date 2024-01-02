import { Link } from 'react-router-dom'
import { dateFormat } from '../../utils'

export default function PostItem({ data }: { data: Post }) {
  const { slug, title, description, createdBy, createdAt, viewCount, likeCount, commentCount } = data
  return (
    <article className='d-flex flex-column'>
      {/* <div className="post-img">
        <img src="assets/img/blog/blog-1.jpg" alt="" className="img-fluid" />
      </div> */}

      <h2 className='title'>
        <Link to={'/post/' + slug}>{title}</Link>
      </h2>

      <div className='meta-top'>
        <ul>
          <li className='d-flex align-items-center'>
            <i className='bi bi-person'></i> <a href='#'>{createdBy.name?.firstName}</a>
          </li>
          <li className='d-flex align-items-center'>
            <i className='bi bi-clock'></i>{' '}
            <a href='#'>
              <time dateTime='2022-01-01'>{dateFormat(createdAt)}</time>
            </a>
          </li>
        </ul>
      </div>

      <div className='content'>
        <p>{description}</p>
      </div>

      <div className='read-more mt-auto align-self-end'>
        <div className='meta-top'>
          <ul>
            <li className='d-flex align-items-center'>
              <i className='bi bi-eye' />
              <a href='#'>{viewCount || 0}</a>
            </li>
            <li className='d-flex align-items-center'>
              <i className='bi bi-hand-thumbs-up'></i>
              <a href='#'>{likeCount}</a>
            </li>
            <li className='d-flex align-items-center'>
              <i className='bi bi-chat-dots'></i> <a href='#'>{commentCount}</a>
            </li>
          </ul>
        </div>
        <Link to={'/post/' + slug}>Read More</Link>
      </div>
    </article>
  )
}
