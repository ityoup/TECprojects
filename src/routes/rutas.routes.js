import { Router } from "express";
import exif from "exif";
import { con } from "../controllers/db.js";
import { raiz } from "../controllers/main.controller.js";
import { subirImagen, anuario, loginAnuario } from "../controllers/anuario.controller.js";
import { credenciales } from "../controllers/login.controller.js";
import { getViewRegister, getViewHubAlumno } from "../controllers/registrarDatos.controller.js";
import multer from "multer";
const subida = multer({ dest: 'public/' })
const pfp = multer({ dest: 'public/profilePic' })
const rutas = Router();

//Ruta Veterinaria
rutas.get('/', raiz);

rutas.get('/registerDatos', getViewRegister)

rutas.get('/hubAlumno', getViewHubAlumno)

rutas.post('/acti', pfp.single('pfp'), function (req, res, next){
  
   console.log(req.file.filename);


        let semestre = req.body.semestre;
        let materiaFav = req.body.mateFav;
        let maestroFav = req.body.maestroFav;
        let tecUni = req.body.tecUni;
        let ciudad = req.body.ciudad;
        let numTel = req.body.numTel;
        let birthday = req.body.birthday;

        console.log(req.body);
})

//Ruta para subir imagenes al anuario
rutas.get('/subirImagen', subirImagen);

rutas.get('/login', loginAnuario);

rutas.post('/loginCredenciales', credenciales)

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