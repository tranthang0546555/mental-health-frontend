import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/store";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, ReactNode } from "react";

export default function LoginCheck({ children }: { children: ReactNode }) {
  const { login } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const check = useDebouncedCallback(() => {
    if (!login) navigate("/login");
  }, 3000);

  useEffect(() => {
    !login && check();
  }, [login]);

  if (!login) return <div id="preloader" className="preloader-loading"></div>;
  return children;
}
