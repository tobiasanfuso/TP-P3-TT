import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Users } from "./Users.js";
import { Maquinas } from "./Maquinas.js";

export const SolicitudesAlquiler = sequelize.define("SolicitudesAlquiler", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fechaInicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fechaFin: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    estado: {
        type: DataTypes.ENUM("pendiente", "aprobado", "rechazado", "finalizado"),
        defaultValue: "pendiente",
    }
}, { timestamps: true });

// 🔗 Relaciones
Users.hasMany(SolicitudesAlquiler, { foreignKey: "userId" });
SolicitudesAlquiler.belongsTo(Users, { foreignKey: "userId" });

Maquinas.hasMany(SolicitudesAlquiler, { foreignKey: "maquinaId" });
SolicitudesAlquiler.belongsTo(Maquinas, { foreignKey: "maquinaId" });
