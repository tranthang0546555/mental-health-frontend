import { useQuery } from "@tanstack/react-query";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<{
    page?: number;
    keyword?: string;
    category?: string;
  }>();

  useEffect(() => {
    const searchParamsObject = Object.fromEntries(searchParams);
    setFilters(searchParamsObject);
  }, []);

  const fetchData = async (queries?: { [key: string]: unknown }) => {
    queries &&
      Object.keys(queries).forEach((key) => {
        if (queries[key] === undefined || queries[key] === "")
          delete queries[key];
      });
    const queryString = qs.stringify(queries);
    setSearchParams((prev) => ({ ...prev, ...queries }));
    const data = (
      await useApi(POST_LIST + (queryString ? "?" + queryString : ""))
    ).data as Data<Post>;
    return data;
  };

  const { data } = useQuery({
    queryKey: ["posts", filters],
    queryFn: () => fetchData(filters),
  });

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
              onChange={(page) => setFilters((prev) => ({ ...prev, page }))}
            />
          </div>

          <div className="col-lg-4">
            <div className="sidebar">
              <Search
                defaultValue={filters?.keyword}
                onChange={(keyword) => setFilters({ keyword })}
              />
              <Categories onChange={(category) => setFilters({ category })} />
              <RecentNews />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
