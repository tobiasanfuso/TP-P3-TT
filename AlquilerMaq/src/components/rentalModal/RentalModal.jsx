import React, { useState, useEffect, useContext, useRef } from "react";
import { Spinner } from "react-bootstrap";
import "./RentalModal.css";
import { AuthenticationContext } from "../service/auth/auth.context";
import { validateRentalForm } from "../rentalModal/validateRentalForm";

const RentalRequestModal = ({ product, onClose }) => {
  const { token } = useContext(AuthenticationContext);

  const [formData, setFormData] = useState({
    fechaInicio: "",
    fechaFin: "",
  });
  const [errors, setErrors] = useState({
    fechaInicio: "",
    fechaFin: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const fechaInicioRef = useRef(null);
  const fechaFinRef = useRef(null);

  useEffect(() => {
    if (product) document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const isValid = validateRentalForm(formData, setErrors);
    if (!isValid) {
      if (errors.fechaInicio) fechaInicioRef.current.focus();
      else if (errors.fechaFin) fechaFinRef.current.focus();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/solicitudes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          maquinaId: product.id,
          fechaInicio: formData.fechaInicio,
          fechaFin: formData.fechaFin,
        }),
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Error al enviar solicitud");
      onClose();
      setErrors({ fechaInicio: "", fechaFin: "" });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  if (!product) return null;

  return (
    <>
      <div className="modal fade show d-block custom-modal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg">
            <div className="modal-header">
              <h5 className="modal-title">
                Solicitud de Alquiler - {product.title}
              </h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>

            <div className="modal-body">
              {message ? (
                <div
                  className={`alert ${
                    message.type === "success"
                      ? "alert-success"
                      : "alert-danger"
                  }`}
                >
                  {message.text}
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Fecha de Inicio</label>
                    <input
                      type="date"
                      name="fechaInicio"
                      ref={fechaInicioRef}
                      className={`form-control ${
                        errors.fechaInicio && "is-invalid"
                      }`}
                      value={formData.fechaInicio}
                      onChange={handleChange}
                    />
                    {errors.fechaInicio && (
                      <p className="text-danger">{errors.fechaInicio}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Fecha de Fin</label>
                    <input
                      type="date"
                      name="fechaFin"
                      ref={fechaFinRef}
                      className={`form-control ${
                        errors.fechaFin && "is-invalid"
                      }`}
                      value={formData.fechaFin}
                      onChange={handleChange}
                    />
                    {errors.fechaFin && (
                      <p className="text-danger">{errors.fechaFin}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 d-flex justify-content-center align-items-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                        />
                        Enviando...
                      </>
                    ) : (
                      "Enviar Solicitud"
                    )}
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
