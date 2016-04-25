//Menu Items: on click:
  //update white box text
  //Show the blog clicked on, hide the others
  //get API url for that blog

var $menu = $('#menu');
var $menuSpan = $('#menu a span');
var $mashable = $('#mashable');
var $reddit = $('#reddit');
var $digg = $('#digg');

var $loader = $('#popUp.loader');
var $main = $('#main');

var $popUp = $('#popUp');

window.onload = function(){
  $loader.removeClass('hidden');
  getReddit();
};

//listens for click on article to show popup
$main.on('click', '.article', function () {
     console.log("click");
     $popUp.removeClass('hidden loader');
     $('.container h1').html('heres a title');
     var clickedId = $(this).attr('id');
     matchId(allData, clickedId);
    //  newArray.forEach(function(item){
    //    if (item.id === clickedId){
    //      console.log('match found:' + item.id)}
    //  })

    // function to check for matched ID

    //  if (asd){
    //
    //   } else {
    //  $('.container p').html('No summary is available.');
    //   };
});

function matchId(data, currentId){
  data.forEach(function(item){
    if (item.id === currentId){
      console.log('match found:' + item.id)}
  })
};


function getReddit() {
    $.ajax({
        url: "https://www.reddit.com/top.json",
        method: "GET",
        dataType: "json",
        success: function name(response) {
          $loader.addClass('hidden');

          var allData = response.data.children;
          var newArray = [];

          //Go through data from Reddit, pull out what we need, and create new objects that we append to newArray, in uniform format
          allData.forEach(function(item){
              var newObj = {};
              var title = item.data.title;
              var category = item.data.subreddit;
              var impressions = item.data.ups;
              var url = 'http://www.reddit.com' + item.data.permalink;
              var author = item.data.author;
              var id = item.data.id;
              if (item.data.media){
                var image = item.data.media.oembed.thumbnail_url;
              } else {
                var image = "images/default-image.png";
              };

              newObj.title = title;
              newObj.category = category;
              newObj.impressions = impressions;
              newObj.url = url;
              newObj.image = image;
              newObj.author = author;
              newObj.id = id;

              newArray.push(newObj);
          });
              var source = $('#article-template').html();
              var template = Handlebars.compile(source);

          //go through new array that we have created with streamlined data and append each to #main
          newArray.forEach(function(item){
              $main.append(template(item))
          })
          return newArray;
        }
    })
    return $.ajax;
}

//NEXT TO DO
// add pop up to Main
// make dropdown menu work
// hook up the other two APIs

// function pullInfo(data){
//   var source = $('#article-template').html();
//   var template = Handlebars.compile(source);
//   $("#main").append(template(data));
// };

$menu.children().on('click' , function(){
  console.log('childclicked');
  console.log($(this).text());
  $menuSpan.html('name of the thing');
})

// var article = {
//   title: "jesse shawl won the lottery",
//   category: "sports",
//   url: "https://jesse.sh/awl"
// };
//
// var source = $('#article-template').html();
// var template = Handlebars.compile(source);
// //console.log(template(article));
// $("#main").append(template(article));
