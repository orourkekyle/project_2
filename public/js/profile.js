const mysql = require('mysql')
const express = require('express')

const database = new Datastore('sell');
database.loadDatabase();
$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

  $.get("/api/bought/:id", Buy, function(shoeData) {
    console.log("get user api/bought hit")
  });

  function displayBought(shoeData){

    for (var i = 0; i < shoeData.length; i++){
     var shoeName = $("<h1>").append(shoeData.shoe)
    
    $("#boughtCont").append(shoeName)
    }
  }

document.onload = () => displayBought();
})
