import { Formik } from "formik";
import * as Yup from "yup";
import { useDocenteContext } from "../../context/DocenteContext";
import { alert } from "../../Alerts/Alert";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BtnGuardar } from "../../Btn/BtnGuardar";

export const FormEditarDocente = () => {
  const { autorization } = useDocenteContext();

  const { id } = useParams();
    const [docente,setDocente] = useState(null)

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/docentes/"+id, {
        headers: {
          Authorization: `Bearer ${autorization()}`,
        },
      })
      .then((response) => {
        let docente = response.data.data
        setDocente({
            apellidos: docente.apellidos,
            nombres: docente.nombres,
            prefixCUIL: docente.prefixCUIL,
            dni: docente.dni,
            postfixCUIL: docente.postfixCUIL,
            fnacimiento: docente.fnacimiento,
            lnacimiento:docente.lnacimiento,
            domicilio: docente.domicilio,
            direccion: docente.direccion,
            estadoCivil: docente.estadoCivil,
            finicioDocencia:docente.finicioDocencia,
            titulo1: docente.titulo1,
            titulo2: docente.titulo2,
            email: docente.email,
            tel: docente.tel,
        })
        
      })
      .catch((errors) => {
        console.log(errors)
      });
  }, [id]);

  const updateDocente = (data)=>{
    axios.put("http://127.0.0.1:8000/api/v1/docentes/"+id,data,{
      headers: {
        Authorization: `Bearer ${autorization()}`,
      },
    }).then((response)=>{
      alert({
        icon:"success",
        title:"Exito!!",
        text:"Se actualizó el docente."
      })
    }).catch((errors)=>{
      alert({
        icon:"error",
        title:"Error!!",
        text:"No se pudo actualizar el docente."
      })
    })
  }

  const Schema = Yup.object().shape({
    apellidos: Yup.string().required("Campo requerido"),
    nombres: Yup.string().required("Campo requerido"),
    prefixCUIL: Yup.number("Ingrese un número")
      .required("Campo requerido")
      .test("len", "Debe tener 2 dígitos", (val) =>
        val ? val.toString().length === 2 : false
      ),
    dni: Yup.number("Ingrese un número")
      .required("Campo requerido")
      .test("len", "Debe tener 8 dígitos", (val) =>
        val ? val.toString().length === 8 : false
      ),
    postfixCUIL: Yup.number("Ingrese un número")
      .required("Campo requerido")
      .test("len", "Debe tener 1 dígito", (val) =>
        val ? val.toString().length === 1 : false
      ),
    fnacimiento: Yup.date("Ingrese una fecha").required("Campo requerido"),
    lnacimiento: Yup.string().required("Campo requerido"),
    domicilio: Yup.string().required("Campo requerido"),
    direccion: Yup.string().required("Campo requerido"),
    estadoCivil: Yup.string().required("Campo requerido"),
    finicioDocencia: Yup.date("Ingrese una fecha").required("Campo requerido"),
    titulo1: Yup.string().required("Campo requerido"),
    titulo2: Yup.string().required("Campo requerido"),
    email: Yup.string()
      .email("Ingresa un correo electrónico válido")
      .required("Campo requerido"),
    tel: Yup.string().required("Campo requerido"),
  });

  return (

    docente !== null &&

    <div className="py-10 bg-slate-100 px-4">
      <Formik
        initialValues={docente}
        validationSchema={Schema}
        onSubmit={(values) => {
          updateDocente(values)
        }}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <h1 className=" text-3xl font-mono font-bold text-blue-900 mb-8">
              Editar Docente
            </h1>

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="apellidos"
                  id="apellidos"
                  onChange={handleChange}
                  value={values.apellidos}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                <label
                  htmlFor="apellidos"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Apellidos
                </label>
                {errors.apellidos && (
                  <p className=" text-red-600 text-xs">{errors.apellidos}</p>
                )}
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="nombres"
                  id="nombres"
                  onChange={handleChange}
                  value={values.nombres}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                <label
                  htmlFor="nombres"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nombres
                </label>
                {errors.nombres && (
                  <p className=" text-red-600 text-xs">{errors.nombres}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-3 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="prefixCUIL"
                  id="prefixCUIL"
                  onChange={handleChange}
                  value={values.prefixCUIL}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer text-center"
                  placeholder=" "
                />
                <label
                  htmlFor="prefixCUIL"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  CUIL (Prefijo)
                </label>
                {errors.prefixCUIL && (
                  <p className=" text-red-600 text-xs">{errors.prefixCUIL}</p>
                )}
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="dni"
                  id="dni"
                  onChange={handleChange}
                  value={values.dni}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer text-center"
                  placeholder=" "
                />
                <label
                  htmlFor="dni"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  DNI
                </label>
                {errors.dni && (
                  <p className=" text-red-600 text-xs">{errors.dni}</p>
                )}
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="postfixCUIL"
                  id="postfixCUIL"
                  onChange={handleChange}
                  value={values.postfixCUIL}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer text-center"
                  placeholder=" "
                />
                <label
                  htmlFor="postfixCUIL"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  CUIL (Subfijo)
                </label>
                {errors.postfixCUIL && (
                  <p className=" text-red-600 text-xs">{errors.postfixCUIL}</p>
                )}
              </div>
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="date"
                name="fnacimiento"
                id="fnacimiento"
                onChange={handleChange}
                value={values.fnacimiento}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="fnacimiento"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Fecha de nacimiento
              </label>
              {errors.fnacimiento && (
                <p className=" text-red-600 text-xs">{errors.fnacimiento}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="text"
                name="lnacimiento"
                id="lnacimiento"
                onChange={handleChange}
                value={values.lnacimiento}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />

              <label
                htmlFor="lnacimiento"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Lugar de nacimiento
              </label>
              {errors.lnacimiento && (
                <p className=" text-red-600 text-xs">{errors.lnacimiento}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="text"
                name="domicilio"
                id="domicilio"
                onChange={handleChange}
                value={values.domicilio}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />

              <label
                htmlFor="domicilio"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Domicilio
              </label>
              {errors.domicilio && (
                <p className=" text-red-600 text-xs">{errors.domicilio}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="text"
                name="direccion"
                id="direccion"
                onChange={handleChange}
                value={values.direccion}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />

              <label
                htmlFor="direccion"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Calle / número / Barrio
              </label>
              {errors.direccion && (
                <p className=" text-red-600 text-xs">{errors.direccion}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <select
                name="estadoCivil"
                id="estadoCivil"
                onChange={handleChange}
                value={values.estadoCivil}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              >
                <option value=""></option>
                <option value="Soltero/a">Soltero/a</option>
                <option value="Casado/a">Casado/a</option>
                <option value="Viudo/a">Viudo/a</option>
                <option value="Divorciado/a">Divorciado/a</option>
              </select>

              <label
                htmlFor="estadoCivil"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Estado civil
              </label>
              {errors.estadoCivil && (
                <p className=" text-red-600 text-xs">{errors.estadoCivil}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="date"
                name="finicioDocencia"
                id="finicioDocencia"
                onChange={handleChange}
                value={values.finicioDocencia}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="finicioDocencia"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Inicio en la docencia
              </label>
              {errors.finicioDocencia && (
                <p className=" text-red-600 text-xs">
                  {errors.finicioDocencia}
                </p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="text"
                name="titulo1"
                id="titulo1"
                onChange={handleChange}
                value={values.titulo1}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />

              <label
                htmlFor="titulo1"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Títulos I
              </label>
              {errors.titulo1 && (
                <p className=" text-red-600 text-xs">{errors.titulo1}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="text"
                name="titulo2"
                id="titulo2"
                onChange={handleChange}
                value={values.titulo2}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />

              <label
                htmlFor="titulo2"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Títulos II
              </label>
              {errors.titulo2 && (
                <p className=" text-red-600 text-xs">{errors.titulo2}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                value={values.email}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Correo electrónico
              </label>
              {errors.email && (
                <p className=" text-red-600 text-xs">{errors.email}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="tel"
                name="tel"
                id="tel"
                onChange={handleChange}
                value={values.tel}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="tel"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Número de teléfono
              </label>
              {errors.tel && (
                <p className=" text-red-600 text-xs">{errors.tel}</p>
              )}
            </div>
              <BtnGuardar/>
          </form>
        )}
      </Formik>
    </div>
  );
};
