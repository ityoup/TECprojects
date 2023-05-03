import express from "express";
const app = express();
const port = 3000;
import rutas from "../src/routes/rutas.routes.js";
app.use(rutas)

app.listen(port, () => {
    console.log(`Servidor en linea ${port}`)
  })