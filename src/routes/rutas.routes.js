import { Router } from "express";
import { raiz } from "../controllers/main.controller.js";
const rutas = Router();

//Ruta Veterinaria
rutas.get('/', raiz);





export default rutas;