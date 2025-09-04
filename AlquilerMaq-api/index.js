import 'dotenv/config.js';
import app from './app.js';
import {sequelize} from './config/db.js';
import './Models/Users.js';

const PORT = process.env.PORT || 5000;

const start = async () => {
try {
// aca se conecta y sync la db

await sequelize.sync(); //crea las tablas si no existen
onsole.log('Base de datos conectadad y sincronizada');

app.listen(PORT, () => {
console.log(`Servidor corriendo en puerto ${PORT}`);
});
} catch (error) {
console.log("Error al conectar la base de datos: ",error);
}
};

start();