export const validateEmail = (email) => {
    if (!email) return "El email es obligatorio";
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    if (!regex.test(email)) return "Ingrese un email válido";
    return null;
};
export const validatePassword = (password) => {
    if (!password) return "La contraseña es obligatoria";
    if (password.length <= 7) return "Debe tener al menos 7 caracteres";
    return null;
};
export const validateUsername = (username) => {
    if (!username) return "El nombre de usuario es obligatorio";
    if (username.length < 3) return "Debe tener al menos 3 caracteres";
    const regex = /^[a-zA-Z0-9_]+$/;
    if (!regex.test(username))
        return "Solo se permiten letras, números y guiones bajos";
    return null;
};
export const validateLoginUser = ({ email, password }) => {
    const errors = {};

    const emailError = validateEmail(email);
    if (emailError) errors.email = emailError;

    const passwordError = validatePassword(password);
    if (passwordError) errors.password = passwordError;

    return errors;
};

// Función principal para validar registro
export const validateRegisterUser = ({ username, email, password }) => {
    const errors = {};

    const emailError = validateEmail(email);
    if (emailError) errors.email = emailError;

    const usernameError = validateUsername(username);
    if (usernameError) errors.username = usernameError;

    const passwordError = validatePassword(password);
    if (passwordError) errors.password = passwordError;


    return errors;
};