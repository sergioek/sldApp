import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { BtnGuardar } from "../../Btn/BtnGuardar";
import { useObligacionesContext } from "../../context/ObligacionesContext";
import { alert } from "../../Alerts/Alert";
import axios from "axios";
import { useDocenteContext } from "../../context/DocenteContext";
import "../../../assets/css/forms.css";
import { useLoginContext } from "../../context/LoginContext";

export const FormNuevaObligacion = () => {
  const { idDocente } = useParams();
  const [inputDisabled, setInputDisabled] = useState(true);
  const diasSemana = [
    {
      key: 0,
      dia: "Lunes",
      seleccionado: false,
      horas: 0,
    },
    {
      key: 1,
      dia: "Martes",
      seleccionado: false,
      horas: 0,
    },
    {
      key: 2,
      dia: "Míercoles",
      seleccionado: false,
      horas: 0,
    },
    {
      key: 3,
      dia: "Jueves",
      seleccionado: false,
      horas: 0,
    },
    {
      key: 4,
      dia: "Viernes",
      seleccionado: false,
      horas: 0,
    },
  ];
  const [horarios, setHorarios] = useState(diasSemana);
  const { divisiones, cargos, allCargos, allEspacios, espacios } =
    useObligacionesContext();
  const navigate = useNavigate();
  const { autorization } = useLoginContext();

  useEffect(() => {
    allCargos();
    allEspacios();
  }, []);

  const changeHorarios = (id, checked) => {
    setHorarios((prevDia) =>
      prevDia.map((itemDia) =>
        itemDia.key === id ? { ...itemDia, seleccionado: checked } : itemDia
      )
    );
  };

  const addHoraHorarios = (id, valor) => {
    setHorarios((prevDia) =>
      prevDia.map((itemDia) =>
        itemDia.key === id ? { ...itemDia, horas: valor } : itemDia
      )
    );
  };

  const newObligacion = (values, resetForm) => {
    axios
      .post("http://127.0.0.1:8000/api/v1/obligaciones", values, {
        headers: {
          Authorization: `Bearer ${autorization()}`,
        },
      })
      .then((response) => {
        resetForm();
        navigate("/obligaciones/" + idDocente);
        console.log(response);
      })
      .catch((error) => {
        alert({
          icon: "error",
          title: "Error!",
          text: "No se pudo crear una nueva nueva obligación",
        });
      });
  };

  const Schema = Yup.object().shape({
    docente_id: Yup.number().required("Campo requerido"),
    cargo_id: Yup.number("Debe seleccionar un cargo").required(
      "Campo requerido"
    ),
    caracter: Yup.string().required("Campo requerido"),
    turno: Yup.string().required("Campo requerido"),
    espacio_id: Yup.number("Debe seleccionar un espacio")
      .notRequired()
      .nullable(),
    division: Yup.string().notRequired().nullable(),
    horas: Yup.string().notRequired().nullable(),

    origenVacante: Yup.string().required("Campo requerido"),
    fechaAlta: Yup.date().required("Campo requerido"),
    expedienteAlta: Yup.string().required("Campo requerido"),
    numeroControl: Yup.string().required("Campo requerido"),
    cupof: Yup.string().required("Campo requerido"),
    observacion: Yup.string().notRequired(),
    causaBaja: Yup.string().notRequired(),
    fechaBaja: Yup.string().notRequired(),
    expedienteBaja: Yup.string().notRequired(),
  });

  return (
    <div className="py-10 bg-slate-100 px-4">
      <Formik
        initialValues={{
          docente_id: idDocente,
          cargo_id: "",
          caracter: "",
          turno: "",
          espacio_id: "",
          division: "",
          horas: "",
          dias: "",
          origenVacante: "",
          fechaAlta: "",
          expedienteAlta: "",
          numeroControl: "",
          cupof: "",
          observacion: "",
          causaBaja: "",
          fechaBaja: "",
          expedienteBaja: "",
        }}
        validationSchema={Schema}
        onSubmit={(values, { resetForm }) => {
          const oblig = {
            ...values,
            dias: JSON.stringify(horarios),
          };

          newObligacion(oblig, resetForm);
        }}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <h1 className={`title`}>Nueva Obligación</h1>

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="docente_id"
                  id="docente_id"
                  onChange={handleChange}
                  value={values.docente_id}
                  disabled
                  className={`input , peer`}
                />
                <label htmlFor="docente_id" className={`label`}>
                  ID Docente
                </label>
                {errors.docente_id && (
                  <p className={`p-errors`}>{errors.docente_id}</p>
                )}
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <select
                  name="cargo_id"
                  id="cargo_id"
                  className={`input , peer`}
                  onChange={handleChange}
                  onClick={(e) => {
                    if (e.target.value == 6) {
                      setInputDisabled(false);
                    } else {
                      setInputDisabled(true);
                    }
                  }}
                  value={values.cargo_id}
                >
                  <option value="">Seleccionar</option>
                  {cargos.map((cargo) => (
                    <option value={cargo.id} key={cargo.id}>
                      {cargo.cargo}
                    </option>
                  ))}
                </select>

                <label htmlFor="cargo_id" className={`label`}>
                  Cargo
                </label>
                {errors.cargo_id && (
                  <p className={`p-errors`}>{errors.cargo_id}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-3 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <select
                  name="caracter"
                  id="caracter"
                  className={`input , peer`}
                  onChange={handleChange}
                  value={values.caracter}
                >
                  <option value="">Seleccionar</option>
                  <option value="Titular">Titular</option>
                  <option value="Suplente">Suplente</option>
                  <option value="Interino">Interino</option>
                  <option value="Contratado">Contratado</option>
                </select>

                <label htmlFor="caracter" className={`label`}>
                  Carácter
                </label>
                {errors.caracter && (
                  <p className={`p-errors`}>{errors.caracter}</p>
                )}
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <select
                  name="turno"
                  id="turno"
                  className={`input , peer`}
                  onChange={handleChange}
                  value={values.turno}
                >
                  <option value="">Seleccionar</option>
                  <option value="M">M</option>
                  <option value="T">T</option>
                  <option value="N">N</option>
                </select>

                <label htmlFor="turno" className={`label`}>
                  Turno
                </label>
                {errors.turno && <p className={`p-errors`}>{errors.turno}</p>}
              </div>

              {inputDisabled == false && (
                <div className="relative z-0 w-full mb-5 group">
                  <select
                    name="division"
                    id="division"
                    className={`input , peer`}
                    onChange={handleChange}
                    value={values.division}
                  >
                    <option value="">Seleccionar</option>
                    {divisiones.map((division) => (
                      <option value={division.campo} key={division.id}>
                        {division.campo}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="division" className={`label`}>
                    División
                  </label>
                  {errors.division && (
                    <p className={`p-errors`}>{errors.division}</p>
                  )}
                </div>
              )}
            </div>

            {inputDisabled == false && (
              <div className="relative z-0 w-full mb-5 group mt-4">
                <select
                  name="espacio_id"
                  id="espacio_id"
                  className={`input , peer`}
                  onChange={handleChange}
                  value={values.espacio_id}
                >
                  {espacios.map((espacio) =>
                    espacio.carrera == null ? (
                      <option value={espacio.id} key={espacio.id}>
                        {espacio.curso +
                          " " +
                          espacio.nombre +
                          " (" +
                          espacio.ciclo +
                          ")"}
                      </option>
                    ) : (
                      <option value={espacio.id} key={espacio.id}>
                        {espacio.curso +
                          " " +
                          espacio.nombre +
                          " (" +
                          espacio.carrera +
                          ")"}
                      </option>
                    )
                  )}
                </select>

                <label htmlFor="espacio_id" className={`label`}>
                  Espacio curricular
                </label>
                {errors.espacio_id && (
                  <p className={`p-errors`}>{errors.espacio_id}</p>
                )}
              </div>
            )}

            {inputDisabled == false && (
              <div className="relative z-0 w-full mb-5 group mt-4">
                <input
                  type="number"
                  name="horas"
                  id="horas"
                  onChange={handleChange}
                  value={values.horas}
                  disabled={inputDisabled}
                  className={`input , peer`}
                  min={0}
                />

                <label htmlFor="horas" className={`label`}>
                  Cantidad de Horas
                </label>
                {errors.horas && <p className={`p-errors`}>{errors.horas}</p>}
              </div>
            )}

            <div className="relative z-0 w-full mb-5 group mt-4">
              {diasSemana.map((dia) => (
                <div className="py-4 px-4 flex gap-2" key={dia.key}>
                  <input
                    id={dia.key}
                    name={dia.dia}
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                    onChange={(e) => {
                      changeHorarios(dia.key, e.target.checked);
                    }}
                  />

                  <label htmlFor={dia.dia} className="ml-2 text-gray-700">
                    {dia.dia + ":"}
                  </label>

                  <input
                    type="number"
                    name={dia.dia}
                    id={dia.dia}
                    min={0}
                    onChange={(e) => {
                      addHoraHorarios(dia.key, e.target.value);
                    }}
                    disabled={inputDisabled}
                    className="block  px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  />
                </div>
              ))}

              <label htmlFor="dias" className={`label`}>
                Dias / Horas
              </label>
              {errors.dias && <p className={`p-errors`}>{errors.dias}</p>}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="text"
                name="origenVacante"
                id="origenVacante"
                onChange={handleChange}
                value={values.origenVacante}
                className={`input , peer`}
                placeholder=""
              />

              <label htmlFor="origenVacante" className={`label`}>
                Origen de la vacante
              </label>
              {errors.origenVacante && (
                <p className={`p-errors`}>{errors.origenVacante}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="date"
                name="fechaAlta"
                id="fechaAlta"
                onChange={handleChange}
                value={values.fechaAlta}
                className={`input , peer`}
                placeholder=" "
              />
              <label htmlFor="fechaAlta" className={`label`}>
                Fecha de Alta
              </label>
              {errors.fechaAlta && (
                <p className={`p-errors`}>{errors.fechaAlta}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="text"
                name="expedienteAlta"
                id="expedienteAlta"
                onChange={handleChange}
                value={values.expedienteAlta}
                className={`input , peer`}
                placeholder=" "
              />

              <label htmlFor="expedienteAlta" className={`label`}>
                Expediente de alta
              </label>
              {errors.expedienteAlta && (
                <p className={`p-errors`}>{errors.expedienteAlta}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="text"
                name="numeroControl"
                id="numeroControl"
                onChange={handleChange}
                value={values.numeroControl}
                className={`input , peer`}
                placeholder=" "
              />

              <label htmlFor="numeroControl" className={`label`}>
                Número de control
              </label>
              {errors.numeroControl && (
                <p className={`p-errors`}>{errors.numeroControl}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="text"
                name="cupof"
                id="cupof"
                onChange={handleChange}
                value={values.cupof}
                className={`input , peer`}
                placeholder=" "
              />
              <label htmlFor="cupof" className={`label`}>
                CUPOF
              </label>
              {errors.cupof && <p className={`p-errors`}>{errors.cupof}</p>}
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <textarea
                name="observacion"
                id="observacion"
                onChange={handleChange}
                value={values.observacion}
                className={`input , peer`}
                placeholder=" "
              ></textarea>
              <label htmlFor="observacion" className={`label`}>
                Observación
              </label>
              {errors.observacion && (
                <p className={`p-errors`}>{errors.observacion}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="text"
                name="causaBaja"
                id="causaBaja"
                onChange={handleChange}
                value={values.causaBaja}
                className={`input , peer`}
                placeholder=""
              />

              <label htmlFor="causaBaja" className={`label`}>
                Causa de la Baja
              </label>
              {errors.causaBaja && (
                <p className={`p-errors`}>{errors.causaBaja}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="date"
                name="fechaBaja"
                id="fechaBaja"
                onChange={handleChange}
                value={values.fechaBaja}
                className={`input , peer`}
                placeholder=" "
              />
              <label htmlFor="fechaBaja" className={`label`}>
                Fecha de Baja
              </label>
              {errors.fechaBaja && (
                <p className={`p-errors`}>{errors.fechaBaja}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="text"
                name="expedienteBaja"
                id="expedienteBaja"
                onChange={handleChange}
                value={values.expedienteBaja}
                className={`input , peer`}
                placeholder=" "
              />

              <label htmlFor="expedienteBaja" className={`label`}>
                Expediente de Baja
              </label>
              {errors.expedienteBaja && (
                <p className={`p-errors`}>{errors.expedienteBaja}</p>
              )}
            </div>

            <BtnGuardar />
          </form>
        )}
      </Formik>
    </div>
  );
};
