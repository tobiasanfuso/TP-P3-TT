

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
    if (password.length <= 7) return "Debe tener al menos 8 caracteres";
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
