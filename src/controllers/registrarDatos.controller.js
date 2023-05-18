import { con } from "../controllers/db.js";

export const getViewRegister =  async (req ,res)=>{
    let [resultado] = await con.query('select nombre from maestrosFotos');
    let [fotos] = await con.query('select imagen from maestrosFotos')

    console.log(fotos[0].imagen)
    
    console.log(resultado[0].nombre);
    res.render("registerDatos/registerDatos", {resultado, fotos})
}

export const getViewHubAlumno = async (req ,res)=>{
    let [resultado] = await con.query('select * from maestrosFotos where id=1');
    let maestro = resultado[0].imagen
    console.log(resultado)
    res.render("registerDatos/hubAlumno", {maestro})
}


export const postRegister =  (req ,res)=>{
    let semestre = req.body.semestre;
    let materiaFav = req.body.mateFav;
    let maestroFav = req.body.maestroFav;
    let tecUni = req.body.tecUni;
    let ciudad = req.body.ciudad;
    let numTel = req.body.numTel;
    let birthday = req.body.birthday;

    console.log(req.body)
}
