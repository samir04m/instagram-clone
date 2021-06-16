require("dotenv").config();
require("./Database");
const express = require("express");
const path = require("path"); 

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const photoRoutes = require("./routes/photoRoutes");
const likeRoutes = require("./routes/likeRoutes");
const commentRoutes = require("./routes/commentRoutes");
const followRoutes = require("./routes/followRoutes");

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Facilita el envio de archivos
app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
); // Liberamos a los archivos estáticos

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/photos", photoRoutes);
app.use("/likes", likeRoutes);
app.use("/comments", commentRoutes);
app.use("/follows", followRoutes);


app.listen(PORT); 