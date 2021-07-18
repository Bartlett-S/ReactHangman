import React from "react";
import Turn0 from "./images/Turn0.png";
import Turn1 from "./images/Turn1.png";
import Turn2 from "./images/Turn2.png";
import Turn3 from "./images/Turn3.png";
import Turn4 from "./images/Turn4.png";
import Turn5 from "./images/Turn5.png";
import Turn6 from "./images/Turn6.png";
import "../App.css";

class Hangman extends React.Component {
  constructor(props) {
    // props = properties
    super(props);
    this.state = {
      imageURL: Turn0,
      word: "~",
      dashedWord: null,
      maxTurns: 6,
      currentTurn: 0,
      guessed: "~",
      guess: "`",
      hideButton: false,
      hideText: true,
      won: false,
      strike: false,
      buttonStyle: null,
    };
  }

  setWord() {
    let wordArray = [
      "ham",
      "potato",
      "lettuce",
      "computer",
      "monitor",
      "feather",
      "bread",
      "shame",
      "serious",
      "similarity",
      "thesis",
      "concrete",
      "nest",
      "incomplete",
      "correction",
      "certain",
      "everything",
      "plan",
      "breathe",
      "bank",
      "thumb",
      "knowledge",
      "inside",
      "colorado",
      "realize",
      "mountain",
      "pine",
      "lake",
      "sunset",
      "dream",
      "longing",
      "desire",
      "escape",
      "joke",
      "profile",
      "investigation",
      "boss",
      "attorney",
      "communication",
      "vehicle",
      "nightmare",
      "knock",
      "police",
      "harassment",
      "queen",
      "drama",
      "risk",
      "mirror",
      "listen",
      "real",
      "never",
      "tribune",
      "culture",
      "isolation",
      "patient",
      "precise",
      "baseball",
      "pitcher",
      "lemonade",
      "photo",
      "myself",
      "radio",
      "unkempt",
      "false",
      "facade",
      "fifty",
      "hiding",
      "iconic",
      "famous",
      "memory",
      "crazy",
    ];
    let randomNum = Math.floor(Math.random() * wordArray.length);
    let randomWord = wordArray[randomNum];
    randomWord = randomWord.toUpperCase();
    return randomWord;
  }

  makeDashedWord() {
    let newDashedWord = "";
    for (let i = 0; i < this.state.word.length; i++) {
      newDashedWord += "-";
    }
    return newDashedWord;
  }

  setDashedWord() {
    let oldDashedWord = this.state.dashedWord;
    let newDashedWord = "";
    for (let i = 0; i < this.state.word.length; i++) {
      if (this.state.guess === this.state.word[i]) {
        newDashedWord += this.state.guess;
      } else {
        newDashedWord += oldDashedWord[i];
      }
    }
    return newDashedWord;
  }

  checkCorrect() {
    let temp = this.state.word;
    let turn = this.state.currentTurn;
    if (temp.search(this.state.guess) !== -1) {
      this.setState({ won: true }, () => {
        this.gameOver();
      });
    } else {
      this.setState({ currentTurn: (turn += 1) }, () => {
        this.getTurnImage();
        this.gameOver();
      });
    }
  }

  playButtonClasses() {
    let classes = "playButton ";
    if (this.state.hideButton) {
      classes += "hidden";
    }
    return classes;
  }

  dashedTextClasses() {
    let classes = "dashedWord hidden";
    if (!this.state.hideText) {
      classes = "dashedWord";
    }
    return classes;
  }

  guessButtonClasses() {
    let classes = "hidden";
    if (this.state.hideButton) {
      classes = "";
    }

    return classes;
  }

  getTurnImage() {
    if (this.state.currentTurn === 0) {
      this.setState({ imageURL: Turn0 });
    } else if (this.state.currentTurn === 1) {
      this.setState({ imageURL: Turn1 });
    } else if (this.state.currentTurn === 2) {
      this.setState({ imageURL: Turn2 });
    } else if (this.state.currentTurn === 3) {
      this.setState({ imageURL: Turn3 });
    } else if (this.state.currentTurn === 4) {
      this.setState({ imageURL: Turn4 });
    } else if (this.state.currentTurn === 5) {
      this.setState({ imageURL: Turn5 });
    } else if (this.state.currentTurn === 6) {
      this.setState({ imageURL: Turn6 });
    }
  }

  alreadyGuessed() {
    if (this.state.guessed.search(this.state.guess) === -1) {
      return false;
    } else {
      return true;
    }
  }

  resetGame() {
    this.setState({ hideButton: false });
    this.setState({ guessed: "~" });
    this.setState({ guess: "~" });
    this.setState({ buttonStyle: "" });
    document.getElementById("A").innerHTML = "A";
    document.getElementById("B").innerHTML = "B";
    document.getElementById("C").innerHTML = "C";
    document.getElementById("D").innerHTML = "D";
    document.getElementById("E").innerHTML = "E";
    document.getElementById("F").innerHTML = "F";
    document.getElementById("G").innerHTML = "G";
    document.getElementById("H").innerHTML = "H";
    document.getElementById("I").innerHTML = "I";
    document.getElementById("J").innerHTML = "J";
    document.getElementById("K").innerHTML = "K";
    document.getElementById("L").innerHTML = "L";
    document.getElementById("M").innerHTML = "M";
    document.getElementById("N").innerHTML = "N";
    document.getElementById("O").innerHTML = "O";
    document.getElementById("P").innerHTML = "P";
    document.getElementById("Q").innerHTML = "Q";
    document.getElementById("R").innerHTML = "R";
    document.getElementById("S").innerHTML = "S";
    document.getElementById("T").innerHTML = "T";
    document.getElementById("U").innerHTML = "U";
    document.getElementById("V").innerHTML = "V";
    document.getElementById("W").innerHTML = "W";
    document.getElementById("X").innerHTML = "X";
    document.getElementById("Y").innerHTML = "Y";
    document.getElementById("Z").innerHTML = "Z";
  }

  gameOver() {
    if (this.state.currentTurn < this.state.maxTurns) {
      if (this.state.dashedWord.search("-") === -1) {
        let winText = `You Win! The word was ${this.state.word}`;
        this.setState({ dashedWord: winText }, () => {
          this.resetGame();
        });
      }
    } else {
      let loseText = `You lose! The word was ${this.state.word}`;
      this.setState({ dashedWord: loseText }, () => {
        this.resetGame();
      });
    }
  }

  handleOnGuess() {
    if (!this.alreadyGuessed()) {
      let newDashedWord = this.setDashedWord();
      let newGuessed = this.state.guessed;
      this.setState({ dashedWord: newDashedWord });
      this.setState({ guessed: (newGuessed += this.state.guess) });
      this.checkCorrect();
      this.getTurnImage();
      document.getElementById(this.state.guess).innerHTML = " ";
    }
  }

  render() {
    return (
      <div className="container">
        <div classname="gameTitle">
          <h>Hangman</h>
        </div>
        <div className="images">
          <img
            src={this.state.imageURL}
            alt="gameImage"
            className="gameImage"
            style={{ width: "50%", height: "50%" }}
          />
        </div>
        <div>
          <button
            className={this.playButtonClasses()}
            onClick={() => {
              this.setState({ hideButton: true });
              this.setState({ hideText: false });
              this.setState({ currentTurn: 0 }, () => {
                this.getTurnImage();
              });
              this.setState({ word: this.setWord() }, () => {
                let newDashedWord = this.makeDashedWord();
                this.setState({ dashedWord: newDashedWord });
              });
            }}
          >
            Play
          </button>
          <h1 classname={this.dashedTextClasses()}>{this.state.dashedWord}</h1>
        </div>
        <div>
          <button
            className={this.guessButtonClasses()}
            id="A"
            onClick={() => {
              this.setState({ guess: "A" }, () => {
                this.handleOnGuess();
              });
            }}
          >
            A
          </button>
          <button
            className={this.guessButtonClasses()}
            id="B"
            onClick={() => {
              this.setState({ guess: "B" }, () => {
                this.handleOnGuess();
              });
            }}
          >
            B
          </button>
          <button
            className={this.guessButtonClasses()}
            id="C"
            onClick={() => {
              this.setState({ guess: "C" }, () => {
                this.handleOnGuess();
              });
            }}
          >
            C
          </button>
          <button
            className={this.guessButtonClasses()}
            id="D"
            onClick={() => {
              this.setState({ guess: "D" }, () => {
                this.handleOnGuess();
              });
            }}
          >
            D
          </button>
          <button
            className={this.guessButtonClasses()}
            id="E"
            onClick={() => {
              this.setState({ guess: "E" }, () => {
                this.handleOnGuess();
              });
            }}
          >
            E
          </button>
          <button
            className={this.guessButtonClasses()}
            id="F"
            onClick={() => {
              this.setState({ guess: "F" }, () => {
                this.handleOnGuess();
              });
            }}
          >
            F
          </button>
          <button
            className={this.guessButtonClasses()}
            id="G"
            onClick={() => {
              this.setState({ guess: "G" }, () => {
                this.handleOnGuess();
              });
            }}
          >
            G
          </button>
          <button
            className={this.guessButtonClasses()}
            id="H"
            onClick={() => {
              this.setState({ guess: "H" }, () => {
                this.handleOnGuess();
              });
            }}
          >
            H
          </button>
          <button
            className={this.guessButtonClasses()}
            id="I"
            onClick={() => {
              this.setState({ guess: "I" }, () => {
                this.handleOnGuess();
              });
            }}
          >
            I
          </button>
          <button
            className={this.guessButtonClasses()}
            id="J"
            onClick={() => {
              this.setState({ guess: "J" }, () => {
                this.handleOnGuess();
              });
            }}
          >
            J
          </button>
          <button
            className={this.guessButtonClasses()}
            id="K"
            onClick={() => {
              this.setState({ guess: "K" }, () => {
                this.handleOnGuess();
              });
            }}
          >
            K
          </button>
          <button
            className={this.guessButtonClasses()}
            id="L"
            onClick={() => {
              this.setState({ guess: "L" }, () => {
                this.handleOnGuess();
              });
            }}
          >
            L
          </button>
          <button
            className={this.guessButtonClasses()}
            id="M"
            onClick={() => {
              this.setState({ guess: "M" }, () => {
                this.handleOnGuess();
              });
            }}
          >
            M
          </button>
        </div>
        <div>
          <button
            className={this.guessButtonClasses()}
            id="N"
            onClick={() => {
              this.setState({ guess: "N" }, () => {
                this.handleOnGuess();
              });
            }}
          >
            N
          </button>
          <button
            className={this.guessButtonClasses()}
            id="O"
            onClick={() => {
              this.setState({ guess: "O" }, () => {
                this.handleOnGuess();
              });
            }}
          >
            O
          </button>
          <button
            className={this.guessButtonClasses()}
            id="P"
            onClick={() => {
              this.setState({ guess: "P" }, () => {
                this.handleOnGuess();
              });
            }}
          >
            P
          </button>
          <button
            className={this.guessButtonClasses()}
            id="Q"
            onClick={() => {
              this.setState({ guess: "Q" }, () => {
                this.handleOnGuess();
              });
            }}
          >
            Q
          </button>
          <button
            className={this.guessButtonClasses()}
            id="R"
            onClick={() => {
              this.setState({ guess: "R" }, () => {
                this.handleOnGuess();
              });
            }}
          >
            R
          </button>
          <button
            className={this.guessButtonClasses()}
            id="S"
            onClick={() => {
              this.setState({ guess: "S" }, () => {
                this.handleOnGuess();
              });
            }}
          >
            S
          </button>
          <button
            className={this.guessButtonClasses()}
            id="T"
            onClick={() => {
              this.setState({ guess: "T" }, () => {
                this.handleOnGuess();
              });
            }}
          >
            T
          </button>
          <button
            className={this.guessButtonClasses()}
            id="U"
            onClick={() => {
              this.setState({ guess: "U" }, () => {
                this.handleOnGuess();
              });
            }}
          >
            U
          </button>
          <button
            className={this.guessButtonClasses()}
            id="V"
            onClick={() => {
              this.setState({ guess: "V" }, () => {
                this.handleOnGuess();
              });
            }}
          >
            V
          </button>
          <button
            className={this.guessButtonClasses()}
            id="W"
            onClick={() => {
              this.setState({ guess: "W" }, () => {
                this.handleOnGuess();
              });
            }}
          >
            W
          </button>
          <button
            className={this.guessButtonClasses()}
            id="X"
            onClick={() => {
              this.setState({ guess: "X" }, () => {
                this.handleOnGuess();
              });
            }}
          >
            X
          </button>
          <button
            className={this.guessButtonClasses()}
            id="Y"
            onClick={() => {
              this.setState({ guess: "Y" }, () => {
                this.handleOnGuess();
              });
            }}
          >
            Y
          </button>
          <button
            className={this.guessButtonClasses()}
            id="Z"
            onClick={() => {
              this.setState({ guess: "Z" }, () => {
                this.handleOnGuess();
              });
            }}
          >
            Z
          </button>
        </div>
      </div>
    );
  }
}

export default Hangman;
