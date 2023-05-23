import { con } from "../controllers/db.js";
import { gmailSend } from "../controllers/gmailEnviar.controller.js";
export const subirImagen = async (req, res) => {
    const [resultados] = await con.query("Select * from imagenes");
    res.render('subirImagen', { resultados: resultados })
}

export const loginAnuario = async (req, res) => {
   
    
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`La IP del visitante es: ${ip}`);

    console.log(`la ip es: ` + ip)
    let ipRefac = ip.replace(/[^0-9\.]+/g, "");
    /* function saberIP(x) {
        fetch(`http://ipwho.is/${x}?lang=es`)
            .then(response => response.json())
            .then(data => {
                let continent = data.continent;
                let country = data.country;
                let region = data.region;
                let isp = data.connection.isp;
                let city = data.city;
                con.query(`INSERT INTO location (ip, continente, pais, region, city, isp) values ('${ipRefac}','${continent}','${country}','${region}','${city}','${isp}')`)
                
                gmailSend(ipRefac, city, region, country);
                
            
            })


    } */
   /*  saberIP(ipRefac); */


    res.render('login')
}

export const anuario = async (req, res) => {

    //Se busca dentro de la base de datos que valor 

    let pruebaaaa = ["W"]
    let [chido] = await con.query("Select MAX(id) AS Ultimo from imagenes")
    let imagenFor = chido[0].Ultimo;
    let [busquedaImg] = await con.query(`SELECT imagenes from imagenes where id=${imagenFor}`);
    // catch para saber si la imagen tiene 



    try {
        new ExifImage({ image: `public/${busquedaImg[0].imagenes}` }, async function (error, exifData) {

            const [resultados] = await con.query("Select * from imagenes");
            let fecha = new Date();
            var date = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();

            let fechaCreacionImagen;
            try {
                fechaCreacionImagen = exifData.exif.DateTimeOriginal;
                console.log(fechaCreacionImagen);

            } catch (error) {

                console.log(error)
                // res.render('anuario', { resultados: resultados, fechaExif: `${fechaCreacionImagen}`,fechaHoy: date })
            }

            res.render('anuario', { resultados: resultados, fechaExif: `${fechaCreacionImagen}`, fechaHoy: date })

        });
    } catch (error) {
        console.log('Error: ' + error.message);
    }




}