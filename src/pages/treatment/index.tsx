import { useQuery } from "@tanstack/react-query";
import { TREATMENT_LIST, useApi } from "../../api";
import { audioPath, videoPath } from "../../utils";
import "./index.css";

export default function Treatment() {
  const fetchData = async () => {
    const res = await useApi.get(TREATMENT_LIST);
    const data = res.data as Data<Treatment>;
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchData(),
  });

  return (
    <section id="treatment" className="treatment">
      <div className="container">
        <div className="row">
          {data?.data.map((item) => {
            return (
              <div className="col-4 p-3 " key={item._id}>
                <div className="card">
                  <div className="preview">
                    <video
                      src={
                        item.type === "video"
                          ? videoPath(item.file)
                          : audioPath(item.file)
                      }
                      className="card-img-top"
                      controls
                    ></video>
                  </div>

                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <a href="#" className="btn btn-primary">
                      Phát ngay
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
