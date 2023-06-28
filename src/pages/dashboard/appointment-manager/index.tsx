import { MRT_ColumnDef, MaterialReactTable } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_SCHEDULE, PATIENT_REGISTRATION, useApi } from "../../../api";
import Modal from "../../../components/Modal";
import { SCHEDULE_STATUS } from "../../../constants";
import { useAppSelector } from "../../../hooks/store";
import { dateFormat } from "../../../utils";

type keys = keyof typeof SCHEDULE_STATUS;
type Props = {
  option: keys;
};
export default function AppointmentManager({ option }: Props) {
  const [data, setData] = useState<Appointment[]>([]);
  const role = useAppSelector((state) => state.auth.user?.role) as Role;
  useEffect(() => {
    getData();
  }, [option]);

  const columns = useMemo<MRT_ColumnDef<Appointment>[]>(
    () => [
      {
        header: "Thời gian",
        accessorFn(originalRow) {
          return (
            <>
              {dateFormat(originalRow.from) +
                " - " +
                dateFormat(originalRow.to)}
            </>
          );
        },
      },
      {
        id: "room",
        header: "Phòng",
        accessorFn({ code }) {
          return (
            <Link to={`/online-appointment/${code}`}>
              <b style={{ color: "var(--color-default)" }}>{code}</b>
            </Link>
          );
        },
        size: 1,
      },
      role === "doctor"
        ? {
            header: "Bệnh nhân",
            accessorFn(originalRow) {
              return <>{originalRow.user.fullName}</>;
            },
          }
        : {
            header: "Bác sĩ",
            accessorFn(originalRow) {
              return <>{originalRow.doctor.fullName}</>;
            },
          },
      {
        header: "Tạo",
        accessorFn(originalRow) {
          return <>{dateFormat(originalRow.createdAt)}</>;
        },
      },
      {
        header: "Lý do",
        accessorKey: "message",
        size: 1,
      },
      {
        id: "actions",
        header: "Thao tác",
        accessorFn({ _id }) {
          return (
            <>
              <Modal
                id="accept"
                name="accept"
                onSubmit={() => handleAccept(_id)}
                title="Xác nhận lịch khám bệnh"
                description="Xác nhận lịch khám này"
                button={
                  <button className="btn btn-success">
                    <i className="bi bi-check-circle"></i>
                  </button>
                }
              />{" "}
              <Modal
                id="deny"
                name="deny"
                onSubmit={(data) => handleDeny(_id, String(data))}
                title="Hủy lịch khám bệnh"
                description="Xác nhận hủy lịch khám này và bạn không thể khôi phục như ban đầu?"
                button={
                  <button className="btn btn-danger">
                    <i className="bi bi-x-circle"></i>
                  </button>
                }
                optional={{
                  input: {
                    className: "form-control",
                    placeholder: "Lý do hủy",
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

  const getData = async () => {
    await useApi
      .get(PATIENT_REGISTRATION + "?option=" + SCHEDULE_STATUS[option])
      .then((res) => {
        const data = res.data as Data<Appointment>;
        setData(data.data);
      })
      .catch();
  };

  const handleAccept = async (id: string) => {
    await useApi(GET_SCHEDULE.replace(":id", id), {
      method: "PATCH",
      data: { status: SCHEDULE_STATUS.PROGRESS },
    }).then(() => {
      getData();
      toast.success("Xác nhận lịch khám thành công");
    });
  };

  const handleDeny = async (id: string, message: string) => {
    await useApi(GET_SCHEDULE.replace(":id", id), {
      method: "PATCH",
      data: { status: SCHEDULE_STATUS.CANCEL, message },
    }).then(() => {
      getData();
      toast.success("Hủy lịch khám thành công");
    });
  };

  return (
    <section className="section">
      <MaterialReactTable
        columns={columns}
        data={data}
        enableFilters={false}
        enableRowNumbers
        state={{
          columnVisibility: {
            room: option === "PROGRESS",
            actions: option === "PENDING" && role === "doctor",
            message: option === "CANCEL",
          },
        }}
      />
    </section>
  );
}
