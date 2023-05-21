import { con } from "../controllers/db.js";

import multer from "multer";
const fotoPerfil = multer({ dest: 'public/img' })


export const getViewRegister =  async (req ,res)=>{
    let [resultado] = await con.query('select nombre from maestrosFotos');
    let [fotos] = await con.query('select imagen from maestrosFotos')

    console.log(fotos[0].imagen)
    
    console.log(resultado[0].nombre);
    res.render("registerDatos/registerDatos", {resultado, fotos})
}

export const getViewHubAlumno = async (req ,res)=>{
    console.log(req.query);
    let [resultado] = await con.query('select * from maestrosFotos where id=1');
    let maestro = resultado[0].imagen
    console.log(resultado)
    res.render("registerDatos/hubAlumno", {maestro})
}



