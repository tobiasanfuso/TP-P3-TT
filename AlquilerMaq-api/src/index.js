import express from 'express'
import { sequelize } from "./config/db.js"
import "./Models/Maquinas.js";
import app from '../src/app.js';
import "./Models/Users.js";
import "./Models/SolicitudesAlquiler.js";
const PORT = process.env.PORT || 5000;
const start = async () => {
    try {

        await sequelize.sync({ alter: true }); //crea las tablas si no existen

        console.log('Base de datos conectadad y sincronizada');

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en puerto ${PORT}`);
        });
    } catch (error) {
        console.log("Error al conectar la base de datos: ", error);
    }
};

start();