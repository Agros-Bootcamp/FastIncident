import { useReducer } from "react";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../api/authEndpoints.js";
import { useDispatch } from "react-redux";
import { setTokens } from "../../api/authSlice";
import "../public/bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header.jsx";

const Login = () => {
  const [login, { isSuccess }] = useLoginMutation();
  const dispatch = useDispatch();

  const blank = { email_user: "", password_user: "" };

  const [user, userDispatch] = useReducer(
    (state, action) => {
      const obj = { ...state, [action.field]: action.payload };
      return obj;
    },
    blank
  );

  const handleUser = (e) => {
    const item = { field: e.target.name, payload: e.target.value };
    userDispatch(item);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = await login(user);
    dispatch(setTokens(userData.data));
  };

  return (
    <>
      <Header />

      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title text-center">Inicio de Sesión</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      onChange={(e) => handleUser(e)}
                      name="email_user"
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="example@gmail.com"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input
                      onChange={(e) => handleUser(e)}
                      name="password_user"
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="*********"
                    />
                  </div>
                  <button
                    onClick={() => console.log(user)}
                    type="submit"
                    className="btn btn-primary w-100"
                  >
                    Iniciar sesión
                  </button>
                  <div className="mt-3 text-center">
                    <Link to="/recovery">¿Olvidaste tu contraseña?</Link>
                  </div>
                </form>
                <div className="mt-3 text-center">
                  ¿No tienes una cuenta?{" "}
                  <Link to="/register">Regístrate aquí</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
