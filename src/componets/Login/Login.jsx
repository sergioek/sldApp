import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { ShowPassword } from "./ShowPassword";
import { useLoginContext } from "../context/LoginContext";
import classNames from "classnames";
import {alert} from "../Alerts/Alert"

export default function Login() {
  const [Show, setShow] = useState("password");
  const navigate = useNavigate();
  const {loginUser,UserName,btnLogin,setBtnLogin} = useLoginContext();

  const buttonLogin = classNames(
    "flex w-full justify-center rounded-md bg-violet-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600",{
      "bg-violet-500": btnLogin== true
    }
  )

  useEffect(()=>{
    if(btnLogin==false){
      alert({
        icon:"error",
        title:"No se pudo iniciar sesión",
        text:"El correo o la contraseña son incorrectos"
      })
    
    }
   
  
   const session = sessionStorage.getItem("sessionActive") 
   if(session || UserName!== null){
      navigate("/docentes")
    }
  },[UserName,btnLogin])


  const Schema = Yup.object().shape({
    email: Yup.string()
      .email("Ingresa un correo electrónico válido")
      .required("El correo electrónico es requerido"),
    password: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial"
      )
      .required("La contraseña es requerida"),
  });
  
  return (
    <div className="bg-[url('/img/fondo.png')] bg-cover w-auto  h-screen" >
      <div className="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8 py-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="/img/logoTecnica.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-blue-900">
            SISTEMA DE LICENCIAS DOCENTES
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values) => {
              loginUser(values);
              setBtnLogin(true)
            }}

            validationSchema={Schema}
          >
            {({ values, handleChange, handleSubmit, errors }) => (
              <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="flex text-sm  leading-6 text-black font-bold"
                  >
                    Correo electrónico
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Ingresa tu correo"
                      value={values.email}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6 px-2"
                    />
                  </div>
                  {errors.email && (
                    <p className=" text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm  leading-6 text-black font-bold"
                    >
                      Contraseña
                    </label>
                  </div>
                  <div className="mt-2 flex">
                    <input
                      id="password"
                      name="password"
                      type={Show}
                      autoComplete="current-password"
                      value={values.password}
                      onChange={handleChange}
                      placeholder="Ingresa tu contraseña"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6 px-2"
                    />

                    <ShowPassword {...{ Show, setShow }} />
                  </div>

                  {errors.password && (
                    <p className=" text-red-600">{errors.password}</p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    className={buttonLogin}
                  >
                    {
                      btnLogin == false || btnLogin == null ? "Iniciar Sesión" : "Ingresando..."
                    }
                    
                  </button>
                </div>
              </form>
            )}
          </Formik>

          <p className="mt-10 text-center text-sm text-slate-950">
            No estas registrado?{" "}
            <Link to="/registro" className="font-semibold leading-6 text-red-600 ">Registrate aquí</Link>

          </p>
        </div>
      </div>
    </div>
  );
}
