export default function RecentItems() {
  return (
    <div className="sidebar-item recent-posts">
      <h3 className="sidebar-title">Recent Posts</h3>

      <div className="mt-3">
        <div className="post-item mt-3">
          <img
            src="assets/img/blog/blog-recent-1.jpg"
            alt=""
            className="flex-shrink-0"
          />
          <div>
            <h4>
              <a href="blog-post.html">Nihil blanditiis at in nihil autem</a>
            </h4>
            <time dateTime="2020-01-01">Jan 1, 2020</time>
          </div>
        </div>

        <div className="post-item">
          <img
            src="assets/img/blog/blog-recent-2.jpg"
            alt=""
            className="flex-shrink-0"
          />
          <div>
            <h4>
              <a href="blog-post.html">Quidem autem et impedit</a>
            </h4>
            <time dateTime="2020-01-01">Jan 1, 2020</time>
          </div>
        </div>

        <div className="post-item">
          <img
            src="assets/img/blog/blog-recent-3.jpg"
            alt=""
            className="flex-shrink-0"
          />
          <div>
            <h4>
              <a href="blog-post.html">
                Id quia et et ut maxime similique occaecati ut
              </a>
            </h4>
            <time dateTime="2020-01-01">Jan 1, 2020</time>
          </div>
        </div>

        <div className="post-item">
          <img
            src="assets/img/blog/blog-recent-4.jpg"
            alt=""
            className="flex-shrink-0"
          />
          <div>
            <h4>
              <a href="blog-post.html">Laborum corporis quo dara net para</a>
            </h4>
            <time dateTime="2020-01-01">Jan 1, 2020</time>
          </div>
        </div>

        <div className="post-item">
          <img
            src="assets/img/blog/blog-recent-5.jpg"
            alt=""
            className="flex-shrink-0"
          />
          <div>
            <h4>
              <a href="blog-post.html">
                Et dolores corrupti quae illo quod dolor
              </a>
            </h4>
            <time dateTime="2020-01-01">Jan 1, 2020</time>
          </div>
        </div>
      </div>
    </div>
  );
}
