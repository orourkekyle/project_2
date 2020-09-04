
// Requiring our models
var db = require("../models");
// Routes
// =============================================================
module.exports = function(app) {
// WORK IN PROGRESS
  // GET route for getting all of the posts
  app.get("/api/bought", function(req, res) {
<<<<<<< HEAD
    console.log("hitting get request on page")
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post ----THIS SECTION
=======
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    console.log("hitting get on page load");
>>>>>>> 9ea2e4a17d0c790c39868739407906cbb8b31d69
    db.User.findAll({
      where: {
        id: req.User.id
      },
      include: [db.Buy]
    }).then(function(dbUser) {
      res.json(dbUser);
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
    db.Buy.create(buyObj).then(function(dbUser) {
      res.json(dbUser);
    }).catch( err => {
      console.log(err);
      res.status(500).json(err);
    });
  });
// WORK IN PROGRESS
  // DELETE route for deleting posts
  app.delete("/api/bought", function(req, res) {
    console.log("delete method hit")
    db.Buy.destroy({
      where: {
        id: req.User.id
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
<<<<<<< HEAD
};
=======
};
>>>>>>> 9ea2e4a17d0c790c39868739407906cbb8b31d69
