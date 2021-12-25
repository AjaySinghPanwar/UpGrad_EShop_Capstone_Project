//Importing the required modules
const express = require("express");
const app = express();

//Setting PORT number
const PORT = 9000;


app.get("/products", (req, res) => {
    res.send("All products data in JSON format from MongoDB");
});

app.listen(9000, () => {
    console.log("Server is listening on PORT", PORT);
})