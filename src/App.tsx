import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import InnerPage from "./components/InnerPage";
import { preLoadPage } from "./hooks";
import About from "./pages/about";
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
import Appointment from "./pages/appointment";

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
