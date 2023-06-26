import PostView from "./PostView";
import ScheduleView from "./ScheduleView";
import UserOverView from "./UserOverView";
import "./index.css";

export default function Statistics() {
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
