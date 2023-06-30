//names of keys
const DIRECTIONS = [
  'ArrowLeft',
  'ArrowUp',
  'ArrowDown',
  'ArrowRight',
]
const COLORS = ["red", "orange", "yellow", "darkgreen", "blue", "purple"]

let active = null // activated key
let score = 0
let image_number = 0
let audio_number = 0
let strike = 0
let CONST_ID

let backgroundAudio = new Audio(`./assets/audio/main.mp3`)

const board = document.getElementById("board")
const generator = document.getElementById("new-row-generator")
let gif = document.getElementById("gif")
let scoreHeader = document.getElementById("score-header")

const createRow = () => {
  const newRow = board.cloneNode(true)
  const randomArrow = Math.floor(Math.random() * 4) // random number which would be under 3 (0, 1, 3, 4)
  const randomColor = Math.floor(Math.random() * 6) //random color from 6 possible
  const outlineColor = COLORS[randomColor]
  newRow.setAttribute("data-active", randomArrow)

  // we create new row, but only randomly chosen would be visible
  for (let i = 0; i <= 3; i++) {
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

  //timer to check if arrow was missed
  missTimer = setTimeout(() => {
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
  //just moving arrows up
  const options = [{ transform: "translateY(-10000px)" }]
  const keyframes = {
    duration: 20000,
    iterations: Infinity,
  }
  row.animate(options, keyframes)
}

let missTimer

let audioPlaying = false
let incorrectAudioPlaying = false
let audio
//play audio on pressed key
const playAudio = (src) => {
  if (audioPlaying) return

  audioPlaying = true
  audio = new Audio(src)

  audio.addEventListener('ended', () => {
    audioPlaying = false
  })

  audio.play()
}

const playBackground = () => {
  backgroundAudio = new Audio(`./assets/audio/main.mp3`)
  backgroundAudio.play()
}

// play fail audio
const playIncorrectAudio = () => {

  incorrectAudioPlaying = true
  const src = `./assets/audio/fail.mp3`
  stopAudio(); // Stop any currently playing audio
  playAudio(src)

  audio.addEventListener('ended', () => {
    incorrectAudioPlaying = false
  })
}

// stop audio
const stopAudio = () => {
  if (audioPlaying && audio) {
    audio.pause()
    audioPlaying = false
  }
}

const handleKeyDown = (e) => {
  clearTimeout(missTimer)

  const directionIndex = DIRECTIONS.findIndex((direction) => direction === e.key)
  if (!active) return

  const activeArrow = active.getAttribute("data-active")
  if (directionIndex == activeArrow) {
    // if correct key pressed
    active.children[directionIndex].style.setProperty("--arrow-outline", "lightgreen")
    active.children[directionIndex].style.setProperty("--arrow-color", "lightgreen")
    score++
    scoreHeader.innerHTML = `Score: ${score}`
    image_number == 14 ? image_number = 0 : image_number++
    audio_number == 7 ? audio_number = 0 : audio_number++
    playAudio(`./assets/audio/${audio_number}.mp3`)
    gif.setAttribute("src", `assets/image/${image_number}.gif`)
  } else {
    // if incorrect key was pressed
    stopAudio()
    active.children[directionIndex].style.setProperty("--arrow-outline", "red")
    active.children[directionIndex].style.setProperty("--arrow-color", "red")
    score--
    scoreHeader.innerHTML = `Score: ${score}`
    playIncorrectAudio()
    gif.setAttribute("src", "assets/image/breathing.gif")
  }
}


const startGame = () => {
  var sound = document.createElement('audio');
  sound.id = 'audio-player';
  sound.src = './assets/audio/main.mp3';
  sound.autoplay = true;
  document.getElementById("body_main").appendChild(sound)
  document.addEventListener('keydown', handleKeyDown)
  CONST_ID = setInterval(() => createRow(), 1000)
}

const endGame = () => {
  clearInterval(refreshIntervalId);
}

const start_button = document.getElementById("start_button")
start_button.addEventListener('click', () => {
  document.getElementById("popup").classList.add('hide_popup');
  startGame()
})