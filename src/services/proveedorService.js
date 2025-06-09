import { axiosInstance } from "../helper/axios-config";

const getProveedor = () => {
       const prueba = axiosInstance.get("/proveedores", {
              headers: {
                     "Content-Type": "application/json",
              },
       });
       console.log(prueba)
       return prueba;
} 

export {
       getProveedor
}