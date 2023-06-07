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
  _id: string;
  avatar: string;
  name: {
    firstName: string;
    lastName: string;
  };
};
