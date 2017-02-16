document.addEventListener("DOMContentLoaded", function(){

  function startGame(){
    document.getElementsByTagName('h1')[0].style.display = "block";
    document.getElementById('start').style.display = "block";

    document.getElementById('gameOver').style.display = "none";
    document.getElementsByClassName('exit')[0].style.display = "none";
    document.getElementsByClassName('again')[0].style.display = "none";

    var start = document.getElementById('start');
    start.addEventListener('click', main);
  }

  function main(){
    var ball = document.getElementsByClassName('ball');
    var container = document.getElementsByClassName('container')[0];
    var title = document.getElementsByTagName('h1')[0];
    var startButton = document.getElementById('start');
    var counter = document.getElementsByClassName('counter')[0].getElementsByTagName('span')[0];
    var clock = document.getElementById('time');

    var timerText = document.getElementsByClassName('timer')[0];
    var counterText = document.getElementsByClassName('counter')[0];
    var loader = document.getElementsByClassName('spinner')[0];
    var loaderCounter = document.getElementById('loaderNumber');

    clock.innerText = "30";
    counter.innerText = "0";
    loaderCounter.innerText = "3";
    timerText.style.display = "block";
    counterText.style.display = "block";
    loader.style.display = "block";
    loaderCounter.style.display = "block";
    container.style.backgroundImage = "url(images/white.jpg)";
    title.style.display = "none";
    startButton.style.display = "none";
    document.getElementById('gameOver').style.display = "none";
    document.getElementsByClassName('exit')[0].style.display = "none";
    document.getElementsByClassName('again')[0].style.display = "none";

    setTimeout(function(){ setInterval(timer, 1000); }, 3000);
    setInterval(countToThree, 1000);
    setInterval(createBalloons, 4000);

    function countToThree(){
      loaderCounter.innerText = Number(loaderCounter.innerText) - 1;
      if (loaderCounter.innerText == 0){
        loaderCounter.innerText = "START";
        setTimeout(function(){
          loaderCounter.style.display = "none";
          loader.style.display = "none";
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
          newBall.style.top = "-100px";
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
          newBall.style.left = "1100px";
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
          newBall.style.top = "800px";
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
          newBall.style.left = "-100px";
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
        var exitGame = document.getElementsByClassName('exit')[0];
        var playAgain = document.getElementsByClassName('again')[0];
        var gameOver = document.getElementById('gameOver');
        var result = document.getElementById("result");

        for (var i = 1; i < 99999; i++)
          window.clearInterval(i);

        while (ball.length > 0){
          ball[0].parentNode.removeChild(ball[0]);
        }

        counterText.style.display = "none";
        timerText.style.display = "none";
        result.innerText = counter.innerText;
        container.style.backgroundImage = "url(images/balloon.jpg)";
        playAgain.style.display = "block";
        exitGame.style.display = "block";
        gameOver.style.display = "block";
        playAgain.addEventListener('click', main);
        exitGame.addEventListener('click', startGame);
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
  startGame()
});
