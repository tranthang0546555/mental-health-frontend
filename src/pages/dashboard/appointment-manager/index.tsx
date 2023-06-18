import { MRT_ColumnDef, MaterialReactTable } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { PATIENT_REGISTRATION, useApi } from "../../../api";
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
        header: "Phòng",
        accessorFn(originalRow) {
          return <b>{originalRow.code}</b>;
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
        header: "Tạo",
        accessorFn(originalRow) {
          return <>{dateFormat(originalRow.createdAt)}</>;
        },
      },
      {
        header: "Thao tác",
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
