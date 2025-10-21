import React, { useEffect, useState } from "react";

import { Button, Row, Col, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "./MainScreen.css";
import EditProduct from "../../editProduct/EditProduct";
import NewProduct from "../../Newproduct/NewProduct";
import ProductCard from "../../ProductCard/ProductCard";
import ProductModal from "../../productModal/ProductModal";
import RentalModal from "../../rentalModal/RentalModal";
import ConfirmDeleteModal from "../../confirmDeleteModal/ConfirmDeleteModal";
import LoadingCard from "../../loadingCard/LoadingCard";
import { useContext } from "react";
import { AuthenticationContext } from "../../service/auth/auth.context";
import { useNavigate } from "react-router";
import { isTokenValid } from "../../auth/auth.services";
const MainScreen = () => {
  const { user, token, handleLogoutUser } = useContext(AuthenticationContext);
  const [products, setProducts] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isTokenValid(token)) {
      handleLogoutUser();
      navigate("/login");
    }
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/maquinas", {
          method: "GET",
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Error al cargar máquinas");
        const data = await res.json();

        const mappedProducts = data.map((m) => ({
          id: m.id,
          title: m.nombre,
          description: m.descripcion,
          image: m.imagen,
          brand: m.marca,
          priceDay: m.precioPorDia,
        }));
        console.log(data);
        setProducts(mappedProducts);
      } catch (err) {
        console.error(err.message);
         toast.error("Error al cargar máquinas", { toastId: "machines-load-error" });
      } finally {
        setLoadingProduct(false);
      }
    };
    fetchProducts();
  }, [updateTrigger]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rentalModalProduct, setRentalModalProduct] = useState(null);
  const [rentalRequests, setRentalRequests] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("az");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const handleDeleteProduct = (product) => {
    setDeleteProduct(product);
    setIsDeleteModalOpen(true);
  };

  // Filtrar y ordenar productos
  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "az") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

  const handleRentalRequest = (request) => {
    setRentalRequests([...rentalRequests, request]);
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setIsEditModalOpen(true);
  };

  const handleSaveEditProduct = async (updatedProduct) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/maquinas/${updatedProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nombre: updatedProduct.title,
            descripcion: updatedProduct.description,
            imagen: updatedProduct.imagen,
          }),
        }
      );
      if (!res.ok) throw new Error("No se pudo actualizar la máquina");

      const data = await res.json();
      console.log("DATA UPDATE");
      console.log(data);
      setProducts(
        products.map((p) =>
          p.id === updatedProduct.id
            ? {
                ...p,
                title: data.maquina.nombre,
                description: data.maquina.descripcion,
                image: data.maquina.imagen,
              }
            : p
        )
      );

      setIsEditModalOpen(false);
      setEditProduct(null);
      toast.success("Producto actualizado", { toastId: "product-edit-ok" });
    } catch (err) {
      console.error("Error al actualizar máquina:", err.message);
      toast.error("No se pudo actualizar el producto", { toastId: "product-edit-error" });
    }
  };

  const handleAddProduct = () => {
    setUpdateTrigger((prev) => prev + 1);
    toast.success("Producto agregado ✅", { toastId: "product-add-ok" });
  };



  const handleCancelDelete = async () => {
    setIsDeleteModalOpen(false);
    setDeleteProduct(null);
  };
  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/maquinas/${deleteProduct.id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("No se pudo eliminar el producto");
      setIsDeleteModalOpen(false);
      setDeleteProduct(null);
      setUpdateTrigger((prev) => prev + 1);
      toast.success("Producto eliminado 🗑️", { toastId: "product-delete-ok" });
    } catch (err) {
      console.error(err.message);
      toast.error("No se pudo eliminar el producto", { toastId: "product-delete-error" });
    }
  };
  return (
    <>
      <section className="page-hero mb-4">
        <h2 className="page-title">
          Bienvenido <span className="text-brand"> {user.username} </span> a
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

      <Row>
        <Col>
          <Form.Control
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{ maxWidth: 150 }}
          >
            <option value="az">Nombre: A-Z</option>
            <option value="za">Nombre: Z-A</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="g-4 products-grid">
        {loadingProduct ? (
          <LoadingCard />
        ) : filteredProducts.length === 0 ? (
          <Col>
            <p className="text-muted text-center">
              No se encontraron productos.
            </p>
          </Col>
        ) : (
          filteredProducts.map((product) => (
            <Col xs={12} sm={6} md={4} key={product.id}>
              <ProductCard
                title={product.title}
                description={product.description}
                image={product.image}
                brand={product.brand}
                onDetails={() => setSelectedProduct(product)}
                onRent={() => setRentalModalProduct(product)}
                onDelete={() => handleDeleteProduct(product)}
                onEdit={() => handleEditProduct(product)}
                user={user}
              />
            </Col>
          ))
        )}
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
      {(user.role === "admin" || user.role === "sysadmin") && (
        <>
          <EditProduct
            show={isEditModalOpen}
            product={editProduct}
            onSave={handleSaveEditProduct}
            onClose={() => setIsEditModalOpen(false)}
          />
          {console.log()}
          <ConfirmDeleteModal
            show={isDeleteModalOpen}
            onHide={handleCancelDelete}
            onConfirm={handleConfirmDelete}
            product={deleteProduct?.title}
          />
        </>
      )}
    </>
  );
};

export default MainScreen;
