'use strict';

/* ---  MAIN SCREEN CODE --- 

// Selecting elements
const start = document.querySelector('#title-starter-page');
const startButton = start.querySelector('a');

// Variables
let ex = 10;
let intervalId = 0;

// Animation function
function swing(element) {
  function update(time) {
    const x = Math.sin(time / 1231) * ex;
    const y = Math.sin(time / 1458) * ex;

    element.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;

    requestAnimationFrame(update);
  }

  update(0);
}

// Invoking the animation function
swing(start);

// Event listeners
start.addEventListener('mouseover', () => {
  ex = 20;
  intervalId = setInterval(() => {
    startButton.style.color = 'pink';
  }, 250);
});

start.addEventListener('mouseout', () => {
  ex = 10;
  clearInterval(intervalId);
  startButton.style.color = 'white';
});

 ---  MAIN SCREEN CODE --- 

 ---  CODE AFTER MAIN SCREEN --- 
const hideStarterPage = document.getElementById('title-starter-page');
const bodyBackground = document.querySelector('body');

hideStarterPage.addEventListener('click', function(){
    hideStarterPage.classList.add('hidden');
    bodyBackground.style.backgroundImage = "url('imgs/background.png')";
    
});
*/
