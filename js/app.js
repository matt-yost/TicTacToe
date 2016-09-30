(function(){

  'use strict';

  // Initially hide playing board
  $('#board').hide();
  $('.screen-win').hide();

  var playerList = $("#board header ul li");
  var activePlayer;
  var playCount = 0;
  var winner = false;

  // Teach computer how to play
  const winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

  // Determine a winner and end of game
  var gameState = [0,0,0,0,0,0,0,0,0];

  // Identify active player
  var getActivePlayer = function(){
    playerList.each(function(){
      if($(this).hasClass("active")){
        activePlayer = $(this);
      }
    });
  };

  $('#start a').click(function(){
    // Hide start screen/win screen and show game borad
    $('#start').hide();
    $('.screen-win').hide();
    $('#board').show();

    // Set player1 to active
    $("#player1").toggleClass('active');
    getActivePlayer()
  });

  // On mouseenter, show X or O according to active player
  $(".box").mouseenter(function(){
    getActivePlayer();
    if (!$(this).hasClass('box-filled-1') && !$(this).hasClass('box-filled-2')){
      if(activePlayer.attr("id") === "player1"){
        $(this).css("background-image", "url(./img/o.svg)");
      } else {
        $(this).css("background-image", "url(./img/x.svg)");
      }
    }
  });

  // On mouseleave remove any background image
  $(".box").mouseleave(function(){
    $(this).css("background-image", "");
  });

  // Remove hover bind and keep players choice on board
  $(".box").click(function(){
    if (!$(this).hasClass('box-filled-1') && !$(this).hasClass('box-filled-2')){
      if(activePlayer.attr("id") === "player1"){
        $(this).addClass("box-filled-1");
        gameState[$(this).index()] = 1;
        playCount++;
      } else if(activePlayer.attr("id") === "player2"){
        $(this).addClass("box-filled-2");
        gameState[$(this).index()] = 2;
        playCount++;
      }
    }

    if(playCount % 2 !== 0){
      $("#player2, #player1").toggleClass("active");
    } else {
      $("#player1, #player2").toggleClass("active");
    }

    $(winningCombos).each(function(){
      if(gameState[$(this)[0]] != 0 && gameState[$(this)[0]] == gameState[$(this)[1]] && gameState[$(this)[1]] == gameState[$(this)[2]]){
        if(activePlayer.attr("id") === "player1"){
          winner = true;
          $("#board").hide();
          $(".screen-win").addClass("screen-win-one");
          $(".screen-win").removeClass("screen-win-two screen-win-tie");
          $(".message").text("Player 1 wins!");
          $(".screen-win").show();
        } else {
          winner = true;
          $("#board").hide();
          $(".screen-win").addClass("screen-win-two");
          $(".screen-win").removeClass("screen-win-one screen-win-tie");
          $(".message").text("Player 2 wins!");
          $(".screen-win").show();
        }
      }

      if(playCount == 9 && winner === false){
        $("#board").hide();
        $(".screen-win").removeClass("screen-win-one screen-win-two")
        $(".screen-win").addClass("screen-win-tie");
        $(".message").text("It's a tie!");
        $(".screen-win").show();
      }
    });
  });

  $("#new-game").click(function(){
    $(".screen-win").hide();
    $("#board").show();

    $(".box").removeClass("box-filled-1 box-filled-2");
    $(".box").css("background-image", "");
    $("#player1").addClass("active");
    $("#player2").removeClass("active")
    getActivePlayer();

    gameState = [0,0,0,0,0,0,0,0,0,];
    playCount = 0;
    winner = false;
  });


// Do not venture past this point
}());
