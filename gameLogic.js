$('#restart').on('click', function () { // restarts the game when player clicks button.
  location.reload();
});
$(document).ready(function() {
  var started = false;
  var rating = 0;
  var numberOfTurns = 0;
  var counter = 0;
  var time = 0;
  var timerStop = false;
  var gameLogic = {
    init: function() {
      gameLogic.shuffleCards();
    },
    shuffleCards: function () { // shuffles the order of the elements inside the canvas div.
      var parent = $("#canvas");
      var divs = parent.children();
      while (divs.length) {
          parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
        }
        gameLogic.click();
      },
    startTimer: function () { // starts the gameTimer.
      setTimeout(function(){
          var secs = Math.floor(time/10);
          document.getElementById('output').innerHTML = "Time taken: " + secs;
          if (timerStop !== true) {
            time++;
            gameLogic.startTimer();
        }
      }, 100);
    },
    turnCounter: function () { // updates the number of turns value in the counter div.
      document.getElementById('counter').innerHTML = "number of turns: " + numberOfTurns;
    },
    stopTimer: function () { // stops the timer.
      timerStop = true;
    },
    click: function () { // toggle's the selected and hidden card on the clicked card, and runs the isMatch() function.
      $('.gameCards').on('click', function() {
        if (started != true) {
          gameLogic.startTimer();
        }
        started = true;
        $(this).toggleClass('selected');
        $(this).toggleClass('hidden');
        gameLogic.isMatch();
      })
    },
    rating: function () { // controls the users rating based on the number of turns used.
      if (numberOfTurns < 19) {
        rating = 3;
        document.getElementById('rating').innerHTML = "Your rating: " + rating;
      }
      if (numberOfTurns > 20 && numberOfTurns < 29) {
        rating = 2;
        console.log('2 stars');
        document.getElementById('rating').innerHTML = "Your rating: " + rating;
      }
      if (numberOfTurns > 30) {
        console.log(rating);
        rating = 1;
        document.getElementById('rating').innerHTML = "Your rating: " + rating;
      }
    },
    isMatch: function () { // compares value of two selected cards, detects when all cards are paired and ends the game.
      if ($('.selected').length == 2) {
        var first = $('.selected').first().html();
        var second = $('.selected').last().html();
        if (first == second) {
          numberOfTurns++;
          counter++;
          $('.selected').each(function() {
            $(this).toggleClass('selected');
            $(this).toggleClass('chosen');
          })
        }
        else {
          numberOfTurns++;
          setTimeout(function () {
            $('.selected').each(function() {
              $(this).toggleClass('hidden');
              $(this).toggleClass('selected');
            })
          }, 400)
        }
        gameLogic.turnCounter();
        gameLogic.rating();
      }
        if (counter == 8) {
          gameLogic.stopTimer();
          var string = 'Well done, you completed the game in ' + Math.floor(time/10) + ' seconds' + ', you took ' + numberOfTurns + ' turns, your rating was ' + rating + " !!!";
          gameLogic.popup(string);
        }
      },
      popup: function (string) { // Makes a modal, which displays game info after user completes the game, also displays a button which restarts the game.
        document.getElementById('message').innerHTML = string;
        var modal = document.getElementById('title_modal');
        var span = document.getElementsByClassName("close")[0];
        modal.style.display = "block";
        span.onclick = function() {
          modal.style.display = "none";
        }
        $('#modal_button').on('click', function () {
          location.reload();
        });
      }
    };
    gameLogic.init() // runs the init function, starting the game.
});
