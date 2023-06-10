import { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default function LoginRegisterButton() {
  const [button, setButton] = useState<"login" | "register">("login");

  return (
    <div className="login-register-switch">
      <Link
        className={`login-button ${button === "register" ? "active" : ""}`}
        to="/register"
        onClick={() => setButton("register")}
      >
        Đăng ký
      </Link>
      <Link
        className={`login-button ${button === "login" ? "active" : ""}`}
        to="/login"
        onClick={() => setButton("login")}
      >
        Đăng nhập
      </Link>
    </div>
  );
}
