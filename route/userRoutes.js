const mongoose = require('mongoose');
const log = require("../key.js");
const beer = require("../app/beerModel.js");
/* mongoose.connect("mongodb://localhost:27017/beerDB", { useNewUrlParser: true }); */
mongoose.connect(`mongodb://${log.auth.log}:${log.auth.pass}@ds135844.mlab.com:35844/beerdb`, { useNewUrlParser: true });

module.exports = function (app) {
    //get all
    app.get("/getall", (req, res) => {
        beer.find({}, (err, content) => {
            if (err)
                console.log(handleError(err));
            res.json(content);
        });
    });
    // Brewerys Call
    app.get("/brewery", (req, res) => {
        beer.find({}, (err, content) => {
            console.log("GET Request for breweries");
            let arrayToReturn = [];
            if (err) {
                console.log(handleError(err));
            }
            for (let i in content) {
                arrayToReturn[i] = {
                    name: content[i].fields.name_breweries,
                    city: content[i].fields.city,
                    country: content[i].fields.country,
                    state: content[i].fields.state,
                    coordinate: content[i].fields.coordinates
                };
            };
            res.json(arrayToReturn);
        });
    });
    // Beers Call
    app.get("/beers", (req, res) => {
        beer.find({}, function (err, content) {
            let brewery = req.query.brewery;
            let city = req.query.city;
            let arrayToReturn = [];
            let y = 0;
            if (err) {
                console.log(handleError(err));
            }
            if (brewery != undefined) {
                console.log("GET Request for Beers by Brewery");
                for (let i in content) {
                    if (brewery == content[i].fields.name_breweries) {
                        arrayToReturn[y++] = content[i];
                    };
                };
            }
            else if (city != undefined) {
                console.log("GET Request for Beers by Cities");
                for (let i in content) {
                    if (city == content[i].fields.city) {
                        arrayToReturn[y++] = content[i];
                    };
                };
            }
            else {
                console.log("GET Request for Beers");
                for (let i in content) {
                    arrayToReturn[i] = {
                        brewery: content[i].fields.name_breweries,
                        name: content[i].fields.name,
                        style: content[i].fields.style_name,
                        abv: content[i].fields.abv
                    };
                };
            };
            res.json(arrayToReturn);
        });
    });
    // Post new beer and Brewery
    app.post("/beers", (req, res) => {
        beer.create({
            fields: {
                name_breweries: req.body.name_breweries,
                city: req.body.city,
                country: req.body.country,
                state: req.body.state,
                coordinates: [req.body.coordinates1, req.body.coordinates2],
                name: req.body.name,
                style_name: req.body.style_name,
                abv: req.body.abv
            }
        }, (err, content) => {
            console.log("POST Request on breweries");
            if (err) {
                console.log(handleError(err));
            }
           /*  beer.find((err, content) => {
                if (err)
                    console.log(handleError(err));
                res.json(content);
            }); */
        })
    })

    app.put("/beers/:id", (req, res) => {
        let { name_breweries, city, country, state, coordinates1, coordinates2, name, style_name, abv } = req.body;
        let objectToReturn = {};
        beer.findById(req.params.id, (err, content) => {
            objectToReturn = content;
            console.log(objectToReturn)
            if (name_breweries != "" || name_breweries != undefined) {
                console.log("name_Brewerie")
                objectToReturn.fields.name_breweries = name_breweries;
            };
            if (city != undefined) {
                console.log("city")
                objectToReturn.fields.city = city;
            };
            if (country != undefined) {
                console.log("country")
                objectToReturn.fields.country = country;
            };
            if (state != undefined) {
                console.log("state")
                objectToReturn.fields.state = state;
            };
            if (coordinates1 != undefined || coordinates2!= undefined) {
                console.log("coordonate")
                objectToReturn.fields.coordinates = [coordinates1, coordinates2];
            };
            if (name != undefined) {
                console.log("name")
                objectToReturn.fields.name = name;
            };
            if (style_name != undefined) {
                console.log("style_name")
                objectToReturn.fields.style_name = style_name;
            };
            if (abv != undefined) {
                console.log("abv")
                objectToReturn.fields.abv = abv;
            };
            content.updateOne(objectToReturn, (err, content) => {
                if (err)
                    console.log(handleError(err));
                /* beer.find((err, content) => {
                    if (err)
                        console.log(handleError(err));
                    res.json(content);
                }); */
            })
        });
    });

    app.delete('/terrorist/:id', (req, res) => {
        beer.deleteOne({
            _id: req.params.id
        }, (err, content) => {
            if (err)
                console.log(handleError(err));
            beer.find((err, content) => {
                if (err)
                    console.log(handleError(err));
                res.json(content);
            });
        });
    });
}
