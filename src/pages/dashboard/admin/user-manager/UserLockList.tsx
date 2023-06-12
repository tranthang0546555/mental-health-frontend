import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { LOCKED_USER_LIST, UNLOCK_USER, useApi } from "../../../../api";
import { avatarPath, dateFormat } from "../../../../utils";

export default function LockUserList() {
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
        header: "Đã khoá",
        Cell({
          row: {
            original: { lockedBy },
          },
        }) {
          if (!lockedBy) return <></>;
          return <>{lockedBy.name?.firstName}</>;
        },
        size: 1,
      },
      {
        header: "Thời gian",
        accessorKey: "lockedAt",
        Cell({
          row: {
            original: { lockedAt },
          },
        }) {
          if (!lockedAt) return <></>;
          return <>{dateFormat(lockedAt)}</>;
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
                        Xoá khỏi danh sách đen
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">{`Khôi phục tài khoản "${name?.firstName}" và người dùng có thể truy cập vào hệ thống.`}</div>
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
                        className="btn btn-success"
                        data-bs-dismiss="modal"
                        onClick={() => unlockUserAccount(_id)}
                      >
                        Xác nhận
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target={`#modal-${_id}`}
              >
                <i className="bi bi-unlock"></i>
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
    const data = (await useApi(LOCKED_USER_LIST)).data as Data<User>;
    setData(data.data);
  };

  const unlockUserAccount = async (id: string) => {
    await useApi(UNLOCK_USER.replace(":id", id), { method: "PATCH" }).then(
      () => {
        getData();
        toast.success("Đã xóa khỏi danh sách đen");
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
