import { format } from "date-fns";

export const dateFormat = (date?: string | number | Date) => {
  return format(new Date(date || ""), "HH:mm - dd/MM/yyy");
};

export const hourFormat = (date: string | number | Date) => {
  return format(new Date(date), "HH:mm");
};

export const imagePath = (name?: string) =>
  import.meta.env.VITE_BASE_URL + "/images/" + name;

export const avatarPath = (name?: string) =>
  import.meta.env.VITE_BASE_URL + "/avatars/" + name;

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const decodeMedicalRecord = (record: MedicalRecord): MedicalRecord => {
  return {
    ...record,
    id: Number(record.id),
    data: JSON.parse(record.data as string),
    createdAt: Number(record.createdAt),
    updatedAt: Number(record.updatedAt),
  };
};

export const encodeMedicalRecord = (record: MedicalRecord): MedicalRecord => {
  return {
    ...record,
    data: JSON.stringify(record.data),
  };
};
