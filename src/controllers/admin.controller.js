import { con } from "../controllers/db.js";

export const admin = async (req, res)=>{
    let [ips] = await con.query('select * from location');
    let [idPhoto] = await con.query(`SELECT * FROM infoAlumnos JOIN login ON infoAlumnos.idUser = login.idUser WHERE infoAlumnos.idUser`)
    console.log(idPhoto)
    
    
    res.render('registerDatos/adminPanel', {ips, idPhoto})
}