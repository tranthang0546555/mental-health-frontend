import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../hooks/store";
import { login } from "../../../store/authSlice";

export default function Login() {
  const { register, handleSubmit } = useForm<LoginInputs>();
  const dispatch = useAppDispatch();

  const handleLogin = (data: LoginInputs) => {
    dispatch(login(data));
  };

  return (
    <section className="section register d-flex flex-column align-items-center justify-content-center py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
            <div className="d-flex justify-content-center py-4"></div>
            <div className="card mb-3">
              <div className="card-body">
                <div className="pt-4 pb-2">
                  <h5 className="card-title text-center pb-0 fs-4">
                    Login to Your Account
                  </h5>
                  <p className="text-center small">
                    Enter your email & password to login
                  </p>
                </div>

                <form className="row g-3" onSubmit={handleSubmit(handleLogin)}>
                  <div className="col-12">
                    <label htmlFor="yourEmail" className="form-label">
                      Email
                    </label>
                    <div className="input-group has-validation">
                      <span className="input-group-text" id="inputGroupPrepend">
                        @
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        id="yourEmail"
                        required
                        {...register("email")}
                      />
                      <div className="invalid-feedback">
                        Please enter your username.
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="yourPassword" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="yourPassword"
                      required
                      {...register("password")}
                    />
                    <div className="invalid-feedback">
                      Please enter your password!
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="remember"
                        value="true"
                        id="rememberMe"
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100" type="submit">
                      Login
                    </button>
                  </div>
                  <div className="col-12">
                    <p className="small mb-0">
                      Don't have account?{" "}
                      <a href="/register">Create an account</a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
