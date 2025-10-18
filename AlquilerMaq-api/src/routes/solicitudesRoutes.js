import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { checkRole } from "../middleware/roleMiddleware.js";
import { crearSolicitud, obtenerSolicitudes, obtenerSolicitudesPorUsuario, cambiarEstadoSolicitud, obtenerSolicitudesPorUsuarioRechazadasFinalizadas, obtenerSolicitudesRechazadasFinalizadas, borrarSolicitudAdmin, borrarSolicitudUsuario } from "../controllers/solicitudesController.js";

const router = express.Router();


router.post("/", verifyToken, crearSolicitud);
router.delete("/:id/usuario", verifyToken, borrarSolicitudUsuario);
// Ver solicitudes del usuario logueado
router.get("/mis-solicitudes", verifyToken, obtenerSolicitudesPorUsuario);
router.get("/historial-solicitudes", verifyToken, obtenerSolicitudesPorUsuarioRechazadasFinalizadas);
// Ver todas las solicitudes (solo admin/sysadmin)
router.get("/", verifyToken, checkRole("admin", "sysadmin"), obtenerSolicitudes);
router.get("/historial-solicitudes-admin", verifyToken, checkRole("admin", "sysadmin"), obtenerSolicitudesRechazadasFinalizadas);

// Cambiar estado de solicitud (solo admin/sysadmin)
router.put("/:id/estado", verifyToken, checkRole("admin", "sysadmin"), cambiarEstadoSolicitud);
router.delete("/:id", verifyToken, checkRole("admin", "sysadmin"), borrarSolicitudAdmin);
export default router;
