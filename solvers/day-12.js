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
    zero() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
    isNotAnyZero() {
        return this.x !== 0 && this.y !== 0 && this.z !== 0;
    }
    equals(otherVector) {
        return this.x === otherVector.x && this.y === otherVector.y && this.z === otherVector.z;
    }
    clone() {
        return new Vector3(this.x, this.y, this.z)
    }
    toString() {
        return `x: ${this.x}, y: ${this.y}, z: ${this.z}, `;
    }
}

class Moon {
    constructor(position, velocity) {
        this.position = position;
        this.velocity = velocity;
        this.gravity = new Vector3(0,0,0);
    }
    toString() {
        return `Position: ${this.position.toString()}\nVelocity: ${this.velocity.toString()}\nGravity: ${this.gravity.toString()}`;
    }
    toKey() {
        return `pos:${this.position.toString()}-vel:${this.velocity.toString()}`;
    }
    calculateGravity(moon) {
        this.gravity.x += Math.sign(moon.position.x-this.position.x);
        this.gravity.y += Math.sign(moon.position.y-this.position.y);
        this.gravity.z += Math.sign(moon.position.z-this.position.z);
    }
    move(skipReset) {
        this.velocity.add(this.gravity);
        this.position.add(this.velocity);
        if(!skipReset) {
            this.gravity.zero();
        }
    }
    getTotalEnergy() {
        return this.getPotentialEnergy() * this.getKineticEnergy();
    }
    getPotentialEnergy() {
        return Math.abs(this.position.x)+Math.abs(this.position.y)+Math.abs(this.position.z); 
    }
    getKineticEnergy() {
        return Math.abs(this.velocity.x)+Math.abs(this.velocity.y)+Math.abs(this.velocity.z);
    }
    clone() {
        return new Moon(this.position.clone(), this.velocity.clone());
    }
}

const BodyProblem = {
    debugMotion: false,
    debugFindRepeat: true,
    solvePartOne: (input, steps) => {
        let moons = BodyProblem.inputToMoons(input);
        moons = BodyProblem.simulateMotion(moons, steps);
        const totalEnergy = BodyProblem.getEnergyOfSystem(moons);
        return totalEnergy;
    },
    solvePartTwo: (input, maxSteps) => {
        let moons = BodyProblem.inputToMoons(input);
        stepsForRepeat = BodyProblem.findRepeat(moons, maxSteps);
        return stepsForRepeat;
    },
    inputToMoons: (input) => {
        return input.split('\n')
            .map(item => item.trim().replace(/[xyz=<> ]/g, "").split(",").map(coord => parseInt(coord)))
            .map(position => new Moon(new Vector3(position[0],position[1],position[2]), new Vector3(0,0,0)));
    },
    simulateMotion: (moons, steps) => {
        if(BodyProblem.debugMotion) {
            BodyProblem.printStep(moons, 0);
        }
        for(let step = 1; step <= steps; step++) {
            // Calculate Gravity for each moon
            for(let a = 0; a < moons.length; a++) {
                for(let b = 0; b<moons.length; b++) {
                    if(a === b) { continue; }
                    moons[a].calculateGravity(moons[b]);
                }
            }
            // Apply Gravity for each moon
            for(let a = 0; a < moons.length; a++) {
                moons[a].move(BodyProblem.debugMotion);
            }
            if(BodyProblem.debugMotion) {
                BodyProblem.printStep(moons, step);
                for(let a = 0; a < moons.length; a++) {
                    moons[a].gravity.zero();
                }
            } 
        }
        return moons;
    },
    printStep: (moons, step) => {
        console.log("Step " + step);
        moons.forEach(moon => {
            console.log(moon.toString());
            console.log('---')
        });
    },
    getEnergyOfSystem: (moons) => {
        return moons.reduce((acc, curr) => {
            return acc + curr.getTotalEnergy();
        }, 0);
    },
    findRepeat: (moons, maxSteps) => {
        let cachedMoons = [
            new Vector3(moons[0].position.x,moons[0].position.y,moons[0].position.z,),
            new Vector3(moons[1].position.x,moons[1].position.y,moons[1].position.z,),
            new Vector3(moons[2].position.x,moons[2].position.y,moons[2].position.z,),
            new Vector3(moons[3].position.x,moons[3].position.y,moons[3].position.z,),
        ]

        let zero = new Vector3(0,0,0);
        let atStart = 0;
        let step = 0;

        while(atStart !== 4) {
            step++;
            if(BodyProblem.debugFindRepeat && step % 10000000000 === 0) {
                console.log("Chunk -- " + step);
            }
            atStart = 0;
            // Calculate Gravity for each moon
            for(let a = 0; a < moons.length; a++) {
                for(let b = 0; b<moons.length; b++) {
                    if(a === b) { continue; }
                    moons[a].calculateGravity(moons[b]);
                }
            }

            // Apply Gravity for each moon
            for(let a = 0; a < moons.length; a++) {
                moons[a].move(BodyProblem.debugFindRepeat);
                if(moons[a].position.equals(cachedMoons[a]) && moons[a].velocity.equals(zero)) {
                    atStart++;
                }
                if(BodyProblem.debugFindRepeat) {
                    moons[a].gravity.zero();
                }
            }

        }

        return atStart === 4 ? step : -1;
    },
    // x,y,z
    // Moon1 - Moon4
    lcmSystem: (values) => {
        function gcd(x, y) {
          return !y ? x : gcd(y, x % y);
        }
        function lcm2(x, y) {
          return (x * y) / gcd(x, y);
        }
        let prev = 1;
        for(let idx = 0; idx < values.length; idx++) {
            prev = lcm2(values[idx], prev);
        }
        return prev;
    },
}

module.exports = {BodyProblem, Vector3, Moon};