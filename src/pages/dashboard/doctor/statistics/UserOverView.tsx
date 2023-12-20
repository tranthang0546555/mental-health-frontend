import { useEffect, useState } from "react";
import { HOME_SYSTEM_INFO, useApi } from "../../../../api";
import { DoughnutChart } from "../../../../components/Chart";
import { numberFormat } from "../../../../utils";

export default function UserOverView() {
  const [data, setData] = useState<CountsInfo>();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await useApi.get(HOME_SYSTEM_INFO).then((res) => {
      setData(res.data);
    });
  };

  return (
    <div className="user-overview">
      <div className="row">
        <div className="col-md-12 p-5">
          <div className="row">
            <div className="col-md-6">
              <div className="card info-card sales-card">
                <div className="card-body">
                  <h5 className="card-title">Bệnh nhân</h5>
                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-person"></i>
                    </div>
                    <div className="ps-3">
                      <h6>{numberFormat(data?.user)}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card info-card sales-card">
                <div className="card-body">
                  <h5 className="card-title">Bác sĩ</h5>
                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-person"></i>
                    </div>
                    <div className="ps-3">
                      <h6>{numberFormat(data?.doctor)}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card info-card sales-card">
                <div className="card-body">
                  <h5 className="card-title">Bài viết</h5>
                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-person"></i>
                    </div>
                    <div className="ps-3">
                      <h6>{numberFormat(data?.post)}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card info-card sales-card">
                <div className="card-body">
                  <h5 className="card-title">Truy cập</h5>
                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-person"></i>
                    </div>
                    <div className="ps-3">
                      <h6>{numberFormat(data?.visitor)}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 chart">
          <DoughnutChart
            title="Người dùng có tài khoản trong hệ thống"
            label="Tài khoản"
            data={{
              labels: ["Bệnh nhân", "Bác sĩ"],
              data: [data?.user || 0, data?.doctor || 0],
            }}
          />
        </div>
      </div>
    </div>
  );
}
