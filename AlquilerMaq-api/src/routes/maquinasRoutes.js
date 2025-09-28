

import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { checkRole } from "../middleware/roleMiddleware.js";
import { obtenerMaquinas, obtenerMaquinaPorId, crearMaquina, actualizarMaquina, eliminarMaquina } from "../controllers/maquinasControllers.js"
const routerMaquinas = Router();

routerMaquinas.get("/", obtenerMaquinas);
routerMaquinas.get("/:id", obtenerMaquinaPorId);
// Rutas protegidas (solo admin o sysadmin pueden crear, editar, borrar)
routerMaquinas.post("/", verifyToken, checkRole("admin", "sysadmin"), crearMaquina);
routerMaquinas.put("/:id", verifyToken, checkRole("admin", "sysadmin"), actualizarMaquina);
routerMaquinas.delete("/:id", verifyToken, checkRole("admin", "sysadmin"), eliminarMaquina);
export default routerMaquinas;