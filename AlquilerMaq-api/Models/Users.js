import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Users = sequelize.define("Users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.ENUM("customer","admin","sysadmin"),
        defaultValue: "customer",
        allowNull: false
        
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, { timestamps: true });
