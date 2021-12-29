//Importing the required modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Setting PORT number
const PORT = 9000;

const db = require("./models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });


app.get("/products", (req, res) => {
    res.send("All products data in JSON format from MongoDB");
});

require("./routes/user.routes")(app);
require("./routes/addresses.routes")(app);

app.listen(9000, () => {
    console.log("Server is listening on PORT", PORT);
})

