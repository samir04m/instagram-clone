const express = require("express");

const app = express();
const PORT = process.env.PORT || 3333;

app.get("/", (req, res) => {
    res.send("todo ok");
});


app.listen(PORT); 