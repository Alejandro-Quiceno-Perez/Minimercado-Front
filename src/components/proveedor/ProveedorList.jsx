import React, { useEffect, useState } from 'react';
import { getProveedor } from '../../services/proveedorService'; // Asegúrate de que esta ruta sea correcta


const ProductList = () => {
       const [proveedores, setProveedor] = useState([]);

       const listaProductos = async () => {
              try {
                     const { data } = await getProveedor();
                     console.log(data);
                     setProveedor(data);
              } catch (error) {
                     if (error.response) {
                            // El servidor respondió con un código de estado fuera del rango 2xx
                            console.error('Error en la respuesta del servidor:', error.response.data);
                     } else if (error.request) {
                            // La solicitud fue hecha pero no se recibió respuesta
                            console.error('No se recibió respuesta del servidor:', error.request);
                     } else {
                            // Algo sucedió al configurar la solicitud
                            console.error('Error al configurar la solicitud:', error.message);
                     }
              }
       }

       useEffect(() => {
              listaProductos();
       }, []);

       return (
              <div style={{ padding: '20px' }}>
                     <h2>Lista de Proveedores</h2>
                     <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                   <tr>
                                          <th>ID</th>
                                          <th>Nombre</th>
                                          <th>Teléfono</th>
                                          <th>Dirección</th>
                                   </tr>
                            </thead>
                            <tbody>
                                   {proveedores.map(proveedor => (
                                          <tr key={proveedor.id}>
                                                 <td>{proveedor.id}</td>
                                                 <td>{proveedor.nombre}</td>
                                                 <td>{proveedor.telefono}</td>
                                                 <td>{proveedor.direccion}</td>
                                          </tr>
                                   ))}
                            </tbody>
                     </table>
              </div>
       );
};

export default ProductList;