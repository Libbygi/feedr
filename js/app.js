var $menu = $('#menu ul');
var $body = $('body');
var $menuSpan = $('#menu a span');

var $loader = $('#popUp.loader');
var $main = $('#main');
var $article = $('.article');

var $popUp = $('#popUp');
var newArray = [];
var $closePopUp = $('.closePopUp');
var $popUpTitle = $('.popUpTitle');
var $popUpSummary = $('.popUpSummary');
var $popUpAction = $('.popUpAction');


window.onload = function(){
  $loader.removeClass('hidden');
  getReddit();
};

//listens for click on article to show popup
$main.on('click', '.article', function () {
   $popUp.removeClass('hidden loader');
   var clickedId = $(this).attr('id');
   matchId(newArray, clickedId);
});

$closePopUp.on('click', function(){
  $popUp.addClass('hidden');
})


// function to check for matched ID and then pull appropriate info for popup
function matchId(data, id){
  data.forEach(function(item){
     if (item.id === id){
        $popUpTitle.html(item.title);
        $popUpAction.attr('href', item.url);
        if (item.content){
          $popUpSummary.html(item.content);
        } else {
          $popUpSummary.html('No summary is available.');
        }
     }
  })
};

function getReddit() {
    $.ajax({
        url: "https://www.reddit.com/top.json",
        method: "GET",
        dataType: "json",
        success: function (response) {
          onRedditSuccess(response);
        }
    })
};

function onRedditSuccess(response){
  $loader.addClass('hidden');

  var allData = response.data.children;

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
      newObj.blog = 'Reddit';

      newArray.push(newObj);
  });

  var source = $('#article-template').html();
  var template = Handlebars.compile(source);

      //go through new array that we have created with streamlined data and append each to #main
      newArray.forEach(function(item){
        $main.append(template(item))
      })
}

//Dropdown menu
$menu.children().on('click' , function(){
  //Changes News Source: XX to name of selected menu item
  var sourceName = $(this).text();
  $menuSpan.html(sourceName);

  //Shows or hides articles based on what is selected in dropdown
  $body.find('.article').addClass('hidden');
  $body.find('.' + sourceName).removeClass('hidden');

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
