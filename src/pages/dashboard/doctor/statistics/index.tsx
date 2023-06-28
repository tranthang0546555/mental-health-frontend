import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/store";
import PostView from "./PostView";
import ScheduleView from "./ScheduleView";
import UserOverView from "./UserOverView";
import "./index.css";

export default function Statistics() {
  const role = useAppSelector((state) => state.auth.user?.role);

  if (role && role === "user")
    return Navigate({ to: "/dashboard/appointment/progress" });

  return (
    <section className="section statistics">
      <div className="row">
        <div className="col col-md-6">
          <div className="p-3">
            <UserOverView />
          </div>
        </div>
        <div className="col col-md-6">
          <div className="row p-3">
            <div className="col col-md-12">
              <PostView />
            </div>
            <div className="col col-md-12">
              <ScheduleView />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
