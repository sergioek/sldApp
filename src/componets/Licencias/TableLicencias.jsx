import React, { useEffect, useState } from "react";
import { useDocenteContext } from "../context/DocenteContext";
import {BtnAdd} from "../Btn/BtnAdd";
import axios from "axios";
import { alert, toastifyAlert } from "../Alerts/Alert";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ContactList from "../Panel/ContactList";
import { UseHookObligaciones } from "../hooks/UseHookObligaciones";
import { useObligacionesContext } from "../context/ObligacionesContext";
import { mostrarLicencia } from "../Alerts/Alert";
import { FaInfoCircle,FaRegEdit,FaRegTrashAlt    } from "react-icons/fa";
import { useLicenciaContext } from "../context/LicenciaContext";
import moment from 'moment';
import { useLoginContext } from "../context/LoginContext";
import { Filter } from "./Filter";
import Pagination from "./Pagination";

export const TableLicencias = () => {
    const {idDocente} = useParams()
    const {allLicencias,licencias,currentPage}= useLicenciaContext();
    const {showDocente,docente} = useDocenteContext();
    const {autorization} = useLoginContext();
    const [stateTrash,setStateTrash]=useState(null)

    useEffect(()=>{
        toastifyAlert()
        allLicencias(idDocente)
        showDocente(idDocente)

    },[idDocente,stateTrash,currentPage])


  const show = (licencia)=>{
    mostrarLicencia(licencia);
  }

  const trash = (idObligacion)=>{
    axios.delete("http://127.0.0.1:8000/api/v1/licencias/" + idObligacion, {
      headers: {
        Authorization: `Bearer ${autorization()}`,
      },
    }).then((response)=>{
      console.log(response)
      alert({
        icon:"success",
        title:"Exito!!",
        text:"Se eliminó una licencia."
      })
      setStateTrash(idObligacion)
    }).catch((errors)=>{
      alert({
        icon:"error",
        title:"Error!!",
        text:"No se pudo eliminar la licencia."
      })
    })

  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 mx-2 h-full">
       <ContactList docente={docente}/> 
      <BtnAdd url={"/licencia-nueva/"+idDocente} name={"Nueva Licencia"}/>
      <Filter/>
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
             Artículo
            </th>
            <th scope="col" className="px-6 py-3">
              Inicio
            </th>
            <th scope="col" className="px-6 py-3">
              Final
            </th>

            <th scope="col" className="px-6 py-3">
              Dias
            </th>

            <th scope="col" className="px-6 py-3">
              Oblig.
            </th>

            <th scope="col" className="px-6 py-3">
              Documentación
            </th>

            <th scope="col" className="px-6 py-3">
              Acción
            </th>


          </tr>
        </thead>
        
        <tbody>
             { licencias.length > 0 ? (
             
             licencias.map((licencia)=>(
              <tr
              key={licencia.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-10"
            >
              <td className="px-6 ">{licencia.id}</td>
              <td className="px-6 ">{licencia.cargo}</td>
              <td className="px-6 ">{licencia.articulo}</td>
              <td className="px-6 ">{moment(licencia.finicio).format('DD/MM/YYYY')}</td>
              <td className="px-6 ">{moment(licencia.ffinal).format('DD/MM/YYYY')}</td>

              <td className="px-6 ">{licencia.dias}</td>

              <td className="px-6 ">{licencia.obligacionesAfectadas}</td>

              <td className="px-6 ">{licencia.documentacion}</td>

              <td className="px-2 ">
               <div className="flex gap-4">
                 <button title="Ver más información" onClick={()=>{
                     show(licencia)
                 }}>
                   <FaInfoCircle className=" text-blue-700 text-lg"/>
                 </button>


                 <button title="Eliminar" onClick={()=>{
                   trash(licencia.id)
                 }}>
                   <FaRegTrashAlt className=" text-red-700 text-lg" />
                 </button>
               </div>
              </td>
            </tr>
        
             ))) : <tr>
                <td className="px-4 py-4 text-red-500">Sin resultados en la búsqueda</td>
              </tr>}
            
        </tbody>
      </table>
    <Pagination/>
    </div>
  );
};
