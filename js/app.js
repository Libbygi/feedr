//Menu Items: on click:
  //update white box text
  //Show the blog clicked on, hide the others
  //get API url for that blog

var $menu = $('#menu');
var $menuSpan = $('#menu a span');
var $mashable = $('#mashable');
var $reddit = $('#reddit');
var $digg = $('#digg');

window.onload = function(){

};

function testDropdown() {
    $.ajax({
        url: "https://www.reddit.com/top.json",
        method: "GET",
        dataType: "json",
        success: function(response) {
          var allData = response.data.children;

          allData.forEach(function(item){
            console.log(item.data.subreddit);
            console.log(item.data.permalink);
            console.log(item.data.title);
            console.log(item.data.ups);
            if (item.data.media){
              console.log(item.data.media.oembed.thumbnail_url);
            }
          })
        }
    })
}
testDropdown();

$menu.children().on('click' , function(){
  console.log('childclicked');
  console.log($(this).text());
  $menuSpan.html('name of the thing');
})

var article = {
  title: "jesse shawl won the lottery",
  subhed: "But you'll never believe what happened next.",
  url: "https://jesse.sh/awl"
};

var source = $('#article-template').html();
var template = Handlebars.compile(source);
//console.log(template(article));
$("#main").append(template(article));
