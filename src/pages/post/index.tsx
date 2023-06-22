import qs from "qs";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { POST_LIST, useApi } from "../../api";
import Categories from "../../components/Categories";
import Pagination from "../../components/Pagination";
import RecentNews from "../../components/RecentNews";
import Search from "../../components/Search";
import PostItem from "./Post";
import "./index.css";

export default function Post() {
  const [data, setData] = useState<Data<Post>>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<{
    keyword?: string;
    category?: string;
  }>();

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    const keyword = searchParams.get("keyword") || "";
    const category = searchParams.get("category") || "";
    setFilters({ keyword, category });
    getData(keyword, page, category);
  }, []);

  const getData = async (text?: string, page?: number, cate?: string) => {
    const keyword = (page ? filters?.keyword : text) || "";
    const category = (page ? filters?.category : cate) || "";
    const query = qs.stringify({ keyword, page, category });
    setSearchParams({
      keyword,
      page: page?.toString() || "1",
      category,
    });
    setFilters({ keyword, category });
    const data = (await useApi(POST_LIST + (query ? "?" + query : "")))
      .data as Data<Post>;
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
              {data?.totalRecords === 0 && <h4>Không tìm thấy kết quả nào!</h4>}
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
              <Categories
                onChange={(cate) => getData(undefined, undefined, cate)}
              />
              <RecentNews />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
