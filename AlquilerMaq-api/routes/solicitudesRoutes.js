import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { checkRole } from "../middleware/roleMiddleware.js";
import { crearSolicitud, obtenerSolicitudes, obtenerSolicitudesPorUsuario, cambiarEstadoSolicitud } from "../controllers/solicitudesController.js";

const router = express.Router();

// Crear solicitud (usuario logueado)
router.post("/", verifyToken, crearSolicitud);

// Ver solicitudes del usuario logueado
router.get("/mis-solicitudes", verifyToken, obtenerSolicitudesPorUsuario);

// Ver todas las solicitudes (solo admin/sysadmin)
router.get("/", verifyToken, checkRole("admin", "sysadmin"), obtenerSolicitudes);

// Cambiar estado de solicitud (solo admin/sysadmin)
router.put("/:id/estado", verifyToken, checkRole("admin", "sysadmin"), cambiarEstadoSolicitud);

export default router;
