const DIRECTIONS = [
  'ArrowLeft', 
  'ArrowUp', 
  'ArrowDown', 
  'ArrowRight', 
]

let active = null

const board = document.getElementById("board")
const generator = document.getElementById("new-row-generator")

const createRow = () => {
  const newRow = board.cloneNode(true)
  const randomGenerator = Math.floor(Math.random() * 4)

  newRow.setAttribute("data-active", randomGenerator)

  for(let i = 0; i <= 3; i++) {
    if (i === randomGenerator) {
      newRow.children[i].style.setProperty("--arrow-outline", "blue")
    }
    else {
      newRow.children[i].style.setProperty("--arrow-outline", "transparent")
      newRow.children[i].style.setProperty("--arrow-color", "transparent")
    }
  }
  generator.append(newRow)
  animateRow(newRow)

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
  }, distance - 150)

  const options = [{transform: "translateY(-10000px)"}]
  const keyframes = {
    duration: 10000,
    iterations: Infinity,
  }
  row.animate(options, keyframes)
}

const handleKeyDown = (event) => {
  const activeArrow = active.getAttribute("data-active")
  const pressedKey = DIRECTIONS.findIndex((direction) => direction == event.key)
  // const pressedKey = event.key
  console.log(activeArrow, pressedKey)

  if (pressedKey == activeArrow) {
    console.log("YESS")
  }
  else {
    console.log("miss")
  }
  console.log(event.key)
}

const startGame = () => {
  document.addEventListener('keydown', handleKeyDown)
  setInterval(() => {
    createRow()}, 1000)
}

startGame()