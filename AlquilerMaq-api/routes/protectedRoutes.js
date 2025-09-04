import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { checkRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

//usuarios logueados
router.get("/customer",verifyToken,(req,res) =>{
    res.json({message: "Privado(Logueado)",user:req.user});
});

//usuarios admin o sysadmin
router.get("/admin",verifyToken,checkRole('sysadmin','admin'),(req,res) => {
    res.json({message: "Acceso admin",user: req.user});
});

//usuarios sysadmin 
router.get("/sysadmin",verifyToken,checkRole('sysadmin'),(req,res) => {
    res.json({message: "Acceso sysadmin o admin",user: req.user});
});


export default router;