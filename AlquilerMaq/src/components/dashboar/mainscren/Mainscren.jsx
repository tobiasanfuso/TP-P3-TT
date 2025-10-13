import React, { useState } from "react";

import { Button, Row, Col } from "react-bootstrap";
import "./MainScreen.css";

import NewProduct from "../../Newproduct/NewProduct";
import ProductCard from "../../ProductCard/ProductCard";
import ProductModal from "../../productModal/ProductModal";
import RentalModal from "../../rentalModal/RentalModal";
const MainScreen = ({ user }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Martillo",
      brand: "MAKITA",
      description: "Un martillo demoledor es una herramienta eléctrica o neumática diseñada para romper materiales duros como concreto, piedra, ladrillo o mampostería mediante golpes repetitivos de alta potencia.",
      image:
        "https://imgs.search.brave.com/AnxguX9a4sEPITLiMWj7O5hPBn4xZmXXrr0eJtgGu68/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jbXMu/Z3J1cG9mZXJyZXBh/dC5uZXQvYXNzZXRz/L2ltZy9wcm9kdWN0/b3MvSE0xODEyXzEu/d2VicA",
    },
    {
      id: 2,
      title: "Vibropisonador",
      brand: "WACKER",
      description: "El vibropisón es una máquina de compactación, funciona mediante golpes repetitivos de alta energía para compactar suelos granulares, cohesivos, gravilla, arcilla o asfalto.",
      image:
        "https://imgs.search.brave.com/pI6_3UPtgqKnZ4CVHZ3owowSbPeY9-jszT3o-EqoNzU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZGlyZWN0aW5kdXN0/cnkuZXMvaW1hZ2Vz/X2RpL3Bob3RvLW1n/LzQxMTU2LTE3ODE1/OTI3LmpwZw",
    },
    {
      id: 3,
      title: "Amoladora",
      brand: "MAKITA",
      description: "Una amoladora es una herramienta eléctrica o neumática utilizada para cortar, lijar, pulir, desbastar y decapar diversos materiales como metal, madera, concreto, cerámica, piedra y plásticos.",
      image:
        "https://imgs.search.brave.com/LnLVvUVGB7EyvEbCt-mhiN2d4C9i8Y3dncmrbnaOi0g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kMjho/aTkzZ3I2OTdvbC5j/bG91ZGZyb250Lm5l/dC8xYWIzMjc0NS0y/NjBiLWNjODQvaW1n/L1Byb2R1Y3RvLzI4/Lzk1NjRQQ1YtMS02/Mjk5M2IyZDg2Yzkx/LmpwZWc",
    },
    {
      id: 4,
      title: "Cuerpo de Andamio",
      brand: "SORRENTO",
      description: "El cuerpo de andamio es la estructura principal que proporciona soporte y estabilidad a toda la estructura, actuando como la base sobre la cual se montan los elementos auxiliares.",
      image:
        "https://imgs.search.brave.com/S6ZIVdexpcnq_ohiKz09c92FHv5nc3uMd-nPLEmvhG4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hY2Ru/LXVzLm1pdGllbmRh/bnViZS5jb20vc3Rv/cmVzLzk1Mi85MzYv/cHJvZHVjdHMvYW5k/YW1pby1yZWZvcnph/ZG9vbzEtMmE3ODc3/Y2RmNzYzNmM0NWQx/MTU2MDg5NTYwMzA4/NzItMjQwLTAuanBn",
    },
    {
      id: 5,
      title: "Allanadora",
      brand: "FEMA",
      description: "Una allanadora es una máquina utilizada principalmente para alisar y nivelar superficies de concreto, asfalto o mortero, logrando acabados lisos y uniformes.",
      image:
        "https://imgs.search.brave.com/YIpzjqePgFcQFLGqIPKmCm6Rs4Y1zF7MOLBmyeMBkkc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9iYXJp/a2VsbHN1ZGFtZXJp/Y2EuY29tLmFyL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE5LzEx/L0FsbGFuYWRvcmFf/c2ltcGxlX0JBUklL/RUxMX2RpYW1ldHJv/MTIwY21fY2FqYUhl/YXZ5RHV0eTJfY2hp/Y28ucG5n",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rentalModalProduct, setRentalModalProduct] = useState(null);
  const [rentalRequests, setRentalRequests] = useState([]);

  const handleRentalRequest = (request) => {
    setRentalRequests([...rentalRequests, request]);
  };

  const handleAddProduct = (newProduct) => {
    const productWithId = { ...newProduct, id: products.length + 1 };
    setProducts([...products, productWithId]);
  };

  return (
    <>
      <section className="page-hero mb-4">
        <h2 className="page-title">
          Bienvenido <span className="text-brand"> {user.name} </span> a
          AlquiMaq S.R.L
        </h2>
        <p className="page-subtitle">
          Esta es la pantalla principal del sistema.
        </p>

        {(user.role === "admin" || user.role === "sysadmin") && (
          <div className="page-actions">
            <Button variant="success" onClick={() => setIsModalOpen(true)}>
              Agregar Producto
            </Button>
          </div>
        )}
      </section>
      <NewProduct
        show={isModalOpen}
        onSave={handleAddProduct}
        onClose={() => setIsModalOpen(false)}
      />

      <Row className="g-4 products-grid">
        {products.map((product) => (
          <Col xs={12} sm={6} md={4} key={product.id}>
            <ProductCard
              title={product.title}
              brand={product.brand}
              description={product.description}
              image={product.image}
              onDetails={() => setSelectedProduct(product)}
              onRent={() => setRentalModalProduct(product)}
            />
          </Col>
        ))}
      </Row>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <RentalModal
        product={rentalModalProduct}
        onClose={() => setRentalModalProduct(null)}
        onSubmit={handleRentalRequest}
      />
    </>
  );
};

export default MainScreen;
