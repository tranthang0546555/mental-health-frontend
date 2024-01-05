import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import { usePreLoadPage } from './hooks'
import About from './pages/about'
import Appointment from './pages/appointment'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import Contact from './pages/contact'
import Dashboard from './pages/dashboard'
import CategoryCreate from './pages/dashboard/admin/category-manager/CategoryCreate'
import CategoryEdit from './pages/dashboard/admin/category-manager/CategoryEdit'
import CategoryList from './pages/dashboard/admin/category-manager/CategoryList'
import UserList from './pages/dashboard/admin/user-manager/UserList'
import LockUserList from './pages/dashboard/admin/user-manager/UserLockList'
import AppointmentManager from './pages/dashboard/appointment-manager'
import PostCreate from './pages/dashboard/doctor/post-manager/PostCreate'
import PostEdit from './pages/dashboard/doctor/post-manager/PostEdit'
import PostList from './pages/dashboard/doctor/post-manager/PostList'
import ScheduleSetting from './pages/dashboard/doctor/schedule-setting'
import Statistics from './pages/dashboard/doctor/statistics'
import Profile from './pages/dashboard/profile'
import Doctor from './pages/doctor'
import FAQ from './pages/faq'
import HomePage from './pages/home'
import NotFound from './pages/not-found'
import OnlineAppointment from './pages/online-appointment'
import Post from './pages/post'
import PostDetail from './pages/post-detail'
import PrivacyPolicy from './pages/privacy-policy'
import MedicalRecords from './pages/dashboard/medical-record-manager'
import RecordCreate from './pages/dashboard/medical-record-manager/RecordCreate'
import NotYetScheduled from './pages/dashboard/appointment-manager/NotScheduled'
import RecordDetail from './pages/dashboard/medical-record-manager/RecordDetail'
import RecordUpdate from './pages/dashboard/medical-record-manager/RecordUpdate'
import Treatment from './pages/treatment'
import TreatmentManager from './pages/dashboard/treatment-manager'
import TreatmentCreate from './pages/dashboard/treatment-manager/TreatmentCreate'
import ForgotPassword from './pages/auth/forgot'
import ChangePassword from './pages/auth/change'
import AccountActive from './pages/auth/active'
import DoctorDetail from './pages/doctor-detail'
import Watch from './pages/treatment/Watch'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <HomePage />
      </Layout>
    )
  },
  {
    path: 'post',
    element: (
      <Layout title='Bài viết'>
        <Post />
      </Layout>
    )
  },
  {
    path: 'post/:slug',
    element: (
      <Layout title='Bài viết'>
        <PostDetail />
      </Layout>
    )
  },
  {
    path: 'doctor',
    element: (
      <Layout title='Bác sĩ'>
        <Doctor />
      </Layout>
    )
  },
  {
    path: 'doctor/:id',
    element: (
      <Layout title='Bác sĩ'>
        <DoctorDetail />
      </Layout>
    )
  },
  {
    path: 'contact',
    element: (
      <Layout title='Liên hệ'>
        <Contact />
      </Layout>
    )
  },
  {
    path: 'about',
    element: (
      <Layout title='Về chúng tôi'>
        <About />
      </Layout>
    )
  },
  {
    path: 'faq',
    element: (
      <Layout title='FAQ'>
        <FAQ />
      </Layout>
    )
  },
  {
    path: 'privacy-policy',
    element: (
      <Layout title='Chính sách bảo mật '>
        <PrivacyPolicy />
      </Layout>
    )
  },
  {
    path: 'login',
    element: (
      <Layout title='Đăng nhập'>
        <Login />
      </Layout>
    )
  },
  {
    path: 'register',
    element: (
      <Layout title='Đăng ký'>
        <Register />
      </Layout>
    )
  },
  {
    path: 'forgot-password',
    element: (
      <Layout title='Quên mật khẩu'>
        <ForgotPassword />
      </Layout>
    )
  },
  {
    path: 'change-password',
    element: (
      <Layout title='Thay đổi mật khẩu'>
        <ChangePassword />
      </Layout>
    )
  },
  {
    path: 'account-active',
    element: (
      <Layout title='Kích hoạt tài khoản'>
        <AccountActive />
      </Layout>
    )
  },
  {
    path: 'appointment',
    element: (
      <Layout title='Đặt lịch khám Online'>
        <Appointment />
      </Layout>
    )
  },
  {
    path: 'online-appointment/:id',
    element: <OnlineAppointment />
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      { index: true, element: <Statistics /> },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'post',
        children: [
          {
            index: true,
            element: <PostList />
          },
          {
            path: 'create',
            element: <PostCreate />
          },
          {
            path: 'category',
            children: [
              {
                index: true,
                element: <CategoryList />
              },
              {
                path: 'create',
                element: <CategoryCreate />
              },
              {
                path: ':id',
                element: <CategoryEdit />
              }
            ]
          },
          {
            path: ':slug',
            element: <PostEdit />
          }
        ]
      },
      {
        path: 'user',
        children: [
          {
            index: true,
            element: <UserList />
          },
          {
            path: 'locked',
            element: <LockUserList />
          }
        ]
      },
      {
        path: 'appointment',
        children: [
          {
            index: true,
            path: 'progress',
            element: <AppointmentManager option='PROGRESS' key='progress' />
          },
          {
            path: 'pending',
            element: <AppointmentManager option='PENDING' key='pending' />
          },
          {
            path: 'completed',
            element: <AppointmentManager option='COMPLETED' key='completed' />
          },
          {
            path: 'cancel',
            element: <AppointmentManager option='CANCEL' key='cancel' />
          },
          {
            path: 'order',
            element: <NotYetScheduled />
          }
        ]
      },
      {
        path: 'schedule',
        element: <ScheduleSetting />
      },
      {
        path: 'medical-record',
        children: [
          { index: true, element: <MedicalRecords /> },
          { path: ':id', element: <RecordDetail /> },
          { path: 'create/:id', element: <RecordCreate /> },
          { path: 'update/:id', element: <RecordUpdate /> }
        ]
      },
      {
        path: 'treatment',
        children: [
          { index: true, element: <TreatmentManager /> },
          { path: 'create', element: <TreatmentCreate /> }
        ]
      }
    ]
  },
  {
    path: 'treatment',
    element: (
      <Layout title='Trị liệu'>
        <Treatment />
      </Layout>
    )
  },
  {
    path: 'treatment/watch',
    element: (
      <Layout title='Trị liệu'>
        <Watch />
      </Layout>
    )
  },
  {
    path: '*',
    element: <NotFound />
  }
])

function App() {
  usePreLoadPage()
  return <RouterProvider router={router} />
}

export default App
