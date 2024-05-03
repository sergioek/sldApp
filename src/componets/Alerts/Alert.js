import Swal from "sweetalert2";

export const alert = ({icon,title,text})=>{
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
      });
}