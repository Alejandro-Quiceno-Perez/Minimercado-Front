import React, { useEffect, useState } from 'react';
import {
       getProveedor,
       createProveedor,
       updateProveedor,
} from '../../services/proveedorService'; // Asegúrate que estos métodos estén definidos

const ProveedorList = () => {
       const [proveedores, setProveedores] = useState([]);
       const [nuevoProveedor, setNuevoProveedor] = useState({
              nombre: '',
              telefono: '',
              direccion: '',
       });

       const listaProveedores = async () => {
              try {
                     const { data } = await getProveedor();
                     setProveedores(data);
              } catch (error) {
                     console.error('Error al obtener proveedores:', error);
              }
       };

       const handleChange = (e) => {
              setNuevoProveedor({
                     ...nuevoProveedor,
                     [e.target.name]: e.target.value,
              });
       };

       const handleAgregarProveedor = async () => {
              try {
                     await createProveedor(nuevoProveedor);
                     await listaProveedores();
                     setNuevoProveedor({ nombre: '', telefono: '', direccion: '' });
              } catch (error) {
                     console.error('Error al crear proveedor:', error);
              }
       };

       const handleProveedorChange = (id, campo, valor) => {
              setProveedores((prev) =>
                     prev.map((prov) =>
                            prov.id === id ? { ...prov, [campo]: valor } : prov
                     )
              );
       };

       const handleActualizarProveedor = async (proveedor) => {
              try {
                     await updateProveedor(proveedor.id, proveedor);
                     await listaProveedores();
              } catch (error) {
                     console.error('Error al actualizar proveedor:', error);
              }
       };

       useEffect(() => {
              listaProveedores();
       }, []);

       return (
              <div className="container mt-4">
                     <h2 className="mb-4">Lista de Proveedores</h2>

                     <div className="card mb-4">
                            <div className="card-header">Agregar Proveedor</div>
                            <div className="card-body">
                                   <div className="row g-3">
                                          <div className="col-md-4">
                                                 <input
                                                        type="text"
                                                        name="nombre"
                                                        className="form-control"
                                                        placeholder="Nombre"
                                                        value={nuevoProveedor.nombre}
                                                        onChange={handleChange}
                                                 />
                                          </div>
                                          <div className="col-md-4">
                                                 <input
                                                        type="text"
                                                        name="telefono"
                                                        className="form-control"
                                                        placeholder="Teléfono"
                                                        value={nuevoProveedor.telefono}
                                                        onChange={handleChange}
                                                 />
                                          </div>
                                          <div className="col-md-4">
                                                 <input
                                                        type="text"
                                                        name="direccion"
                                                        className="form-control"
                                                        placeholder="Dirección"
                                                        value={nuevoProveedor.direccion}
                                                        onChange={handleChange}
                                                 />
                                          </div>
                                   </div>
                                   <div className="text-end mt-3">
                                          <button
                                                 className="btn btn-primary"
                                                 onClick={handleAgregarProveedor}
                                          >
                                                 Agregar Proveedor
                                          </button>
                                   </div>
                            </div>
                     </div>

                     <div className="table-responsive">
                            <table className="table table-bordered table-hover align-middle">
                                   <thead className="table-dark">
                                          <tr>
                                                 <th>ID</th>
                                                 <th>Nombre</th>
                                                 <th>Teléfono</th>
                                                 <th>Dirección</th>
                                                 <th>Acciones</th>
                                          </tr>
                                   </thead>
                                   <tbody>
                                          {proveedores.map((proveedor) => (
                                                 <tr key={proveedor.id}>
                                                        <td>{proveedor.id}</td>
                                                        <td>
                                                               <input
                                                                      className="form-control form-control-sm"
                                                                      value={proveedor.nombre}
                                                                      onChange={(e) =>
                                                                             handleProveedorChange(proveedor.id, 'nombre', e.target.value)
                                                                      }
                                                               />
                                                        </td>
                                                        <td>
                                                               <input
                                                                      className="form-control form-control-sm"
                                                                      value={proveedor.telefono}
                                                                      onChange={(e) =>
                                                                             handleProveedorChange(proveedor.id, 'telefono', e.target.value)
                                                                      }
                                                               />
                                                        </td>
                                                        <td>
                                                               <input
                                                                      className="form-control form-control-sm"
                                                                      value={proveedor.direccion}
                                                                      onChange={(e) =>
                                                                             handleProveedorChange(proveedor.id, 'direccion', e.target.value)
                                                                      }
                                                               />
                                                        </td>
                                                        <td>
                                                               <button
                                                                      className="btn btn-success btn-sm"
                                                                      onClick={() => handleActualizarProveedor(proveedor)}
                                                               >
                                                                      Actualizar
                                                               </button>
                                                        </td>
                                                 </tr>
                                          ))}
                                   </tbody>
                            </table>
                     </div>
              </div>
       );
};

export default ProveedorList;
