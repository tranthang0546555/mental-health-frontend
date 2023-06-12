import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  LOCK_USER,
  SET_ROLE_ACCOUNT,
  useApi,
  USER_LIST,
} from "../../../../api";
import Modal from "../../../../components/Modal";
import { ROLE } from "../../../../constants";
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
          const { _id = "", name, role } = row.original;
          return (
            <>
              <Modal
                id={_id}
                name="lock"
                title=" Đưa vào danh sách đen"
                description={`Chuyển người dùng "${name?.firstName}" vào danh sách đen và người dùng sẽ không thể truy cập vào hệ thống được nữa!`}
                onSubmit={() => lockUserAccount(_id)}
                button={
                  <button type="button" className="btn btn-danger">
                    <i className="bi bi-lock"></i>
                  </button>
                }
              />
              <span> </span>
              <Modal
                id={_id}
                name="role"
                onSubmit={(data) => setRoleAccount(_id, data as Role)}
                title="Quyền truy cập"
                button={
                  <button type="button" className="btn btn-info">
                    <i className="bi bi-gear"></i>
                  </button>
                }
                description={`Lựa chọn quyền truy cập cho người dùng "${name?.firstName}"`}
                optional={{
                  select: {
                    attributes: { defaultValue: role || ROLE.USER },
                    options: [
                      {
                        name: ROLE.USER,
                        value: ROLE.USER,
                      },
                      {
                        name: ROLE.DOCTOR,
                        value: ROLE.DOCTOR,
                      },
                      {
                        name: ROLE.ADMIN,
                        value: ROLE.ADMIN,
                      },
                    ],
                  },
                }}
              />
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
      getData();
      toast.success("Đã đưa vào danh sách đen");
    });
  };

  const setRoleAccount = async (id: string, role: Role) => {
    await useApi(SET_ROLE_ACCOUNT.replace(":id", id), {
      method: "PATCH",
      data: { role },
    }).then(() => {
      toast.success("Thay đổi thành công");
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
