import classNames from "classnames";
import Swal from "sweetalert2";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const alert = ({ icon, title, text }) => {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
  });
};

export const toastifyAlert = () => {
  Toastify({
    text: "Cargando datos...",
    duration: 800, // Duración indefinida
    close: false, // Mostrar botón de cerrar
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
  }).showToast();
};

export const mostrarDialog = (formData) => {
  Swal.fire({
    title: '<span style="color: blue;">Información de Obligación</span>',
    html: `
      <div style="display: flex; flex-wrap: wrap;">
        <div style="padding: 0.5rem;">
          <label style="font-weight: bold; display: inline;">ID:</label>
          <input type="text" style="padding-left:0.2rem" value="${formData.id}" disabled />
        </div>
        <div style=" padding: 0.5rem;">
          <label style="font-weight: bold; display: inline;">Apellidos:</label>
          <input type="text" style="padding-left:0.2rem" value="${formData.apellidos}" disabled />
        </div>
        <div style=" padding: 0.5rem;">
          <label style="font-weight: bold; display: inline;">Nombres:</label>
          <input type="text" style="padding-left:0.2rem" value="${formData.nombres}" disabled />
        </div>
        <div style=" padding: 0.5rem;">
          <label style="font-weight: bold; display: inline;">DNI:</label>
          <input type="text" style="padding-left:0.2rem" value="${formData.dni}" disabled />
        </div>
        <div style=" padding: 0.5rem;">
          <label style="font-weight: bold; display: inline;">Cargo:</label>
          <input type="text" style="padding-left:0.2rem" value="${formData.cargo}" disabled />
        </div>
        <div style=" padding: 0.5rem;">
          <label style="font-weight: bold; display: inline;">Caracter:</label>
          <input type="text" style="padding-left:0.2rem" value="${formData.caracter}" disabled />
        </div>
        <div style=" padding: 0.5rem;">
          <label style="font-weight: bold; display: inline;">Turno:</label>
          <input type="text" style="padding-left:0.2rem" value="${formData.turno}" disabled />
        </div>
        <div style=" padding: 0.5rem;">
          <label style="font-weight: bold; display: inline;">Espacio:</label>
          <input type="text" style="padding-left:0.2rem" value="${formData.espacio== null ? "" : formData.espacio}" disabled />
        </div>
        <div style=" padding: 0.5rem;">
          <label style="font-weight: bold; display: inline;">Curso:</label>
          <input type="text" style="padding-left:0.2rem" value="${formData.curso == null ? "" : formData.curso}" disabled />
        </div>
        <div style=" padding: 0.5rem;">
          <label style="font-weight: bold; display: inline;">Division:</label>
          <input type="text" style="padding-left:0.2rem" value="${formData.division == null ? "" : formData.division}" disabled />
        </div>
        <div style=" padding: 0.5rem;">
          <label style="font-weight: bold; display: inline;">Horas:</label>
          <input type="text" style="padding-left:0.2rem" value="${formData.horas == null ? "": formData.horas}" disabled />
        </div>
 
        <div style=" padding: 0.5rem;">
          <label style="font-weight: bold; display: inline;">Fecha de Alta:</label>
          <input type="date" style="padding-left:0.2rem" value="${formData.fechaAlta}" disabled />
        </div>
        <div style=" padding: 0.5rem;">
          <label style="font-weight: bold; display: inline;">Expediente de Alta:</label>
          <input type="text" style="padding-left:0.2rem" value="${formData.expedienteAlta}" disabled />
        </div>
        <div style=" padding: 0.5rem;">
          <label style="font-weight: bold; display: inline;">Origen de Vacante:</label>
          <input type="text" style="padding-left:0.2rem" value="${formData.origenVacante}" disabled />
        </div>
        <div style=" padding: 0.5rem;">
          <label style="font-weight: bold; display: inline;">Número de Control:</label>
          <input type="text" style="padding-left:0.2rem" value="${formData.numeroControl}" disabled />
        </div>
        <div style=" padding: 0.5rem;">
          <label style="font-weight: bold; display: inline;">CUPoF:</label>
          <input type="text" style="padding-left:0.2rem" value="${formData.cupof}" disabled />
        </div>
        <div style=" padding: 0.5rem;">
          <label style="font-weight: bold; display: inline;">Fecha de Baja:</label>
          <input type="date" style="padding-left:0.2rem" value="${formData.fechaBaja == null && ""}" disabled />
        </div>
        <div style=" padding: 0.5rem;">
          <label style="font-weight: bold; display: inline;">Expediente de Baja:</label>
          <input type="text" style="padding-left:0.2rem" value="${formData.expedienteBaja == null && ""}" disabled />
        </div>
        <div style=" padding: 0.5rem;">
          <label style="font-weight: bold; display: inline;">Causa de Baja:</label>
          <input type="text" style="padding-left:0.2rem" value="${formData.causaBaja == null && ""}" disabled />
        </div>
        <div style="padding: 0.5rem;">
          <label style="font-weight: bold; display: inline;">Observaciones:</label>
          <input type="text" style="padding-left:0.2rem" value="${formData.observaciones == null && ""}" disabled />
        </div>
      </div>
    `,
    confirmButtonText: "Aceptar",
  });
};
