import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { DOCTOR_POST_LIST, POST_DETAIL, useApi } from "../../../../api";
import { dateFormat } from "../../../../utils";
import { Link } from "react-router-dom";

export default function PostList() {
  const [data, setData] = useState<Post[]>([]);

  const columns = useMemo<MRT_ColumnDef<Post>[]>(
    () => [
      {
        header: "Bài viết",
        accessorKey: "title",
        size: 400,
        Cell({ row }) {
          return (
            <span className="text-line-clamp-2">{row.original.title}</span>
          );
        },
      },
      {
        header: "Lượt xem",
        accessorKey: "viewCount",
        size: 1,
      },
      {
        header: "Lượt thích",
        accessorKey: "likeCount",
        size: 1,
      },
      {
        header: "Bình luận",
        accessorKey: "commentCount",
        size: 1,
      },
      {
        header: "Tạo",
        accessorKey: "createdAt",
        Cell({ row }) {
          return <>{dateFormat(row.original.createdAt)}</>;
        },
        size: 1,
      },
      {
        header: "Sửa",
        accessorKey: "updatedAt",
        Cell({
          row: {
            original: { updatedAt },
          },
        }) {
          if (!updatedAt) return;
          return <>{dateFormat(updatedAt)}</>;
        },
        size: 1,
      },
      {
        header: "Thao tác",
        size: 1,
        Cell({ row }) {
          const { _id, slug, title } = row.original;
          return (
            <>
              <div
                className="modal fade"
                id={"modal-" + _id}
                tabIndex={-1}
                aria-labelledby="modalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="modalLabel">
                        Bạn muốn xoá bài viết này!
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">{title}</div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Huỷ bỏ
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-bs-dismiss="modal"
                        onClick={() => deletePost(_id)}
                      >
                        Xoá bài viết
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target={`#modal-${_id}`}
              >
                <i className="bi bi-trash"></i>
              </button>{" "}
              <Link to={`/dashboard/post/${slug}`} className="btn btn-primary">
                <i className="bi bi-pencil-square"></i>
              </Link>
            </>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = (await useApi(DOCTOR_POST_LIST)).data as Data<Post>;
    setData(data.data);
  };

  const deletePost = async (id: string) => {
    await useApi(POST_DETAIL.replace(":slug", id), { method: "DELETE" }).then(
      () => {
        // TODO notification
        getData();
      }
    );
  };

  // if (!data) return <></>;
  return (
    <section className="section">
      <MaterialReactTable
        columns={columns}
        data={data}
        enableFilters={false}
        enableRowNumbers
      />
    </section>
  );
}
