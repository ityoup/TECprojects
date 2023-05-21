import { con } from "../controllers/db.js";

export const explorar = async (req, res)=>{
    let [user] = await con.query('SELECT * FROM infoAlumnos JOIN login ON infoAlumnos.idUser = login.idUser');
    console.log(user)
    
    res.render('registerDatos/explorar', {user})
}