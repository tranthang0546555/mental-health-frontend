import { MRT_ColumnDef, MaterialReactTable } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import useContract from "../../../blockchain/useContract";
import { useAppSelector } from "../../../hooks/store";

export default function MedicalRecords() {
  const contract = useContract();
  const uId = useAppSelector((state) => state.auth.user?._id)!;
  const [data, setData] = useState<MedicalRecordData[]>([]);

  const columns = useMemo<MRT_ColumnDef<MedicalRecordData>[]>(
    () => [
      {
        header: "Bệnh nhân",
        accessorFn: ({ user }) => user?.fullName,
      },
    ],
    []
  );

  useEffect(() => {
    contract &&
      contract.getRecordsbyDoctorId(uId).then((res) => {
        console.log(res);
        setData([]);
        // const record = decodeMedicalRecord(res);
        // const { treatment } = record.data as MedicalRecordData;
        // console.log(record.data, treatment);
      });
  }, [!contract]);

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
