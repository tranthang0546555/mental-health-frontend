import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import AvatarForm from "../../../components/Dashboard/AvatarForm";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { phoneRegExp } from "../../../utils";
import "./index.css";
import { USER_PROFILE, useApi } from "../../../api";
import { getProfile } from "../../../store/authSlice";

type Inputs = {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  numberId?: string;
  gender?: number;
  birthday?: string;
  address?: string;
  degree?: string;
  experience?: string;
};

export default function Profile() {
  const profile = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const schema = yup
    .object({
      fullName: yup.string().required("Không để trống"),
      firstName: yup.string().required("Không để trống"),
      lastName: yup.string().required("Không để trống"),
      phone: yup.string().matches(phoneRegExp, "Số điện thoại không hợp lệ"),
      numberId: yup.string().required("Không để trống"),
      gender: yup.string().required("Không để trống"),
      birthday: yup.string().required("Không để trống"),
      degree: yup.string().required("Không để trống"),
      address: yup.string().required("Không để trống"),
      experience: yup.string().required("Không để trống"),
    })
    .required();

  useEffect(() => {
    if (profile) {
      const defaultValues: Inputs = {
        fullName: profile?.fullName,
        firstName: profile?.name?.firstName,
        lastName: profile?.name?.lastName,
        phone: profile?.phone,
        numberId: profile?.numberId,
        gender: profile?.gender,
        address: profile?.address,
        degree: profile?.description?.degree,
        experience: profile?.description?.experience,
        birthday: profile?.birthday,
      };
      reset(defaultValues);
    }
  }, [profile]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: Inputs) => {
    await useApi(USER_PROFILE, { data, method: "PATCH" }).then(() => {
      dispatch(getProfile());
    });
  };

  return (
    <section className="section profile">
      <div className="row">
        <div className="col-xl-12">
          <div className="card" id="profile-edit">
            <div className="card-body pt-3">
              <form
                onSubmit={handleSubmit(onSubmit, (invalid) =>
                  console.log(invalid)
                )}
              >
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
                    Họ và tên
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      type="text"
                      id="fullName"
                      className="form-control"
                      {...register("fullName")}
                    />
                    {errors.fullName && (
                      <span className="form-error-message">
                        {errors.fullName.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="firstName"
                    className="col-md-4 col-lg-3 col-form-label"
                  >
                    Tên / Họ
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          type="text"
                          id="firstName"
                          className="form-control"
                          {...register("firstName")}
                          placeholder="Tên của bạn"
                        />
                        {errors.firstName && (
                          <span className="form-error-message">
                            {errors.firstName.message}
                          </span>
                        )}
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          id="lastName"
                          className="form-control"
                          {...register("lastName")}
                          placeholder="Họ của bạn"
                        />
                        {errors.lastName && (
                          <span className="form-error-message">
                            {errors.lastName.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="phone"
                    className="col-md-4 col-lg-3 col-form-label"
                  >
                    Số điện thoại
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      type="text"
                      id="phone"
                      className="form-control"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <span className="form-error-message">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="gender"
                    className="col-md-4 col-lg-3 col-form-label"
                  >
                    Giới tính
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <select
                      id="gender"
                      className="form-select"
                      aria-label="Default select example"
                      {...register("gender")}
                    >
                      <option value="1">Nam</option>
                      <option value="2">Nữ</option>
                      <option value="3">Ẩn</option>
                    </select>
                    {errors.gender && (
                      <span className="form-error-message">
                        {errors.gender.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="numberId"
                    className="col-md-4 col-lg-3 col-form-label"
                  >
                    Mã định danh
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      type="text"
                      id="numberId"
                      className="form-control"
                      {...register("numberId")}
                    />
                    {errors.numberId && (
                      <span className="form-error-message">
                        {errors.numberId.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="birthday"
                    className="col-md-4 col-lg-3 col-form-label"
                  >
                    Ngày sinh
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      type="text"
                      id="birthday"
                      className="form-control"
                      placeholder="DD/MM/YYYY"
                      {...register("birthday")}
                    />
                    {errors.birthday && (
                      <span className="form-error-message">
                        {errors.birthday.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="address"
                    className="col-md-4 col-lg-3 col-form-label"
                  >
                    Địa chỉ
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      type="text"
                      id="address"
                      className="form-control"
                      {...register("address")}
                    />
                    {errors.address && (
                      <span className="form-error-message">
                        {errors.address.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="degree"
                    className="col-md-4 col-lg-3 col-form-label"
                  >
                    Học vị
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <input
                      type="text"
                      id="degree"
                      className="form-control"
                      {...register("degree")}
                    />
                    {errors.degree && (
                      <span className="form-error-message">
                        {errors.degree.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="experience"
                    className="col-md-4 col-lg-3 col-form-label"
                  >
                    Giới thiệu bản thân
                  </label>
                  <div className="col-md-8 col-lg-9">
                    <textarea
                      className="form-control"
                      id="experience"
                      style={{ height: "100px" }}
                      {...register("experience")}
                    />
                    {errors.experience && (
                      <span className="form-error-message">
                        {errors.experience.message}
                      </span>
                    )}
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
