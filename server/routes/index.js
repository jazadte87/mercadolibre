var express = require('express');
var router = express.Router(),
    controllers = require("../controllers"),
    bodyParser = require("body-parser"),
    urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/items/:id", urlencodedParser, ( req , res) => controllers.index.getProduct(req , res));

router.get("/items", urlencodedParser, ( req , res) => controllers.index.searchProductList(req , res));

module.exports = router;