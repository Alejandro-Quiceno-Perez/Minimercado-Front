import './App.css'
import UserList from './components/users/UserList'
import ProveedorList from './components/proveedor/ProveedorList'
import Product from './components/producto/Product'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Categoria from './components/categoria/Categoria';

function App() {


  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h1>Panel Principal</h1>

        {/* Menú de navegación */}
        <nav>
          <ul style={{ display: 'flex', gap: '20px', listStyle: 'none' }}>
            <li><Link className='link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover' to="/users">Ver Usuarios</Link></li>
            <li><Link className='link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover' to="/proveedor">Ver Proveedor</Link></li>
            <li><Link className='link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover' to="/productos">Ver Productos</Link></li>
            <li><Link className='link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover' to="/categoria">Ver Categoria</Link></li>
            
          </ul>
        </nav>

        {/* Sección donde se cargan las vistas */}
        <Routes>
          <Route path="/users" element={<UserList />} />
          <Route path="/proveedor" element={<ProveedorList />} />
          <Route path="/productos" element={<Product />} />
          <Route path="/categoria" element={<Categoria />} />
        </Routes>
      </div>
    </Router>
  );

}

export default App
