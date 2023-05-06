import express from "express";
import ejs from "ejs";
import exif from "exif";
import rutas from "../src/routes/rutas.routes.js";
import session from "express-session";

const app = express();
const port = 3000;
app.use(express.static('public'));
app.use(express.urlencoded( { extended: false } ));
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true
}))

app.use(rutas)
app.set('view engine', 'ejs')

app.listen(port, () => {
    console.log(`Servidor en linea ${port}`)
  })
