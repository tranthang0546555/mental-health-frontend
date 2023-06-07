import { useEffect, useState } from "react";
import { POST_LIST, useApi } from "../../api";
import { dateFormat } from "../../utils";
import "./index.css";

export default function RecentNews() {
  const [newsList, setNewList] = useState<News[]>([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res: Data<News> = (await useApi(POST_LIST)).data;
    setNewList(res.data);
  };
  return (
    <div className="sidebar-item recent-posts">
      <h3 className="sidebar-title">Recent Posts</h3>

      <div className="mt-3">
        {newsList.map(({ slug, title, createdAt }, idx) => (
          <div className="post-item">
            <img
              src="assets/img/blog/blog-recent-1.jpg"
              alt=""
              className="flex-shrink-0"
            />
            <div>
              <h4>
                <a href="blog-post.html">{title}</a>
              </h4>
              <time dateTime="2020-01-01">{dateFormat(createdAt)}</time>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
