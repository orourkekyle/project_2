$(document).ready(function () {


  var shoeArr = [];

  function buildQueryURL() {
    var name = $("#name").val().trim();
    var gender = $("#gender").val().trim();
    var queryParams = $("#shoe-count").val().trim();
    var releaseDate = $("#release-year").val().trim();
    var brand = $("#brand").val().trim();



    var queryURL = `https://cors-anywhere.herokuapp.com/https://api.thesneakerdatabase.com/v1/sneakers?limit=${queryParams}&brand=${brand}&gender=${gender}`;
    if (name !== "") {
      queryURL = `https://api.thesneakerdatabase.com/v1/sneakers?limit=${queryParams}&brand=${brand}&gender=${gender}&name=${name}`;
    }
    else if (releaseDate !== "") {
      queryURL = `https://api.thesneakerdatabase.com/v1/sneakers?limit=${queryParams}&brand=${brand}&gender=${gender}&releaseYear=${releaseDate}`;
    }
    else if (name !== "" && releaseDate !== "") {
      queryURL = `https://api.thesneakerdatabase.com/v1/sneakers?limit=${queryParams}&brand=${brand}&gender=${gender}&releaseYear=${releaseDate}&name=${name}`;
    }
    else {
      console.log("INSIDE ELSE: ", queryURL);
    }
    // logging our URL so we can troubleshoot with it
    console.log("This is the Request URL: ", queryURL);

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
    console.log("Shoe Data: ", shoeData);

    var numShoes = $("#shoe-count").val();
    for (var i = 0; i < numShoes; i++) {
      // Storing Shoe data for easy use
      var shoe = shoeData.results[i];
      // pushing shoe data into shoeArr for post requests.
      shoeArr.push(shoe);

      // Create the  list group to contain the shoes and add the shoe content for each
      var $shoeList = $("<ul>");
      $shoeList.addClass("list-group");
      // Add the newly created element to the DOM
      $("#shoeList").append($shoeList);
      // Creating list tag in variable to store shoes
      var $shoeListItem = $("<li class='list-group-item shoeHeadline'>");

      // Display shoe name at top of card
      if (shoe.shoe) {
        $shoeListItem.append("<h5>" + shoe.shoe + "</h5>")
      }
      // Display colorway 2nd
      if (shoe.colorway) {
        $shoeListItem.append("<h5>" + shoe.colorway + "</h5>")
      }
      // Display image url 3rd
      var image = $("<img>");
      image.addClass("card-img-top img-thumbnail shadow-sm border-bottom-secondary my-img");
      image.attr("src", shoe.media.imageUrl);
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

      
      // Store Id in buy variable, plus console log ID
      var buy = shoe.id;
      console.log("Buy is " + buy)
      // dynamically create button, and attatch response ID
      var $btn = $("<button>").attr("id", buy).text("Buy");
      $btn.attr("class", "buyBtn");
      // console.log("her is $this: ", $(this));
      // append to DOM
      $shoeListItem.append($btn)

      // Basic Button for Sell RESTRUCTURE FOR POST
      var sell = $("<button>'Sell'</button>")
      $shoeListItem.append(sell);

      // Append the shoe Items to shoeList
      $shoeList.append($shoeListItem);
    }
  }
  // The Post Function
  function handlePost(event) {
    // Load DOM before post
    event.preventDefault();
    // Make index -1 if for Loop fails
    var index = -1;
    // loop through shoeArr
    for (var i = 0; i < shoeArr.length; i++) {
      console.log("$this attr id: ", $(this).attr("id"));
      // check shoeArr Id is same as button Id (buttonId should = responseId)
      if (shoeArr[i].id === $(this).attr("id")) {
        console.log("match success");
        index = i;
        break;
      }
    }
    // create obj to post 
    var newBuy = {
      gender: shoeArr[index].gender,
      media: shoeArr[index].media.imageUrl,
      colorWay: shoeArr[index].colorway,
      retailPrice: shoeArr[index].retailPrice,
      shoe: shoeArr[index].shoe,
      year: shoeArr[index].year,
      purchased: true
    };
    // Calls submitBuyPost
    var updating = false;
    if (updating) {
      newBuy.id = shoeArr[index].id
      console.log(newBuy);
    } else {
      submitBuyPost(newBuy);
    }
    function submitBuyPost(newBuyObj) {
      $.post("/api/buy", newBuyObj, function () {
        console.log("Successful Posted in mysql")
      })
    }

    // $.ajax({
    //   type: "POST",
    //   url: "/api/buy/",
    //   data: newBuy
    // }).then(
    //   function () {
    //     console.log("sending shoe");
    //   }
    // )
  }
  // Button click function
  $(document).on("click", ".buyBtn", handlePost);
  // $(document).on("click", ".sellBtn", handlePost);


  // Function to empty out the shoes
  function clear() {
    $("#shoe-section").empty();
  }
 
  // .on("click") function associated with the Search Button
  $("#run-search").on("click", function (event) {
  //  prevent default refresh
    event.preventDefault();
    // Empty the region associated with the shoes
    clear();
    // Build the query URL for the ajax request to the API
    var queryURL = buildQueryURL();
    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(updatePage);
  });

  //  .on("click") function associated with the clear button
  $("#clear-all").on("click", clear);
})

