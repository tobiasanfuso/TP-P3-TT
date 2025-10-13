import express from 'express';

import maquinasRoutes from "./routes/maquinasRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import rolesRoutes from "./routes/protectedRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import solicitudesRoutes from "./routes/solicitudesRoutes.js";

import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', rolesRoutes);
app.use('/api/users', usersRoutes);
app.use("/api/maquinas", maquinasRoutes);
app.use("/api/solicitudes", solicitudesRoutes);

export default app;