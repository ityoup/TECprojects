import { Router } from "express";
import { con } from "../controllers/db.js";
import { raiz } from "../controllers/main.controller.js";
import { subirImagen, anuario } from "../controllers/anuario.controller.js";
import multer from "multer";
const subida = multer({ dest: 'public/' })
const rutas = Router();

//Ruta Veterinaria
rutas.get('/', raiz);

//Ruta para subir imagenes al anuario
rutas.get('/subirImagen', subirImagen);

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



export default rutas;