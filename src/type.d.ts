declare type Data<T> = Pagination & {
  data: T[];
};

declare type Pagination = {
  page: number;
  size: number;
  totalRecords: number;
};

declare type News = {
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
};

declare type User = {
  _id?: string;
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
};

declare type Doctor = User & {
  description?: {
    experience?: string;
    degree?: string;
  };
  rating?: number;
  ratingCount?: number;
};

declare type LoginInputs = {
  email: string;
  password: string;
};

declare type Role = "admin" | "doctor" | "user" | undefined;
