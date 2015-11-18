var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var request = require('request');
var faker = require('faker');

var db = mongojs('products', ['products']);


router.get('/', function(req, res, next) {
    db.products.find(function(err, docs) {
        console.log(docs);
        res.json(docs);
    });
});

router.post('/:count', function(req, res){
    var count = req.params.count;
    var _ = require('lodash');

    _.times(count, function(n) {
        var product = {
            title: faker.commerce.productName(),
            description: "This Product is a " + faker.commerce.product() + ", it's made of " + faker.commerce.productMaterial(),
            price: faker.commerce.price(),
            imageUrl: faker.image.technics(100,100)
        };


        db.products.insert(product, function(err, doc) {
            console.log(doc);
        });
    });
    res.json(count);
});

router.get('/:id', function(req, res){
   var id = req.params.id;
    db.products.find({_id: mongojs.ObjectId(id)}, function(doc, err){
        console.log(doc);
        res.json(doc);
    });
});

router.put('/addProduct/:title/title/:desc/desc/:price/price', function(reg, res){
   var title = reg.params.title;
    var desc = reg.params.desc;
    var price = reg.params.price;
    var product = {
        title: title,
        description: desc,
        price: price,
        imageUrl: faker.image.technics(100,100)
    };

    db.products.insert(product, function(err, doc) {
        console.log(doc);
    });
    res.json(product);
});

router.delete('/', function(req, res){
   db.products.remove(function(err, doc){
       res.json(doc);
   });
});




module.exports = router;
