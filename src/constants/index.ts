export const LocalStorageKey = {
  USER: "user",
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
};

export enum Role {
  ADMIN = "admin",
  DOCTOR = "doctor",
  USER = "user",
}

export const ERROR_ACCOUNT_CODE = {
  ACTIVATED: "Activated",
  NOT_ACTIVATED: "Not Activated",
  NOT_EXISTED: "Not existed",
};

export const SCHEDULE_DAY: Record<string, string> = Object.freeze({
  sun: "Chủ Nhật",
  mon: "Thứ Hai",
  tue: "Thứ Ba",
  wed: "Thứ Tư",
  thu: "Thứ Năm",
  fri: "Thứ Sáu",
  sat: "Thứ Bảy",
});

export const SCHEDULE_TIME_HOOK = new Date("2022-06-06T00:00:00+07:00");

export const SCHEDULE_STATUS: Record<string, string> = {
  COMPLETED: "completed",
  CANCEL: "cancel",
  PROGRESS: "progress",
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
