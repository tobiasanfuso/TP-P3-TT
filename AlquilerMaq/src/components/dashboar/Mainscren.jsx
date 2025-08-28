import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import NewProduct from '../NewProduct/NewProduct'
import ProductCard from '../ProductCard/ProductCard'
import './MainScreen.css'
import ProductModal from '../ProductCard/ProductModal';
import RentalModal from '../ProductCard/RentalModal';


const MainScreen = ({ user, setUser,logOut }) => {
const navigate = useNavigate();

const [products, setProducts] = useState([
    { id: 1, title: "Martillo", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", image: "https://imgs.search.brave.com/AnxguX9a4sEPITLiMWj7O5hPBn4xZmXXrr0eJtgGu68/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jbXMu/Z3J1cG9mZXJyZXBh/dC5uZXQvYXNzZXRz/L2ltZy9wcm9kdWN0/b3MvSE0xODEyXzEu/d2VicA" },
    { id: 2, title: "Vibropisonador", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", image: "https://imgs.search.brave.com/pI6_3UPtgqKnZ4CVHZ3owowSbPeY9-jszT3o-EqoNzU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZGlyZWN0aW5kdXN0/cnkuZXMvaW1hZ2Vz/X2RpL3Bob3RvLW1n/LzQxMTU2LTE3ODE1/OTI3LmpwZw" },
    { id: 3, title: "Amoladora", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", image: "https://imgs.search.brave.com/LnLVvUVGB7EyvEbCt-mhiN2d4C9i8Y3dncmrbnaOi0g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kMjho/aTkzZ3I2OTdvbC5j/bG91ZGZyb250Lm5l/dC8xYWIzMjc0NS0y/NjBiLWNjODQvaW1n/L1Byb2R1Y3RvLzI4/Lzk1NjRQQ1YtMS02/Mjk5M2IyZDg2Yzkx/LmpwZWc" },
    {id: 4, title: "Cuerpo de Andamio", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", image: "https://imgs.search.brave.com/S6ZIVdexpcnq_ohiKz09c92FHv5nc3uMd-nPLEmvhG4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hY2Ru/LXVzLm1pdGllbmRh/bnViZS5jb20vc3Rv/cmVzLzk1Mi85MzYv/cHJvZHVjdHMvYW5k/YW1pby1yZWZvcnph/ZG9vbzEtMmE3ODc3/Y2RmNzYzNmM0NWQx/MTU2MDg5NTYwMzA4/NzItMjQwLTAuanBn" },
    {id: 5, title: "Allanadora", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", image: "https://imgs.search.brave.com/YIpzjqePgFcQFLGqIPKmCm6Rs4Y1zF7MOLBmyeMBkkc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9iYXJp/a2VsbHN1ZGFtZXJp/Y2EuY29tLmFyL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE5LzEx/L0FsbGFuYWRvcmFf/c2ltcGxlX0JBUklL/RUxMX2RpYW1ldHJv/MTIwY21fY2FqYUhl/YXZ5RHV0eTJfY2hp/Y28ucG5n" },
])

const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);
const [rentalModalProduct, setRentalModalProduct] = useState(null);
const [rentalRequests, setRentalRequests] = useState([]);
const [viewingRequests, setViewingRequests] = useState(false);



const currentRole = user.role;
const currentUser = user.name;


  //cierre de sesion
const handleLogout = () => {
    logOut()
    navigate("/login");
    setUser(null);
    
};
const handleProfile = () => {
    // Lógica para mostrar el perfil del usuario
    alert(`Perfil de ${currentUser}`);}

    const handleRentalRequest = (request) => {
    setRentalRequests([...rentalRequests, request]);
    };
    

  //agregar producto (admin y sysadmin)
const handleAddProduct = (newProduct) => {
    const productWhithId = { ...newProduct, id: products.length + 1 };
    setProducts([...products, productWhithId]);
}


  //menu segun el rol
const navItems = [
    <li className="nav-item" key="home">
    <a className="nav-link" href="#home">Inicio</a>
    </li>
];

if (user.role === "customer" || user.role === "admin" || user.role === "sysadmin") {
    navItems.push(
    <li className="nav-item" key="apply">
        <a className="nav-link" href="#">Solicitar alquiler</a>
    </li>,
    <li className="nav-item" key="my-applys">
    <button className="nav-link btn btn-link" onClick={() => setViewingRequests(true)}>
        Mis solicitudes
    </button>
    </li>    
    );
}

if (user.role === "admin" || user.role === "sysadmin") {
    navItems.push(
    <li className="nav-item" key="management">
        <a className="nav-link" href="#">Gestión de usuarios</a>
    </li>
    );
}

if (user.role === "sysadmin") {
    navItems.push(
    <li className="nav-item" key="admin-panel">
        <button className="nav-link btn btn-link" onClick={() => navigate("/panel-de-control")}>
        Panel de control
        </button>
    </li>
    );
}  

return (
    <div className="container-fluid ">
    <header> 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid ">
            <h1 className="navbar-brand text-primary">AlquiMaq S.R.L</h1>
            <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                {navItems}
            </ul>
            </div>
        </div>
        </nav>
        <div className="d-flex align-items-center">
        <button className="btn btn-primary me-2" onClick={handleProfile}>{currentUser}</button>
        <button className="btn btn-danger" onClick={handleLogout}>Cerrar sesión</button>
        </div>
    </header>

    <main className="p-4">
{viewingRequests ? (
    <>
    <h3>Mis Solicitudes</h3>
    <button className="btn btn-secondary mb-3" onClick={() => setViewingRequests(false)}>Volver</button>
    {rentalRequests.length === 0 ? (
        <p>No has realizado ninguna solicitud aún.</p>
    ) : (
        <ul className="list-group">
        {rentalRequests.map((req, index) => (
            <li className="list-group-item" key={index}>
            <strong>{req.producto}</strong> - {req.nombre} {req.apellido} - {req.email} - {req.telefono}
            </li>
        ))}
        </ul>
    )}
    </>
) : (
    <>
    <h2>Bienvenido {currentUser} a AlquiMaq S.R.L</h2>
    <p>Esta es la pantalla principal del sistema.</p>
    {(currentRole === "admin" || currentRole === "sysadmin") && (
        <button className="btn btn-success mb-4" onClick={() => setIsModalOpen(true)}>Agregar Producto</button>
    )}
    {isModalOpen && (
        <NewProduct
        onSave={handleAddProduct}
        onClose={() => setIsModalOpen(false)}
        />
    )}
    
    <div className="row g-3">
        {products.map(product => (
        <div className="col-12 col-sm-6 col-md-4 mb-3" key={product.id}>
            <ProductCard
            title={product.title}
            description={product.description}
            image={product.image}
            onDetails={() => setSelectedProduct(product)}
            onRent={() => setRentalModalProduct(product)}
            />
        </div>
        ))}
    </div>
    </>
)}
</main>

    <ProductModal
product={selectedProduct}
onClose={() => setSelectedProduct(null)}
/>
<RentalModal
product={rentalModalProduct}
onClose={() => setRentalModalProduct(null)}
onSubmit={handleRentalRequest}
/>

    <footer className="text-center p-3 bg-secondary text-light vw-100">
        <p>© 2025 AlquiMaq S.R.L. Todos los derechos reservados.</p>
    </footer>

    </div>
);
};

export default MainScreen