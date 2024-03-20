import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Muni from "../../assets/municipalidad.jpg";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

const Login = () => {
  const navigate = useNavigate();
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;

  useEffect(() => {
    if (autenticado) {
      navigate("/dashboard");
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado]);

  const [login, setLogin] = useState({
    usuario: "",
    password: "",
  });

  const { usuario, password } = login;

  const onChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (usuario.trim() === "" || password.trim() === "") {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }
    iniciarSesion({ usuario, password });
  };

  return (
    <div className="flex w-full h-screen ">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="w-full flex items-center justify-center lg:w-1/2 ">
        <div className=" w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
          <div className="flex  items-center justify-center ">
            <img src={Logo} alt="logo" className="w-32 h-32 mr-4 ml-2" />
            <h1
              className="hidden relative w-2/2 h-full lg:flex items-center sm:justify-start text-4xl font-semibold ml-4"
              style={{ fontSize: "2.5rem", color: "#CCCC00" }}
            >
              TRAMITE DOCUMENTARIO
            </h1>
          </div>
          <p className="font-medium text-lg text-gray-500 mt-4">
            Bienvenidos al sistema de tramite documentario de la Municipalidad
            Distrital de Poroto.
          </p>
          <form onSubmit={onSubmit}>
            <div className="mt-8">
              <div className="flex flex-col">
                <label className="text-lg font-medium">Usuario</label>
                <input
                  value={usuario}
                  onChange={onChange}
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Ingresa tu usuario"
                  name="usuario"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-lg font-medium">Contraseña</label>
                <input
                  value={password}
                  onChange={onChange}
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Ingresa tu contraseña"
                  type={"password"}
                  name="password"
                />
              </div>
              <div className="mt-8 flex justify-between items-center">
                <div>
                  <input type="checkbox" id="remember" />
                  <label
                    className="ml-2 font-medium text-base"
                    htmlFor="remember"
                  >
                    Recuerdame
                  </label>
                </div>
                <button
                  className="font-medium text-base "
                  style={{ color: "#CCCC00" }}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="mt-8 flex flex-col gap-y-4">
                <button
                  className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4  rounded-xl text-white font-bold text-lg"
                  style={{ background: "#CCCC00" }}
                  type="submit"
                >
                  Iniciar Sesión
                </button>
              </div>
              <div className="mt-8 flex justify-center items-center">
                <p className="font-medium text-base">
                  ¿No tienes una cuenta?.
                  <span
                    className="ml-2 font-medium text-base"
                    style={{ color: "#CCCC00" }}
                  >
                    Contáctate con el administrador del sistema.
                  </span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div
        className="hidden relative w-1/2 h-full lg:flex items-center justify-center"
        style={{
          background:
            "linear-gradient(90deg, rgba(34,37,27,1) 3%, rgba(204,200,10,1) 60%, rgba(34,37,27,1) 98%)",
        }}
      >
        <div className="w-screen h-screen flex justify-center items-center">
          <img
            src={Muni}
            alt="Imagen"
            className="rounded-full max-w-2/2 max-h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
