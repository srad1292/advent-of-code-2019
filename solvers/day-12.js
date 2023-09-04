class Vector3 {
    constructor(x,y,z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    add(otherVector) {
        this.x += otherVector.x;
        this.y += otherVector.y;
        this.z += otherVector.z;
    }
    toString() {
        return `x: ${this.x}, y: ${this.y}, z: ${this.z}, `;
    }
}

class Moon {
    constructor(position, velocity) {
        this.position = position;
        this.velocity = velocity;
    }
    toString() {
        return `Position: ${this.position.toString()}\nVelocity: ${this.velocity.toString()}`;
    }
}

const BodyProblem = {
    solvePartOne: (input) => {
        const moonPositions = BodyProblem.parseInput(input);
        const moons = moonPositions.map(position => new Moon(new Vector3(position[0],position[1],position[2]), new Vector3(0,0,0)));
        moons.forEach(moon => {
            console.log(moon.toString());
            console.log('---')
        });
    },
    parseInput: (input) => {
        return input.split('\n').map(item => item.trim().replace(/[xyz=<> ]/g, "").split(",").map(coord => parseInt(coord)));
    }
}

module.exports = BodyProblem;