import { dateFormat } from "../../utils";

export default function NewsItem({ data }: { data: News }) {
  const {
    _id,
    id,
    slug,
    title,
    description,
    createdBy,
    createdAt,
    viewCount,
    likeCount,
    commentCount,
    updatedAt,
  } = data;
  return (
    <article className="d-flex flex-column">
      <div className="post-img">
        <img src="assets/img/blog/blog-1.jpg" alt="" className="img-fluid" />
      </div>

      <h2 className="title">
        <a href="#">{title}</a>
      </h2>

      <div className="meta-top">
        <ul>
          <li className="d-flex align-items-center">
            <i className="bi bi-person"></i>{" "}
            <a href="#">
              {createdBy.name.lastName + " " + createdBy.name.firstName}
            </a>
          </li>
          <li className="d-flex align-items-center">
            <i className="bi bi-clock"></i>{" "}
            <a href="#">
              <time dateTime="2022-01-01">{dateFormat(createdAt)}</time>
            </a>
          </li>
        </ul>
      </div>

      <div className="content">
        <p>{description}</p>
      </div>

      <div className="read-more mt-auto align-self-end">
        <div className="meta-top">
          <ul>
            <li className="d-flex align-items-center">
              <i className="bi bi-eye" />
              <a href="#">{viewCount || 0}</a>
            </li>
            <li className="d-flex align-items-center">
              <i className="bi bi-hand-thumbs-up"></i>
              <a href="#">{likeCount}</a>
            </li>
            <li className="d-flex align-items-center">
              <i className="bi bi-chat-dots"></i> <a href="#">{commentCount}</a>
            </li>
          </ul>
        </div>
        <a href="blog-details.html">Read More</a>
      </div>
    </article>
  );
}
