$(document).ready(() => {
  getBought();
  // Declaring variables refrencing html
  var container = $("#boughtCont");
  var listDiv = $("#shoeList")
  $(document).on("click", ".sellBtn", handleDeleteButtonPress);
  
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

  /* EVERYTHING ABOVE HERE CAME WITH profile.js */
  function displayBought(shoe) {
    console.log("this is shoe in displayBought: ", shoe);
    var $shoeList = $("<ul>");
    $shoeList.addClass("list-group");
    // Add the newly created element to the DOM
    $("#shoeList").append($shoeList);
    // Creating list tag in variable to store shoes
    var $shoeListItem = $("<li class='list-group-item shoeHeadline'>");
    // Display shoe name at top of card
    $shoeListItem.append("<h5>" + shoe.shoe + "</h5>")
    
    // Display colorway 2nd
    if (shoe.colorway) {
      $shoeListItem.append("<h5>" + shoe.colorway + "</h5>")
    }
    // Display image url 3rd
    var image = $("<img>");
    image.addClass("card-img-top img-thumbnail shadow-sm border-bottom-secondary my-img");
    image.attr("src", shoe.media);
    $shoeListItem.append(image)
    //Display gender 4th
    if (shoe.gender) {
      $shoeListItem.append("<h5>" + shoe.gender + "</h5>");
    }
    // Display release year 5th
    if (shoe.year) {
      $shoeListItem.append("<h5> " + shoe.year + "</h5>");
    }
    // Display retailPrice 6th
    if (shoe.retailPrice) {
      $shoeListItem.append("<h5>" + shoe.retailPrice + "</h5>");
    }
    // var buy = shoe.id;
    console.log("these are our bought shoes: ", shoe) // shoe was buy
    // dynamically create button, and attatch response ID
    var $btn = $("<button>").attr("id", shoe.id).text("Sell"); // shoe was buy
    $btn.attr("class", "sellBtn");
    // console.log("her is $this: ", $(this));
    // append to DOM
    $shoeListItem.append($btn)

    $shoeList.append($shoeListItem);
  }

  function getBought() {
    $.get("/api/bought", function (shoe) {
      // GIVES ACTUAL OBJECT
      console.log(shoe);
      // -------------------
      var rowsToAdd = [];
      for (var i = 0; i < shoe.length; i++) {
        rowsToAdd.push(displayBought(shoe[i]));
      }
    });
  }

  // function renderEmpty() {
  //   var alertDiv = $("<div>");
  //   alertDiv.addClass("alert alert-danger");
  //   alertDiv.text("Buy something mate.");
  //   listDiv.append(alertDiv);
  // }

  function handleDeleteButtonPress() {
    console.log("this is $this: ", $(this));
    var id = $(this).attr("id");
    console.log("this is id: ", id);
    $.ajax({
      method: "DELETE",
      url: "/api/sell" + "/" + id
    }).then(getBought);
  }
});