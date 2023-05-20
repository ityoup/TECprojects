import { con } from "../controllers/db.js";

export const register = (req, res)=>{
    res.render('register')
}

export const registerCredenciales = (req, res)=>{
   let user = req.body.user;
   let password = req.body.password
   console.log(req.body);
    con.query(`INSERT INTO login(user, password) values ('${user}', ${password})`);
    res.redirect('/login')
}
