import express from 'express';

import maquinasRoutes from "./routes/maquinasRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import rolesRoutes from "./routes/protectedRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import solicitudesRoutes from "./routes/solicitudesRoutes.js";

import cors from 'cors';

const appApi = express();
appApi.use(cors());
appApi.use(express.json());
appApi.use('/api/auth', authRoutes);
appApi.use('/api', rolesRoutes);
appApi.use('/api/users', usersRoutes);
appApi.use("/api/maquinas", maquinasRoutes);
appApi.use("/api/solicitudes", solicitudesRoutes);

export default appApi;