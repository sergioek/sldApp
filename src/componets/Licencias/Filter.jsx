import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useLicenciaContext } from "../context/LicenciaContext";
import moment from "moment";


export const Filter = () => {
 const {idDocente} = useParams();
 const [desdeFecha,setDesdeFecha] = useState(null);
 const [hastaFecha,setHastaFecha] = useState(null);
 const {search} = useLicenciaContext();

 const searchLicencias = (idDocente,desdeFecha,hastaFecha)=>{
    search(idDocente,desdeFecha,hastaFecha)
 }


  return (
    <form onSubmit={(e)=>{
        e.preventDefault()
        searchLicencias(idDocente,desdeFecha,hastaFecha)
    }}>
    <div className="m-4 flex justify-end items-center gap-4">
      <span className=" font-bold">Filtros:</span>
      <input
        type="date"
        name="desdeFecha"
        id="desdeFecha"
        className="block w-50 rounded-md border-0 py-1.5 pl-7 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 "
        defaultValue={moment().format('YYYY-MM-DD')}
        onChange={(e)=>{
          setDesdeFecha(e.target.value)
        }}
      />

      <input
        type="date"
        name="hastaFecha"
        id="hastaFecha"
        className="block w-50 rounded-md border-0 py-1.5 pl-7 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 "
        defaultValue={moment().format('YYYY-MM-DD')}
        onChange={(e)=>{
            setHastaFecha(e.target.value)
          }}
      />

      <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      
      >
        <FaSearch className="h-5 w-5 mr-2" />
        Buscar
      </button>
     
    </div>
    </form>
  );
};
