import { useDispatch } from "react-redux";
import { register } from "../../store/authSlice";
import { Toaster } from "react-hot-toast";

export function Register() {
  const dispatch = useDispatch();

  return (
    <div
      className="container bg-white p-4 rounded-3 shadow"
      style={{ maxWidth: "400px", marginTop: "50px" }}
    >
      <Toaster />
      <h2 className="text-center mb-4 text-dark">Register</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            register({
              email: e.target.email.value,
              name: e.target.name.value,
              password: e.target.password.value,
              password_confirmation: e.target.confirmPassword.value,
            })
          );
          e.target.reset();
        }}
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm password"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
        <div className="mt-3 text-center">
          <a href="/login">Already have an account? Login</a>
        </div>
      </form>
    </div>
  );
}
