import { con } from "../controllers/db.js";

export const subirImagen = async (req, res) => {
    const [resultados] = await con.query("Select * from imagenes");
    res.render('subirImagen', { resultados: resultados })
}

export const loginAnuario = async (req, res) => {
let ip = req.socket.remoteAddress
let ipRefac = ip.replace(/[^0-9\.]+/g, "");
    function saberIP(x) {
        fetch(`http://ipwho.is/${x}?lang=es`)
            .then(response => response.json())
            .then(data => console.log(data))
            

    }
    saberIP(ipRefac);
    
    
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