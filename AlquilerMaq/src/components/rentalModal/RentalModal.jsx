import React, { useState, useEffect } from "react";
import "./RentalModal.css"

const RentalRequestModal = ({ product, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
  });

    useEffect(() => {
    if (product) document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, [product]);

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = { ...formData, producto: product.title };
    onSubmit(request);
    setSubmitted(true);
  };

  if (!product) return null;

  return (
    <>
      <div className="modal fade show d-block custom-modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content shadow-lg">
            <div className="modal-header">
              <h5 className="modal-title">
                Solicitud de Alquiler - {product.title}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              {submitted ? (
                <div className="alert alert-success">
                  ✅ ¡Tu solicitud fue enviada con éxito!
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nombre"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Apellido</label>
                    <input
                      type="text"
                      className="form-control"
                      name="apellido"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="telefono"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Enviar Solicitud
                  </button>
                </form>
              )}
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

export default RentalRequestModal;