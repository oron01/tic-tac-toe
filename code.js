const gameObj = {
    gameboard: ["a1","a2","a3","b1","b2","b3","c1","c2","c3"],
    
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
        this.gameboard.forEach((tile) => {
            if (tile == move) {this.gameboard.splice(i,1)
            playerMoving.marks.push(move)}
            i++
        })
    },

    evaluateGameStatus(player) {
        let verts = [0,0,0]
        let horizontals = [0,0,0]
        for (let i=0;i < player.marks.length;i++) {
        verts[player.marks[i][1]] += 1
        horizontals[this.lettersToNumbers(player.marks[i])] += 1    
    }
    },
    endTurn() {
        if (this.currentTurn == this.players[0]) {this.currentTurn = this.players[1]}
        else {this.currentTurn = this.players[0]}

    },
    playGame() {
        let move = prompt("obama")
        if (move == "break") {return}
        else {
        this.makeNewMove(this.currentTurn,move)
        if (this.evaluateGameStatus(this.currentTurn) == undefined) {
            this.endTurn()
            this.playGame()
        }
    }},
    displayWinningMove () {},
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
    gameObj.playGame()
            
}
}

game()