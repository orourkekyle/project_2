// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
// WORK IN PROGRESS
  // GET route for getting all of the posts
  app.get("/api/bought", function(req, res) {
    var query = {};
    if (req.user.id) {
      query.UserId = req.user.id;
    }
    // 1. Add a join here to include all of the Authors to these posts
    db.Post.findAll({
      where: purchased, inclued: db/User
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
// WORK IN PROGRESS
  // Get route for retrieving a single post
  // WHATS THE DIFFERENCE BETWEEN THIS AND OTHER GET ^
  app.get("/api/bought/:id", function(req, res) {
    // 2. Add a join here to include the Author who wrote the Post
    db.Post.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      console.log(dbPost);
      res.json(dbPost);
    });
  });
// DID IT! :)
  // POST route for saving a new post
  app.post("/api/buy", function(req, res) {
    console.log("post /api/buy hit")
    console.log("this is req.body: ", req.body);
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
    db.Buy.create(buyObj).then(function(dbPost) {
      res.json(dbPost);
    }).catch( err => {
      console.log(err);
      res.status(500).json(err);
    });
  });
// WORK IN PROGRESS
  // DELETE route for deleting posts
  app.delete("/api/bought/:id", function(req, res) {
    console.log("delete method hit")
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
// WORK IN PROGRESS -
// WHAT IS THIS USED FOR
  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.Post.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
