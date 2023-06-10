import { format } from "date-fns";

export const dateFormat = (date: string) => {
  return format(new Date(date), "kk:mm - dd/MM/yyy");
};

export const imagePath = (name?: string) =>
  import.meta.env.VITE_BASE_URL + "/images/" + name;

export const avatarPath = (name?: string) =>
  import.meta.env.VITE_BASE_URL + "/avatars/" + name;
