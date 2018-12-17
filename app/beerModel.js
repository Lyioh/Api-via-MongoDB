const mongoose = require('mongoose');

/* const beerSchema = new mongoose.Schema({
    fields: {
        brewery_id: String,
        name_breweries: String,
        city: String,
        country: String,
        state: String,
        coordinates: [String, String],
        name: String,
        style_name: String,
        abv: String,
        _id: String
    }
}); */

const beerSchema = new mongoose.Schema({ fields: Object }, { collection : 'docs'});

module.exports = mongoose.model('beer', beerSchema); 