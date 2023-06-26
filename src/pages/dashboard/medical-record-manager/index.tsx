import { useEffect } from "react";
import useContract from "../../../blockchain/useContract";
import { decodeMedicalRecord } from "../../../utils";

export default function MedicalRecords() {
  const contract = useContract();

  useEffect(() => {
    contract &&
      contract.getMedicalRecord(4).then((res) => {
        const record = decodeMedicalRecord(res);
        const { treatment } = record.data as MedicalRecordData;
        console.log(record.data, treatment);
      });
  }, [contract]);

  return <>records</>;
}
