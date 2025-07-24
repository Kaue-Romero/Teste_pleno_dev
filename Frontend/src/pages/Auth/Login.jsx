import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";

export function Login() {
  const dispatch = useDispatch();

  return (
    <div
      className="container bg-white p-4 rounded-3 shadow"
      style={{ maxWidth: "400px", marginTop: "50px" }}
    >
      <Toaster />
      <h2 className="text-center mb-4 text-dark">Login</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            login({
              email: e.target.email.value,
              password: e.target.password.value,
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
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
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
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
        <div className="mt-3 text-center">
          <a href="/register">Don't have an account? Register</a>
        </div>
      </form>
    </div>
  );
}
