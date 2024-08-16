import { Formik } from "formik";
import * as Yup from "yup";
import { useDocenteContext } from "../../context/DocenteContext";
import { toastifyAlert } from "../../Alerts/Alert";
import axios from "axios";
import { BtnGuardar } from "../../Btn/BtnGuardar";
import "../../../assets/css/forms.css";
import { useLoginContext } from "../../context/LoginContext";
import { useLicenciaContext } from "../../context/LicenciaContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useObligacionesContext } from "../../context/ObligacionesContext";
import moment from "moment";

export const FormNuevaLicencia = () => {
  const { autorization } = useLoginContext();
  const {allArticulos,articulos} = useLicenciaContext();
  const {showDocente,docente} = useDocenteContext();
  const {allObligaciones,obligaciones} = useObligacionesContext();
  const {idDocente}=useParams();
  const [obligacionID,setObligacionID] = useState([])
  const [inputDisabled, setInputDisabled] = useState(true);
  const navigate = useNavigate();

  const Schema = Yup.object().shape({
    docente_id:Yup.number().required('Campo requerido'),
    finicio: Yup.date().required('Campo requerido'),
    ffinal: Yup.date().required('Campo requerido'),
    dias: Yup.number().min(1).required('Campo requerido'),
    articulo_id: Yup.number().required('Campo requerido'),
    totalHaberes:Yup.string().required('Campo requerido'),
    injustificada:Yup.string().required('Campo requerido'),
    documentacion:Yup.string().required('Campo requerido'),
    expediente:Yup.string().notRequired(),
    observaciones:Yup.string().max(100,'No debe superar los 100 caracteres').notRequired(),
  });

  useEffect(() => {
    toastifyAlert()
    allArticulos()
    showDocente(idDocente)
    allObligaciones(idDocente)
  }, [])
  


  // const addObligacion = (id)=>{
  //   setObligacionID((previos)=>{
  //     if(previos.includes(id)){
  //       return previos.filter((obligacion)=>obligacion !== id)
  //     }else{
  //       return [...previos,id]
  //     }
  //   })
  // }

  const addObligacion = (id,horas)=>{
    
    // setObligacionID((previos)=>{
    //   if(previos.find(prev=>prev.id === id)){
    //     return previos.filter((obligacion)=>obligacion.id !== id)
    //   }else{
    //     return [...previos,{id:id,horas:horas}]
    //   }
    // })

    setObligacionID((previos)=>previos.some(prev=>prev.id === id)?  previos.filter((obligacion)=>obligacion.id !== id) : [...previos,{id:id,horas:horas}] )
  }

  const newLicencia =(values)=>{

    console.log(obligacionID)
    obligacionID.forEach((oblig)=>{
        let object = {
          ...values,
          obligacione_id:oblig.id,
          obligacionesAfectadas:oblig.horas
        }
        console.log(oblig)
        axios
        .post("http://127.0.0.1:8000/api/v1/licencias", object, {
          headers: {
            Authorization: `Bearer ${autorization()}`,
          },
        })
        .then((response) => {
          navigate("/licencias/" + idDocente)
        })
        .catch((errors) => {
          console.log(errors)
        });
    })
      
  }

  return (
    <div className="py-10 bg-slate-100 px-4">
      <Formik
        initialValues={{
          docente_id:idDocente,
          finicio:"",
          ffinal:"",
          dias:1,
          articulo_id:"",
          totalHaberes:"",
          injustificada:"",
          documentacion:"",
          observaciones:"",
        }}
        validationSchema={Schema}
        onSubmit={(values) => {
          newLicencia(values);
        }}
      >
        {({ values, handleChange, handleBlur , handleSubmit, errors }) => (
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <h1 className={`title`}>Nueva Licencia</h1>

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="docente_id"
                  id="docente_id"
                  onChange={handleChange}
                  value={values.docente_id}
                  className={`input , peer`}
                  disabled
                />
                <label htmlFor="docente_id" className={`label`}>
                  Docente ID
                </label>
                {errors.docente_id && (
                  <p className={`p-errors`}>{errors.docente_id}</p>
                )}
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="docente"
                  id="docente"
                  onChange={handleChange}
                  value={docente !== null &&docente.nombres + " " + docente.apellidos}
                  disabled
                  className={`input , peer`}
                />
                <label htmlFor="docente" className={`label`}>
                  Docente
                </label>
       
              </div>
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <select
                name="articulo_id"
                id="articulo_id"
                onChange={handleChange}
                value={values.articulo_id}
                className={`input , peer`}
              >
                <option value="">Seleccionar</option>
                {
                  
                  articulos.length > 0 &&
                  articulos.map((articulo)=>(
                    <option value={articulo.id} key={articulo.id}>{articulo.articulo + " - " + articulo.denominacion}</option>
                  ))
                }
                
                
              </select>

              <label htmlFor="articulo_id" className={`label`}>
                Artículo
              </label>
              {errors.articulo_id && (
                <p className={`p-errors`}>{errors.articulo_id}</p>
              )}
            </div>

            <div className="grid md:grid-cols-3 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="date"
                  name="finicio"
                  id="finicio"
                  onChange={handleChange}
                  value={values.finicio}
                  className={`input , peer , text-center`}
                  placeholder=" "
                />
                <label htmlFor="finicio" className={`label`}>
                  Fecha de Inicio
                </label>
                {errors.finicio && (
                  <p className={`p-errors`}>{errors.finicio}</p>
                )}
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="date"
                  name="ffinal"
                  id="ffinal"
                  onChange={handleChange}

                  value={values.ffinal}
                  className={`input , peer, text-center`}
                  placeholder=" "
                />
                <label htmlFor="ffinal" className={`label`}>
                  Fecha de Cierre
                </label>
                {errors.ffinal && <p className={`p-errors`}>{errors.ffinal}</p>}
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  name="dias"
                  id="dias"
                  onChange={handleChange}
                  value={values.dias}
                  className={`input , peer , text-center`}
               
                  min={1}
                />
                <label htmlFor="dias" className={`label`}>
                  Cant. Dias
                </label>
                {errors.dias && (
                  <p className={`p-errors`}>{errors.dias}</p>
                )}
              </div>
            </div>



             <div className="relative z-0 w-full mb-5 group mt-4 ">
              {obligaciones.map((obligacion) => (
                <div className="py-4 px-4 flex items-center gap-2" key={obligacion.id}>
                  <input
                    id={obligacion.id}
                    name={obligacion.id}
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                    onChange={() => {
                      addObligacion(obligacion.id,0)  
                     
                    }}
                  />

                  {
                    obligacion.espacio !== null ?
                    
                    <label htmlFor={obligacion.id} className="ml-2 text-gray-700">

                    {obligacion.cargo + " - " + obligacion.caracter + " - Turno: " + obligacion.turno +  " - Espacio: " + obligacion.espacio + " de " +obligacion.curso + obligacion.division }
                   
                    {
                      obligacion.horas !== null && " - (" +obligacion.horas + " hs)"
                    }

                  </label>
                
                    :

                    <label htmlFor={obligacion.id} className="ml-2 text-gray-700">

                      {obligacion.cargo + " - " + obligacion.caracter + " - Turno: " + obligacion.turno}

                    </label>


                  }
                  
                  <div>
                  {
                    obligacion.cargo === "Catedrático/a" &&
                    <div className="flex row">
                      
                    <input type="number" min={0} placeholder="Horas"  className={`input , peer , text-center w-20`} 
                   
                    onKeyDown={(e)=>{
                      addObligacion(obligacion.id,e.target.value)
                    }}
                    onChange={(e) => {
                      addObligacion(obligacion.id,e.target.value)  
                    }} />

          
                    </div>

                 
                   
                  }
                  </div>
                </div>

               
              ))}

              <label htmlFor="dias" className={`label`}>
                Obligaciones afectadas
              </label>
      
            </div> 


            
          
            <div className="relative z-0 w-full mb-5 group mt-4">
              <select
                name="totalHaberes"
                id="totalHaberes"
                onChange={handleChange}
                value={values.totalHaberes}
                className={`input , peer`}
              >
                <option value="">Seleccionar</option>
                <option value="100%">100%</option>
                <option value="50%">50%</option>
                
              </select>

              <label htmlFor="totalHaberes" className={`label`}>
                Total de haberes
              </label>
              {errors.totalHaberes && (
                <p className={`p-errors`}>{errors.totalHaberes}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5 group mt-4">
              <select
                name="injustificada"
                id="injustificada"
                onChange={handleChange}
                value={values.injustificada}
                className={`input , peer`}
              >
                <option value="">Seleccionar</option>
                <option value="NO">NO</option>
                <option value="SI">SI</option>
                
              </select>

              <label htmlFor="injustificada" className={`label`}>
                Injustificada
              </label>
              {errors.injustificada && (
                <p className={`p-errors`}>{errors.injustificada}</p>
              )}
            </div>

            
            <div className="relative z-0 w-full mb-5 group mt-4">
              <select
                name="documentacion"
                id="documentacion"
                onChange={handleChange}
                value={values.documentacion}
                className={`input , peer`}
              >
                <option value="">Seleccionar</option>
                <option value="Completa">Completa</option>
                <option value="Incompleta">Incompleta</option>
                
              </select>

              <label htmlFor="documentacion" className={`label`}>
                Documentación
              </label>
              {errors.documentacion && (
                <p className={`p-errors`}>{errors.documentacion}</p>
              )}
            </div>

            
            <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="expediente"
                  id="expediente"
                  onChange={handleChange}
                  value={values.expediente}
                  className={`input , peer`}
                  placeholder=""
              
                />
                <label htmlFor="expediente" className={`label`}>
                  Número de expediente
                </label>
                {errors.expediente && (
                  <p className={`p-errors`}>{errors.expediente}</p>
                )}
              </div>

              <div className="relative z-0 w-full mb-5 group">
             
                <textarea   name="observaciones"
                  id="observaciones"
                  onChange={handleChange}
                  value={values.observaciones}
                  className={`input , peer`}
                  placeholder="">

                </textarea>
                <label htmlFor="observaciones" className={`label`}>
                  Observaciones
                </label>
                {errors.observaciones && (
                  <p className={`p-errors`}>{errors.observaciones}</p>
                )}
              </div>
          
            <BtnGuardar />
          </form>
        )}
      </Formik>
    </div>
  );
};
