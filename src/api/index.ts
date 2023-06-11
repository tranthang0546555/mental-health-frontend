import axiosClient from "./axiosClient";
export const useApi = axiosClient;

export const POST_LIST = "post";
export const POST_DETAIL = "/post/:slug";
export const GET_POST_BY_ID = "/post/by-id/:id";
export const GET_POST_DELETED = "/post/deleted";
export const RESTORE_POST = "/post/restore/:id";
export const POST_LIKE_ACTION = "/post/:id/like";
export const POST_COMMENT_LIST = "/post/:id/comment";
export const POST_BOOKMARK_ACTION = "/post/:id/bookmark";
export const COMMENT_DELETE = "/post/comment/:id";

export const GROUP_LIST = "group";

export const DOCTOR_LIST = "doctor";
export const DOCTOR_POST_LIST = "/doctor/post";
export const DOCTOR_TIME_SERVING = "/doctor/time-serving";

export const LOGIN_EMAIL_PASSWORD = "/auth/login";
export const REGISTER_EMAIL_PASSWORD = "/auth/register";
export const FORGOT_PASSWORD = "/auth/forgot-password";
export const CHANGE_PASSWORD = "/auth/change-password";
export const USER_PROFILE = "/auth/profile";
export const AVATAR_CHANGE = "/auth/change-avatar";
export const ACCOUNT_ACTIVE = "/auth/account-active/:id";

export const CHANGE_STATUS_SCHEDULE = "/schedule/write/:id";
export const GET_SCHEDULE = "/schedule/:id";
export const DOCTOR_RATING = "/schedule/rating/:id";
export const PATIENT_REGISTRATION = "/schedule/patient-registration";
export const PATIENT_REGISTRATION_BOOKED = "/schedule/booked/:id";

export const ROOM_ACCESS = "/schedule/room-access/:id";

export const VIEW_POSTS_CHART = "/post/chart/all";
export const VIEW_SCHEDULES_CHART = "/schedule/chart/all";

export const HOME_SEARCH = "/home/search";
export const HOME_SYSTEM_INFO = "/home/system-info";
