export const LocalStorageKey = {
  USER: "user",
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
};

export enum ROLE {
  ADMIN = "admin",
  DOCTOR = "doctor",
  USER = "user",
  AS = "appointment staff",
  OSS = "online support staff",
}

export const ERROR_ACCOUNT_CODE = {
  ACTIVATED: "Activated",
  NOT_ACTIVATED: "Not Activated",
  NOT_EXISTED: "Not existed",
};

export const SCHEDULE_DAY = Object.freeze({
  sun: "Chủ Nhật",
  mon: "Thứ Hai",
  tue: "Thứ Ba",
  wed: "Thứ Tư",
  thu: "Thứ Năm",
  fri: "Thứ Sáu",
  sat: "Thứ Bảy",
});

export const SCHEDULE_TIME_HOOK = new Date("2022-06-06T00:00:00+07:00");

export const SCHEDULE_STATUS = {
  COMPLETED: "completed",
  CANCEL: "cancel",
  PROGRESS: "progress",
  PENDING: "pending",
};

export const ScheduleTab: Record<string, string> = {
  PROGRESS: "Lịch hẹn sắp tới",
  COMPLETED: "Lịch hẹn trước đây",
  CANCEL: "Đã huỷ",
};

export const TIMELINE: Record<string, { title: string; day: number }> = {
  "15d": {
    title: "15 ngày",
    day: 15,
  },
  "30d": {
    title: "30 ngày",
    day: 30,
  },
  "3m": {
    title: "3 tháng",
    day: 90,
  },
};

export const TIMELINE_OPTION: Record<string, string> = {
  _15D: "15d",
  _30D: "30d",
  _3M: "3m",
};

const defaultTime = [
  {
    from: 28800000,
    to: 30600000,
  },
  {
    from: 30600000,
    to: 32400000,
  },
  {
    from: 32400000,
    to: 34200000,
  },
  {
    from: 34200000,
    to: 36000000,
  },
  {
    from: 36000000,
    to: 37800000,
  },
  {
    from: 37800000,
    to: 39600000,
  },
  {
    from: 39600000,
    to: 41400000,
  },
  {
    from: 50400000,
    to: 52200000,
  },
  {
    from: 52200000,
    to: 54000000,
  },
  {
    from: 54000000,
    to: 55800000,
  },
  {
    from: 55800000,
    to: 57600000,
  },
  {
    from: 57600000,
    to: 59400000,
  },
  {
    from: 59400000,
    to: 61200000,
  },
  {
    from: 61200000,
    to: 63000000,
  },
  {
    from: 63000000,
    to: 64800000,
  },
];

export const defaultSchedule = {
  sun: defaultTime,
  mon: defaultTime,
  tue: defaultTime,
  wed: defaultTime,
  thu: defaultTime,
  fri: defaultTime,
  sat: defaultTime,
};
