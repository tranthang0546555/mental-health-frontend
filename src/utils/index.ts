import { format } from "date-fns";

export const dateFormat = (date: string | number | Date) => {
  return format(new Date(date), "kk:mm - dd/MM/yyy");
};

export const hourFormat = (date: string | number | Date) => {
  return format(new Date(date), "kk:mm");
};

export const imagePath = (name?: string) =>
  import.meta.env.VITE_BASE_URL + "/images/" + name;

export const avatarPath = (name?: string) =>
  import.meta.env.VITE_BASE_URL + "/avatars/" + name;

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
