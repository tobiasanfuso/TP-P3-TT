import { Maquinas } from "../Models/Maquinas.js";

// Obtener todas las máquinas
export const obtenerMaquinas = async (req, res) => {
    try {
        const maquinas = await Maquinas.findAll();
        res.json(maquinas);
    } catch (error) {
        console.error("Error al obtener máquinas:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener máquina por ID
export const obtenerMaquinaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const maquina = await Maquinas.findByPk(id);
        if (!maquina) return res.status(404).json({ message: "Máquina no encontrada" });
        res.json(maquina);
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Crear máquina
export const crearMaquina = async (req, res) => {
    const { nombre, descripcion, precioPorDia, disponible, imagen } = req.body;
    try {
        const nuevaMaquina = await Maquinas.create({ nombre, descripcion, precioPorDia, disponible, imagen });
        res.status(201).json({ message: "Máquina creada correctamente", maquina: nuevaMaquina });
    } catch (error) {
        console.error("Error al crear máquina:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Actualizar máquina
export const actualizarMaquina = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precioPorDia, disponible, imagen } = req.body;//, imagen
    try {
        const maquina = await Maquinas.findByPk(id);
        if (!maquina) return res.status(404).json({ message: "Máquina no encontrada" });

        maquina.nombre = nombre ?? maquina.nombre;
        maquina.descripcion = descripcion ?? maquina.descripcion;
        maquina.precioPorDia = precioPorDia ?? maquina.precioPorDia;
        maquina.disponible = disponible ?? maquina.disponible;
        maquina.imagen = imagen ?? maquina.imagen;

        await maquina.save();
        res.json({ message: "Máquina actualizada", maquina });
    } catch (error) {
        console.error("Error al actualizar máquina:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Eliminar máquina
export const eliminarMaquina = async (req, res) => {
    const { id } = req.params;
    try {
        const maquina = await Maquinas.findByPk(id);
        if (!maquina) return res.status(404).json({ message: "Máquina no encontrada" });

        await maquina.destroy();
        res.json({ message: "Máquina eliminada" });
    } catch (error) {
        console.error("Error al eliminar máquina:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
