(function(){

  'use strict';

  // Initially hide playing board
  $('#board').hide();

  var playerList = $("#board header ul li");
  var activePlayer;
  // Identify active player
  var getActivePlayer = function(){
    playerList.each(function(){
      if($(this).hasClass("active")){
        activePlayer = $(this);
      }
    });
  };
  // On hover, show X or O according to active player

  $(".box").mouseenter(function(){
    getActivePlayer();
    if(activePlayer.attr("id") === "player1"){
      $(this).css("background-image", "url(./img/o.svg)");
    } else {
      $(this).css("background-image", "url(./img/x.svg)");
    }
  });

  $(".box").mouseleave(function(){
    $(this).css("background-image", "none");
  });

  var playCount = 0;

  $('#start a').click(function(){
    // Hide start screen and show game borad
    $('#start').hide();
    $('#board').show();

    // Set player1 to active
    $("#player1").toggleClass('active');
    getActivePlayer();
  });

  // Remove hover bind and keep players choice on board
  $(".boxes li").click(function(){
    getActivePlayer();
    $(this).unbind('mouseenter mouseleave');
    if(activePlayer.attr("id") === "player1"){
      $(this).addClass("box-filled-1");
      playCount ++;
    } else if(activePlayer.attr("id") === "player2"){
      $(this).addClass("box-filled-2");
      playCount++;
    }

    if(playCount % 2 !== 0){
      $("#player2").toggleClass("active");
      $("#player1").toggleClass("active");
    } else {
      $("#player1").toggleClass("active");
      $("#player2").toggleClass("active");
    }
  });

// Do not venture past this point
}());
