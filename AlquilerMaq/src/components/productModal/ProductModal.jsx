import React from "react";
import "./ProductModal.css";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content shadow-lg rounded-4 border-0">
            <div className="modal-header text-white  rounded-top-4">
              <h5 className="modal-title">{product.title}</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body text-center p-4">
              <img
                src={product.image}
                alt={product.title}
                className="img-fluid rounded mb-4 product-modal-img"
              />

              <div className="mb-3 text-start product-modal-text">
                <p className="mb-2">
                  <strong>Marca:</strong> {product.brand}
                </p>
                <p className="mb-2">
                  <strong>Precio por día:</strong>{" "}
                  <span className="text-success fw-bold">
                    ${product.priceDay}
                  </span>
                </p>
                <p className="mb-0">{product.description}</p>
              </div>
            </div>

            <div className="modal-footer border-0 justify-content-center">
              <button
                type="button"
                className="btn btn-outline-primary px-4 py-2 fw-semibold"
                onClick={onClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default ProductModal;
