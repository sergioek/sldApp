import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useDocenteContext } from "./DocenteContext";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "./LoginContext";

const ContextObligaciones = createContext();

export const useObligacionesContext = () => {
  return useContext(ContextObligaciones);
};

export const ObligacionesContext = ({ children }) => {
const {autorization}=useLoginContext()
const {showDocente} = useDocenteContext();
const [obligaciones,setObligaciones] = useState([]);
const [formData, setFormData] = useState(null);
const [inputDisabledDefault,setInputDisabledDefault]= useState(true);

const divisiones = [
  { id: 1, campo: "A" },
  { id: 2, campo: "B" },
  { id: 3, campo: "C" },
  { id: 4, campo: "D" },
  { id: 5, campo: "E" },
  { id: 6, campo: "F" },
  { id: 7, campo: "G" },
  { id: 8, campo: "H" },
  { id: 9, campo: "I" }
];


const [obligacion,setObligacion] = useState({  	  obligacion_id:"",
cargo_id:"",   
caracter: "",   
turno: "",
espacio_id:"",
division: "",
horas: "",
dias: "", 
origenVacante: "",
fechaAlta:"",
expedienteAlta: "",
numeroControl:"",
cupof: "",
observacion: "",
causaBaja: "",
fechaBaja: "",
expedienteBaja:"",});
const [cargos,setCargos]=useState([]);
const [espacios,setEspacios]=useState([]);
const [horariosDefault,setHorariosDefault] = useState([])

  const allObligaciones = (idDocente) => {
    axios
      .get("http://127.0.0.1:8000/api/v1/obligaciones/docente/" + idDocente, {
        headers: {
          Authorization: `Bearer ${autorization()}`,
        },
      })
      .then((response) => {
        setObligaciones(response.data.data)
        console.log(response.data.data)
      })
      .catch((errors) => {
        console.log(errors);
      });

      showDocente(idDocente);
  };


  const showObligacion = (idObligacion)=>{
    axios.get("http://127.0.0.1:8000/api/v1/obligaciones/" + idObligacion, {
      headers: {
        Authorization: `Bearer ${autorization()}`,
      },
    }).then((response)=>{
    
     setFormData(
      response.data.data[0],
      
     )
       
    }).catch((errors)=>{
      console.log(errors)
    })
  }
  const editObligacion = (idObligacion)=>{
    axios.get("http://127.0.0.1:8000/api/v1/obligaciones/edit/" + idObligacion, {
      headers: {
        Authorization: `Bearer ${autorization()}`,
      },
    }).then((response)=>{
     
      let obligacion=response.data.data[0] 
      setObligacion(obligacion)
      setHorariosDefault(JSON.parse(obligacion.dias))
    
    if(obligacion.espacio_id !== null){
       setInputDisabledDefault(false)
    }
   
       
    }).catch((errors)=>{
      console.log(errors)
    })
  }


  const allCargos = ()=>{
    axios.get("http://127.0.0.1:8000/api/v1/cargos/", {
      headers: {
        Authorization: `Bearer ${autorization()}`,
      },
    }).then((response)=>{
        setCargos(response.data.data)
    }).catch((errors)=>{
      console.log(errors)
    })
  }

  const allEspacios = ()=>{
    axios.get("http://127.0.0.1:8000/api/v1/espacios", {
      headers: {
        Authorization: `Bearer ${autorization()}`,
      },
    }).then((response)=>{
        setEspacios(response.data.data)
    }).catch((errors)=>{
      console.log(errors)
    })
  }


  return (
    <ContextObligaciones.Provider value={{allObligaciones,obligaciones,showObligacion,formData,divisiones,allCargos,cargos,allEspacios,espacios,editObligacion,obligacion,horariosDefault,setHorariosDefault,inputDisabledDefault,setInputDisabledDefault}}>
      {children}
    </ContextObligaciones.Provider>
  );
};
