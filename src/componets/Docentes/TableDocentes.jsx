import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { Search } from "./Search";
import { useDocenteContext } from "../context/DocenteContext";
import {BtnAdd} from "../Btn/BtnAdd";
import axios from "axios";
import { alert } from "../Alerts/Alert";
import { useNavigate } from "react-router-dom";

export const TableDocentes = () => {
  const { ArrayDocentes,autorization,allDocentes } = useDocenteContext();
  const [select,setSelect] = useState({
    option:null,
    id:null,
  });
const navigate = useNavigate()

  const optionsFunction = (option,id)=>{
    setSelect({
      option:option,
      id:id
    })
  }

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

    }).catch((errors)=>{
      alert({
        icon: "error",
        title: "Error!!",
        text: "No se pudor eliminar un docente. El docente tiene obligaciones y/o licencias asociadas.",
      })
    })
  }


  useEffect(()=>{

    if(select.option =="eliminar"){
        deleteDocente(select.id)
        allDocentes();

    }

    if(select.option =="editar"){
      navigate("/docente-editar/"+select.id);
    }
    

  },[select])

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 mx-2 h-full">
      <BtnAdd url={"/docente-nuevo"}/>
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
                  <div className="relative">
                    <select name="options" className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e)=>{
                      optionsFunction(e.target.value,docente.id)
                    }}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="editar">Editar</option>
                      <option value="eliminar">Eliminar</option>
                      <option value="obligaciones">Obligaciones</option>
                      <option value="licencias">Licencias</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 12l-6-6 1.41-1.41L10 9.17l4.59-4.58L16 6z" />
                      </svg>
                    </div>
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
