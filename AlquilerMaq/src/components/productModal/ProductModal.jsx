import React from 'react';

const ProductModal = ({ product, onClose }) => {
if (!product) return null;

return (
    <>
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
            <div className="modal-header">
            <h5 className="modal-title">{product.title}</h5>
            <button
                type="button"
                className="btn-close"
                onClick={onClose}
            ></button>
            </div>
            <div className="modal-body text-center">
            <img
                src={product.image}
                alt={product.title}
                className="img-fluid mb-3"
                style={{ maxHeight: '300px' }}
            />
            <p>{product.description}</p>
            </div>
            <div className="modal-footer">
            <button
                type="button"
                className="btn btn-secondary"
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
