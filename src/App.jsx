import './App.css'
import UserList from './components/users/UserList'
import ProductList from './components/proveedor/ProveedorList'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {


  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h1>Panel Principal</h1>

        {/* Menú de navegación */}
        <nav>
          <ul style={{ display: 'flex', gap: '20px', listStyle: 'none' }}>
            <li><Link to="/users">Ver Usuarios</Link></li>
            <li><Link to="/products">Ver Productos</Link></li>
          </ul>
        </nav>

        {/* Sección donde se cargan las vistas */}
        <Routes>
          <Route path="/users" element={<UserList />} />
          <Route path="/products" element={<ProductList />} />
        </Routes>
      </div>
    </Router>
  );

}

export default App
