import jwt_decode from "jwt-decode";

export const isTokenValid = (token) => {
    if (!token) return false;
    try {
        const decodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp > currentTime;
    } catch (error) {

        console.error("Error al decodificar el token:", error);
        return false;
    }
};