let game = document.getElementById("game")

let ctx = game.getContext("2d")

let x = game.width / 2
let y = game.height / 2

let ballRadius = 20
let dy = -1.2

let level = 1

document.getElementById("player").innerText = prompt("Your name")


function randomLetter() {
    let alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    return alphabets[Math.floor(Math.random() * alphabets.length)]
}

let letter = randomLetter()

function drawball() {
    ctx.clearRect(0, 0, game.width, game.height)

    ctx.beginPath()

    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)

    ctx.fillStyle = "blue"

    ctx.fill()

    ctx.closePath()

    ctx.font = "30px Arial"

    ctx.fillStyle = "white"

    ctx.fillText(letter, x - 10, y + 10)
}

function update() {

    ctx.clearRect(0, 0, game.width, game.height)

    y += dy * level

    level += 0.001

    drawball()

    gameOver()
}

document.addEventListener("keydown", function (event) {
    let keyPressed = event.key.toUpperCase()

    console.log({ letter, keyPressed })

    if (keyPressed === letter) {
        dy = -dy

        let score = document.getElementById("score")
        score.innerText = parseInt(score.innerText) + 1

        // if(parseInt(score.innerText) === 10){
        //     level += 1
        // }

        letter = randomLetter()
    } else {

        level += 0.005
    }
})


let rep


document.getElementById("start").addEventListener(
    "click",
    function () {

        if (document.getElementById("start").innerText === "Start") {

            document.getElementById("start").innerText = "Pause"

            rep = setInterval(update, 1000 / 100)

        }else{
            document.getElementById("start").innerText = "Start"
            clearInterval(rep)
        }


    }
)


function gameOver() {
    if (y + ballRadius > game.height) {

        clearInterval(rep)

        swal({
            title: "Game Over",
            text: "You failed and you are bad at this. Do you want another chance?",
            icon: "error",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    dy = -dy
                    rep = setInterval(update, 1000 / 100)

                } else {
                    swal("Quitter", "Bye you are bad at this anyway", "error");
                }
            });
    }

    if (y + ballRadius < 0) {
        clearInterval(rep)

        swal({
            title: "Game Over",
            text: "You failed and you are bad at this. Do you want another chance?",
            icon: "error",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    dy = -dy
                    rep = setInterval(update, 1000 / 100)

                } else {
                    swal("Quitter", "Bye you are bad at this anyway", "error");
                }
            });
    }
}