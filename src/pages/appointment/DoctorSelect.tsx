import qs from "qs";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DOCTOR_LIST, useApi } from "../../api";
import Categories from "../../components/Categories";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";

import DoctorItem from "../doctor/DoctorItem";

export default function DoctorSelect() {
  const [data, setData] = useState<Data<Doctor>>();
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
    const data = (await useApi(DOCTOR_LIST + (query ? "?" + query : "")))
      .data as Data<Doctor>;
    setData(data);
  };

  return (
    <div id="blog" className="blog">
      <Search
        defaultValue={filters?.keyword}
        onChange={(text) => getData(text)}
      />
      <br />
      <div className="row gy-4 posts-list">
        {data?.data.map((doctor, idx) => (
          <div className="col-lg-6" key={idx}>
            <DoctorItem data={doctor} />
          </div>
        ))}
      </div>
      <Pagination
        pagination={data as Pagination}
        onChange={(page) => getData(undefined, page)}
      />
    </div>
  );
}
