
// Requiring our models
var db = require("../models");
// Routes
// =============================================================
module.exports = function(app) {
// WORK IN PROGRESS
  // GET route for getting all of the posts
  app.get("/api/bought", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    console.log("hitting get on page load");
    console.log("this is req.user", req.user);
    db.Buy.findAll({
      where: {
        UserId: req.user.id
      },
      // include: [db.Buy]
    }).then(function(dbUsersBuyData) {
      res.json(dbUsersBuyData);
    });
  });
  
// DID IT! :)
  // POST route for saving a new post
  app.post("/api/buy", function(req, res) {
    console.log("post /api/buy hit", req.user);
    console.log("this is req.body: ", req.body);
    console.log(req.user);
    if (!req.user) {
      return res.status(402).json({msg: "user not signed in!"});
    }
    var buyObj = {
      gender: req.body.gender,
      media: req.body.media,
      colorWay: req.body.colorway,
      retailPrice: req.body.retailPrice,
      shoe: req.body.shoe,
      year: req.body.year,
      purchased: req.body.purchased,
      UserId: req.user.id
    }
    db.Buy.create(buyObj).then(function(dbUserBoughtData) {
      res.json(dbUserBoughtData);
    }).catch( err => {
      console.log(err);
      res.status(500).json(err);
    });
  });
// WORK IN PROGRESS
  // DELETE route for deleting posts
  app.delete("/api/sell", function(req, res) {
    console.log("delete method hit")
    db.Buy.destroy({
      where: {
        id: req.buy.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
// WORK IN PROGRESS -
// WHAT IS THIS USED FOR
  // PUT route for updating posts
  // app.put("/api/posts", function(req, res) {
  //   db.Post.update(
  //     req.body,
  //     {
  //       where: {
  //         id: req.body.id
  //       }
  //     }).then(function(dbPost) {
  //     res.json(dbPost);
  //   });
  // });
};
