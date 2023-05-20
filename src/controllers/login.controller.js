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
            res.redirect('/registerDatos');

        } else if (coincidenciasPass == "no_Encontrado") {
            console.log("contraseña incorrecta");
            res.redirect('/login');


        }

    } else if (coincidenciasUser == "no_Encontrado") {
        console.log("no hay coincidencias")
        res.redirect('/login');

    }else{
        console.log("no hay coincidencias")
        res.redirect('/login');

    }
    
   
    


}