$(document).ready(function () {

  function buildQueryURL() {
    // create vars for form criteria
    var name = $("#name").val().trim();
    var gender = $("#gender").val().trim();
    var queryParams = $("#shoe-count").val().trim();
    var releaseDate = $("#release-year").val().trim();
    var brand = $("#brand").val().trim();

    var queryURL = `https://api.thesneakerdatabase.com/v1/sneakers?limit=${queryParams}&brand=${brand}&gender=${gender}`;

        if(name !== ""){
            queryURL = `https://api.thesneakerdatabase.com/v1/sneakers?limit=${queryParams}&brand=${brand}&gender=${gender}&name=${name}`;
        }
        else if(releaseDate !== ""){
            queryURL = `https://api.thesneakerdatabase.com/v1/sneakers?limit=${queryParams}&brand=${brand}&gender=${gender}&releaseYear=${releaseDate}`;
        }
        else if(name !== "" && releaseDate !== ""){
            queryURL = `https://api.thesneakerdatabase.com/v1/sneakers?limit=${queryParams}&brand=${brand}&gender=${gender}&releaseYear=${releaseDate}&name=${name}`;
        }
        else {
            console.log("INSIDE ELSE: ", queryURL);
        }

    console.log(queryURL);
    // WHY IF THIS ISN'T HERE shoeData RETURNS HTML PAGE
    return queryURL;
  }

  // update our page with results
  function updatePage(shoeData) {
    console.log(shoeData);

    var numShoes = $("#shoe-count").val();
    for (var i = 0; i < numShoes; i++) {
      // storing for easy use
      var shoe = shoeData.results[i];
      // place to diplay shoes
      var $shoeList = $("<ul>");
      $shoeList.addClass("list-group");
      // add newly created element to DOM
      $("#shoeList").append($shoeList);
      // list tag for each new shoe
      var $shoeListItem = $("<li class='list-group-item shoeHeadline'>");
      
      // shoe name at top of card
      if (shoe.shoe) {
        $shoeListItem.append("<h5>" + shoe.shoe + "</h5>")
      }
      // colorway second
      if (shoe.colorway) {
        $shoeListItem.append("<h5>" + shoe.colorway + "</h5>")
      }
      // image third
      var image = $("<img>");
      image.addClass("card-img-top img-thumbnail shadow-sm border-bottom-secondary");
      image.attr("src", shoe.media.imageUrl);
      $shoeListItem.append(image)
      // gender fourth
      if (shoe.gender) {
        $shoeListItem.append("<h5>" + shoe.gender + "</h5>");
      }
      // year fifth
      if (shoe.year) {
        $shoeListItem.append("<h5> " + shoe.year + "</h5>");
      }
      // price sixth
      if (shoe.retailPrice) {
        $shoeListItem.append("<h5>" + shoe.retailPrice + "</h5>");
      }

      // buy and sell buttons for primary functionality
      var buy = $("<button>'Buy'</button>");
      var sell = $("<button>'Sell'</button>")
      $shoeListItem.append(buy, sell);

      // apend items to list
      $shoeList.append($shoeListItem);
    }
  }

  // clear function
  function clear() {
    $("#article-section").empty();
  }

  // search on click function
  $("#run-search").on("click", function (event) {
    // prevent default
    event.preventDefault();
    // call clear function
    clear();
    // call url function in variable
    var queryURL = buildQueryURL();

    // make ajax call
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(updatePage);
  });

  // add clear function to clear btn
  $("#clear-all").on("click", clear);
})

