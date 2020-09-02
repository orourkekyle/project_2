$(document).ready(function () {

  function buildQueryURL() {
    var name = $("#name").val().trim();
    var gender = $("#gender").val().trim();

    var queryParams = $("#shoe-count").val().trim();

    var releaseDate = $("#release-year").val().trim();

    var brand = $("#brand").val().trim();

    if (parseInt(releaseDate)) {
      queryParams.releaseDate = releaseDate;
    }

    var queryURL = `https://api.thesneakerdatabase.com/v1/sneakers?limit=${queryParams}&brand=${brand}&gender=${gender}`;

    switch (queryURL) {
      case "name":
        return (queryURL = `https://api.thesneakerdatabase.com/v1/sneakers?limit=${queryParams}&brand=${brand}&gender=${gender}&name=${name}`);
        break;

      case "releaseDate":
        return (queryURL = `https://api.thesneakerdatabase.com/v1/sneakers?limit=${queryParams}&brand=${brand}&gender=${gender}&releaseYear=${releaseDate}`);
        break;

      case "releaseDate" && "name":
        return (queryURL = `https://api.thesneakerdatabase.com/v1/sneakers?limit=${queryParams}&brand=${brand}&gender=${gender}&releaseYear=${releaseDate}&name=${name}`);
        break;
    }

    // logging our URL so we can troubleshoot with it
    console.log("---------------\nURL: " + queryURL + "\n---------------");
    console.log(queryURL);
    return queryURL;
  }

  // update our page with results
  function updatePage(shoeData) {
    var numShoes = $("#shoe-count").val();

    console.log(shoeData);
    console.log("------------------------------------");

    for (var i = 0; i < numShoes; i++) {
      console.log(numShoes);
      // Get specific article info for current index
      var shoe = shoeData.results[i];

      // Increase the articleCount (track article # - starting at 1)
      var shoeCount = i + 1;

      // Create the  list group to contain the articles and add the article content for each
      var $shoeList = $("<ul>");
      $shoeList.addClass("list-group");

      // Add the newly created element to the DOM
      $("#shoeList").append($shoeList);

      // Creating list tag in variable
      var $shoeListItem = $("<li class='list-group-item shoeHeadline'>");


      if (shoe.shoe) {
        $shoeListItem.append("<h5>" + shoe.shoe + "</h5>")
      }


      var colorway = shoe.colorway;

      if (colorway) {
        $shoeListItem.append("<h5>" + colorway + "</h5>")
      }

      var image = $("<img>");
      image.addClass("card-img-top img-thumbnail shadow-sm border-bottom-secondary");
      image.attr("src", shoe.media.imageUrl);
      $shoeListItem.append(image)

      // Log gender, and append to document if exists
      var gender = shoe.gender;
      // console.log(shoe.gender);
      if (gender) {
        $shoeListItem.append("<h5>" + gender + "</h5>");
      }

      // Log release Year, and append to document if exists
      var year = shoe.year;
      //   console.log(shoe.year);
      if (year) {
        $shoeListItem.append("<h5> " + year + "</h5>");
      }


      // Append and log retailPrice
      var retailPrice = shoe.retailPrice;
      $shoeListItem.append("<h5>" + retailPrice + "</h5>");

      var buy = $("<button>'Buy'</button>");
      var sell = $("<button>'Sell'</button>")
      $shoeListItem.append(buy, sell);

      // Append the article
      $shoeList.append($shoeListItem);
    }
  }

  // Function to empty out the articles
  function clear() {
    $("#article-section").empty();
  }
  // CLICK HANDLERS
  // ==========================================================

  // .on("click") function associated with the Search Button
  $("#run-search").on("click", function (event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();

    // Empty the region associated with the articles
    clear();

    // Build the query URL for the ajax request to the NYT API
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

