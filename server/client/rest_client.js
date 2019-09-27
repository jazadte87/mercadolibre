const RestConnector = require("./rest_connector")
const URLSERVICES = "https://api.mercadolibre.com";


class RestClient {
    constructor() {
        this._restConnector = new RestConnector();
    }

    getProductList(search,options={}){
        let url = `${URLSERVICES}/sites/MLA/search?q="` + search +`"`;
        return this._restConnector.get(url,options);
    }

    getProduct(id,options={}){
        let url = `${URLSERVICES}/items/` + id ;
        console.log(url);
        return this._restConnector.get(url,options);
    }

    getProductDescription(id,options={}){
        let url = `${URLSERVICES}/items/` + id + "/description";
        console.log(url);
        return this._restConnector.get(url,options);
    }

    getProductCategories(id,options={}){
        let url = `${URLSERVICES}/categories/` + id ;
        console.log(url);
        return this._restConnector.get(url,options);
    }
}



module.exports = RestClient;