import { lazy } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import InnerPage from "./components/InnerPage";
import { preLoadPage } from "./hooks";

const HomePage = lazy(() => import("./pages/home"));
const Post = lazy(() => import("./pages/post"));
const FAQ = lazy(() => import("./pages/faq"));
const Doctor = lazy(() => import("./pages/doctor"));
const PostDetail = lazy(() => import("./pages/post-detail"));
const Profile = lazy(() => import("./pages/dashboard/profile"));
const PostList = lazy(
  () => import("./pages/dashboard/doctor/post-manager/PostList")
);
const PostEdit = lazy(
  () => import("./pages/dashboard/doctor/post-manager/PostEdit")
);
const PostCreate = lazy(
  () => import("./pages/dashboard/doctor/post-manager/PostCreate")
);
const LockUserList = lazy(
  () => import("./pages/dashboard/admin/user-manager/UserLockList")
);
const UserList = lazy(
  () => import("./pages/dashboard/admin/user-manager/UserList")
);
const Dashboard = lazy(() => import("./pages/dashboard"));
const BlankPage = lazy(() => import("./pages/dashboard/blank"));
const Contact = lazy(() => import("./pages/contact"));
const Register = lazy(() => import("./pages/auth/register"));
const Login = lazy(() => import("./pages/auth/login"));
const Appointment = lazy(() => import("./pages/appointment"));
const About = lazy(() => import("./pages/about"));

function App() {
  preLoadPage();

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      ),
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "post",
          element: (
            <InnerPage title="Bài viết">
              <Post />
            </InnerPage>
          ),
        },
        {
          path: "post/:slug",
          element: (
            <InnerPage title="Bài viết">
              <PostDetail />
            </InnerPage>
          ),
        },
        {
          path: "doctor",
          element: (
            <InnerPage title="Bác sĩ">
              <Doctor />
            </InnerPage>
          ),
        },
        {
          path: "contact",
          element: (
            <InnerPage title="Liên hệ">
              <Contact />
            </InnerPage>
          ),
        },
        {
          path: "about",
          element: (
            <InnerPage title="Về chúng tôi">
              <About />
            </InnerPage>
          ),
        },
        {
          path: "faq",
          element: (
            <InnerPage title="FAQ">
              <FAQ />
            </InnerPage>
          ),
        },
        {
          path: "login",
          element: (
            <InnerPage title="Đăng nhập">
              <Login />
            </InnerPage>
          ),
        },
        {
          path: "register",
          element: (
            <InnerPage title="Đăng ký">
              <Register />
            </InnerPage>
          ),
        },
        {
          path: "appointment",
          element: (
            <InnerPage title="Đặt lịch khám Online">
              <Appointment />
            </InnerPage>
          ),
        },
      ],
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
