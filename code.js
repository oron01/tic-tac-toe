let boardContainer = document.querySelector(".boardContainer")

let resetButton = document.querySelector(".resetButton")

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
    gameboard: ["a1","a2","a3","b1","b2","b3","c1","c2","c3"],
    win:false,
    
    lettersToNumbers(letter) {
        return (letter == "a") ? 1 : (letter == "b") ? 2 : 3
    },

    currentTurn: null,
    players: [],
    
    player() {
        let marks = []
        let winStatus = ""
        let score = 0
        return {marks,winStatus,score}
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
        if (this.currentTurn == this.players[0] && this.win == false) {
            player2Icon.classList.add("currentTurn")
            this.currentTurn = this.players[1]}
        else if (this.currentTurn == this.players[1] && this.win == true) {
            player2Icon.classList.add("currentTurn")
        }
        else {
            player1Icon.classList.add("currentTurn")
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
                if (this.win == true) {
                    alert("win!")
                    console.log("win")
                }
                this.endTurn()}

            // console.log(this.gameboard)
            // console.log(this.players[0].marks)
            // console.log(this.players[1].marks)
            // this.playGame()
        }
    }},
    displayWinningMove () {},
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
        player1 = this.player()
        player2 = this.player()
        this.currentTurn = player1
        gameObj.players = []
        gameObj.players.push(player1)
        gameObj.players.push(player2)
        gameObj.renderNewBoard()
        resetBoard()
        this.win = false

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
    player1 = gameObj.player()
    player2 = gameObj.player()
    gameObj.currentTurn = player1
    gameObj.players.push(player1)
    gameObj.players.push(player2)
    gameObj.renderNewBoard()
    // gameObj.playGame()
            
}
}



resetButton.addEventListener("click",gameObj.resetGame.bind(gameObj))

game()