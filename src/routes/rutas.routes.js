import { Router } from "express";
import exif from "exif";
import { con } from "../controllers/db.js";
import { raiz } from "../controllers/main.controller.js";
import { subirImagen, anuario, loginAnuario } from "../controllers/anuario.controller.js";
import { credenciales } from "../controllers/login.controller.js";
import { getViewRegister, getViewHubAlumno } from "../controllers/registrarDatos.controller.js";
import { register, registerCredenciales } from "../controllers/register.controller.js";
import multer from "multer";
const subida = multer({ dest: 'public/' })
const pfp = multer({ dest: 'public/profilePic' })
const rutas = Router();

import session from 'express-session';
import cookieParser from 'cookie-parser';

rutas.use(cookieParser());
rutas.use(session({
  secret: 'mi-secreto-super-seguro', // Cambia esto por una cadena de caracteres segura
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Establece esto a "true" si usas HTTPS
    maxAge: 3600000, // Tiempo de vida de la cookie de sesión en milisegundos
  }
}));

function requireLogin(req, res, next) {
  if (req.session && req.session.loggedIn) {
    // El usuario ha iniciado sesión, continúa con la siguiente ruta o middleware
    
    next();
  } else {
    // El usuario no ha iniciado sesión, redirige al formulario de inicio de sesión
    res.redirect('/login');
    
  }
}
//Ruta Veterinaria
rutas.get('/', raiz);

rutas.get('/registerDatos' , requireLogin ,getViewRegister)

rutas.get('/hubAlumno' ,getViewHubAlumno)

rutas.post('/acti', pfp.single('pfp'), async function (req, res, next){
  
   console.log(req.file.filename);

        let idUser = req.body.idUser;
        let semestre = req.body.semestre;
        let imagen = req.file.filename;
        let materiaFav = req.body.mateFav;
        let maestroFav = req.body.maestroFav;
        let tecUni = req.body.tecUni;
        let ciudad = req.body.ciudad;
        let numTel = req.body.numTel;
        let birthday = req.body.birthday;
        let email = req.body.email;

        console.log(req.body)
        try {
          
         con.query(`UPDATE infoAlumnos set semestre='${semestre}', imagen = '${imagen}', materiasFav='${materiaFav}' ,maestrosFav = '${maestroFav}', tecUni = '${tecUni}', ciudad = '${ciudad}', email = '${email}', numTel = ${numTel}, cumple = '${birthday}' where idUser = '${idUser}'`)
         setTimeout(() => {
            res.redirect('/hubAlumnos')
         }, 1000);
        } catch (error) {
         
        }

        console.log(req.body);
})

//Ruta para subir imagenes al anuario
rutas.get('/subirImagen',requireLogin ,subirImagen);

rutas.get('/login', loginAnuario);

rutas.post('/loginCredenciales', credenciales)

rutas.get('/register', register )

rutas.post('/registerCredenciales' , registerCredenciales)

//Post para la subida de archivos junto con multer
rutas.post('/upload', subida.single('subirArchivo'), function (req, res, next) {

   res.redirect('/subirImagen')
   const numFile = req.file.filename;
   console.log(numFile)

   try {
      con.query(`INSERT INTO imagenes (imagenes) values ('${numFile}')`)
   } catch (error) {
      console.log('no se pudo insertar el valor');
   }
})

rutas.get('/anuario', anuario)


export default rutas;