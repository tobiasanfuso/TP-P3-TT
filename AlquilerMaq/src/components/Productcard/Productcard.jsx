import React from "react";
import "./ProductCard.css";

const ProductCard = ({ title, brand, description, image, onDetails, onRent }) => {
return (
    <div className="card product-card shadow-sm">
    <img
        src={image}
        className="card-img-top product-img"
        alt={title}
    />
    <div className="card-body text-center">
        {brand ? (
        <h6 className="text-muted mb-1">Marca: {brand}</h6>
        ) : (
        <h6 className="text-muted mb-1">Marca: —</h6>
        )}

        <h5 className="card-title fw-semibold">{title}</h5>
        <p className="card-text text-secondary small">{description}</p>

        <div className="d-flex justify-content-center gap-2 mt-3">
        <button
            className="btn btn-outline-primary btn-sm px-3"
            onClick={onDetails}
        >
            + Detalles
        </button>
        <button
            className="btn btn-success px-4"
            onClick={onRent}
        >
            Alquilar
        </button>
        </div>
    </div>
    </div>
);
};

export default ProductCard;
