import {Users} from '../Models/Users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req,res) => {
    const {username,email,password} = req.body;

    try {
        const userExists = await Users.findOne ({where: {username}});
        const emailExists = await Users.findOne ({where: {email}});

        if (userExists){
            return res.status(400).json({message: 'El nombre de usuario ya esta en uso'})
        };

        if (emailExists){
            return res.status(400).json({message: 'El correo ya esta registrado'})
        };
        

        //hasheamos el pass antes de guardar
        const hashedPassword = await bcrypt.hash(password,10);

        //creamos el usuario
        const newUser = await Users.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({message:'Usuario creado correctamente', user: {id: newUser.id, username: newUser.username, role: newUser.role}});

    } catch (error){
        console.error('Error en el registro',error);
        res.status(500).json ({message:'Error interno del servidor'});
    }

};

const SECRET = process.env.JWT_SECRET;

//login

export const login = async (req, res) => {
    const {email, password} = req.body;

    try{
        //buscar usuario por email
        const user = await Users.findOne({where: {email}});

        if(!user){
            return res.status(400).json({message: 'Email o contraseña incorrectos'});
        }

        //comparar contraseñas 
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Email o contraseña incorrectos'});
        }

        //generar token
        const token = jwt.sign(
            {id:user.id, role:user.role}, //payload 
            SECRET,                      //clave secreta
            {expiresIn: '2h'}           //duracion del token
        );

        //enviamos res sin pass

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    }catch(error){
        console.error('Error en login:',error);
        res.status(500).json({message: 'Error interno del servidor'});
    }
};