import { useState } from "react";
import Steps, { StepsProps } from "../../components/Steps";
import DoctorSelect from "./DoctorSelect";

export default function Appointment() {
  const [step, setStep] = useState(1);

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <Steps data={{ ...data, currentStep: step }} />
        </div>
        <div className="col-md-8">
          <DoctorSelect />
        </div>
      </div>
    </>
  );
}

const data: StepsProps = {
  title: "Các bước đặt lịch khám",
  currentStep: 1,
  steps: [
    {
      title: "Bước 1",
      description: "Chọn bác sĩ muốn đặt lịch khám",
    },
    {
      title: "Bước 2",
      description: "Chọn thời gian bạn mong muốn",
    },
    {
      title: "Bước 3",
      description: "Lịch khám hợp lệ thời gian",
    },
    {
      title: "Bước 4",
      description: "Bác sĩ đã xác nhận",
    },
  ],
};
