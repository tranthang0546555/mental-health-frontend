import { useEffect } from "react";
import { useAppDispatch } from "./store";
import { getProfile } from "../store/authSlice";

export const useVerifyToken = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, []);
};
