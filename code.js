let boardContainer = document.querySelector(".boardContainer")

let resetButton = document.querySelector(".resetButton")
let startButton = document.querySelector(".startButton")
let gameStatusDisplay = document.querySelector(".gameStatus")

let squareClick = (event) => {
    gameObj.playGame(event.currentTarget.id)
}

for (i=0;i < 9 ; i++) {
    let squareList = ["a1","a2","a3","b1","b2","b3","c1","c2","c3"]
    let square = document.createElement("div")
    square.classList.add("square")
    square.id = squareList[i]
    boardContainer.appendChild(square)
    square.addEventListener("click",squareClick)
}

const gameObj = {
    names: ["player1","player2"],
    gameboard: ["a1","a2","a3","b1","b2","b3","c1","c2","c3"],
    win:false,
    
    lettersToNumbers(letter) {
        return (letter == "a") ? 1 : (letter == "b") ? 2 : 3
    },

    currentTurn: null,
    players: [],
    
    player(playerName) {
        let marks = []
        let winStatus = ""
        let score = 0
        let name = playerName
        return {marks,winStatus,score,name}
    },

    renderNewBoard() {
        this.gameboard = ["a1","a2","a3","b1","b2","b3","c1","c2","c3"]},
    
    makeNewMove(playerMoving,move) {
        i = 0
        let illegal = true
        this.gameboard.forEach((tile) => {
            if (tile == move) {this.gameboard.splice(i,1)
            playerMoving.marks.push(move)
            illegal = false}
            i++
        })
        // alert(illegal)
        return illegal
    },

    evaluateGameStatus(player) {
        let verts = [0,0,0]
        let horizontals = [0,0,0]
        for (let i=0;i < player.marks.length;i++) {
        verts[player.marks[i][1] -1] += 1
        horizontals[this.lettersToNumbers(player.marks[i][0]) -1] += 1    
        console.table(verts)
        console.table(horizontals)
        verts.forEach(stat => {
            if (stat == 3) {gameObj.win = true}
        });
        horizontals.forEach(stat => {
            if (stat == 3) {gameObj.win = true}
        })
    }
        // alert(JSON.stringify(verts))
        let checkMarked = (square) => {
            if (player.marks.includes(square)) {return true}
            else {return false}
        }
        if (checkMarked("b2") && ((checkMarked("a1") && checkMarked("c3")) || (checkMarked("a3") && checkMarked("c1")))) {gameObj.win = true}
    },
    endTurn() {
        let player1Icon = document.querySelector(".player1")
        let player2Icon = document.querySelector(".player2")
        player1Icon.classList.remove("currentTurn")
        player2Icon.classList.remove("currentTurn")
        player1Icon.classList.remove("winner")
        player2Icon.classList.remove("winner")
        if (this.currentTurn == this.players[0] && this.win == false) {
            player2Icon.classList.add("currentTurn")
            this.currentTurn = this.players[1]}
        else if (this.currentTurn == this.players[1] && this.win == true) {
            player2Icon.classList.add("winner")
        }
        else if (this.win == false) {
            player1Icon.classList.add("currentTurn")
            this.currentTurn = this.players[0]}
        else {
            player1Icon.classList.add("winner")
            this.currentTurn = this.players[0]}
        },

    markMove(move,player) {
        let square = document.querySelector(`#${move}`)
        if (player == this.players[0]) {square.classList.add("markedSquare")}
        else {square.classList.add("markedCircle")}
    },
    playGame(move) {
        // let move = prompt("Your move:")
        if (this.win == true) {return}
        if (move == "break") {return}
        else {
        let illegal = this.makeNewMove(this.currentTurn,move)
        if (this.evaluateGameStatus(this.currentTurn) == undefined) {
            if (illegal == false) {
                this.markMove(move,this.currentTurn)
                if (this.win == true) {this.currentTurn.score += 1
                    this.displayScore()
                    alert("win!")
                    console.log("win")
                    console.log(this.currentTurn)
                    gameStatusDisplay.innerText = `${this.currentTurn.name} win!`
                }
                this.endTurn()}

            // console.log(this.gameboard)
            // console.log(this.players[0].marks)
            // console.log(this.players[1].marks)
            // this.playGame()
        }
    }},
    displayWinningMove () {},
    startNewGame() {
        let player1Icon = document.querySelector(".player1")
        let player2Icon = document.querySelector(".player2")
        gameObj.renderNewBoard()
        for (let i = 0; i < this.gameboard.length; i++) {
            let allSquares = document.querySelectorAll(".square")
        allSquares.forEach(square => {square.className = "square"})}
        player1.marks = []
        player2.marks = []
        if (this.win == true) {
        this.win = false}
        gameStatusDisplay.innerText = "Player 1's Turn"
        this.endTurn()
        this.displayScore()

    },
    displayScore () {
        let player1Score = document.querySelector(`.player1Stats`)
        let player2Score = document.querySelector(`.player2Stats`)
        player1Score.innerText = `${this.names[0]}\n Wins: ${player1.score}`
        player2Score.innerText = `${this.names[1]}\n Wins: ${player2.score}`

    },
    resetGame() {
        let resetBoard = () => {
            for (let i = 0; i < this.gameboard.length; i++) {
                let allSquares = document.querySelectorAll(".square")
                allSquares.forEach(square => {
                    if (this.gameboard.includes(square.id)) {
                        // console.table(square)
                        square.className = "square"}
                });

            }
            console.table(this.gameboard)
        }
        player1 = this.player(this.names[0] || "player1")
        player2 = this.player(this.names[1] || "player2")
        this.currentTurn = player1
        this.endTurn()
        this.win = false
        this.currentTurn = player2
        this.endTurn()
        this.currentTurn = player1
        gameObj.players = []
        gameObj.players.push(player1)
        gameObj.players.push(player2)
        gameObj.renderNewBoard()
        resetBoard()
        this.win = false
        this.displayScore()

    },
    /* render a board
    have player one take a square
    evaluate a win condition
    have player two take a square
    evaluate win condition 
     */
}
function game() {
    if (gameObj.players.length == 0) {
    player1 = gameObj.player("Player1")
    player2 = gameObj.player("Player2")
    gameObj.currentTurn = player1
    gameObj.players.push(player1)
    gameObj.players.push(player2)
    gameObj.renderNewBoard()
    // gameObj.playGame()
            
}
}



resetButton.addEventListener("click",gameObj.resetGame.bind(gameObj))
startButton.addEventListener("click",gameObj.startNewGame.bind(gameObj))

player1 = document.querySelector(".player1")
player2 = document.querySelector(".player2")

function changePlayerName(position) {
    let newName = prompt("What is your Name?")
    gameObj.names[position] = newName
    alert("a")
    gameObj.displayScore()

}
/* VERY IMPORTANT, figure out why this isn't working here */
console.log(gameObj.names)
player1.addEventListener("click",changePlayerName.bind(gameObj,0))
player2.addEventListener("click",changePlayerName.bind(gameObj,1))

game()