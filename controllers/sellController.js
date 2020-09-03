var express = require("express");
var router = express.Router();

// Import sell model to use db functions
var sell = require("../models/sell");

// routes to set logic within
router.get("/", function(req, res){
    sell.all(function(data){
        var hbsObject = {
            sells: data
        };
        console.log(hbsObject);
        res.render("profile", hbsObject);
    });
});