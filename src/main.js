import express from "express";
import ejs from "ejs";
import exif from "exif";
const app = express();
const port = 3000;
import rutas from "../src/routes/rutas.routes.js";
app.use(rutas)
app.set('view engine', 'ejs')
app.use(express.static('public'));



app.listen(port, () => {
    console.log(`Servidor en linea ${port}`)
  })
