import { SolicitudesAlquiler } from "../Models/SolicitudesAlquiler.js";
import { Users } from "../Models/Users.js";
import { Maquinas } from "../Models/Maquinas.js";

// Crear una solicitud
export const crearSolicitud = async (req, res) => {
    const { maquinaId, fechaInicio, fechaFin } = req.body;
    const userId = req.user.id; // viene del token

    try {
        const maquina = await Maquinas.findByPk(maquinaId);
        if (!maquina) return res.status(404).json({ message: "Máquina no encontrada" });

        const nuevaSolicitud = await SolicitudesAlquiler.create({
            userId,
            maquinaId,
            fechaInicio,
            fechaFin,
        });

        res.status(201).json({ message: "Solicitud creada correctamente", solicitud: nuevaSolicitud });
    } catch (error) {
        console.error("Error al crear solicitud:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener todas las solicitudes (solo admin/sysadmin)
export const obtenerSolicitudes = async (req, res) => {
    try {
        const solicitudes = await SolicitudesAlquiler.findAll({
            include: [
                { model: Users, attributes: ["id", "username", "email"] },
                { model: Maquinas, attributes: ["id", "nombre", "precioPorDia"] }
            ]
        });
        res.json(solicitudes);
    } catch (error) {
        console.error("Error al obtener solicitudes:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener solicitudes de un usuario específico
export const obtenerSolicitudesPorUsuario = async (req, res) => {
    const userId = req.user.id; // usuario logueado
    try {
        const solicitudes = await SolicitudesAlquiler.findAll({
            where: { userId },
            include: [{ model: Maquinas, attributes: ["id", "nombre", "precioPorDia"] }]
        });
        res.json(solicitudes);
    } catch (error) {
        console.error("Error al obtener solicitudes:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Cambiar estado de una solicitud (admin/sysadmin)
export const cambiarEstadoSolicitud = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body; // pendiente, aprobado, rechazado, finalizado

    try {
        const solicitud = await SolicitudesAlquiler.findByPk(id);
        if (!solicitud) return res.status(404).json({ message: "Solicitud no encontrada" });

        solicitud.estado = estado ?? solicitud.estado;
        await solicitud.save();

        res.json({ message: "Estado actualizado", solicitud });
    } catch (error) {
        console.error("Error al actualizar estado:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
