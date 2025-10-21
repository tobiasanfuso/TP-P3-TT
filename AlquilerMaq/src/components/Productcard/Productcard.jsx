import React from "react";
import "./ProductCard.css";

const ProductCard = ({
  title,
  description,
  image,
  brand,
  onDetails,
  onRent,
  onEdit,
  onDelete,
  user,
}) => {
  return (
    <div className="card product-card shadow-sm">
      <img src={image || ""} className="card-img-top product-img" alt={title} />
      <div className="card-body text-center">
      <h6 className="text-muted mb-1">Marca: <span className="text-dark fw-semibold">{brand}</span></h6>
        <h5 className="card-title fw-semibold">{title}</h5>
        <p className="card-text text-secondary small">{description}</p>
        <div className="d-flex flex-wrap justify-content-center gap-2 mt-3 product-actions">
          <button
            className="btn btn-outline-primary btn-sm px-3"
            onClick={onDetails}
          >
            + Detalles
          </button>
          <button className="btn btn-success btn-sm px-3" onClick={onRent}>
            Alquilar
          </button>
          {(user.role === "admin" || user.role === "sysadmin") && (
            <>
              <button className="btn btn-outline-warning btn-sm px-3" onClick={onEdit}>
                Modificar
              </button>
              <button className="btn btn-outline-danger btn-sm px-3" onClick={onDelete}>
                Eliminar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
