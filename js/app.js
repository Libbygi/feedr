var $menu = $('#menu ul');
var $body = $('body');
var $title = $('.title');
var $searchIcon = $('#search a');
var $searchContainer = $('#search');
var $menuSpan = $('#menu a span');
var $loader = $('#popUp.loader');
var $main = $('#main');
var $article = $('.article');
var $popUp = $('#popUp');
var $closePopUp = $('.closePopUp');
var $popUpTitle = $('.popUpTitle');
var $popUpSummary = $('.popUpSummary');
var $popUpAction = $('.popUpAction');
var $source = $('#article-template').html();
var template = Handlebars.compile($source);
var newArray = [];
var urlObj = {
  reddit: 'https://www.reddit.com/top.json',
  mashable: 'http://feedr-api.wdidc.org/mashable.json',
  digg: 'http://feedr-api.wdidc.org/digg.json'
}

window.onload = function (){
  $loader.removeClass('hidden');
  callApi(urlObj.reddit);
};

//Homepage from logo
$title.on('click', function(){
  location.reload();
})

//Dropdown menu
$menu.children().on('click' , function(){
  $loader.removeClass('hidden');
  //Changes News Source: XX to name of selected menu item
  var sourceName = $(this).text().toLowerCase();
  $menuSpan.html(sourceName);

  //Shows or hides articles based on what is selected in dropdown
  $body.find('.article').addClass('hidden');
  $body.find('.' + sourceName).removeClass('hidden');
  //a$loader.removeClass('hidden');
  callApi(urlObj[sourceName]);
})

function callApi(endpoint) {
    $.ajax({
        url: endpoint,
        method: "GET",
        dataType: "json",
        success: function (response) {
          if (endpoint === urlObj.reddit){
            onRedditSuccess(response);
          } else if (endpoint === urlObj.mashable){
            onMashableSuccess(response);
          } else if (endpoint === urlObj.digg){
            onDiggSuccess(response);
          }
        },
        error: function(){
            alert('request failed');
        }
    })
};

function onRedditSuccess(response){
  $loader.addClass('hidden');
  var allData = response.data.children;
  newArray = [];

  //Go through data from Reddit, pull out what we need, and create new objects that we append to newArray, in uniform format
  allData.forEach(function(item){
      if (item.data.media){
        var image = item.data.media.oembed.thumbnail_url;
      } else {
        var image = "images/default-image.png";
      };

      var newObj = {
        title: item.data.title,
        category: item.data.subreddit,
        impressions: item.data.ups,
        url: 'http://www.reddit.com' + item.data.permalink,
        image: image,
        id: item.data.id,
        blog: 'Reddit'
      }

      newArray.push(newObj);
  });

  appendArticle(newArray);
}

function onMashableSuccess(response){
  $loader.addClass('hidden');
  var allData = response.new;
  newArray = [];

  allData.forEach(function(item){
      if (item.feature_image){
        var image = item.feature_image;
      } else {
        var image = "images/default-image.png";
      };
      var newObj = {
        title: item.title,
        category: item.channel,
        impressions: item.shares.total,
        url: item.link,
        image: image,
        content: item.content.plain,
        id: item._id,
        blog: 'Mashable'
      }
      newArray.push(newObj);
  });
  appendArticle(newArray);
}

function onDiggSuccess(response){
  $loader.addClass('hidden');
  var allData = response.data.feed;
  newArray = [];

  allData.forEach(function(item){
      var newObj = {
        title: item.content.title,
        category: item.content.tags.name,
        impressions: item.diggs.count,
        url: item.content.url,
        image: item.content.media.images[0].original_url,
        content: item.content.description,
        id: item.content.content_id,
        blog: 'Digg'
      }
      newArray.push(newObj);
  });
  appendArticle(newArray);
}

//go through new array that we have created with streamlined data and append each to #main
function appendArticle(newArray){
  newArray.forEach(function(item){
      $main.append(template(item));
  })
}

//listens for click on article to show popup
$main.on('click', '.article', function(){
   $popUp.removeClass('hidden loader');
   var clickedId = $(this).attr('id');
   matchId(newArray, clickedId);
});

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

$closePopUp.on('click', function(){
  $popUp.addClass('hidden');
})

//Search bar
$searchIcon.on('click', function(){
  $searchContainer.toggleClass('active');
})

if ($searchContainer.hasClass('active')){
  $body.keypress(function(e) {
      if(e.which == 13) {
          $searchContainer.toggleClass('active');
      }
  });
}




// var article = {
//   title: "jesse shawl won the lottery",
//   category: "sports",
//   url: "https://jesse.sh/awl"
// };
//
// var source = $('#article-template').html();
// var template = Handlebars.compile(source);
// $("#main").append(template(article));
