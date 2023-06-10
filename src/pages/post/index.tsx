import qs from "qs";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { POST_LIST, useApi } from "../../api";
import Categories from "../../components/Categories";
import Pagination from "../../components/Pagination";
import RecentNews from "../../components/RecentNews";
import Search from "../../components/Search";
import NewsItem from "./Post";
import "./index.css";
import PostItem from "./Post";

export default function Post() {
  const [data, setData] = useState<Data<News>>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<{ keyword?: string }>();

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    const keyword = searchParams.get("keyword") || "";
    setFilters({ keyword });
    getData(keyword, page);
  }, []);

  const getData = async (text?: string, page?: number) => {
    const keyword = (page ? filters?.keyword : text) || "";
    const query = qs.stringify({ keyword, page });
    setSearchParams({
      keyword,
      page: page?.toString() || "1",
    });
    setFilters({ keyword });
    const data = (await useApi(POST_LIST + (query ? "?" + query : "")))
      .data as Data<News>;
    setData(data);
  };

  return (
    <section id="blog" className="blog">
      <div className="container" data-aos="fade-up">
        <div className="row g-5">
          <div className="col-lg-8">
            <div className="row gy-4 posts-list">
              {data?.data.map((news, idx) => (
                <div className="col-lg-6" key={idx}>
                  <PostItem data={news} />
                </div>
              ))}
            </div>
            <Pagination
              pagination={data as Pagination}
              onChange={(page) => getData(undefined, page)}
            />
          </div>

          <div className="col-lg-4">
            <div className="sidebar">
              <Search
                defaultValue={filters?.keyword}
                onChange={(text) => getData(text)}
              />
              <Categories />
              <RecentNews />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const options: Record<string, string> = {
  newest: "Mới nhất",
  popular: "Phổ biến",
  rate: "Đánh giá",
};
