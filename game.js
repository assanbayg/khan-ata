const DIRECTIONS = [
  'ArrowLeft', 
  'ArrowUp', 
  'ArrowDown', 
  'ArrowRight', 
]
const COLORS = ["red", "orange", "yellow", "green", "blue", "purple"]

let active = null
let score = 0
let number = 0

const board = document.getElementById("board")
const generator = document.getElementById("new-row-generator")
let gif = document.getElementById("gif")
let scoreHeader = document.getElementById("score-header")

const createRow = () => {
  const newRow = board.cloneNode(true)
  const randomArrow = Math.floor(Math.random() * 4)
  const randomColor = Math.floor(Math.random() * 6)
  const outlineColor = COLORS[randomColor]
  newRow.setAttribute("data-active", randomArrow)

  for(let i = 0; i <= 3; i++) {
    if (i === randomArrow) {
      newRow.children[i].style.setProperty("--arrow-outline", outlineColor)
    }
    else {
      newRow.children[i].style.setProperty("--arrow-outline", "transparent")
      newRow.children[i].style.setProperty("--arrow-color", "transparent")
    }
  }
  generator.append(newRow)
  animateRow(newRow)

  timer = setTimeout(() => {
    // No key pressed within the time limit
    newRow.children[randomArrow].style.setProperty("--arrow-outline", "red")
    newRow.children[randomArrow].style.setProperty("--arrow-color", "red")
    score--
    scoreHeader.innerHTML = `Score: ${score}`
  }, 1000)

  setTimeout(() => {
    newRow.remove()
  }, 5000)
}

const animateRow = (row) => {
  const rowTop = row.getBoundingClientRect().top
  const boardTop = board.getBoundingClientRect().top
  const distance = rowTop - boardTop

  setTimeout(() => {
    active = row
  }, distance)

  const options = [{transform: "translateY(-10000px)"}]
  const keyframes = {
    duration: 20000,
    iterations: Infinity,
  }
  row.animate(options, keyframes)
}

let timer;

const handleKeyDown = (e) => {
  clearTimeout(timer);

  const directionIndex = DIRECTIONS.findIndex((direction) => direction === e.key);
  if (!active) return;

  const activeArrow = active.getAttribute("data-active");
  if (directionIndex == activeArrow) {
    // Correct key pressed
    active.children[directionIndex].style.setProperty("--arrow-outline", "lightgreen");
    active.children[directionIndex].style.setProperty("--arrow-color", "lightgreen");
    score++;
    scoreHeader.innerHTML = `Score: ${score}`;
    if (number == 14) {
      number = 0;
    } else {
      number++;
    }
    gif.setAttribute("src", `assets/${number}.gif`);
  } else {
    // Incorrect key pressed
    active.children[directionIndex].style.setProperty("--arrow-outline", "red");
    active.children[directionIndex].style.setProperty("--arrow-color", "red");
    score--;
    scoreHeader.innerHTML = `Score: ${score}`;
  }
}


const startGame = () => {
  document.addEventListener('keydown', handleKeyDown)
  setInterval(() => createRow(), 1000)
}

startGame()