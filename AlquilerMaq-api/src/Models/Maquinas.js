import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Maquinas = sequelize.define("Maquinas", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    precioPorDia: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    disponible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, { timestamps: true });
