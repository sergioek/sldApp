import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { BtnGuardar } from "../../Btn/BtnGuardar";
import { useObligacionesContext } from "../../context/ObligacionesContext";
import {alert} from "../../Alerts/Alert"
import axios from "axios";
import { useDocenteContext } from "../../context/DocenteContext";

export const FormEditarObligacion = () => {
  const { idObligacion } = useParams();


  const {divisiones,cargos,allCargos,allEspacios,espacios,editObligacion,obligacion,horariosDefault,inputDisabledDefault,setInputDisabledDefault} = useObligacionesContext()

  const [horarios,setHorarios] = useState(horariosDefault)
  const horariosSemana = horariosDefault;
  const navigate = useNavigate()
  const {autorization}=useDocenteContext()


  useEffect(()=>{

    editObligacion(idObligacion)
    allCargos()
    allEspacios()

  },[])


  const changeHorarios = (id,checked)=>{

    setHorarios((prevDia) =>
     prevDia.map((itemDia) =>
       itemDia.key === id ? { ...itemDia, seleccionado: checked } : itemDia
     )
   );
 
   }
 
   const addHoraHorarios = (id,valor)=>{
  
     setHorarios((prevDia) =>
     prevDia.map((itemDia) =>
       itemDia.key === id ? { ...itemDia, horas: valor } : itemDia
     )
   );
 
   }
 
 


  const Schema = Yup.object().shape({
    obligacion_id: Yup.number().required("Campo requerido"),
    cargo_id: Yup.number("Debe seleccionar un cargo").required("Campo requerido"),   
    caracter: Yup.string().required("Campo requerido"),   
    turno: Yup.string().required("Campo requerido"),
    espacio_id: Yup.number("Debe seleccionar un espacio").notRequired().nullable(),
    division: Yup.string().notRequired().nullable(),
    horas: Yup.string().notRequired().nullable(),

    origenVacante: Yup.string().required("Campo requerido"),
    fechaAlta: Yup.date().required("Campo requerido"),
    expedienteAlta: Yup.string().required("Campo requerido"),
    numeroControl:Yup.string().required("Campo requerido"),
    cupof:Yup.string().required("Campo requerido"),
    observacion: Yup.string().notRequired(),
    causaBaja:Yup.string().notRequired(),
    fechaBaja: Yup.string().notRequired(),
    expedienteBaja:Yup.string().notRequired()
  })



  return (
    <div className="py-10 bg-slate-100 px-4">
      <Formik
        enableReinitialize
        initialValues={{
          obligacion_id: obligacion.obligacion_id || "", 
          cargo_id: obligacion.cargo_id || "" ,   
          caracter: obligacion.caracter || "",   
          turno: obligacion.turno || "",
          espacio_id: obligacion.espacio_id || "",
          division: obligacion.division || "",
          horas: obligacion.horas || "",
         
          origenVacante: obligacion.origenVacante || "",
          fechaAlta:obligacion.fechaAlta || "",
          expedienteAlta: obligacion.expedienteAlta || "",
          numeroControl: obligacion.numeroControl || "" ,
          cupof: obligacion.cupof || "",
          observacion: obligacion.observacion || "",
          causaBaja:obligacion.causaBaja || "" ,
          fechaBaja:obligacion.fechaBaja || "" ,
          expedienteBaja:obligacion.expedienteBaja || "" ,
        }}
        validationSchema={Schema}
        onSubmit={(values,{resetForm})=>{
          const oblig={
            ...values,
            dias:JSON.stringify(horarios)
          }
        
        
        }}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <h1 className=" text-3xl font-mono font-bold text-blue-900 mb-8">
              Editar Obligación
            </h1>

            <div className="grid md:grid-cols-2 md:gap-6">
           
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="obligacion_id"
                  id="obligacion_id"
                  onChange={handleChange}
                  value={values.obligacion_id}
                  disabled
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                <label
                  htmlFor="obligacion_id"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  ID Obligacion
                </label>
                {errors.obligacion_id && (
                  <p className=" text-red-600 text-xs">{errors.obligacion_id}</p>
                )}
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <select name="cargo_id" id="cargo_id"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"   
                
                onChange={handleChange}  
         
                onClick={(e)=>{
                  if(e.target.value==6){
                    setInputDisabledDefault(false)
                  }else{
                    setInputDisabledDefault(true)
                  }
                }}


                  value={values.cargo_id}>
                  <option value="">Seleccionar</option>
                    {
                      cargos.map((cargo)=>(
                        <option value={cargo.id} key={cargo.id}>{cargo.cargo}</option>
                      ))
                    }
                    
                </select>
          
                <label
                  htmlFor="cargo_id"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Cargo
                </label>
                {errors.cargo_id && (
                  <p className=" text-red-600 text-xs">{errors.cargo_id}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-3 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                
              <select name="caracter" id="caracter"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"   
              onChange={handleChange}  
              
              value={values.caracter}>
                    <option value="">Seleccionar</option>
                    <option value="Titular">Titular</option>
                    <option value="Suplente">Suplente</option> 
                    <option value="Interino">Interino</option>
                    <option value="Contratado">Contratado</option>
                </select>
          
                <label
                  htmlFor="caracter"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Carácter
                </label>
                {errors.caracter && (
                  <p className=" text-red-600 text-xs">{errors.caracter}</p>
                )}
              </div>


              <div className="relative z-0 w-full mb-5 group">
                <select name="turno" id="turno"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"   onChange={handleChange}  
                  value={values.turno}>
                    <option value="">Seleccionar</option>
                    <option value="M">M</option>
                    <option value="T">T</option>
                    <option value="N">N</option>
                </select>
          
                <label
                  htmlFor="turno"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Turno
                </label>
                {errors.turno && (
                  <p className=" text-red-600 text-xs">{errors.turno}</p>
                )}
              </div>

              {inputDisabledDefault == false &&
              <div className="relative z-0 w-full mb-5 group">
                <select name="division" id="division"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"   onChange={handleChange}  
                value={values.division}
                >
                 
                  {
                   
                    
                    divisiones.map((division)=>(
                      
                      <option value={division.campo} key={division.id}>{division.campo}</option>
                      
                    ))

                    
                  }
                </select>
                <label
                  htmlFor="division"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  División
                </label>
                {errors.division && (
                  <p className=" text-red-600 text-xs">{errors.division}</p>
                )}
              </div>
              }
            </div>

            {inputDisabledDefault == false &&
            <div className="relative z-0 w-full mb-5 group mt-4">
              
            <select name="espacio_id" id="espacio_id"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"   onChange={handleChange}  
            value={values.espacio_id} 
            
            >
            
              {


               
                  espacios.map((espacio)=>(

                    espacio.carrera == null ?
                    <option value={espacio.id} key={espacio.id}>{espacio.curso + " " + espacio.nombre + " ("+espacio.ciclo + ")"}
                    </option>
                    : 
                    <option value={espacio.id} key={espacio.id}>{espacio.curso + " " + espacio.nombre + " ("+espacio.carrera+")"}
                    </option>
                
                ))

                
              }
                
        
            </select>

              <label
                htmlFor="espacio_id"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Espacio curricular
              </label>
              {errors.espacio_id && (
                <p className=" text-red-600 text-xs">{errors.espacio_id}</p>
              )}
            </div>
            }

            {inputDisabledDefault == false &&
            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="number"
                name="horas"
                id="horas"
                onChange={handleChange}
                value={values.horas}
                
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                min={0}
              />

              <label
                htmlFor="horas"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Cantidad de Horas
              </label>
              {errors.horas && (
                <p className=" text-red-600 text-xs">{errors.horas}</p>
              )}
            </div>
            }
            <div className="relative z-0 w-full mb-5 group mt-4">

          
              {
            
                 horariosSemana.map((dia)=>(
                  
                <div className="py-4 px-4 flex gap-2" key={dia.key}>
                  
                  <input id={dia.key} name={dia.dia} type="checkbox"
                  
                  defaultChecked={dia.seleccionado}
                  className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                  
                  onChange={(e)=>{
                    
                    changeHorarios(dia.key,dia.dia,e.target.checked);
                  }}
                
                  />

                  <label htmlFor={dia.dia} className="ml-2 text-gray-700">{dia.dia + ":"}</label>

                  <input type="number" name={dia.dia} id={dia.dia} 
                  defaultValue={dia.horas}
                  min={0}
                  onChange={(e)=>{
                    addHoraHorarios(dia.key,e.target.value);
                  }} 
                  
                  disabled={inputDisabledDefault} className="block  px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
   
              </div>
        
                ))
              }
              
   
        
              <label
                htmlFor="dias"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Dias / Horas
              </label>
              {errors.dias && (
                <p className=" text-red-600 text-xs">{errors.dias}</p>
              )}
            </div>


            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="text"
                name="origenVacante"
                id="origenVacante"
                onChange={handleChange}
                value={values.origenVacante}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
              />

              <label
                htmlFor="origenVacante"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Origen de la vacante
              </label>
              {errors.origenVacante && (
                <p className=" text-red-600 text-xs">{errors.origenVacante}</p>
              )}
            </div>

   
            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="date"
                name="fechaAlta"
                id="fechaAlta"
                onChange={handleChange}
                value={values.fechaAlta}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="fechaAlta"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Fecha de Alta
              </label>
              {errors.fechaAlta && (
                <p className=" text-red-600 text-xs">
                  {errors.fechaAlta}
                </p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="text"
                name="expedienteAlta"
                id="expedienteAlta"
                onChange={handleChange}
                value={values.expedienteAlta}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />

              <label
                htmlFor="expedienteAlta"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Expediente de alta
              </label>
              {errors.expedienteAlta && (
                <p className=" text-red-600 text-xs">{errors.expedienteAlta}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="text"
                name="numeroControl"
                id="numeroControl"
                onChange={handleChange}
                value={values.numeroControl}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />

              <label
                htmlFor="numeroControl"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Número de control
              </label>
              {errors.numeroControl && (
                <p className=" text-red-600 text-xs">{errors.numeroControl}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="text"
                name="cupof"
                id="cupof"
                onChange={handleChange}
                value={values.cupof}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="cupof"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                CUPOF
              </label>
              {errors.cupof && (
                <p className=" text-red-600 text-xs">{errors.cupof}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <textarea name="observacion" id="observacion"       
                onChange={handleChange}
                value={values.observacion}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "></textarea>
                <label
                htmlFor="observacion"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Observación
              </label>
              {errors.observacion && (
                <p className=" text-red-600 text-xs">{errors.observacion}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="text"
                name="causaBaja"
                id="causaBaja"
                onChange={handleChange}
                value={values.causaBaja}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
              />

              <label
                htmlFor="causaBaja"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Causa de la Baja
              </label>
              {errors.causaBaja && (
                <p className=" text-red-600 text-xs">{errors.causaBaja}</p>
              )}
            </div>

   
            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="date"
                name="fechaBaja"
                id="fechaBaja"
                onChange={handleChange}
                value={values.fechaBaja}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="fechaBaja"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Fecha de Baja
              </label>
              {errors.fechaBaja && (
                <p className=" text-red-600 text-xs">
                  {errors.fechaBaja}
                </p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <input
                type="text"
                name="expedienteBaja"
                id="expedienteBaja"
                onChange={handleChange}
                value={values.expedienteBaja}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />

              <label
                htmlFor="expedienteBaja"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Expediente de Baja
              </label>
              {errors.expedienteBaja && (
                <p className=" text-red-600 text-xs">{errors.expedienteBaja}</p>
              )}
            </div>

            <BtnGuardar />
          </form>
        )}
      </Formik>
    </div>
  );
};
