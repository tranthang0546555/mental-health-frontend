declare type Data<T> = Pagination & {
  data: T[];
};

declare type Pagination = {
  page: number;
  size: number;
  totalRecords: number;
};

declare type Post = {
  _id: string;
  id: string;
  slug: string;
  title: string;
  commentCount: 0;
  description: string;
  likeCount: string;
  viewCount: 1;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
  content: string;
};

declare type User = {
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
  createdAt?: string;
  lock?: boolean;
  lockedBy?: User;
  lockedAt?: string;
  unlockBy?: User;
  unlockedAt?: string;
};

declare type Doctor = User & {
  description?: {
    experience?: string;
    degree?: string;
  };
  rating?: number;
  ratingCount?: number;
  timeServing?: any;
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

declare type Schedule = {
  from: number;
  to: number;
};
