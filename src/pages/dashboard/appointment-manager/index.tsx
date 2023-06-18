import { useEffect, useMemo, useState } from "react";
import { SCHEDULE_STATUS } from "../../../constants";
import { PATIENT_REGISTRATION, useApi } from "../../../api";
import { MRT_ColumnDef, MaterialReactTable } from "material-react-table";

type keys = keyof typeof SCHEDULE_STATUS;
type Props = {
  option: keys;
};
export default function AppointmentManager({ option }: Props) {
  const [data, setData] = useState<Appointment[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const columns = useMemo<MRT_ColumnDef<User>[]>(() => [], []);

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
      {option}
      <MaterialReactTable
        columns={columns}
        data={data}
        enableFilters={false}
        enableRowNumbers
      />
    </section>
  );
}
