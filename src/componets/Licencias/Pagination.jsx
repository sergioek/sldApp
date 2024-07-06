import { Link } from "react-router-dom";
import { useLicenciaContext } from "../context/LicenciaContext";


export default function Pagination() {
  const { links, change, data} = useLicenciaContext()


  const changePage = (value) => {
    console.log(value)
    change(value)
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Mostrando página <span className="font-medium"></span>{data.current_page}
            <span className="font-medium"></span> de{" " +data.total}
            <span className="font-medium"></span> resultados
          </p>
        </div>

        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            
            {links.map(
              (data) =>
                  
                  data.url !== null &&
               
                  <Link
                    key={data.label}
                    onClick={() => {
                        changePage(data.label)
                    }}
                    aria-current="page"
                    className={
                      data.active == false
                        ? "relative z-10 inline-flex items-center px-4 py-3 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-gray-700 bg-gray-100 ring-4 ring-inset ring-gray-100"
                          : 
                         "relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-green-900 text-white" 
                
                    }
                    style={
                      data.label== "&laquo; Previous" || data.label== "Next &raquo;" ?
                          {backgroundColor: '#424344',color:"white",borderRadius:"10px",
                          width:"6rem",
                          display:"flex",
                          justifyContent:"center"
                          }
                      : {} 
                    }
                  >
                    {
                      data.label == "&laquo; Previous" &&
                      "Previo"
                    }

                    {
                      data.label == "Next &raquo;" &&

                      "Siguiente"

                    }

                    {
                      data.label !== "Next &raquo;" && data.label !== "&laquo; Previous" &&

                      data.label

                    }

                  </Link>

                  
            )}

             
   
          </nav>
        </div>
      </div>
    </div>
  );
}
