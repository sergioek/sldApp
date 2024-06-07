import { Formik } from "formik";
import * as Yup from "yup";
import { useDocenteContext } from "../../context/DocenteContext";
import { alert } from "../../Alerts/Alert";
import axios from "axios";
import { BtnGuardar } from "../../Btn/BtnGuardar";
import "../../../assets/css/forms.css";

export const FormNuevoDocente = () => {
  const { autorization } = useDocenteContext();

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

  const newDocente = (values, resetForm) => {
    axios
      .post("http://127.0.0.1:8000/api/v1/docentes", values, {
        headers: {
          Authorization: `Bearer ${autorization()}`,
        },
      })
      .then((response) => {
        alert({
          icon: "success",
          title: "Se agregó un nuevo docente!",
          text: "Puedes volver a la tabla docentes o continuar agregando más.",
        });
        resetForm();
      })
      .catch((errors) => {
        alert({
          icon: "error",
          title: "Error al agregar un nuevo docente!",
          text: "El error se puede deber a que ya existe un docente con el mismo DNI.",
        });
      });
  };

  return (
    <div className="py-10 bg-slate-100 px-4">
      <Formik
        initialValues={{
          apellidos: "",
          nombres: "",
          prefixCUIL: "",
          dni: "",
          postfixCUIL: "",
          fnacimiento: "",
          lnacimiento: "",
          domicilio: "",
          direccion: "",
          estadoCivil: "",
          finicioDocencia: "",
          titulo1: "",
          titulo2: "Ninguno",
          email: "",
          tel: "",
        }}
        validationSchema={Schema}
        onSubmit={(values, { resetForm }) => {
          newDocente(values, resetForm);
        }}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <h1 className={`title`}>Nuevo Docente</h1>

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="apellidos"
                  id="apellidos"
                  onChange={handleChange}
                  value={values.apellidos}
                  className={`input , peer`}
                />
                <label htmlFor="apellidos" className={`label`}>
                  Apellidos
                </label>
                {errors.apellidos && (
                  <p className={`p-errors`}>{errors.apellidos}</p>
                )}
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="nombres"
                  id="nombres"
                  onChange={handleChange}
                  value={values.nombres}
                  className={`input , peer`}
                />
                <label htmlFor="nombres" className={`label`}>
                  Nombres
                </label>
                {errors.nombres && (
                  <p className={`p-errors`}>{errors.nombres}</p>
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
                  className={`input , peer , text-center`}
                  placeholder=" "
                />
                <label htmlFor="prefixCUIL" className={`label`}>
                  CUIL (Prefijo)
                </label>
                {errors.prefixCUIL && (
                  <p className={`p-errors`}>{errors.prefixCUIL}</p>
                )}
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="dni"
                  id="dni"
                  onChange={handleChange}
                  value={values.dni}
                  className={`input , peer, text-center`}
                  placeholder=" "
                />
                <label htmlFor="dni" className={`label`}>
                  DNI
                </label>
                {errors.dni && <p className={`p-errors`}>{errors.dni}</p>}
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="postfixCUIL"
                  id="postfixCUIL"
                  onChange={handleChange}
                  value={values.postfixCUIL}
                  className={`input , peer , text-center`}
                  placeholder=" "
                />
                <label htmlFor="postfixCUIL" className={`label`}>
                  CUIL (Subfijo)
                </label>
                {errors.postfixCUIL && (
                  <p className={`p-errors`}>{errors.postfixCUIL}</p>
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
                className={`input , peer`}
                placeholder=" "
              />
              <label htmlFor="fnacimiento" className={`label`}>
                Fecha de nacimiento
              </label>
              {errors.fnacimiento && (
                <p className={`p-errors`}>{errors.fnacimiento}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="text"
                name="lnacimiento"
                id="lnacimiento"
                onChange={handleChange}
                value={values.lnacimiento}
                className={`input , peer`}
                placeholder=" "
              />

              <label htmlFor="lnacimiento" className={`label`}>
                Lugar de nacimiento
              </label>
              {errors.lnacimiento && (
                <p className={`p-errors`}>{errors.lnacimiento}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="text"
                name="domicilio"
                id="domicilio"
                onChange={handleChange}
                value={values.domicilio}
                className={`input , peer`}
                placeholder=" "
              />

              <label htmlFor="domicilio" className={`label`}>
                Domicilio
              </label>
              {errors.domicilio && (
                <p className={`p-errors`}>{errors.domicilio}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="text"
                name="direccion"
                id="direccion"
                onChange={handleChange}
                value={values.direccion}
                className={`input , peer`}
                placeholder=" "
              />

              <label htmlFor="direccion" className={`label`}>
                Calle / número / Barrio
              </label>
              {errors.direccion && (
                <p className={`p-errors`}>{errors.direccion}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <select
                name="estadoCivil"
                id="estadoCivil"
                onChange={handleChange}
                value={values.estadoCivil}
                className={`input , peer`}
              >
                <option value=""></option>
                <option value="Soltero/a">Soltero/a</option>
                <option value="Casado/a">Casado/a</option>
                <option value="Viudo/a">Viudo/a</option>
                <option value="Divorciado/a">Divorciado/a</option>
              </select>

              <label htmlFor="estadoCivil" className={`label`}>
                Estado civil
              </label>
              {errors.estadoCivil && (
                <p className={`p-errors`}>{errors.estadoCivil}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="date"
                name="finicioDocencia"
                id="finicioDocencia"
                onChange={handleChange}
                value={values.finicioDocencia}
                className={`input , peer`}
                placeholder=" "
              />
              <label htmlFor="finicioDocencia" className={`label`}>
                Inicio en la docencia
              </label>
              {errors.finicioDocencia && (
                <p className={`p-errors`}>{errors.finicioDocencia}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="text"
                name="titulo1"
                id="titulo1"
                onChange={handleChange}
                value={values.titulo1}
                className={`input , peer`}
                placeholder=" "
              />

              <label htmlFor="titulo1" className={`label`}>
                Títulos I
              </label>
              {errors.titulo1 && <p className={`p-errors`}>{errors.titulo1}</p>}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="text"
                name="titulo2"
                id="titulo2"
                onChange={handleChange}
                value={values.titulo2}
                className={`input , peer`}
                placeholder=" "
              />

              <label htmlFor="titulo2" className={`label`}>
                Títulos II
              </label>
              {errors.titulo2 && <p className={`p-errors`}>{errors.titulo2}</p>}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                value={values.email}
                className={`input , peer`}
                placeholder=" "
              />
              <label htmlFor="email" className={`label`}>
                Correo electrónico
              </label>
              {errors.email && <p className={`p-errors`}>{errors.email}</p>}
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="tel"
                name="tel"
                id="tel"
                onChange={handleChange}
                value={values.tel}
                className={`input , peer`}
                placeholder=" "
              />
              <label htmlFor="tel" className={`label`}>
                Número de teléfono
              </label>
              {errors.tel && <p className={`p-errors`}>{errors.tel}</p>}
            </div>

            <BtnGuardar />
          </form>
        )}
      </Formik>
    </div>
  );
};
