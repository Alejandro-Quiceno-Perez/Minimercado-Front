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

const createProveedor = (proveedorData) => axiosInstance.post('/proveedores', proveedorData);
const updateProveedor = (id, proveedorData) => axiosInstance.put(`/proveedores/${id}`, proveedorData);

export {
       getProveedor,
       createProveedor,
       updateProveedor
}