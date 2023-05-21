import { con } from "./db.js";


export const credenciales = async (req, res) => {
    let user;
    let pass;


    let accesos = {
        usuario: user = req.body.user,
        contraseña: pass = req.body.contra
    }
    let [validaContra] = await con.query(`SELECT IFNULL((SELECT password FROM login WHERE password="${accesos.contraseña}" LIMIT 1) ,'no_Encontrado') as result`)
    let coincidenciasPass = validaContra[0].result;

    let [resultados] = await con.query(`SELECT IFNULL((SELECT user FROM login WHERE user="${accesos.usuario}" LIMIT 1) ,'no_Encontrado') as result`);
    let coincidenciasUser = resultados[0].result;

    if (coincidenciasUser == accesos.usuario) {
        console.log("hemos encontrados coincidencias con el usuario")
        if (coincidenciasPass == accesos.contraseña) {
            console.log("contraseña correcta");

            let [userId] = await con.query(`select idUser from login where user="${accesos.usuario}"`)
            console.log(userId[0].idUser);
            let [existeUser] = await con.query(`SELECT * FROM infoAlumnos JOIN login ON infoAlumnos.idUser = login.idUser WHERE infoAlumnos.idUser = '${userId[0].idUser}';`);
            //let [search] = await con.query(`SELECT IFNULL((select idUser from login where idUser="${existeUser[0].idUser}" LIMIT 1), 'no_encontrado') as result`)


            try {

                let idUser = existeUser[0].idUser;
                let semestre = existeUser[0].semestre;
                let materiasFav = existeUser[0].materiasFav;
                let maestrosFav = existeUser[0].maestrosFav;
                let tecUni = existeUser[0].tecUni;
                let ciudad = existeUser[0].ciudad;
                let email = existeUser[0].email;
                let numTel = existeUser[0].numTel;
                let cumple = existeUser[0].cumple;
                let pfp = "https://cdn.idropnews.com/wp-content/uploads/2018/09/10214134/New-Features.gif";
                console.log(existeUser);

                let [resultado] = await con.query('select nombre from maestrosFotos');
                let [fotos] = await con.query('select imagen from maestrosFotos')

                console.log(fotos[0].imagen)

                console.log(resultado[0].nombre);



                res.render("registerDatos/registerDatos", { idUser, resultado, fotos, semestre, pfp, materiasFav, maestrosFav, tecUni, ciudad, email, numTel, cumple })
            } catch (error) {

                let resultado = "dsf";
                let fotos = "";
                let semestre = "";
                let pfp = "https://cdn.idropnews.com/wp-content/uploads/2018/09/10214134/New-Features.gif";
                let materiasFav = "";
               
                let tecUni = "";
                let ciudad = "";
                let email = "";
                let numTel = "";
                let cumple = "";

                console.log("no existe nada");
                res.render("registerDatos/registerDatos", { resultado, fotos, semestre, pfp, materiasFav, tecUni, ciudad, email, numTel, cumple });
               
            }







        } else if (coincidenciasPass == "no_Encontrado") {
            console.log("contraseña incorrecta");
            res.redirect('/login');


        }

    } else if (coincidenciasUser == "no_Encontrado") {
        console.log("no hay coincidencias")
        res.redirect('/login');

    } else {
        console.log("no hay coincidencias")
        res.redirect('/login');

    }





}