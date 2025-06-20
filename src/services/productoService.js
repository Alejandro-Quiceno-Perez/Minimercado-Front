import { axiosInstance } from "../helper/axios-config";

const getProducto = () => {
    const prueba = axiosInstance.get("/productos", {
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log(prueba);
    return prueba;
}

const createProducto = (productoData) => axiosInstance.post('/productos', productoData);
const updateProducto = (id, productoData) => axiosInstance.put(`/productos/${id}`, productoData);

export {
    getProducto,
    createProducto,
    updateProducto
}