

// Validación de email
export const validateEmail = (email) => {
    if (!email) return "El email es obligatorio";
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    if (!regex.test(email)) return "Ingrese un email válido";
    return null;
};

// Validación de username
export const validateUsername = (username) => {
    if (!username) return "El nombre de usuario es obligatorio";
    if (username.length < 3) return "Debe tener al menos 3 caracteres";
    const regex = /^[a-zA-Z0-9_]+$/;
    if (!regex.test(username)) return "Solo se permiten letras, números y guiones bajos";

    return null;
};

// Validación de contraseña
export const validatePassword = (password) => {
    if (!password) return "La contraseña es obligatoria";
    if (password.length <= 7) return "Debe tener al menos 7 caracteres";
    return null;
};



// Función principal para validar registro
export const validateRegisterUser = ({ username, email, password }) => {
    const errors = {};
    errors.email = validateEmail(email);
    errors.username = validateUsername(username);
    errors.password = validatePassword(password);
    Object.keys(errors).forEach(key => errors[key] === null && delete errors[key]);
    return errors;
};
export const validateLoginUser = ({ email, password }) => {
    const errors = {};

    const emailError = validateEmail(email);
    if (emailError) errors.email = emailError;

    const passwordError = validatePassword(password);
    if (passwordError) errors.password = passwordError;

    return errors;
};

// Validar rol
export const validateRole = (role) => {
    const allowedRoles = ["customer", "admin", "sysadmin"];
    if (!role) return "El rol es obligatorio";
    if (!allowedRoles.includes(role)) return `Rol inválido. Los permitidos son: ${allowedRoles.join(", ")}`;
    return null;
};




export const validateNombre = (nombre) => {
    if (!nombre || !nombre.trim()) return "El nombre es obligatorio";
    if (nombre.trim().length < 3) return "Debe tener al menos 3 caracteres";
    return null;
};

export const validateMarca = (marca) => {
    if (!marca || !marca.trim()) return "La marca es obligatoria";
    return null;
};

export const validateDescripcion = (descripcion) => {
    if (!descripcion || !descripcion.trim()) return "La descripción es obligatoria";
    return null;
};

export const validatePrecioPorDia = (precio) => {
    if (precio === undefined || precio === null || isNaN(precio) || parseFloat(precio) <= 0)
        return "Ingrese un precio válido mayor que 0";
    return null;
};

export const validateImagen = (imagen) => {
    if (!imagen || !imagen.trim()) return "La URL de la imagen es obligatoria";
    return null;
};

// Valida todos los campos del producto
export const validateProduct = ({ nombre, marca, descripcion, imagen, precioPorDia }) => {
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