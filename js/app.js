document.addEventListener("DOMContentLoaded", function(){
  var config = {
    apiKey: "AIzaSyB-2C2MIC4ucjyNsIha2sI8VtRFC_Tani8",
    databaseURL: "https://crazy-balloons.firebaseio.com"
  };
  var app = firebase.initializeApp(config);
  window.addEventListener("load", function() {
    document.getElementsByTagName("html")[0].style.height = "200%";
    setTimeout(function() {
      window.scrollTo(0, 1);
      }, 0);
  });

  var menuContainer = document.getElementsByClassName('menuContainer')[0];
  var panel =  document.getElementsByClassName('panelInfo')[0];
  var container = document.getElementsByClassName('container')[0];
  var counter = document.getElementsByClassName('counter')[0].getElementsByTagName('span')[0];
  var gameOverBtns = document.getElementsByClassName('gameOverBtns')[0];
  var gameOver = document.getElementById('gameOver');
  var highscoreScreen = document.getElementsByClassName('highscoreScreen')[0];
  var tip = document.getElementById('tip');
  var interval1 = null;
  var interval3 = null;
  var scores = null;

  function addEventBtns(){
    var highscoreBtn = document.getElementById('highscore');
    var start = document.getElementById('start');
    var exitGame = document.getElementsByClassName('exit')[0];
    var playAgain = document.getElementsByClassName('again')[0];
    var backBtn = document.getElementsByClassName('back')[0];

    start.addEventListener('click', startGame);
    playAgain.addEventListener('click', startGame);
    exitGame.addEventListener('click', main);
    highscoreBtn.addEventListener('click', showHighscore);
    backBtn.addEventListener('click', function(){
      menuContainer.classList.add("show");
      highscoreScreen.classList.remove("show");
    });
  }

  function main(){
    menuContainer.classList.add("show");
    gameOverBtns.classList.remove("show");
    gameOver.classList.remove("show");
    dom.bind(document, "touchmove", function(event) {
      event.preventDefault();
      });
  }

  function showHighscore(){
    highscoreScreen.classList.add("show");
    menuContainer.classList.remove("show");
    highscore();
  }

  function saveNewResult(){
    var playerName = document.getElementById('inputName').value;

    if (playerName.length > 12){
      tip.innerText = "Maximum 12 characters!"
    }
    else {
      tip.style.color = "green";
      tip.innerText = "Saved!";
      this.removeEventListener('click', saveNewResult);
      highscore("add");
    }
  }

  function startGame(){
    var ball = document.getElementsByClassName('ball');
    var clock = document.getElementById('time');

    var timerText = document.getElementsByClassName('timer')[0];
    var counterText = document.getElementsByClassName('counter')[0];
    var loader = document.getElementsByClassName('spinner')[0];
    var loaderCounter = document.getElementById('loaderNumber');
    var spinnerContainer = document.getElementsByClassName('spinnerContainer')[0];
    var saveBtn = document.getElementsByClassName('saveResult')[0];

    saveBtn.addEventListener('click', saveNewResult);
    clock.innerText = "30";
    counter.innerText = "0";
    loaderCounter.innerText = "3";

    panel.classList.add("show");
    spinnerContainer.classList.add("show");
    container.classList.add("containerGame");
    menuContainer.classList.remove("show");
    gameOverBtns.classList.remove("show");
    gameOver.classList.remove("show");
    tip.innerText = "";
    tip.style.color = "red";

    //count to three
    setTimeout(function(){
      interval1 = setInterval(timer, 1000);
    }, 3000);
    var countSound = document.getElementsByTagName("audio")[0];
    countSound.play();
    var interval2 = setInterval(countToThree, 1000);
    interval3 = setInterval(createBalloons, 4000);

    function countToThree(){
      loaderCounter.innerText = Number(loaderCounter.innerText) - 1;
      if (loaderCounter.innerText == 0){
        loaderCounter.innerText = "START";
        setTimeout(function(){
          spinnerContainer.classList.remove("show");
          window.clearInterval(interval2);
        }, 1000);
      }
    }

    var CreateNewBalloon = function(ballSide, ballSize, ballRandX, ballRandY, ballMove, ballColor){
      this.side = ballSide;
      this.size = ballSize;
      this.randX = ballRandX;
      this.randY = ballRandY;
      this.move = ballMove;
      this.color = ballColor
    }

    CreateNewBalloon.prototype.ballMoveDown = function(thisBall){
      thisBall.style.backgroundColor = "rgb(0," + this.color + ",0)";
      thisBall.style.top = "-10%";
      thisBall.style.left = this.randX;
      thisBall.classList.add("animation-" + this.move + "-top");
    }

    CreateNewBalloon.prototype.ballMoveLeft = function(thisBall){
      thisBall.style.backgroundColor = "rgb(" + this.color + ", 0, 0)";
      thisBall.style.left = "110%";
      thisBall.style.top = this.randY;
      thisBall.classList.add("animation-" + this.move + "-right");
    }

    CreateNewBalloon.prototype.ballMoveUp = function(thisBall){
      thisBall.style.backgroundColor = "rgb(0, 0," + this.color + ")";
      thisBall.style.top = "110%";
      thisBall.style.left = this.randX;
      thisBall.classList.add("animation-" + this.move + "-bottom");
    }

    CreateNewBalloon.prototype.ballMoveRight = function(thisBall){
      thisBall.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
      thisBall.style.left = "-10%";
      thisBall.style.top = this.randY;
      thisBall.classList.add("animation-" + this.move + "-left");
    }

    CreateNewBalloon.prototype.appendToPage = function(thisBall){
      container.appendChild(thisBall);
      thisBall.addEventListener("animationend", this.deleteBall, false);
      thisBall.addEventListener("click", this.hide);
    }

    CreateNewBalloon.prototype.hide = function(event){
      var popSound = document.getElementsByTagName("audio")[1];
      popSound.play();
      this.parentNode.removeChild(this);
      counter.innerText = Number(counter.innerText) + Number(this.dataset.value);
    }

    CreateNewBalloon.prototype.deleteBall = function(event){
      this.parentNode.removeChild(this);
    }

    function createBalloons(){
      var randomSide = Math.floor((Math.random() * 4) + 1);

      for (var i = 0; i < 10; i++){
        var randomSize = Math.floor((Math.random() * 90) + 50) + "px";
        var randomPositionX = Math.floor((Math.random() * 95) + 5) + "%";
        var randomPositionY = Math.floor((Math.random() * 95) + 5) + "%";
        var randomMove = Math.floor((Math.random() * 4) + 1);

        var newBall = document.createElement("div");
        newBall.classList.add("ball");

        var max = 255;
        var min = 100;
        var color = Math.floor(Math.random() * (max - min + 1)) + min;

        var ballObj = new CreateNewBalloon(randomSide, randomSize, randomPositionX, randomPositionY, randomMove, color);

        newBall.style.width = ballObj.size;
        newBall.style.height = ballObj.size;
        newBall.dataset.value = ballObj.move;

        switch(randomSide){
          case 1:
            ballObj.ballMoveDown(newBall);
            break;
          case 2:
            ballObj.ballMoveLeft(newBall);
            break;
          case 3:
            ballObj.ballMoveUp(newBall);
            break;
          case 4:
            ballObj.ballMoveRight(newBall);
            break;
        }
        ballObj.appendToPage(newBall);
      }
    }

    function timer(){
      var clock = document.getElementById('time');
      clock.innerText = Number(clock.innerText) - 1;
      if (clock.innerText < 1){
        var result = document.getElementById("result");

        clearInterval(interval1);
        clearInterval(interval3);

        while (ball.length > 0){
          ball[0].parentNode.removeChild(ball[0]);
        }

        panel.classList.remove("show");
        result.innerText = counter.innerText;
        container.classList.remove("containerGame");
        gameOverBtns.classList.add("show");
        gameOver.classList.add("show");
      }
    }
  }

  function getHighScore(){
    var results = app.database().ref();

    results.on("value", function(data) {
      scores = data.val();
    }, function (error) {
      console.log("Error: " + error.code);
    });
  }

  function highscore(method){
    var arrKeys = [];
    var arrValues = [];
    var finalName = document.getElementById("inputName").value;
    var finalResult = document.getElementById("result").innerText;
    finalResult = parseInt(finalResult);

    for(var key in scores){
      arrKeys.push(key);
      arrValues.push(scores[key]);
    }

    arrKeys.reverse();
    arrValues.reverse();

    if (method === "add" && typeof finalResult === 'number' && finalResult < 200 && finalName === document.getElementById("inputName").value){
      var results = app.database().ref();
      var finalObj = {};
      arrKeys.push(finalResult);
      arrKeys.sort(function(a, b){return b-a});

      var realIndex = arrKeys.indexOf(finalResult);
      arrValues.splice(realIndex, 0, finalName);
      for (var i = 0; i < 10; i++){
        if (finalObj[arrKeys[i]] == null){
          finalObj[arrKeys[i]] = arrValues[i];
        }
        else {
          finalObj[arrKeys[i]-1] = arrValues[i];
        }
      }
      results.set(finalObj);
      return true;
    }

    var namesList = document.getElementById("highscoreNames");
    var scoresList = document.getElementById("highscoreResults");

    while (namesList.firstChild) {
      namesList.removeChild(namesList.firstChild);
    }
    while (scoresList.firstChild) {
      scoresList.removeChild(scoresList.firstChild);
    }

    for (var i = 0; i < 10; i++){
      var newName = document.createElement("li");
      var newScore = document.createElement("li");

      newScore.innerText = arrKeys[i];
      newScore.classList.add("highscoreItems");
      newName.innerText = i+1 + ". " + arrValues[i];
      newName.classList.add("highscoreItems");

      scoresList.appendChild(newScore);
      namesList.appendChild(newName);
    }
  }

  addEventBtns();
  getHighScore();
  main();
});
