import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PATIENT_REGISTRATION_BOOKED, useApi } from "../../api";
import { SCHEDULE_DAY, SCHEDULE_TIME_HOOK } from "../../constants";
import { hourFormat } from "../../utils";
import "./index.css";

type Props = {
  doctor?: Doctor;
  onSelect: (time: Schedule) => void;
};

export default function TimeSelect(props: Props) {
  const { doctor, onSelect } = props;
  const [tab, setTab] = useState<string | "sun">("sun");
  const [booked, setBooked] = useState();

  if (!doctor?.timeServing)
    return <h5>Lịch khám bệnh hiện không có hoặc chưa được thiết lập</h5>;

  const renderTabList = () => {
    return (
      <>
        {Object.keys(SCHEDULE_DAY).map((day, idx) => {
          return (
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${tab === day ? "active" : ""}`}
                id={`day-tab-${idx}`}
                data-bs-toggle="tab"
                data-bs-target={`#day-${idx}`}
                type="button"
                role="tab"
                aria-controls={`day-${idx}`}
                aria-selected="true"
                onClick={() => setTab(day)}
              >
                {SCHEDULE_DAY[day]}
              </button>
            </li>
          );
        })}
      </>
    );
  };

  const renderTabContent = () => {
    return (
      <>
        {Object.keys(SCHEDULE_DAY).map((day, idx) => {
          const schedule = doctor.timeServing[day] as Schedule[];
          return (
            <div
              className={`tab-pane fade show ${tab === day ? "active" : ""}`}
              id={`day-${idx}`}
              role="tabpanel"
              aria-labelledby={`day-tab-${idx}`}
            >
              {schedule.map((time) => {
                const from = hourFormat(
                  SCHEDULE_TIME_HOOK.getTime() + time.from
                );
                const to = hourFormat(SCHEDULE_TIME_HOOK.getTime() + time.to);

                return (
                  <span
                    onClick={() => handleSelect(time)}
                    className="time-chip badge bg-secondary"
                  >{`${from} - ${to}`}</span>
                );
              })}
            </div>
          );
        })}
      </>
    );
  };

  const handleSelect = (schedule: Schedule) => {
    const now = new Date();
    const toDay = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate()
    );
    const currentDay = new Date().getDay();
    const currentTab = Object.keys(SCHEDULE_DAY).findIndex((v) => v == tab);

    const bookingFrom = addDays(
      new Date(toDay.getTime() + schedule.from),
      currentTab - currentDay
    );
    const bookingTo = addDays(
      new Date(toDay.getTime() + schedule.to),
      currentTab - currentDay
    );

    if (bookingFrom.getTime() < now.getTime())
      return toast.warn("Thời gian đã qua, vui lòng chọn ngày khác");
    onSelect({ from: bookingFrom.getTime(), to: bookingTo.getTime() });
  };

  useEffect(() => {
    getBooked();
  }, []);

  const getBooked = async () => {
    await useApi
      .get(PATIENT_REGISTRATION_BOOKED.replace(":id", doctor._id || ""))
      .then((res) => {
        setBooked(res.data);
        console.log(res);
      });
  };

  return (
    <div className="card time-select">
      <div className="card-body">
        <ul className="nav nav-tabs d-flex" id="myTab" role="tablist">
          {renderTabList()}
        </ul>
        <div className="tab-content pt-2" id="myTabContent">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
