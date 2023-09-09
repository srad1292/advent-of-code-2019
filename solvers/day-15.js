class IntCode {
    addOP = 1;
    multOP = 2;
    saveOP = 3;
    outputOP = 4;
    jumpIfTrueOP = 5;
    jumpIfFalseOP = 6;
    lessThanOP = 7;
    equalsOP = 8;
    relBaseOP = 9;
    endOP = 99;
    posMode = 0;
    imdMode = 1;
    relMode = 2;
    maxParams = 2;
    constructor(debugIntCode, state, input, instructionPointer, inputIndex, pauseOnOutput, relativeBase) {
        this.state = [...state];
        this.input = input;
        this.instructionPointer = instructionPointer;
        this.inputIndex = inputIndex;
        this.pauseOnOutput = pauseOnOutput;
        this.relativeBase = relativeBase;
        this.debugIntCode = debugIntCode;
    }
    updateValues(instance) {
        this.state = [...instance.state];
        this.instructionPointer = instance.instructionPointer;
        this.relativeBase = instance.relativeBase;
    }
    getCurrentInstance() {
        return {
            state: this.state,
            instructionPointer: this.instructionPointer,
            relativeBase: this.relativeBase
        }
    }
    run(input) {
        this.input = [...input];
        let currentIndex = this.instructionPointer;
        let statusOK = true;
        let op = 0;
        let opAndParams = [];
        let valueA = 0;
        let valueB = 0;
        let storeValue = 0;
        let destination = 0;
        let output = [];
        let halted = false;
        let getRWResult = {};

        try {
            while(statusOK && this.instructionPointer !== undefined && currentIndex < this.state.length) {
                opAndParams = this.opcodeToList(this.state[currentIndex]);
                op = opAndParams[0];
                if(this.debugIntCode) {
                    this.printOp(opAndParams, currentIndex);
                }
                if(op === this.endOP) {
                    halted = true;
                    break;
                } else if(op === this.addOP || op === this.multOP || op === this.equalsOP || op === this.lessThanOP) {
                    getRWResult = this.getReadParamValue(this.state, currentIndex, this.relativeBase, 1, opAndParams);
                    this.state = getRWResult.state;
                    valueA = getRWResult.value;

                    getRWResult = this.getReadParamValue(this.state, currentIndex, this.relativeBase, 2, opAndParams);
                    this.state = getRWResult.state;
                    valueB = getRWResult.value;


                    getRWResult = this.getWriteParamValue(this.state, currentIndex, this.relativeBase, 3, opAndParams);
                    this.state = getRWResult.state;
                    destination = getRWResult.value;


                    if(op === this.addOP) {
                        storeValue = valueA+valueB;
                    } else if(op === this.multOP) {
                        storeValue = valueA*valueB;
                    } else if(op === this.equalsOP) {
                        storeValue = valueA === valueB ? 1 : 0;
                    } else if(op === this.lessThanOP) {
                        storeValue = valueA < valueB ? 1 : 0;
                    }
                    this.state[destination] = storeValue;
                    currentIndex+=4;

                } else if(op === this.saveOP) {
                    
                    getRWResult = this.getWriteParamValue(this.state, currentIndex, this.relativeBase, 1, opAndParams);
                    this.state = getRWResult.state;
                    destination = getRWResult.value;
                    
                    if(this.debugIntCode) {
                        console.log(`Saving ${this.input[this.inputIndex]} into location ${destination}`);
                    }
                    this.state[destination] = this.input[this.inputIndex];
                    if(this.inputIndex<this.input.length-1) {
                        this.inputIndex++;
                    }
                    currentIndex+=2;
                } else if(op === this.outputOP) {
                    getRWResult = this.getReadParamValue(this.state, currentIndex, this.relativeBase, 1, opAndParams);
                    this.state = getRWResult.state;
                    valueA = getRWResult.value;

                    output.push(valueA);
                    currentIndex+=2;
                    if(this.pauseOnOutput) { break };
                } else if(op === this.jumpIfTrueOP || op === this.jumpIfFalseOP) { 
                    getRWResult = this.getReadParamValue(this.state, currentIndex, this.relativeBase, 1, opAndParams);
                    this.state = getRWResult.state;
                    valueA = getRWResult.value;

                    getRWResult = this.getReadParamValue(this.state, currentIndex, this.relativeBase, 2, opAndParams);
                    this.state = getRWResult.state;
                    destination = getRWResult.value;

                    let shouldJump = (op===this.jumpIfTrueOP&&valueA!==0) || (op===this.jumpIfFalseOP&&valueA===0);
                    currentIndex = shouldJump ? destination : currentIndex+3;
                    if(this.debugIntCode) {
                        console.log(`Checking against value ${valueA} -- Should jump ${shouldJump} -- Moving to ${currentIndex}`);
                    }

                } else if(op === this.relBaseOP) {
                    getRWResult = this.getReadParamValue(this.state, currentIndex, this.relativeBase, 1, opAndParams);
                    this.state = getRWResult.state;
                    valueA = getRWResult.value;
                    
                    this.relativeBase += valueA;
                    currentIndex+=2;
                } else {
                    break;
                }
            }
            return {state:this.state, output, halted, instructionPointer: currentIndex, inputIndex: this.inputIndex, relativeBase: this.relativeBase};
        } catch(e) {
            console.log("Error while creating alarm program state");
            console.log(e);
            console.log({state: this.state, output, halted, instructionPointer: currentIndex});
            return {state:this.state, output, halted, instructionPointer: currentIndex, inputIndex: this.inputIndex, relativeBase: this.relativeBase};
        }
    }
    printOp(opAndParams, currentIndex) {
        let op = this.opToName(opAndParams[0]);
        console.log(`Instruction ${currentIndex}: ${op}`);
    }
    opToName(op) {
        if(op === this.addOP) {
            return 'Add';
        } else if(op === this.multOP) {
            return 'Multiply';
        } else if(op === this.saveOP) {
            return 'Save';
        } else if(op === this.outputOP) {
            return 'Output';
        } else if(op === this.jumpIfTrueOP) {
            return 'Jump If True';
        } else if(op === this.jumpIfFalseOP) {
            return 'Jump If False';
        } else if(op === this.lessThanOP) {
            return 'Less Than';
        }  else if(op === this.equalsOP) {
            return 'Equals';
        } else if(op === this.relBaseOP) {
            return 'Change Relative Base';
        } else if(op === this.endOP) {
            return 'Halt';
        }

        return 'Unknown OP';
    }
    expandMemory(state, idx) {
        let end = idx-(state.length-1);
        for(let addIdx = 0; addIdx < end; addIdx++) { 
            state.push(0);
        }
        return state;
    }
    getReadParamValue(state, currentIndex, relativeBase, paramNum, opAndParams) {
        let offset = opAndParams[paramNum] == this.relMode ? relativeBase : 0;
        let targetIndex = opAndParams[paramNum] == this.imdMode ? currentIndex+paramNum : state[currentIndex+paramNum]+offset;
        if(targetIndex >= state.length) {
            state = this.expandMemory(state, targetIndex);
        }
        return {state, value: state[targetIndex]};
    }
    getWriteParamValue(state, currentIndex, relativeBase, paramNum, opAndParams) {
        let offset = opAndParams[paramNum] == this.relMode ? relativeBase : 0;
        let targetIndex = opAndParams[paramNum] == this.relMode ?  state[currentIndex+paramNum]+offset : state[currentIndex+paramNum];
        if(targetIndex >= state.length) {
            state = this.expandMemory(state, targetIndex);
        }
        return {state, value: targetIndex};
    }
    opcodeToList(opcode) {
        let result = [];
        // Get two digit operation
        let op = (opcode%10)+(Math.floor(opcode/10)%10*10);
        result.push(op);
        // Get parameter mode
        opcode = Math.floor(opcode/100);
        while(opcode > 0) {
            result.push(opcode%10);
            opcode = Math.floor(opcode/10);
        }
        // In the case all param modes are given, these will not be seen and thus don't matter if they are there
        // In the case all param modes are not given, this will allow us to get them without worrying about accessing out of bounds index
        for(let idx = 0; idx < this.maxParams; idx++) {
            result.push(0);
        }

        return result;
    }
}

const Tile = {
    Unknown: '?',
    Path: '.',
    Wall: '|',
    TopBotWall: '-',
    Target: 'X',
    Oxygen: 'O',
    OutOfBound: ' ',
    Robot: 'R',
}

const Direction = {
    North: 1,
    South: 2,
    West: 3,
    East: 4,
}

const Status = {
    Blocked: 0,
    Moved: 1,
    FoundTarget: 2
}

class Vector2 {
    constructor(vertical, horizontal) {
        this.vertical = vertical;
        this.horizontal = horizontal;
    }
    toString() {
        return `${this.vertical}-${this.horizontal}`;
    }
}

class Robot {
    constructor(vertical, horizontal, state, debugBrain) {
        this.brain = new IntCode(debugBrain, [...state], [0,0], 0, 0, true, 0);
        this.position = new Vector2(vertical, horizontal);
        this.directions = [Direction.North, Direction.South, Direction.West, Direction.East];
        this.calls = 0;
        this.minCoords = new Vector2(0,0);
        this.maxCoords = new Vector2(0,0);
        this.oxygenSystem = new Vector2(0,0);
    }
    buildGridToFindOxygenSystem() {
        // I can't just stop when I find the system
        // There could be a shorter path that hasn't been found
        // I need to think about how to make sure I've seen every location there is to see
        // Maybe for each spot, go to each direction
        // If each direction has been seen, just return
        // That would mean that by the time I return, everything has been seen?
        let grid = {};
        grid[this.position.toString()] = Tile.Path;
        // console.log("Starting out");
        // console.log(grid);
        return this.checkNeighbors(grid, this.position);
    }
    checkNeighbors(grid, position) {
        this.calls++;
        let positionToCheck, positionKey, snapshot; 
        let copy = this.brain.getCurrentInstance();
        this.directions.forEach(direction => { 
            positionToCheck = this.moveOne(position,direction);
            positionKey = positionToCheck.toString();
            if(grid[positionKey] === undefined) {
                // console.log("positionKey: " + positionKey + " Direction: " + direction + " Calls: " + this.calls);
                this.minCoords.horizontal = Math.min(this.minCoords.horizontal, positionToCheck.horizontal);
                this.minCoords.vertical = Math.min(this.minCoords.vertical, positionToCheck.vertical);
                this.maxCoords.horizontal = Math.max(this.maxCoords.horizontal, positionToCheck.horizontal);
                this.maxCoords.vertical = Math.max(this.maxCoords.vertical, positionToCheck.vertical);

                this.brain.updateValues(copy);
                snapshot = this.brain.run([direction, direction]);
                if(snapshot.output[0] === Status.Blocked) {
                    grid[positionKey] = Tile.Wall;
                } else if(snapshot.output[0] === Status.Moved) {
                    grid[positionKey] = Tile.Path;
                    grid = this.checkNeighbors(grid, positionToCheck);
                } else if(snapshot.output[0] === Status.FoundTarget) {
                    grid[positionKey] = Tile.Target;
                    this.oxygenSystem = new Vector2(positionToCheck.vertical, positionToCheck.horizontal);
                    grid = this.checkNeighbors(grid, positionToCheck);
                } 
            }
        });
        return grid;        
    }
    moveOne(position,direction) {
        let newPosition = new Vector2(position.vertical, position.horizontal);
        if(direction === Direction.North) {
            newPosition.vertical--;
        } else if(direction === Direction.South) {
            newPosition.vertical++;
        } else if(direction === Direction.West) {
            newPosition.horizontal--;
        } else if(direction === Direction.East) {
            newPosition.horizontal++;
        }
        return newPosition;
    }
    findShortestDistanceToTarget(grid, path, position, steps, currentShortest,directionMoved) {
        let positionToCheck, positionKey;
        let shortestFromHere = currentShortest;
        let wouldBeMovingBackwards;
        this.directions.forEach(direction => {
            wouldBeMovingBackwards = directionMoved !== undefined && directionMoved === Direction.North && direction === Direction.South ||
                directionMoved === Direction.South && direction === Direction.North ||
                directionMoved === Direction.West && direction === Direction.East || 
                directionMoved === Direction.East && direction === Direction.West;
            if(wouldBeMovingBackwards) {
                return;
            }
            positionToCheck = this.moveOne(position,direction);
            positionKey = positionToCheck.toString();
            if(grid[positionKey] === Tile.Path) {
                shortestFromHere = this.findShortestDistanceToTarget(grid, [...path, positionKey], positionToCheck, steps+1, shortestFromHere,direction);
            } else if(grid[positionKey] === Tile.Target) {
                shortestFromHere = Math.min(shortestFromHere, steps+1);
            }
        });
        return Math.min(shortestFromHere, currentShortest);
    }
}

const OxygenSystem = {
    debugPart1: false,
    debugPart2: false,
    debugIntCode: false,

    solvePartOne: (state) => {
        let robot = new Robot(0,0,state,OxygenSystem.debugIntCode);
        let grid = robot.buildGridToFindOxygenSystem();
        // OxygenSystem.printGrid(grid, robot.minCoords, robot.maxCoords);
        let shortestDistance = robot.findShortestDistanceToTarget(grid, [], new Vector2(0,0),0,Number.MAX_SAFE_INTEGER,undefined);
        return shortestDistance;
    },
    solvePartTwo: (state) => {
        let robot = new Robot(0,0,state,OxygenSystem.debugIntCode);
        let grid = robot.buildGridToFindOxygenSystem();
        // OxygenSystem.printGrid(grid, robot.minCoords, robot.maxCoords);
        let minutes = OxygenSystem.fillWithOxygen(grid, robot);
        return minutes;
    },
    fillWithOxygen: (grid, robot) => {
        let robotOrOxygen = [robot.oxygenSystem];
        let nextRun = [];
        let position;
        let neighbor;
        let minutes = 0;
        let directions = [Direction.North,Direction.South,Direction.West,Direction.East]
        while(robotOrOxygen.length > 0) {    
            while(robotOrOxygen.length > 0) {
                position = robotOrOxygen.shift();
                directions.forEach(direction => {
                    neighbor = OxygenSystem.moveOne(position,direction);
                    if(grid[neighbor.toString()] === Tile.Path) {
                        nextRun.push(neighbor);
                        grid[neighbor.toString()] = Tile.Oxygen;
                    }
                });
            }
            if(nextRun.length > 0) {
                minutes++;
            }
            robotOrOxygen = [...nextRun];
            nextRun = [];
        }
        return minutes;
    },
    printGrid(grid, min, max) {
        for(let v = min.vertical; v <= max.vertical; v++) {
            let line = '';
            for(let h = min.horizontal; h <= max.horizontal; h++) {
                if (h === 0 && v === 0) {
                    line = `${line}${Tile.Robot}`;
                }
                else if(grid[`${v}-${h}`] === undefined) {
                    line = `${line}${Tile.OutOfBound}`;
                } else if((v === max.vertical || v === min.vertical) && grid[`${v}-${h}`] === Tile.Wall) {
                    line = `${line}${Tile.TopBotWall}`;
                }
                else {
                    line = `${line}${grid[`${v}-${h}`]}`;
                }
            }   
            console.log(line);         
        }
    },
    moveOne(position,direction) {
        let newPosition = new Vector2(position.vertical, position.horizontal);
        if(direction === Direction.North) {
            newPosition.vertical--;
        } else if(direction === Direction.South) {
            newPosition.vertical++;
        } else if(direction === Direction.West) {
            newPosition.horizontal--;
        } else if(direction === Direction.East) {
            newPosition.horizontal++;
        }
        return newPosition;
    }

};

module.exports = OxygenSystem;