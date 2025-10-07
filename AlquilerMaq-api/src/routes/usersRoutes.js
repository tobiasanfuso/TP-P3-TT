import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { checkRole } from "../middleware/roleMiddleware.js";
import { getAllUsers, getUserById, updateUser, deleteUser, createUser } from "../controllers/usersController.js";


const router = express.Router();

// router.use(verifyToken, checkRole('sysadmin'));

router.get('/', verifyToken, checkRole("admin", 'sysadmin'), getAllUsers);
router.get('/:id', verifyToken, checkRole('sysadmin'), getUserById);
router.put('/:id', verifyToken, checkRole('sysadmin'), updateUser);
router.delete('/:id', verifyToken, checkRole('sysadmin'), deleteUser);
router.post('/', verifyToken, checkRole('sysadmin'), createUser);
//router.post('/', register);

export default router;
