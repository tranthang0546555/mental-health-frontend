import Skeleton from "../../components/Skeleton";
import { avatarPath } from "../../utils";

export default function DoctorItem(props: { data: Doctor }) {
  const { fullName, avatar, description } = props.data;
  return (
    <div className="doctor-card d-flex align-items-start">
      <div className="pic">
        <img src={avatarPath(avatar)} className="img-fluid" alt="" />
      </div>
      <div className="member-info">
        <h4>{fullName}</h4>
        <span>{description?.degree}</span>
        <p>{description?.experience}</p>
        {/* <div className="social">
          <a href="">
            <i className="ri-twitter-fill"></i>
          </a>
          <a href="">
            <i className="ri-facebook-fill"></i>
          </a>
          <a href="">
            <i className="ri-instagram-fill"></i>
          </a>
          <a href="">
            <i className="ri-linkedin-box-fill"></i>
          </a>
        </div> */}
      </div>
    </div>
  );
}

export function DoctorItemSkeleton() {
  return (
    <div className="doctor-card d-flex align-items-start">
      <Skeleton variant="circular" height={170} width={170} />
      <div className="member-info">
        <Skeleton variant="rounded" />
        <Skeleton variant="rounded" />
        <Skeleton variant="rounded" height={100} />
      </div>
    </div>
  );
}
