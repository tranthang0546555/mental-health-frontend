import qs from "qs";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DOCTOR_LIST, useApi } from "../../api";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import { useQuery } from "@tanstack/react-query";
import DoctorItem from "./DoctorItem";
import "./index.css";

const fetchData = async (queries: { [key: string]: unknown }) => {
  Object.keys(queries).forEach((key) => {
    if (queries[key] === undefined || queries[key] === "") delete queries[key];
  });
  const queriesString = qs.stringify(queries);
  const data = (
    await useApi.get(DOCTOR_LIST + (queriesString ? "?" + queriesString : ""))
  ).data as Data<Doctor>;
  return data;
};

export default function Doctor() {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const searchParamsObject = Object.fromEntries(searchParams);
    const { _page = 1, _keyword } = searchParamsObject;
    setPage(Number(_page));
    setKeyword(_keyword);
  }, []);

  const { data } = useQuery({
    queryKey: ["doctors", { page, keyword }],
    queryFn: () => fetchData({ page, keyword, size: 10 }),
  });

  return (
    <section id="blog" className="blog">
      <div className="container" data-aos="fade-up">
        <div className="row g-5">
          <div className="col-lg-9">
            <div className="row gy-4 posts-list">
              {data?.data.map((doctor, idx) => (
                <div className="col-lg-6" key={idx}>
                  <DoctorItem data={doctor} />
                </div>
              ))}
            </div>
            <Pagination
              pagination={data as Pagination}
              onChange={(page) => setPage(page)}
            />
          </div>

          <div className="col-lg-3">
            <div className="sidebar">
              <Search
                defaultValue={keyword}
                onChange={(text) => {
                  setKeyword(text);
                  setPage(1);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
