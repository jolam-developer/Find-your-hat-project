const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

// const field1 = [
//   ["*", "░", "O"],
//   ["░", "O", "░"],
//   ["░", "^", "░"],
// ];

// console.log(field1.length)
class field {
    constructor(fieldArray) {
        this.field = fieldArray;
        this.X = 0;
        this.Y = 0;
        this.field[0][0] = pathCharacter;
    }
    print() {
        for (let i = 0; i < this.field.length; i++) {
            console.log(this.field[i].join(""));
        }
    }
    askQuestion() {
        const answer = prompt("Which way? ").toUpperCase();
        switch (answer) {
            case "U":
                this.Y -= 1;
                break;
            case "D":
                this.Y += 1;
                break;
            case "L":
                this.X -= 1;
                break;
            case "R":
                this.X += 1;
                break;
            default:
                console.log("Wrong Way.");
                this.askQuestion();
                break;
        }
    }
    runGame() {
        let playing = true;
        while (playing) {
            this.print();
            this.askQuestion();
            if (!this.isInBounds()) {
                console.log("Out of bounds instruction!");
                playing = false;
                break;
            } else if (this.isHole()) {
                console.log("Sorry, you fell down a hole!");
                playing = false;
                break;
            } else if (this.isHat()) {
                console.log("Congrats, you found your hat!");
                playing = false;
                break;
            }
            // Update the current location on the map
            this.field[this.Y][this.X] = pathCharacter;
        }
    }

    // plz create a isInBounds() method
    //
    isInBounds() {
        if (
            this.X >= 0 &&
            this.Y >= 0 &&
            this.X < this.field.length &&
            this.Y < this.field.length
        ) {
            return true;
        } else {
            return false;
        }
    }

    //
    //
    isHole() {
        if (this.field[this.Y][this.X] === hole) {
            return true;
        } else {
            return false;
        }
    }

    // plz create a isHat() method
    isHat() {
        if (this.field[this.Y][this.X] === hat) {
            return true;
        } else {
            return false;
        }
    }
    static generateField(height, width, percentage = 0.2) {
        const field = new Array(height).fill(0).map((el) => new Array(width));
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const per = Math.random();
                field[y][x] = per > percentage ? fieldCharacter : hole;
            }
        }

        const hatLoc = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)
        }
        field[hatLoc.x][hatLoc.y] = hat;
        return field;



    }
}
const newfield = field.generateField(10, 10);
const myField = new field(newfield);
myField.runGame();