document.addEventListener("DOMContentLoaded", function(){
  var config = {
    apiKey: "AIzaSyB-2C2MIC4ucjyNsIha2sI8VtRFC_Tani8",
    databaseURL: "https://crazy-balloons.firebaseio.com"
  };
  var app = firebase.initializeApp(config);

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

    setTimeout(function(){
      interval1 = setInterval(timer, 1000);
    }, 3000);
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

        newBall.style.width = randomSize;
        newBall.style.height = randomSize;

        if (randomSide == 1){
          newBall.style.backgroundColor = "rgb(0," + color + ",0)";
          newBall.style.top = "-10%";
          newBall.style.left = randomPositionX;

          if (randomMove == 1){
            newBall.classList.add("animation-1-top");
            newBall.dataset.value = 1;
          }
          else if (randomMove == 2){
            newBall.classList.add("animation-2-top");
            newBall.dataset.value = 3;
          }
          else if (randomMove == 3){
            newBall.classList.add("animation-3-top");
            newBall.dataset.value = 2;
          }
          else if (randomMove == 4){
            newBall.classList.add("animation-4-top");
            newBall.dataset.value = 4;
          }
        }
        else if (randomSide == 2){
          newBall.style.backgroundColor = "rgb(" + color + ", 0, 0)";
          newBall.style.left = "110%";
          newBall.style.top = randomPositionY;

          if (randomMove == 1){
            newBall.classList.add("animation-1-right");
            newBall.dataset.value = 1;
          }
          else if (randomMove == 2){
            newBall.classList.add("animation-2-right");
            newBall.dataset.value = 3;
          }
          else if (randomMove == 3){
            newBall.classList.add("animation-3-right");
            newBall.dataset.value = 2;
          }
          else if (randomMove == 4){
            newBall.classList.add("animation-4-right");
            newBall.dataset.value = 4;
          }
        }
        else if (randomSide == 3){
          newBall.style.backgroundColor = "rgb(0, 0," + color + ")";
          newBall.style.top = "110%";
          newBall.style.left = randomPositionX;

          if (randomMove == 1){
            newBall.classList.add("animation-1-bottom");
            newBall.dataset.value = 1;
          }
          else if (randomMove == 2){
            newBall.classList.add("animation-2-bottom");
            newBall.dataset.value = 3;
          }
          else if (randomMove == 3){
            newBall.classList.add("animation-3-bottom");
            newBall.dataset.value = 2;
          }
          else if (randomMove == 4){
            newBall.classList.add("animation-4-bottom");
            newBall.dataset.value = 4;
          }
        }
        else if (randomSide == 4){
          newBall.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
          newBall.style.left = "-10%";
          newBall.style.top = randomPositionY;

          if (randomMove == 1){
            newBall.classList.add("animation-1-left");
            newBall.dataset.value = 1;
          }
          else if (randomMove == 2){
            newBall.classList.add("animation-2-left");
            newBall.dataset.value = 3;
          }
          else if (randomMove == 3){
            newBall.classList.add("animation-3-left");
            newBall.dataset.value = 2;
          }
          else if (randomMove == 4){
            newBall.classList.add("animation-4-left");
            newBall.dataset.value = 4;
          }
        }

        container.appendChild(newBall);
      }
      for (var i = 0; i < document.getElementsByClassName('ball').length; i++){
        document.getElementsByClassName('ball')[i].addEventListener("click", hide);
        document.getElementsByClassName('ball')[i].addEventListener("animationend", deleteBall, false);
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
    function deleteBall(){
      this.parentNode.removeChild(this);
    }

    function hide(){
      this.parentNode.removeChild(this);
      counter.innerText = Number(counter.innerText) + Number(this.dataset.value);
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

    for(var key in scores){
      arrKeys.push(key);
      arrValues.push(scores[key]);
    }

    arrKeys.reverse();
    arrValues.reverse();

    if (method === "add"){
      var results = app.database().ref();
      var finalObj = {};
      var finalName = document.getElementById("inputName").value;
      var finalResult = document.getElementById("result").innerText;
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
