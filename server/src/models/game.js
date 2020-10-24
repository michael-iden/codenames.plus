// Codenames Game
import readline from "readline";
import fs from "fs";
import Card from "./card.js"

export default class Game {
  constructor(name){
    this.room = name
    this.password = "pass"
    this.winner = '' 
    this.words = basewords

    this.players = {}
    this.initBoard()

    this.red = this.findType('red')   // keeps track of unflipped red tiles
    this.blue = this.findType('blue') // keeps track of unflipped blue tiles
  }

  // Check the number of unflipped team tiles and determine if someone won
  checkWin(){
    this.red = this.findType('red')   // unflipped red tiles
    this.blue = this.findType('blue') // unflipped blue tiles
    // Check team winner
    if (this.red === 0) {
      this.over = true
      this.winner = 'red'
    }
    if (this.blue === 0) {
      this.over = true
      this.winner = 'blue'
    }
  }

  // When called, will change a tiles state to flipped
  flipTile(i,j){
    if (!this.board[i][j].flipped){
      let type = this.board[i][j].type // Find the type of tile (red/blue/neutral/death)
      this.board[i][j].flipped = true  // Flip tile
      if (type === 'death') { // If death was flipped, end the game and find winner
        this.over = true
        if(this.turn === 'blue') this.winner = 'red'
        else this.winner = 'blue'
      }
      else if (type === 'neutral') this.switchTurn() // Switch turn if neutral was flipped
      else if (type !== this.turn) this.switchTurn() // Switch turn if opposite teams tile was flipped
      this.checkWin() // See if the game is over
    }
  }

  // Find the count of the passed tile type
  findType(type){
    let count = 0
    for (let i = 0; i < 5; i++){
      for (let j = 0; j < 5; j++){
        if (this.board[i][j].type === type && !this.board[i][j].flipped) count++
      }
    }
    return count
  }

  // Reset the timer and swap the turn over to the other team
  switchTurn(){
    this.timer = this.timerAmount               // Reset timer
    if (this.turn === 'blue') this.turn = 'red' // Swith turn
    else this.turn = 'blue'
  }

  // 50% red turn, 50% blue turn
  randomTurn(){
    this.turn = 'blue'
    if (Math.random() < 0.5) this.turn = 'red'
  }

  // Find a random number between 0-24
  // Convert that number to a coordinate on a 5x5 grid (0-4)(0-4)
  // Return an object with the random number and the coordinates
  randomTile(){
    let num = Math.floor(Math.random() * 25)
    let i = Math.floor(num / 5)
    let j = num % 5
    return {num, i, j}
  }

  // Create a new 5x5 board of random words
  initBoard(){
    this.createBoard();
    this.assignBoardColors()
    
    this.red = this.findType('red') // Update the number of each teams words
    this.blue = this.findType('blue')
  }

  createBoard() {
    this.board = new Array();  // Init the board to be a 2d array
    for (let i = 0; i < 5; i++) {this.board[i] = new Array()}
    let usedWords = [] // Keep track of used words
    let foundWord      // Temp var for a word out of the list

    for (let i = 0; i < 5; i++){
      for (let j = 0; j < 5; j++){
        foundWord = this.words[Math.floor(Math.random() * this.words.length)] // Pick a random word from the pool
        // If the word is already on the board, pick another
        while (usedWords.includes(foundWord)){  
          foundWord = this.words[Math.floor(Math.random() * this.words.length)]
        }
        usedWords.push(foundWord) // Add the word to the used list
        this.board[i][j] = new Card(foundWord)
      }
    }
  }

  // Randomly assigns a death tile and red / blue tiles
  assignBoardColors(){
    let changed = []             
    let tile = this.randomTile()
    this.board[tile.i][tile.j].type = 'death'
    changed.push(tile.num)

    let color = this.turn;
    for (let i = 0; i < 17; i++){
      tile = this.randomTile()
      while (changed.includes(tile.num)) tile = this.randomTile()
      this.board[tile.i][tile.j].type = i 
      changed.push(tile.num)
      color = (color === 'blue') ? 'red' : 'blue';
    }
  }
}

const basewords = [];
loadWords(basewords);

function loadWords(words) {
  // Load base words into an array
  var filename = "./codewords/words.txt";
  readline
    .createInterface({
      input: fs.createReadStream(filename),
      terminal: false,
    })
    .on("line", (line) => {
      words.push(line);
    });
}