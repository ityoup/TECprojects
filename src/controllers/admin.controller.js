import { con } from "../controllers/db.js";

export const admin = async (req, res)=>{

    let [users] = await con.query('select * from login')
    let [count] = await con.query('select count(*) as cuenta from login');
    let [countIP] = await con.query('select count(*) as cuenta from location');
    let cuentaUsers = count[0].cuenta;
    let cuentaIP = countIP[0].cuenta;
    //console.log(users)
    let [ips] = await con.query('select * from location');
    let [idPhoto] = await con.query(`SELECT * FROM infoAlumnos JOIN login ON infoAlumnos.idUser = login.idUser WHERE infoAlumnos.idUser`)
    let [resultado] = await con.query('select nombre from maestrosFotos');
    
    res.render('registerDatos/adminPanel', {ips, idPhoto, users, resultado, cuentaUsers, cuentaIP})
}

export const adminPost = async (req, res)=>{
  
    let [users] = await con.query('select * from login')
    let [count] = await con.query('select count(*) as cuenta from login');
    let [countIP] = await con.query('select count(*) as cuenta from location');
    let cuentaUsers = count[0].cuenta;
    let cuentaIP = countIP[0].cuenta;
    //console.log(users)
    let [ips] = await con.query('select * from location');
    let [idPhoto] = await con.query(`SELECT * FROM infoAlumnos JOIN login ON infoAlumnos.idUser = login.idUser WHERE infoAlumnos.idUser`)
    let [resultado] = await con.query('select nombre from maestrosFotos');
    
  let user = req.body.select

  console.log(req.body)
 
  let [busqueda] = await con.query(`select * from login where user="${user}"`)
  console.log(busqueda)

        let idUser = req.body.idUser;
        let semestre = req.body.semestre;
        let materiaFav = req.body.mateFav;
        let maestroFav = req.body.maestroFav;
        let tecUni = req.body.tecUni;
        let ciudad = req.body.ciudad;
        let numTel = req.body.numTel;
        let birthday = req.body.birthday;
        let email = req.body.email;




  con.query(`UPDATE infoAlumnos set semestre='${semestre}', materiasFav='${materiaFav}' ,maestrosFav = '${maestroFav}', tecUni = '${tecUni}', ciudad = '${ciudad}', email = '${email}', numTel = ${numTel}, cumple = '${birthday}' where idUser = '${busqueda[0].idUser}'`)

  res.render('registerDatos/adminPanel', {ips, idPhoto, users, resultado, cuentaUsers, cuentaIP})
}