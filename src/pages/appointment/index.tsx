import { useState } from "react";
import Steps, { StepsProps } from "../../components/Steps";

export default function Appointment() {
  const [step, setStep] = useState(1);

  return (
    <>
      <Steps data={{ ...data, currentStep: step }} />
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
