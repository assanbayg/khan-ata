const board = document.getElementById("board")
const generator = document.getElementById("new-row-generator")

const createRow = () => {
  const newRow = board.cloneNode(true)
  const randomGenerator = Math.floor(Math.random() * 4)
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
}

const animateRow = (row) => {
  const options = [{transform: "translateY(-2000px)"}]
  const keyframes = {
    duration: 2500,
    iterations: Infinity,
  }
  row.animate(options, keyframes)
}

const startGame = () => {
  setInterval(() => {
    createRow()}, 1000)
}

startGame()