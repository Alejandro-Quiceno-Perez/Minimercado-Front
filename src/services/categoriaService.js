import { axiosInstance } from "../helper/axios-config";

const getCategoria = () => {
    const prueba = axiosInstance.get("/categorias", {
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log(prueba);
    return prueba;
}

const createCategoria = (categoriaData) => axiosInstance.post('/categorias', categoriaData);
const updateCategoria = (id, categoriaData) => axiosInstance.put(`/categorias/${id}`, categoriaData);

export {
    getCategoria,
    createCategoria,
    updateCategoria
}