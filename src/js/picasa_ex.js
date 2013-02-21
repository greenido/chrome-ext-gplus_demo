$(function() {
  var userName = "greenido";
  var q = 'http://pipes.yahoo.com/pipes/pipe.run?_id=198ab6b1cb9e8d96363c9b16484587a6&_render=json&username=' + userName;
  $.getJSON(q , function(data) {
    $("#images").html("");
    $.each(data.value.items, function(i,item){
      var url = item.imgurl;
      $("<img/>").attr("src", url).appendTo("#images"); 
      if ( i == 30 ) return false;
    });
  });
});   
