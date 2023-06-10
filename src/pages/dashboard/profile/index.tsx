import AvatarForm from "../../../components/Dashboard/AvatarForm";
import "./index.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";

export default function Profile() {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const schema = yup
    .object({
      firstName: yup.string().required("Không để trống"),
      lastName: yup.string().required("Không để trống"),
      phone: yup.string().matches(phoneRegExp, "Số điện thoại không hợp lệ"),
      job: yup.string().required("Không để trống"),
      address: yup.string().required("Không để trống"),
      numberId: yup.string().required("Không để trống"),
    })
    .required();
  const { register } = useForm({});

  return (
    <section className="section profile">
      <div className="row">
        <div className="col-xl-12">
          <div className="card" id="profile-edit">
            <div className="card-body pt-3">
              <form>
                <div className="row mb-3">
                  <label
                    htmlFor="profileImage"
                    className="col-md-4 col-lg-3 col-form-label"
                  >
                    Ảnh đại diện
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <AvatarForm />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="fullName"
                    className="col-md-4 col-lg-3 col-form-label"
                  >
                    Full Name
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      name="fullName"
                      type="text"
                      className="form-control"
                      id="fullName"
                      value="Kevin Anderson"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="about"
                    className="col-md-4 col-lg-3 col-form-label"
                  >
                    About
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <textarea
                      name="about"
                      className="form-control"
                      id="about"
                      style={{ height: "100px" }}
                    >
                      Sunt est soluta temporibus accusantium neque nam maiores
                      cumque temporibus. Tempora libero non est unde veniam est
                      qui dolor. Ut sunt iure rerum quae quisquam autem eveniet
                      perspiciatis odit. Fuga sequi sed ea saepe at unde.
                    </textarea>
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="company"
                    className="col-md-4 col-lg-3 col-form-label"
                  >
                    Company
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      name="company"
                      type="text"
                      className="form-control"
                      id="company"
                      value="Lueilwitz, Wisoky and Leuschke"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="Job"
                    className="col-md-4 col-lg-3 col-form-label"
                  >
                    Job
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      name="job"
                      type="text"
                      className="form-control"
                      id="Job"
                      value="Web Designer"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="Country"
                    className="col-md-4 col-lg-3 col-form-label"
                  >
                    Country
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      name="country"
                      type="text"
                      className="form-control"
                      id="Country"
                      value="USA"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="Address"
                    className="col-md-4 col-lg-3 col-form-label"
                  >
                    Address
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      name="address"
                      type="text"
                      className="form-control"
                      id="Address"
                      value="A108 Adam Street, New York, NY 535022"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="Phone"
                    className="col-md-4 col-lg-3 col-form-label"
                  >
                    Phone
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      name="phone"
                      type="text"
                      className="form-control"
                      id="Phone"
                      value="(436) 486-3538 x29071"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="Email"
                    className="col-md-4 col-lg-3 col-form-label"
                  >
                    Email
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      id="Email"
                      value="k.anderson@example.com"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="Twitter"
                    className="col-md-4 col-lg-3 col-form-label"
                  >
                    Twitter Profile
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      name="twitter"
                      type="text"
                      className="form-control"
                      id="Twitter"
                      value="https://twitter.com/#"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="Facebook"
                    className="col-md-4 col-lg-3 col-form-label"
                  >
                    Facebook Profile
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      name="facebook"
                      type="text"
                      className="form-control"
                      id="Facebook"
                      value="https://facebook.com/#"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="Instagram"
                    className="col-md-4 col-lg-3 col-form-label"
                  >
                    Instagram Profile
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      name="instagram"
                      type="text"
                      className="form-control"
                      id="Instagram"
                      value="https://instagram.com/#"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="Linkedin"
                    className="col-md-4 col-lg-3 col-form-label"
                  >
                    Linkedin Profile
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      name="linkedin"
                      type="text"
                      className="form-control"
                      id="Linkedin"
                      value="https://linkedin.com/#"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
