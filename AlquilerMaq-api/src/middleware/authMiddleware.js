import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    //verificacion del token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No autorizado" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
        req.user = decoded; //guarda info del user 
        next(); //siguiente middleware
    } catch (error) {
        return res.status(401).json({ message: "Token invalido o expirado" })
    }
};

