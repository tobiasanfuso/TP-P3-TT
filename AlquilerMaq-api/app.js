import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import rolesRoutes from "./routes/protectedRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";


const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/auth',authRoutes);
app.use('/api',rolesRoutes);
app.use('/api/users', usersRoutes);

export default app;
