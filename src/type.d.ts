declare type Data<T> = Pagination & {
  data: T[];
};

declare type Pagination = {
  page: number;
  size: number;
  totalRecords: number;
};

declare type Post = TimeStemp & {
  _id: string;
  id: string;
  slug: string;
  title: string;
  commentCount: 0;
  description: string;
  likeCount: string;
  viewCount: 1;
  createdBy: User;
  content: string;
  category: Category;
};

declare type Category = TimeStemp & {
  _id: string;
  name: string;
  description: string;
};

declare type User = TimeStemp & {
  _id?: string;
  fullName?: string;
  name?: {
    firstName?: string;
    lastName?: string;
  };
  avatar?: string;

  role?: Role;
  email?: string;
  phone?: string;
  gender?: number;
  birthday?: string;
  address?: string;
  job?: string;
  numberId?: string;
  lock?: boolean;
  lockedBy?: User;
  lockedAt?: string;
  unlockBy?: User;
  unlockedAt?: string;
};

declare type Schedule = {
  from: number;
  to: number;
};

declare type TimeServing = {
  sun: Schedule[];
  mon: Schedule[];
  tue: Schedule[];
  wed: Schedule[];
  thu: Schedule[];
  fri: Schedule[];
  sat: Schedule[];
};

declare type Doctor = User & {
  description?: {
    experience?: string;
    degree?: string;
  };
  rating?: number;
  ratingCount?: number;
  timeServing?: TimeServing;
};

declare type LoginInputs = {
  email: string;
  password: string;
};

declare type RegisterInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

declare type Role = "admin" | "doctor" | "user" | undefined;

declare type CountsInfo = {
  post?: number;
  doctor?: number;
  user?: number;
  visitor?: number;
};

declare type Appointment = TimeStemp & {
  _id: string;
  user: User;
  doctor: Doctor;
  code: string;
  from: string;
  to: string;
  status: string;
  writeRecord?: boolean;
  rating?: number;
};

declare type TimeStemp = {
  createdAt?: string;
  updatedAt?: string;
};
