import React, { useEffect, useState } from "react";
import { useLoginContext } from "../../context/LoginContext";
import axios from "axios";
import moment from "moment";

const Planilla = () => {

  const {autorization}=useLoginContext()
  const [licencias, setLicencias] = useState([]);

  const reporte = (fechaInicio,fechaFinal) => {

    axios
      .get("http://127.0.0.1:8000/api/v1/reporte/reporteLicencias/" + fechaInicio + "/" + fechaFinal, {
        headers: {
          Authorization: `Bearer ${autorization()}`,
        },
      })
      .then((response) => {
       setLicencias(response.data.data)
       console.log(response.data.data)
      })
      .catch((errors) => {
        console.log(errors);
      });
  };


  useEffect(()=>{
  reporte("2024-06-23","2024-07-24")
  },[])


  return (
    <div>
      <div className="container m-4 flex flex-col">
        <table className="min-w-full border border-black border-solid">
          <tr className="flex gap-28 justify-between px-4">
            <th>
              <div className=" text-2xl">
                DIRECCIÓN GENERAL DE NIVEL SECUNDARIO
              </div>
            </th>

            <th>
              <div>ANEXO RESOLUCIÓN Nº</div>
            </th>

            <th>
              <div>PLANILLA A2 - HOJA 1 DE 7</div>
            </th>
          </tr>

          <tr className="flex justify-between gap-28 px-4">
            <th className="flex whitespace-nowrap gap-2">
              <div className="font-bold">ESTABLECIMIENTO: </div>
              <div className=" text-red-500 font-bold">
                ESCUELA TÉCNICA Nº12
              </div>
            </th>

            <th className="flex whitespace-nowrap gap-2">
              <div className="font-bold">Domicilio:</div>
              <div className=" text-red-500 font-bold">
                José Cheein y Libertad S/N
              </div>
            </th>

            <th className="flex whitespace-nowrap gap-2">
              <div className="font-bold">LOCALIDAD:</div>
              <div className=" text-red-500 font-bold">FERNÁNDEZ</div>
            </th>

            <th className="flex whitespace-nowrap gap-2">
              <div className="font-bold">DPTO:</div>
              <div className=" text-red-500 font-bold">ROBLES</div>
            </th>

            <th className="flex whitespace-nowrap gap-2">
              <div className="font-bold">MES:</div>
              <div className=" text-red-500 font-bold">JUNIO</div>
            </th>

            <th className="flex whitespace-nowrap gap-2">
              <div className="font-bold">AÑO:</div>
              <div className=" text-red-500 font-bold">2024</div>
            </th>
          </tr>

          <tr className="flex gap-10 justify-between px-4">
            <th className="flex whitespace-nowrap gap-2">
              <div className="">HORARIO DE FUNCIONAMIENTO: </div>
              <div className="text-red-500">7:30 a 12:30 / 14:00 a 18:00</div>
            </th>

            <th className="flex whitespace-nowrap gap-2">
              <div>TELEFAX:</div>
            </th>

            <th className="flex whitespace-nowrap gap-2">
              <div>E-MAIL:</div>
              <div className="text-red-500">esctecnica12@gmail.com</div>
            </th>
          </tr>
        </table>

        <table className="min-w-full border border-black border-solid">
          <thead>
            <tr>
              <th className="px-2 py-2 border border-black" rowSpan={3}>
                Orden Nº
              </th>
              <th
                className=" px-2 py-2 border border-black whitespace-nowrap"
                rowSpan={3}
              >
                Apellido y Nombre
              </th>
              <th
                className="px-2 py-2 border border-black whitespace-nowrap"
                rowSpan={3}
              >
                C.U.I.L. Nº
              </th>
              <th
                className="px-2 py-2 border border-black whitespace-nowrap"
                rowSpan={3}
              >
                Cargo
              </th>
              <th
                className="px-2 py-2 border border-black whitespace-nowrap"
                colSpan={3}
              >
                Que
              </th>
              <th className="px-2 py-2 border border-black" colSpan={4}>
                Justificadas
              </th>
              <th className="px-2 py-2 border border-black" rowSpan={3}>
                Total de Lic.con 100 % de Haberes
              </th>
              <th className="px-2 py-2 border border-black" rowSpan={3}>
                Total de Lic. Con 50 % de Haberes
              </th>
              <th
                className="px-2 py-2 border border-black"
                rowSpan={2}
                colSpan={2}
              >
                Injustificadas
              </th>
              <th className="px-2 py-2 border border-black" rowSpan={3}>
                Número de tardanzas
              </th>
              <th
                className="px-2 py-2 border border-black"
                rowSpan={2}
                colSpan={5}
              >
                A descontar
              </th>
              <th
                className="px-2 py-2 border border-black"
                rowSpan={2}
                colSpan={2}
              >
                Lic. sin goce de sueldo
              </th>
              <th className="px-2 py-2 border border-black" rowSpan={3}>
                Observaciones
              </th>
            </tr>

            <tr>
              <th className="px-2 py-2 border border-black" rowSpan={2}>
                T
              </th>
              <th className="px-2 py-2 border border-black" rowSpan={2}>
                I
              </th>
              <th className="px-2 py-2 border border-black" rowSpan={2}>
                S
              </th>
              <th className="px-2 py-2 border border-black" colSpan={2}>
                Lic. por salud
              </th>
              <th className="px-2 py-2 border border-black" colSpan={2}>
                Otras Lic.
              </th>
            </tr>

            <tr>
              <th className="px-2 py-2 border border-black">Art.</th>
              <th className="px-2 py-2 border border-black">Lapso</th>
              <th className="px-2 py-2 border border-black">Art.</th>
              <th className="px-2 py-2 border border-black">Lapso</th>
              <th className="px-2 py-2 border border-black">Lapso</th>
              <th className="px-2 py-2 border border-black">Días</th>

              <th className="px-2 py-2 border border-black">Como Tit.</th>
              <th className="px-2 py-2 border border-black">Como Int.</th>
              <th className="px-2 py-2 border border-black">Como Supl.</th>
              <th className="px-2 py-2 border border-black">Inasist.</th>
              <th className="px-2 py-2 border border-black">Causa del Desc.</th>
              <th className="px-2 py-2 border border-black">Expte.</th>
              <th className="px-2 py-2 border border-black">Artículo</th>
            </tr>
          </thead>

          <tbody>
            {licencias.map((licencia, index) => (
              <tr className=" text-xs">
                <td className="py-2 border border-black text-center">
                  {index + 1}
                </td>

                <td className="px-2 py-2 border border-black whitespace-nowrap">
                  {licencia.apellidos.toUpperCase() + " ," + licencia.nombres}
                </td>

                <td className="px-2 py-2 border border-black whitespace-nowrap">
                  {licencia.prefixCUIL +
                    "-" +
                    licencia.dni +
                    "-" +
                    licencia.postfixCUIL}
                </td>

                <td className="px-2 py-2 border border-black whitespace-nowrap">
                  {licencia.cargo}
                </td>

                <td className="px-2 py-2 border border-black whitespace-nowrap">
                  {licencia.caracter == "Titular" && "X"}
                </td>

                <td className="px-2 py-2 border border-black whitespace-nowrap">
                  {licencia.caracter == "Interino" && "X"}
                </td>

                <td className="px-2 py-2 border border-black whitespace-nowrap">
                  {licencia.caracter == "Suplente" && "X"}
                </td>

                <td className="px-2 py-2 border border-black whitespace-nowrap">
                  {licencia.denominacion.includes("Enfermedad") &&
                    licencia.articulo}
                </td>

                <td className="px-2 py-2 border border-black whitespace-nowrap">
                  {licencia.denominacion.includes("Enfermedad") &&
                    moment(licencia.finicio).format("DD-MM") +
                      " al " +
                      moment(licencia.ffinal).format("DD-MM")}
                </td>

                <td className="px-2 py-2 border border-black whitespace-nowrap">
                  {!licencia.denominacion.includes("Enfermedad") &&
                    licencia.articulo}
                </td>

                <td className="px-2 py-2 border border-black whitespace-nowrap">
                  {!licencia.denominacion.includes("Enfermedad") &&
                    moment(licencia.finicio).format("DD-MM") +
                      " al " +
                      moment(licencia.ffinal).format("DD-MM")}
                </td>

                <td className="px-2 py-2 border border-black whitespace-nowrap text-center">
                  {licencia.totalHaberes == "100%" &&
                    licencia.cargo == "Catedrático/a" &&
                    licencia.obligacionesAfectadas + " oblig."}

                  {licencia.totalHaberes == "100%" &&
                    licencia.cargo !== "Catedrático/a" &&
                    licencia.dias + " día/s"}
                </td>

                <td className="px-2 py-2 border border-black whitespace-nowrap">
                  {licencia.totalHaberes == "50%" &&
                    licencia.cargo == "Catedrático/a" &&
                    licencia.obligacionesAfectadas + " oblig."}

                  {licencia.totalHaberes == "50%" &&
                    licencia.cargo !== "Catedrático/a" &&
                    licencia.dias + " día/s"}
                </td>

                <td className="px-2 py-2 border border-black whitespace-nowrap">
                  {licencia.injustificada == "SI" &&
                    moment(licencia.finicio).format("DD-MM") +
                      " al " +
                      moment(licencia.ffinal).format("DD-MM")}
                </td>

                <td className="px-2 py-2 border border-black whitespace-nowrap">
                  {licencia.injustificada == "SI" && licencia.dias + " día/s"}
                </td>

                <td className="px-2 py-2 border border-black whitespace-nowrap"></td>

                <td className="px-2 py-2 border border-black whitespace-nowrap"></td>

                <td className="px-2 py-2 border border-black whitespace-nowrap"></td>

                <td className="px-2 py-2 border border-black whitespace-nowrap"></td>

                <td className="px-2 py-2 border border-black whitespace-nowrap"></td>

                <td className="px-2 py-2 border border-black whitespace-nowrap"></td>

                <td className="px-2 py-2 border border-black whitespace-nowrap">
                  {licencia.articulo == "32°" ||
                    (licencia.articulo == "33°" && licencia.expediente)}
                </td>

                <td className="px-2 py-2 border border-black whitespace-nowrap">
                  {licencia.articulo == "32°" ||
                    (licencia.articulo == "33°" && licencia.articulo)}
                </td>

                <td className="px-2 py-2 border border-black whitespace-nowrap">
                  {licencia.observaciones}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-24 flex justify-between ml-56">
          <p className="text-lg font-bold">FIRMA DIRECTOR</p>
          <p className="text-lg font-bold">FIRMA RECEPCIÓN</p>
          <p className="text-lg font-bold">FIRMA RECEPCIÓN</p>
          <p className="text-lg font-bold">ACLARACIÓN</p>
          <p className="text-lg font-bold">FIRMA ANALISTA</p>
        </div>
      </div>
    </div>
  );
};

export default Planilla;
