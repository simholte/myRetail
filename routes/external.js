var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('products', ['products']);


router.get('/', function(req, res, next) {
    db.products.find(function(err, docs) {
        console.log(docs);
        res.json(docs);
    });
});


module.exports = router;
