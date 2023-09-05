const Axis = {
    Horizontal: 0,
    Vertical: 1,
    Rotational: 2,
}
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
    equals(otherVector) {
        return this.x === otherVector.x && this.y === otherVector.y && this.z === otherVector.z;
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
    toKey(axis) {
        if(axis === Axis.Horizontal) {
            return `${this.position.x}${this.velocity.x}`;
        } else if(axis === Axis.Vertical) {
            return `${this.position.y}${this.velocity.y}`;
        } else {
            return `${this.position.z}${this.velocity.z}`;
        }
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
    calculateGravityForAxis(moon, axis) {
        if(axis === Axis.Horizontal) {
            this.gravity.x += Math.sign(moon.position.x-this.position.x);
        } else if(axis === Axis.Vertical) {
            this.gravity.y += Math.sign(moon.position.y-this.position.y);
        } else {
            this.gravity.z += Math.sign(moon.position.z-this.position.z);
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
}

const BodyProblem = {
    debugMotion: false,
    debugFindRepeat: false,
    solvePartOne: (input, steps) => {
        let moons = BodyProblem.inputToMoons(input);
        moons = BodyProblem.simulateMotion(moons, steps);
        const totalEnergy = BodyProblem.getEnergyOfSystem(moons);
        return totalEnergy;
    },
    solvePartTwo: (input) => {
        let moons = BodyProblem.inputToMoons(input);
        let stepsForRepeat = BodyProblem.findRepeat(moons);
        return stepsForRepeat;
    },
    inputToMoons: (input) => {
        return input.split('\n')
            .map(item => item.trim().replace(/[xyz=<> ]/g, "").split(",").map(axis => parseInt(axis)))
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
    findRepeat: (moons) => {
        let cachedMoons = [
            new Vector3(moons[0].position.x,moons[0].position.y,moons[0].position.z,),
            new Vector3(moons[1].position.x,moons[1].position.y,moons[1].position.z,),
            new Vector3(moons[2].position.x,moons[2].position.y,moons[2].position.z,),
            new Vector3(moons[3].position.x,moons[3].position.y,moons[3].position.z,),
        ]

        let positions = {};

        let repeatsX, repeatsY, repeatsZ;
        let atStart;
        // Loops for each axis are independent of each other 
        // Also it's quicker to find the steps for repeating for each axis one at a time
        // So for each axis, find the steps to repeat
        // Then find the LCM of the three numbers
        for(let axis = 0; axis < 3; axis++) {
            let repeats = [0,0,0,0];
            let step = 0;
            atStart = 0;
            positions = {};

            for(let i = 0; i < moons.length; i++) {
                if (axis === Axis.Vertical) {
                    moons[i].position.y = cachedMoons[i].y;
                    moons[i].velocity.y = 0;
                } else if(axis === Axis.Rotational) {
                    moons[i].position.z = cachedMoons[i].z;
                    moons[i].velocity.z = 0;
                }
            }
            
            let key = `${moons[0].toKey(axis)}${moons[1].toKey(axis)}${moons[2].toKey(axis)}${moons[3].toKey(axis)}`;
            while(positions[key] === undefined) {
                positions[key] = 1;
                step++;
                // Calculate Gravity for each moon for current axis
                for(let a = 0; a < moons.length; a++) {
                    for(let b = 0; b<moons.length; b++) {
                        if(a === b) { continue; }
                        moons[a].calculateGravityForAxis(moons[b], axis);
                    }
                }
    
                // Apply Gravity for each moon
                for(let a = 0; a < moons.length; a++) {
                    moons[a].move(BodyProblem.debugFindRepeat, axis);
                    if(axis === Axis.Horizontal) {
                        if(moons[a].position.x === cachedMoons[a].x && moons[a].velocity.x === 0 && repeats[a] === 0) {
                            repeats[a] = step;
                        }
                    } else if (axis === Axis.Vertical) {
                        if(moons[a].position.y === cachedMoons[a].y && moons[a].velocity.y === 0 && repeats[a] === 0) {
                            repeats[a] = step;
                        }
                    } else {
                        if(moons[a].position.z === cachedMoons[a].z && moons[a].velocity.z === 0 && repeats[a] === 0) {
                            repeats[a] = step;
                        }
                    }
                    if(BodyProblem.debugFindRepeat) {
                        moons[a].gravity.zero();
                    }
                }
                key = `${moons[0].toKey(axis)}${moons[1].toKey(axis)}${moons[2].toKey(axis)}${moons[3].toKey(axis)}`;
                if(positions[key] !== undefined) {
                    if(axis === Axis.Horizontal) {
                        repeatsX = step;
                    } else if(axis === Axis.Vertical) {
                        repeatsY = step;
                    } else {
                        repeatsZ = step;
                    }
                }
                
            }
        }
        return BodyProblem.lcmSystem([repeatsX, repeatsY, repeatsZ]);
    },
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