import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import { preLoadPage } from "./hooks";
import About from "./pages/about";
import Appointment from "./pages/appointment";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Contact from "./pages/contact";
import Dashboard from "./pages/dashboard";
import UserList from "./pages/dashboard/admin/user-manager/UserList";
import LockUserList from "./pages/dashboard/admin/user-manager/UserLockList";
import BlankPage from "./pages/dashboard/blank";
import PostCreate from "./pages/dashboard/doctor/post-manager/PostCreate";
import PostEdit from "./pages/dashboard/doctor/post-manager/PostEdit";
import PostList from "./pages/dashboard/doctor/post-manager/PostList";
import Profile from "./pages/dashboard/profile";
import Doctor from "./pages/doctor";
import FAQ from "./pages/faq";
import HomePage from "./pages/home";
import Post from "./pages/post";
import PostDetail from "./pages/post-detail";
import AppointmentManager from "./pages/dashboard/appointment-manager";
import ScheduleSetting from "./pages/dashboard/doctor/schedule-setting";
import OnlineAppointment from "./pages/online-appointment";
import NotFound from "./pages/not-found";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "post",
    element: (
      <Layout title="Bài viết">
        <Post />
      </Layout>
    ),
  },
  {
    path: "post/:slug",
    element: (
      <Layout title="Bài viết">
        <PostDetail />
      </Layout>
    ),
  },
  {
    path: "doctor",
    element: (
      <Layout title="Bác sĩ">
        <Doctor />
      </Layout>
    ),
  },
  {
    path: "contact",
    element: (
      <Layout title="Liên hệ">
        <Contact />
      </Layout>
    ),
  },
  {
    path: "about",
    element: (
      <Layout title="Về chúng tôi">
        <About />
      </Layout>
    ),
  },
  {
    path: "faq",
    element: (
      <Layout title="FAQ">
        <FAQ />
      </Layout>
    ),
  },
  {
    path: "login",
    element: (
      <Layout title="Đăng nhập">
        <Login />
      </Layout>
    ),
  },
  {
    path: "register",
    element: (
      <Layout title="Đăng ký">
        <Register />
      </Layout>
    ),
  },
  {
    path: "appointment",
    element: (
      <Layout title="Đặt lịch khám Online">
        <Appointment />
      </Layout>
    ),
  },
  {
    path: "online-appointment/:id",
    element: <OnlineAppointment />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { index: true, element: <BlankPage /> },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "post",
        element: <PostList />,
      },
      {
        path: "post/create",
        element: <PostCreate />,
      },
      {
        path: "post/:slug",
        element: <PostEdit />,
      },
      {
        path: "user",
        element: <UserList />,
      },
      {
        path: "user/locked",
        element: <LockUserList />,
      },
      {
        path: "appointment",
        children: [
          {
            index: true,
            path: "progress",
            element: <AppointmentManager option="PROGRESS" />,
          },
          {
            path: "pending",
            element: <AppointmentManager option="PENDING" />,
          },
          {
            path: "completed",
            element: <AppointmentManager option="COMPLETED" />,
          },
          {
            path: "cancel",
            element: <AppointmentManager option="CANCEL" />,
          },
        ],
      },
      {
        path: "schedule",
        element: <ScheduleSetting />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  preLoadPage();
  return <RouterProvider router={router} />;
}

export default App;
