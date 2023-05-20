import express from "express";
import ejs from "ejs";
import exif from "exif";
import rutas from "../src/routes/rutas.routes.js";


const app = express();
const port = 3000;
app.use(express.urlencoded( { extended: false } ));

app.use(express.static('public'));



app.use(rutas)
app.set('view engine', 'ejs')

app.listen(port, () => {
    console.log(`Servidor en linea ${port}`)
  })
