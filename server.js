const express = require('express');
const bodyParser = require('body-parser');
const app = express();
/* const mongoose = require('mongoose'); */
/* mongoose.connect("mongodb://localhost:27017/beerDB", { useNewUrlParser: true }); */

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./route/userRoutes")(app)

app.listen(8080, () => {
    console.log('App Successful listening on port 8080');
});
