import express from 'express'
import dotenv from "dotenv";
dotenv.config();
import { sequelize } from "./config/db.js"
import "./Models/Maquinas.js";
import app from '../src/app.js';
import "./Models/Users.js";
import "./Models/SolicitudesAlquiler.js";

const PORT = process.env.PORT;
const start = async () => {
    try {

        // await sequelize.sync(); //crea las tablas si no existen

        app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            next();
        });
        console.log('Base de datos conectadad y sincronizada');

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en puerto ${PORT}`);
        });
        await sequelize.sync();
        await sequelize.authenticate();

    } catch (error) {
        console.log("Error al conectar la base de datos: ", error);
    }
};

start();