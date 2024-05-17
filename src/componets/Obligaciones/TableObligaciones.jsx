import React, { useEffect, useState } from "react";
import { useDocenteContext } from "../context/DocenteContext";
import {BtnAdd} from "../Btn/BtnAdd";
import axios from "axios";
import { alert } from "../Alerts/Alert";
import { useNavigate, useParams } from "react-router-dom";
import ContactList from "./ContactList";
import { UseHookObligaciones } from "../hooks/UseHookObligaciones";
import { useObligacionesContext } from "../context/ObligacionesContext";
import { mostrarDialog } from "../Alerts/Alert";
import { FaInfoCircle,FaRegEdit,FaRegTrashAlt    } from "react-icons/fa";

export const TableObligaciones = () => {
    const {idDocente} = useParams()
    const {obligaciones,allObligaciones,showObligacion,formData,docente} = useObligacionesContext();
    const {autorization}=useDocenteContext()

    const [state,setState]=useState(null)

    useEffect(()=>{
        allObligaciones(idDocente)
        if(formData !== null){
          mostrarDialog(formData)
          
        }
    },[idDocente,formData,state])


  const show = (id)=>{
    showObligacion(id)
  }

  const trash = (id)=>{
    axios.delete("http://127.0.0.1:8000/api/v1/obligaciones/" + id, {
      headers: {
        Authorization: `Bearer ${autorization()}`,
      },
    }).then((response)=>{
      alert({
        icon:"success",
        title:"Exito!!",
        text:"Se eliminó una obligación"
      })
      setState(true)
    }).catch((errors)=>{
      alert({
        icon:"error",
        title:"Error!!",
        text:"No se pudo eliminar la obligación. Existe una licencia asociada."
      })
    })

  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 mx-2 h-full">
       <ContactList docente={docente}/> 
      <BtnAdd url={"/docente-nuevo"}/>


      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-slate-100 uppercase bg-green-900">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>

            <th scope="col" className="px-6 py-3">
              Cargo
            </th>
            <th scope="col" className="px-6 py-3">
             Carácter
            </th>
            <th scope="col" className="px-6 py-3">
              Turno
            </th>

            <th scope="col" className="px-6 py-3">
              Espacio
            </th>

            <th scope="col" className="px-6 py-3">
              Curso
            </th>

            <th scope="col" className="px-6 py-3">
              Division
            </th>

            <th scope="col" className="px-6 py-3">
              Horas
            </th>

            <th scope="col" className="px-6 py-3">
              Acción
            </th>

          </tr>
        </thead>

        <tbody>
             { obligaciones.length !== 0 ? (
             
             obligaciones.map((obligacion)=>(
                 <tr
                 key={obligacion.id}
                 className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-10"
               >
                 <td className="px-6 ">{obligacion.id}</td>
                 <td className="px-6 ">{obligacion.cargo}</td>
                 <td className="px-6 ">{obligacion.caracter}</td>
                 <td className="px-6 ">{obligacion.turno}</td>
                 <td className="px-6 ">{obligacion.espacio}</td>

                 <td className="px-6 ">{obligacion.curso}</td>

                 <td className="px-6 ">{obligacion.division}</td>
                 <td className="px-6 ">{obligacion.horas}</td>
 
                 <td className="px-2 ">
                  <div className="flex gap-4">
                    <button title="Ver más información" onClick={()=>{
                        show(obligacion.id)
                    }}>
                      <FaInfoCircle className=" text-blue-700 text-lg"/>
                    </button>
                    <button title="Editar">
                      <FaRegEdit className=" text-green-700 text-lg"/>
                    </button>
                    <button title="Eliminar" onClick={()=>{
                      trash(obligacion.id)
                    }}>
                      <FaRegTrashAlt className=" text-red-700 text-lg" />
                    </button>
                  </div>
                 </td>
               </tr>
        
             ))) : null}
            
        </tbody>
      </table>
    
    </div>
  );
};
