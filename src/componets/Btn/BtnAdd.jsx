import React from 'react'
import { IoMdAddCircle } from "react-icons/io";
import { Link } from 'react-router-dom';

export const BtnAdd = ({url}) => {
  return (
    <div className="flex justify-end my-4 mx-4">
      <Link to={url}>
        <button className='bg-violet-900 px-4 py-2 text-gray-100 rounded-md font-semibold flex items-center'>
          <IoMdAddCircle />
           Agregar
        </button>
        </Link>
    </div>
  )
}
