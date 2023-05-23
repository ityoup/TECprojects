import { con } from "../controllers/db.js";

export const admin = async (req, res)=>{
    let [ips] = await con.query('select * from location');
    let [usuarios] = await con.query('select * from login');
    let [fotoUsers] = await con.query(`select imagen from infoAlumnos where idUser = ${usuarios[0].idUser}`)
    
    console.log(ips);
    res.render('registerDatos/adminPanel', {ips, usuarios, fotoUsers})
}