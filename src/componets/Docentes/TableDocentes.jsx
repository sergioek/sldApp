import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { Search } from "./Search";
import { useDocenteContext } from "../context/DocenteContext";
import {BtnAdd} from "../Btn/BtnAdd";
import axios from "axios";
import { toastifyAlert, alert } from "../Alerts/Alert";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle,FaRegEdit,FaRegTrashAlt ,FaBriefcase , FaRegNewspaper   } from "react-icons/fa";

export const TableDocentes = () => {
  const { ArrayDocentes,autorization,allDocentes} = useDocenteContext();


const navigate = useNavigate()

  useEffect(()=>{
    toastifyAlert()
  },[])

  const deleteDocente = (id)=>{
    axios.delete("http://127.0.0.1:8000/api/v1/docentes/"+id,{
      headers: {
        Authorization: `Bearer ${autorization()}`,
      },
    }).then((response)=>{
      alert({
        icon: "success",
        title: "Exito!!",
        text: "Se eliminó un docente",
      })
      allDocentes();
    }).catch((errors)=>{
      alert({
        icon: "error",
        title: "Error!!",
        text: "No se pudor eliminar un docente. El docente tiene obligaciones y/o licencias asociadas.",
      })
    })
  }


  const editar = (id)=>{
    navigate("/docente-editar/"+id);
  }


  const obligaciones = (id)=>{
    navigate("/obligaciones/"+id)
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 mx-2 h-full">
      <BtnAdd url={"/docente-nuevo"} name={"Nuevo Docente"}/>
      <div className="flex items-center justify-end px-2 flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>

        <Search />
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-slate-100 uppercase bg-green-900">
          <tr>
            <th scope="col" className="px-6 py-3">
              Apellidos y Nombres
            </th>
            <th scope="col" className="px-6 py-3">
              CUIL
            </th>
            <th scope="col" className="px-6 py-3">
              Correo
            </th>
            <th scope="col" className="px-6 py-3">
              Teléfono
            </th>

            <th scope="col" className="px-6 py-3">
              Acción
            </th>
          </tr>
        </thead>

        <tbody>
          {ArrayDocentes !== null ? (
            ArrayDocentes.map((docente) => (
              <tr
                key={docente.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white h-11"
                >
                  {docente.apellidos.toUpperCase() + ", " + docente.nombres}
                </th>
                <td className="px-6 ">
                  {docente.prefixCUIL +
                    "-" +
                    docente.dni +
                    "-" +
                    docente.postfixCUIL}
                </td>
                <td className="px-6 ">{docente.email}</td>
                <td className="px-6 ">{docente.tel}</td>

                <td className="px-6 ">
                <div className="flex gap-4">
                    <button title="Obligaciones" onClick={()=>{
                      obligaciones(docente.id)
                    }}>
                      <FaBriefcase className=" text-amber-950 text-lg"/>
                    </button>

                    <button title="Licencias">
                      <FaRegNewspaper className=" text-violet-700 text-lg"/>
                    </button>
                     
                    <button title="Editar" onClick={()=>{
                      editar(docente.id)
                    }}>
                      <FaRegEdit className=" text-green-700 text-lg"/>
                    </button>
                    <button title="Eliminar" onClick={()=>{
                      deleteDocente(docente.id)
                    }}>
                      <FaRegTrashAlt className=" text-red-700 text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <p>Cargando...</p>
          )}
        </tbody>
      </table>

      <Pagination />
    </div>
  );
};
