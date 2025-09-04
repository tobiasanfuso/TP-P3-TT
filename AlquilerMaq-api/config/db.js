import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: "./dbs/db.sqlite",
    logging:false,
})

sequelize.authenticate()
    .then(() => {
        console.log("Conectado a la base de datos");
    })
    .catch((error) => {
        console.error("Error al conectar a la base de datos:", error);
    });