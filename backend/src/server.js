require("dotenv").config();
require("./Database");
const express = require("express");
const path = require("path"); 
const appRoutes = require("./routes")
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Facilita el envio de archivos
app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
); // Liberamos a los archivos estáticos

app.use(appRoutes);

app.listen(PORT); 