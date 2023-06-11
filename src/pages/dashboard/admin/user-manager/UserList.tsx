import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { LOCK_USER, useApi, USER_LIST } from "../../../../api";
import { avatarPath, dateFormat } from "../../../../utils";

export default function UserList() {
  const [data, setData] = useState<User[]>([]);

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        header: "Ảnh",
        accessorKey: "avatar",
        size: 1,
        Cell({
          row: {
            original: { avatar },
          },
        }) {
          if (!avatar) return <></>;
          return <img className="avatar-small" src={avatarPath(avatar)} />;
        },
      },
      {
        header: "Họ tên",
        accessorKey: "fullName",
        size: 1,
      },
      {
        header: "Email",
        accessorKey: "email",
        size: 1,
      },
      {
        header: "Số điện thoại",
        accessorKey: "phone",
        size: 1,
      },
      {
        header: "Tạo",
        accessorKey: "createdAt",
        Cell({
          row: {
            original: { createdAt },
          },
        }) {
          if (!createdAt) return <></>;
          return <>{dateFormat(createdAt)}</>;
        },
        size: 1,
      },
      {
        header: "Thao tác",
        size: 1,
        Cell({ row }) {
          const { _id = "", name } = row.original;
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
                        Đưa vào danh sách đen
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">{`Chuyển người dùng "${name?.firstName}" vào danh sách đen và người dùng sẽ không thể truy cập vào hệ thống được nữa!`}</div>
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
                        onClick={() => lockUserAccount(_id)}
                      >
                        Xác nhận
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
                <i className="bi bi-lock"></i>
              </button>
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
    const data = (await useApi(USER_LIST)).data as Data<User>;
    setData(data.data);
  };

  const lockUserAccount = async (id: string) => {
    await useApi(LOCK_USER.replace(":id", id), { method: "PATCH" }).then(() => {
      // TODO notification
      getData();
    });
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
