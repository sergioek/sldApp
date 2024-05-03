import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export const ShowPassword = ({ Show, setShow }) => {
  return (
    <>
      <button
        className="mx-1 w-10 flex justify-center items-center bg-green-600 rounded-md text-white"
        type="button"
        onMouseDown={() => {
          setShow("text");
        }}
        onMouseUp={() => {
          setShow("password");
        }}
        onTouchStart={() => {
          setShow("text");
        }}
        onTouchEnd={() => {
          setShow("password");
        }}
      >
        {Show == "password" ? <FaRegEye /> : <FaRegEyeSlash />}
      </button>
    </>
  );
};
