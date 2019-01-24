# Api-via-MongoDB
# Who I am ?  
I am still a junior at BeCode and we learn a way to build an API via Node.js

# What is this API?
I have build a little API about beers from a database i have found on [OpenDataSoft](https://data.opendatasoft.com/pages/home/)

# What can we do with it?
You can do some **GET** for:  
* Breweries via: /brewery
* Beers via: /beers  
    * List of beers from breweries: /beers?brewery={Brewery Name}  
    * List of breweries by City: /beers?city={City Name}
  
You can also add new beers with a **POST** with those keys: 
* name_breweries  
* city  
* country  
* state  
* coordinates1  
* coordinates2  
* name  
* style_name 
* abv

You can also Update some data via **PUT** with the sames keys.  
You will have to specify on wich **ID** with: /beers?id={The ID}

# Have some FUN
