import "./style.css";

export class Ship {
  constructor(length) {
    this.length = length;
    this.health = 0;
    this.status = "afloat";
  }

  hit() {
    this.health += 1;
    this.isSunk();
  }

  isSunk() {
    if (this.length === this.health) {
      this.status = "sunk";
    }
  }
}

/* Create a Gameboard class/factory.


Gameboards should be able to place ships at specific coordinates by calling the ship factory or class.


Gameboards should have a receiveAttack function that takes a pair of coordinates, determines
 whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.


Gameboards should keep track of missed attacks so they can display them properly.


Gameboards should be able to report whether or not all of their ships have been sunk. */

export class Gameboard {
  constructor() {
    this.Carrier = new Ship(5);
    this.Battleship = new Ship(4);
    this.Cruiser = new Ship(3);
    this.Submarine = new Ship(3);
    this.Destroyer = new Ship(2);
    this.allShips = [
      this.Carrier,
      this.Battleship,
      this.Cruiser,
      this.Submarine,
      this.Destroyer,
    ];
  }

  receiveAttack(x, y) {
    startGame.addHit(x, y);
    // if(x === && y ===) {
    Ship.hit();
    Ship.isSunk();
    // }
  }
}

/* Create a Player class/factory.


There will be two types of players in the game, ‘real’ players and ‘computer’ players.


Each player object should contain its own gameboard. */

export class Player {
  constructor(type) {
    if (type === "real") {
      this.realBoard = new Gameboard();
    } else if (type === "computer") {
      this.computerBoard = new Gameboard();
    }
  }
}

/* Import your classes/factories into another file, and drive the game 
using event listeners to interact with your objects. Create a module that helps you manage actions that should happen in the DOM.


At this point it is appropriate to begin crafting your User Interface.


Set up a new game by creating Players. For now just populate each player’s Gameboard 
with predetermined coordinates. You are going to implement a system for allowing players to place their ships later.


We’ll leave the HTML implementation up to you for now, but you should display both the player’s boards and render them using 
nformation from the Gameboard class/factory.


You’ll need methods to render each player’s Gameboard, so put them in an appropriate module.


Your event listeners should step through the game turn by turn using only methods from other objects. 
If at any point you are tempted to write a new function, step back and figure out which class or module that function should belong to.


For attacks, let the user click on a coordinate in the enemy Gameboard. Send the user input to methods on your objects, and re-render
 the boards to display the new information.


Players should take turns playing the game by attacking the enemy Gameboard. If you feel the need to keep track of the current 
player’s turn, it’s appropriate to manage that in this module, instead of another mentioned object.


The game is played against the computer, so make the ‘computer’ players capable of making random plays. The computer does not 
have to be smart, but it should know whether or not a given move is legal (i.e. it shouldn’t shoot the same coordinate twice).


Create conditions so that the game ends once one player’s ships have all been sunk. This function is also appropriate for this module. */

const startGame = {
  modal: document.querySelector("dialog"),
  submitButton: document.querySelector(".modalClose"),
  restartButton: document.querySelector(".restart"),
  playerCells: document.querySelectorAll(".a"),
  enemyCells: document.querySelectorAll(".b"),
  cross: '<img src="/cross.svg" alt="hit" class="hit">',

  showModal() {
    if (!localStorage.getItem("enemy")) {
      this.modal.showModal();
    }
  },

  closeModal() {
    this.submitButton.addEventListener("click", () => {
      const selectedRadio = document.querySelector(
        'input[name="enemy"]:checked',
      );
      localStorage.setItem("enemy", selectedRadio.value);
      this.switchTurn("player1")
      this.modal.close();
    });
  },

  restart() {
    localStorage.clear();
    location.reload();
  },

  switchTurn(turnOf){
    switch (turnOf){
        case "player1":
            this.addHit(this.playerCells)
            break;

        case "player2":
            this.addHit(this.enemyCells)
            break;
    }
  },

  addHit(arr) {
    arr.forEach((cell) => {
        if (cell.innerHTML != this.cross){
      cell.addEventListener("click", (e) => {
        cell.innerHTML = this.cross;
        cell.style.pointerEvents = "none";
        this.switchTurn(e.target.classList.contains("a") ? "player2": "player1");
      });
    }
    });
  },
};

window.onload = () => {
  startGame.showModal();
  startGame.closeModal();
  startGame.restartButton.addEventListener("click", startGame.restart);
};
