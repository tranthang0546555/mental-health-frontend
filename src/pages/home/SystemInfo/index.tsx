import { useEffect, useState } from "react";
import { HOME_SYSTEM_INFO, useApi } from "../../../api";

type SystemInfo = {
  post?: number;
  doctor?: number;
  user?: number;
  visitor?: number;
};

export default function SystemInfo() {
  const [data, setData] = useState<SystemInfo>();

  useEffect(() => {
    useApi(HOME_SYSTEM_INFO).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <section id="counts" className="counts">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="count-box">
              <i className="fas fa-newspaper"></i>
              <span className="purecounter">{data?.post}</span>
              <p>Bài viết</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
            <div className="count-box">
              <i className="fas fa-user-md"></i>
              <span className="purecounter">{data?.doctor}</span>
              <p>Bác sĩ</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
            <div className="count-box">
              <i className="fas fa-users"></i>
              <span className="purecounter">{data?.user}</span>
              <p>Người dùng</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
            <div className="count-box">
              <i className="fas fa-eye"></i>
              <span className="purecounter">{data?.visitor}</span>
              <p>Lượt truy cập</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
