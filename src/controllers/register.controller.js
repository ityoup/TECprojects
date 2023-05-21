import { con } from "../controllers/db.js";

export const register = (req, res)=>{
    res.render('register')
}

export const registerCredenciales = async (req, res)=>{
   let user = req.body.user;
   let password = req.body.password;
   console.log(req.body);
    con.query(`INSERT INTO login(user, password) values ('${user}', '${password}')`);
    setTimeout(async () => {
        let [id] = await con.query(`SELECT * from login where user = "${user}" AND password = "${password}"`);
        // Aquí puedes realizar otras acciones con el resultado obtenido
        let idUserInfoAlum = id[0].idUser;
        console.log(idUserInfoAlum)
        con.query(`INSERT INTO infoAlumnos (idUser) values ('${idUserInfoAlum}')`)
      }, 1000);
      
    
    
    res.redirect('/login')
}
