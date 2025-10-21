// src/components/validators/validateProduct.js

export const validateNombre = (nombre) => {
    if (!nombre.trim()) return "El nombre es obligatorio";
    if (nombre.trim().length < 3) return "Debe tener al menos 3 caracteres";
    return null;
};

export const validateMarca = (marca) => {
    if (!marca.trim()) return "La marca es obligatoria";
    return null;
};

export const validateDescripcion = (descripcion) => {
    if (!descripcion.trim()) return "La descripción es obligatoria";
    return null;
};

export const validatePrecioPorDia = (precio) => {
    if (!precio || isNaN(precio) || parseFloat(precio) <= 0)
        return "Ingrese un precio válido mayor que 0";
    return null;
};

export const validateImagen = (imagen) => {
    if (!imagen.trim()) return "La URL de la imagen es obligatoria";
    return null;
};

// Valida todos los campos del producto
export const validateProduct = ({
    nombre,
    marca,
    descripcion,
    imagen,
    precioPorDia,
}) => {
    const errors = {};

    const nombreError = validateNombre(nombre);
    if (nombreError) errors.nombre = nombreError;

    const marcaError = validateMarca(marca);
    if (marcaError) errors.marca = marcaError;

    const descripcionError = validateDescripcion(descripcion);
    if (descripcionError) errors.descripcion = descripcionError;

    const precioError = validatePrecioPorDia(precioPorDia);
    if (precioError) errors.precioPorDia = precioError;

    const imagenError = validateImagen(imagen);
    if (imagenError) errors.imagen = imagenError;

    return errors;
};
