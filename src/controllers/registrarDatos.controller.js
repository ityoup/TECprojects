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
    let semestre = req.query.semestre
    let imagen = req.query.imagen
    let materiasFav = req.query.materiasFav
    let maestrosFav = req.query.maestrosFav
    let tecUni = req.query.tecUni
    let ciudad = req.query.ciudad
    let email = req.query.email
    let numTel = req.query.numTel
    let cumple = req.query.cumple
    let birthday = req.query.birthday
   
    let [resultado] = await con.query('select * from maestrosFotos where id=1');
    let maestro = resultado[0].imagen
    console.log(resultado)
    res.render("registerDatos/hubAlumno", {maestro, imagen, semestre, tecUni, ciudad, email, numTel})
}



