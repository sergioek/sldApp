import React from "react";
import moment from "moment";
import { FaFilePdf } from "react-icons/fa6";
export const FilterReporte = () => {
  return (
    <div className="flex justify-center mt-20 h-screen">
    <div>
      <h2 className="mb-10 font-serif text-3xl text-blue-800">Reportes</h2>
      <form >
        <select name="" id=""   className="block w-full px-3 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option value="A2">Planilla A2 de Licencias</option>
          <option value="PR">Presentismo</option>
        </select>

        <div className="pt-9 pb-4 px-4 flex justify-end items-center gap-4">
      <span className=" font-bold">Filtros:</span>
      <input
        type="date"
        name="desdeFecha"
        id="desdeFecha"
        className="block w-50 rounded-md border-0 py-1.5 pl-7 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 "
        defaultValue={moment().format('YYYY-MM-DD')}
        onChange={(e)=>{
          
        }}
      />

      <input
        type="date"
        name="hastaFecha"
        id="hastaFecha"
        className="block w-50 rounded-md border-0 py-1.5 pl-7 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 "
        defaultValue={moment().format('YYYY-MM-DD')}
        onChange={(e)=>{
            
          }}
      />

      <button className="flex items-center px-4 py-2 bg-green-800 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
      
      >
        <FaFilePdf className="h-5 w-5 mr-2" />
        Descargar
      </button>
     
    </div>
      </form>
    </div>
    </div>
  );
};
