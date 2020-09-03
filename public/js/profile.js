const mysql = require('mysql')
const express = require('express')

const database =new Datastore('sell');
database.loadDatabase();
$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

  // tom scratch paper idea
  app.post('/api', (req, res) =>{
    console.log("request received");
    database.insert(data);
    console.log(database);
    response.json({
      status:'success',
      
      title: shoe.title,
      release: shoe.releaseYear,
    })
  })
});
