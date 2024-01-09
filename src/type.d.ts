declare type Data<T> = Pagination & {
  data: T[]
}

declare type Pagination = {
  page: number
  size: number
  totalRecords: number
}

declare type Post = TimeStamp & {
  _id: string
  id: string
  slug: string
  title: string
  commentCount: 0
  description: string
  likeCount: string
  viewCount: 1
  createdBy: User
  content: string
  category: Category
}

declare type Category = TimeStamp & {
  _id: string
  name: string
  description: string
}

declare type User = TimeStamp & {
  _id?: string
  fullName?: string
  name?: {
    firstName?: string
    lastName?: string
  }
  avatar?: string

  role?: Role
  email?: string
  phone?: string
  gender?: number
  birthday?: string
  address?: string
  job?: string
  numberId?: string
  lock?: boolean
  lockedBy?: User
  lockedAt?: string
  unlockBy?: User
  unlockedAt?: string
  verify?: boolean

  fullNameRelative?: string
  phoneRelative?: string
  addressRelative?: string
}

declare type Schedule = {
  from: number
  to: number
  room?: string
}

declare type TimeServing = {
  sun: Schedule[]
  mon: Schedule[]
  tue: Schedule[]
  wed: Schedule[]
  thu: Schedule[]
  fri: Schedule[]
  sat: Schedule[]
}

declare type WorkingRooms = { rooms: string[]; default?: number }

declare type Doctor = User & {
  description?: {
    experience?: string
    degree?: string
  }
  rating?: number
  ratingCount?: number
  timeServing?: TimeServing
  workingRooms?: WorkingRooms
}

declare type LoginInputs = {
  email: string
  password: string
}

declare type RegisterInputs = {
  email: string
  password: string
  confirmPassword: string
}

declare type ForgotPasswordInputs = {
  email: string
}

declare type ChangePasswordInputs = {
  email: string
  oldPassword: string
  newPassword: string
  retypePassword: string
}

declare type Role = 'admin' | 'doctor' | 'user' | 'appointment staff' | 'online support staff' | undefined

declare type CountsInfo = {
  post?: number
  doctor?: number
  user?: number
  visitor?: number
}

declare type Appointment = TimeStamp & {
  _id: string
  user: User
  doctor: Doctor
  code: string
  from: string
  room: string
  to: string
  status: string
  writeRecord?: boolean
  rating?: number
  message?: string
}

declare type TimeStamp = {
  createdAt?: string | number
  updatedAt?: string | number
  canceledAt?: string | number
}

declare type MedicalRecord = TimeStamp & {
  id: number
  data: MedicalRecordData
  doctorId: string
  userId: string
  walletId: string
  isDeleted: boolean
  doctor?: Doctor
  user?: User
}

declare type MedicalRecordHistory = MedicalRecord & {
  recordId: number
  pushedAt?: string
}

declare type MedicalRecordWithHistory = {
  record: MedicalRecord
  histories: MedicalRecordHistory[]
  doctor?: Doctor
  user?: User
}

declare type MedicalRecordData = {
  dayIn?: string
  diagnostic?: string
  medicalHistory?: string
  reason?: string
  status?: string
  treatment?: string
  doctor?: Doctor
  user?: User
  userId?: string
  doctorId?: string
  scheduleId?: string
}

declare type Noti = {
  _id: string
  title: string
  description: string
  receiver: Doctor
  isRead: boolean
  createdAt: string
  updatedAt: string
  type: NotificationType
}

type NotiType = 'success' | 'danger' | 'warning' | 'info'

declare type Treatment = {
  _id: string
  title: string
  description?: string
  file: string
  duration: number
  type: 'video' | 'audio'
  link?: string
} & TimeStamp
