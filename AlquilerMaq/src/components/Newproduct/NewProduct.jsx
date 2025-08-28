import React, { useState } from 'react'
import './NewProduct.css'

const NewProduct = ({ onSave, onClose }) => {
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [image, setImage] = useState('');

const handleSaveProduct = () => {
    if (title && description && image) {
    onSave({ title, description, image });
    onClose();
    } else {
    alert("Por favor, completa todos los campos.");
    }
};

return (
    <div className="modal-overlay" onClick={onClose}>
    <div className="modal-dialog bg-light p-4 rounded shadow-lg"
    onClick={(e) => e.stopPropagation()}>
        <h3 className="text-center mb-3">Agregar Nuevo Producto</h3>
        <div className="mb-3">
        <label className="form-label">Título del Producto</label>
        <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus
        />
        </div>
        <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
        ></textarea>
        </div>
        <div className="mb-3">
        <label className="form-label">URL de Imagen</label>
        <input
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
        />
        </div>
        <div className="d-flex justify-content-between">
        <button className="btn btn-danger" onClick={onClose}>Cerrar</button>
        <button className="btn btn-primary" onClick={handleSaveProduct}>Guardar</button>
        </div>
            </div>
    </div>
);
};

export default NewProduct