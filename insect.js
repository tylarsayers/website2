const screens = document.querySelectorAll('.screen')
const choose_insect_btn = document.querySelectorAll('.choose-insect-btn')
const game_container = document.getElementById('game-container')
const start_btn = document.getElementById('start-btn')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')
let seconds = 0
let score = 0
let selected_insect = {}

start_btn.addEventListener('click', () => {
    screens[0].classList.add('up')
})

choose_insect_btn.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const alt = img.getAttribute('alt')
        const src = img.getAttribute('src')
        screens[1].classList.add('up')
        selected_insect = {src, alt}
        setTimeout(createInsect, 1000)
        startGame()
    })
})


function startGame() {
    setInterval(increaseTime, 1000)
}



function createInsect() {
    const insect = document.createElement('div')
    insect.classList.add('insect')
    const { x, y } = getRandomLocation()
    insect.style.top = `${y}px`
    insect.style.left = `${x}px`
    insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`

    insect.addEventListener('click', catchInsect)

    game_container.appendChild(insect)
}

function catchInsect() {
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addInsects()
}

function addInsects() {
    setTimeout(createInsect, 1000)
    setTimeout(createInsect, 1500)
}

function increaseScore() {
    score++
    if (score > 19) {
        message.classList.add('visible')

    }
    if (score >= 60)
    {
        message.classList.remove('visible')

    }
    scoreEl.innerHTML = `Score: ${score}`
}

function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    if (m < 10) {
        m = `0${m}`
    }
    if (s < 10) {
        s = `0${s}`
    }
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++
    if (score >= 60 && seconds < 30) {
        message2.classList.add('visible')
    }
    if (score < 60 && seconds > 30) {
        message3.classList.add('visible')
    }
}

function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}
