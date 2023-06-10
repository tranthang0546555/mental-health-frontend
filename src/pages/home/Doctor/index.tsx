import { useEffect, useState } from "react";
import { DOCTOR_LIST, useApi } from "../../../api";
import qs from "qs";
import DoctorItem from "../../doctor/DoctorItem";

export default function Doctor() {
  const [data, setData] = useState<Data<Doctor>>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const query = qs.stringify({ size: 8 });
    const data = (await useApi(DOCTOR_LIST + (query ? "?" + query : "")))
      .data as Data<Doctor>;
    setData(data);
  };

  return (
    <section id="doctors" className="doctors">
      <div className="container">
        <div className="section-title">
          <h2>Đội ngũ bác sĩ tâm lý chuyên nghiệp</h2>
          <p>
            Quy tụ đội ngũ chuyên gia, bác sĩ, tư vấn và điều trị viên được đào
            tạo bài bản đến chuyên sâu tại Việt Nam. Luôn lấy người bệnh là
            trung tâm, cam kết mang lại dịch vụ chăm sóc sức khỏe toàn diện và
            chất lượng cao cho khách hàng.
          </p>
        </div>

        <div className="row">
          {data?.data.map((doctor) => (
            <div className="col-lg-6" key={doctor._id}>
              <DoctorItem data={doctor} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
