const RestClient = require("../client");
const Config = require("../config/config")


class AppController {

    constructor() {
        this._author=Config.AUTHOR
    }

    searchProductList(req,res){

        let search  = req.query.search;
        RestClient.restClient.getProductList(search)
        .then(list => {
            list = this._formatJsonList(list);
            res.status(200).send(list);
        })
        .catch(err => {
                res.status(500).send(err);
        });
    }

    getProduct(req,res){
        let id  = req.params.id;
        RestClient.restClient.getProduct(id)
            .then(product => {
                RestClient.restClient.getProductDescription(id)
                    .then((productDescription)=>{
                        let categoryId = product.category_id
                        RestClient.restClient.getProductCategories(categoryId)
                            .then((resultCategories)=>{
                                product.moreDescriptions = productDescription.plain_text;
                                product = this._formatJsonProduct(product,resultCategories);
                                res.status(200).send(product);
                            })
                            .catch((err)=>{
                                res.status(500).send(err);
                            })
                    })
                    .catch((err)=>{
                        res.status(500).send(err);
                    })
            })
            .catch(err => {
                res.status(500).send(err);
            });

    }

    _formatJsonList(json){
        let items = json.results.filter((i,idx)=> idx < 4)
        let categories=[];
        json.filters[0].values[0].path_from_root.forEach((i,j)=>{
            categories.push(i.name)
        })
        items = this._itemsMap(items);
        return ({
            author      : this._author,
            categories  : categories,
            items       : items
        })
    }

    _formatJsonProduct(json,categories){
        let categoriesA=[];

        categories.path_from_root.forEach((i,j)=>{
            categoriesA.push(i.name)
        })

        let item = this._itemMap(json);
        return ({
            author      : this._author,
            categories  : categoriesA,
            item        : item
        })
    }
    _itemMap(item){
        return (
            {
                id:item.id,
                title:item.title,
                price:{
                    currency:item.currency_id,
                    amount:item.price,
                    decimals:item.base_price
                },
                picture:item.pictures[0].url,
                condition:item.condition,
                free_shipping:item.shipping.free_shipping,
                state_name:item.seller_address.state.name,
                moreDescriptions:item.moreDescriptions
            }
        )
    }

    _itemsMap(obj) {
        let response = []
        obj.map((i)=>{
            let item = {
                id : i.id,
                title:i.title,
                price:{
                    currency:i.currency_id,
                    amount:i.price,
                    decimals:i.installments.rate
                },
                picture:i.thumbnail,
                condition:i.condition,
                free_shipping:i.shipping.free_shipping,
                state_name:i.address.state_name
            }
            response.push(item)
        })
         return(response)
    }
}

module.exports = AppController;