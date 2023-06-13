import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { POST_DETAIL, useApi } from "../../../../api";
import "./index.css";

type Inputs = {
  title?: string;
  description?: string;
  content?: string;
};

export default function PostEdit() {
  const { slug = "" } = useParams();

  const schema = yup
    .object({
      title: yup.string().required("Không để trống"),
      description: yup.string().required("Không để trống"),
      content: yup.string().required("Không để trống"),
    })
    .required();

  useEffect(() => {
    getPost();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const getPost = async () => {
    await useApi(POST_DETAIL.replace(":slug", slug)).then((res) => {
      const data = res.data as Post;
      reset({
        title: data.title,
        description: data.description,
        content: data.content,
      });
    });
  };

  const onSubmit = async (data: Inputs) => {
    await useApi(POST_DETAIL.replace(":slug", slug), {
      method: "PATCH",
      data: data,
    }).then(() => {
      toast.success("Thay đổi đã được lưu");
    });
  };

  return (
    <section className="section">
      <div className="card" id="profile-edit">
        <div className="card-body pt-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-end pb-3">
              <button type="submit" className="btn btn-primary">
                Lưu thay đổi
              </button>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="title"
                className="col-md-2 col-lg-2 col-form-label"
              >
                Tiêu đề
              </label>
              <div className="col-md-10 col-lg-10">
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  {...register("title")}
                />
                {errors.title && (
                  <span className="form-error-message">
                    {errors.title.message}
                  </span>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="description"
                className="col-md-2 col-lg-2 col-form-label"
              >
                Mô tả
              </label>
              <div className="col-md-10 col-lg-10">
                <textarea
                  className="form-control"
                  id="description"
                  style={{ height: "100px" }}
                  {...register("description")}
                />
                {errors.description && (
                  <span className="form-error-message">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="content"
                className="col-md-2 col-lg-2 col-form-label"
              >
                Nội dung
              </label>
              <div className="content-editor">
                <CKEditor
                  editor={ClassicEditor}
                  data={getValues("content")}
                  onBlur={(_, editor) => {
                    setValue("content", editor.getData());
                  }}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
