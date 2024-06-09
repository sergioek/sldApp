import React from 'react';
import { FaBuildingUser } from "react-icons/fa6";
const ContactList = ({docente}) => {

  return (
    <div className="">
  
        <div  className="bg-white rounded-lg shadow-md">
          <div className="p-2">
            <FaBuildingUser className="w-16 h-8 rounded-full mx-auto mb-4 text-lime-400" />
            <h3 className="text-lg font-semibold text-center">{docente !== null && docente.apellidos + " " + docente.nombres}</h3>
            <p className="text-gray-500 text-sm text-center"></p>
          </div>
         
        </div>
   
    </div>
  );
};

export default ContactList;
