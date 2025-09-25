import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { checkRole } from "../middleware/roleMiddleware.js";
import { obtenerMaquinas, obtenerMaquinaPorId, crearMaquina, actualizarMaquina, eliminarMaquina } from "../controllers/maquinasController.js";

const router = express.Router();

// Rutas públicas (todos pueden ver las máquinas disponibles)
router.get("/", obtenerMaquinas);
router.get("/:id", obtenerMaquinaPorId);

// Rutas protegidas (solo admin o sysadmin pueden crear, editar, borrar)
router.post("/", verifyToken, checkRole("admin", "sysadmin"), crearMaquina);
router.put("/:id", verifyToken, checkRole("admin", "sysadmin"), actualizarMaquina);
router.delete("/:id", verifyToken, checkRole("admin", "sysadmin"), eliminarMaquina);

export default router;
