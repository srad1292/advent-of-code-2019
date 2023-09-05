const Tile = {
    Empty: 0,
    Wall: 1,
    Block: 2,
    HorPaddle: 3,
    Ball: 4
}

const OutputType = {
    XPos: 0,
    YPos: 1,
    TileId: 2,
    UpdateScore: 3,
}

const VerticalDirection = {
    Stationary: 0,
    Up: -1,
    Down: 1,
}

const HorizontalDirection = {
    Stationary: 0,
    Left: -1,
    Right: 1,
}

class Ball {
    constructor(position) {
        this.lastPosition = [position[1], position[0]];
        this.position = [position[1], position[0]];
        this.vertical = VerticalDirection.Stationary;
        this.horizontal = HorizontalDirection.Stationary;
    }
    update(newPos) {
        this.lastPosition = [...this.position];
        this.position = [newPos[1], newPos[0]];
        if(this.position[0] !== this.lastPosition[0]) {
            this.vertical = Math.sign(this.position[0]-this.lastPosition[0]);
        }
        if(this.position[1] !== this.lastPosition[1]) {
            this.horizontal = Math.sign(this.position[1]-this.lastPosition[1]);
        }
    }

}

class Paddle {
    constructor(position){
        this.position = [position[1], position[0]];
    }
    update(newPos) {
        this.position = [newPos[1], newPos[0]];
    }
}

const CarePackage = {
    addOP: 1,
    multOP: 2,
    saveOP: 3,
    outputOP: 4,
    jumpIfTrueOP: 5,
    jumpIfFalseOP: 6,
    lessThanOP: 7,
    equalsOP: 8,
    relBaseOP: 9,
    endOP: 99,
    posMode: 0,
    imdMode: 1,
    relMode: 2,
    maxParams: 2,

    debugPart1: false,
    debugPart2: false,
    debugIntCode: false,

    solvePartOne: (state) => {
        // key = row-col  val = {tileType: Tile}
        let position = [0,0];
        let grid = {};
        grid[`${position[0]}-${position[1]}`] = {tileType: Tile.Empty};
        let outType = OutputType.XPos;
        let halted = false;

        let arcade = {
            state: [...state],
            instructionPointer: 0,
            output: -1,
            input: 0,
            phase: 0,
            inputIndex: 0,
            relativeBase: 0
        };

        let blockCount = 0;
        let output;

        while(!halted) {
            output = CarePackage.intCode(arcade.state, [arcade.input, arcade.input], arcade.instructionPointer, arcade.inputIndex, true, arcade.relativeBase);
            arcade.state = [...output.state];
            arcade.instructionPointer = output.instructionPointer;
            arcade.relativeBase = output.relativeBase;
            if(output.output.length > 0) {
                arcade.output = output.output[0];
            }
            arcade.inputIndex = output.inputIndex;

            halted = output.halted;

            if(!halted) {
                if(outType === OutputType.XPos) {
                    position[0] = arcade.output;
                    outType++;
                } else if(outType === OutputType.YPos) {
                    position[1] = arcade.output;
                    outType++;
                } else {
                    if(grid[`${position[0]}-${position[1]}`] === undefined) {
                        grid[`${position[0]}-${position[1]}`] = {tileType: Tile.Empty};           
                    } 
                    if(grid[`${position[0]}-${position[1]}`].tileType === Tile.Block && arcade.output !== Tile.Block) {
                        blockCount = Math.max(0, blockCount-1);           
                    } else if(grid[`${position[0]}-${position[1]}`].tileType !== Tile.Block && arcade.output === Tile.Block) {
                        blockCount++;
                    }
                    grid[`${position[0]}-${position[1]}`].tileType = arcade.output;
                    outType = OutputType.XPos;
                }
            }
        }
        return blockCount;
    },
    solvePartTwo: (state) => {
        // key = row-col  val = {tileType: Tile}
        let position = [0,0];
        let grid = {};
        grid[`${position[0]}-${position[1]}`] = {tileType: Tile.Empty};
        let outType = OutputType.XPos;
        let halted = false;

        let minX = 0;
        let maxX = 0;
        let minY = 0;
        let maxY = 0;

        let ball = undefined;
        let paddle = undefined;

        let arcade = {
            state: [...state],
            instructionPointer: 0,
            output: -1,
            input: 0,
            phase: 0,
            inputIndex: 0,
            relativeBase: 0
        };

        let blockCount = 0;
        let score = 0;
        let output;
        let draws = 0;

        let drawsBeforePlaying = 924;

        while(!halted) {
            
            if(ball !== undefined && paddle !== undefined && draws >= drawsBeforePlaying) {
                arcade.input = Math.sign(CarePackage.determineJoystickInput(grid, paddle, ball));
                arcade.phase = arcade.input;
                if(CarePackage.debugPart2 && outType === OutputType.TileId && outType === OutputType.TileId) {
                    CarePackage.printBoard(score, grid, minX, maxX, minY, maxY);
                }
            }
            
            output = CarePackage.intCode(arcade.state, [arcade.input, arcade.input], arcade.instructionPointer, arcade.inputIndex, true, arcade.relativeBase);
            arcade.state = [...output.state];
            arcade.instructionPointer = output.instructionPointer;
            arcade.relativeBase = output.relativeBase;
            if(output.output.length > 0) {
                arcade.output = output.output[0];
            }
            arcade.inputIndex = output.inputIndex;

            halted = output.halted;

            if(!halted) {
                if(outType === OutputType.XPos) {
                    position[0] = arcade.output;
                    outType++;
                } else if(outType === OutputType.YPos) {
                    position[1] = arcade.output;
                    outType = position[0] === -1 && position[1] === 0 ? OutputType.UpdateScore : OutputType.TileId;
                } else if(outType === OutputType.TileId) {
                    maxX = Math.max(position[1], maxX);
                    minX = Math.min(position[1], minX);
                    maxY = Math.max(position[0], maxY);
                    minY = Math.min(position[0], minY);

                    draws++;
                    
                    if(grid[`${position[0]}-${position[1]}`] === undefined) {
                        grid[`${position[0]}-${position[1]}`] = {tileType: Tile.Empty};           
                    } 
                    if(grid[`${position[0]}-${position[1]}`].tileType === Tile.Block && arcade.output !== Tile.Block) {
                        blockCount = Math.max(0, blockCount-1);           
                    } else if(grid[`${position[0]}-${position[1]}`].tileType !== Tile.Block && arcade.output === Tile.Block) {
                        blockCount++;
                    }

                    if(ball === undefined && arcade.output === Tile.Ball) {
                        ball = new Ball(position);
                    } else if(ball !== undefined && arcade.output === Tile.Ball) {
                        ball.update(position);
                    }

                    if(paddle === undefined && arcade.output === Tile.HorPaddle) {
                        paddle = new Paddle(position);
                    } else if(paddle !== undefined && arcade.output === Tile.HorPaddle) {
                        paddle.update(position);
                    }

                    grid[`${position[0]}-${position[1]}`].tileType = arcade.output;
                    outType = OutputType.XPos;
                } else {
                    score = arcade.output;
                    outType = OutputType.XPos;
                }
            }
        }

        if(CarePackage.debugPart2) {
            console.log("Final Board");
            CarePackage.printBoard(score, grid, minX, maxX, minY, maxY);
        }
        

        return score;
    },
    printBoard: (score, grid, minX, maxX, minY, maxY) => {
        for(let col = minX; col <= maxX; col++) {
            let line = "";
            for(let row = minY; row <= maxY; row++) {
                if(grid[`${row}-${col}`] === undefined || grid[`${row}-${col}`].tileType === Tile.Empty) {
                    line = `${line} `;
                } else if(grid[`${row}-${col}`].tileType === Tile.Block){
                    line = `${line}X`;
                }  else if(grid[`${row}-${col}`].tileType === Tile.Ball){
                    line = `${line}O`;
                }  else if(grid[`${row}-${col}`].tileType === Tile.HorPaddle){
                    line = `${line}_`;
                }  else if(grid[`${row}-${col}`].tileType === Tile.Wall){
                    line = `${line}|`;
                }
            }
            console.log(line);
        }
        console.log("Score: " + score + "\n\n");
    },
    determineJoystickInput: (grid, paddle, ball) => {
        return Math.sign(ball.position[1]-paddle.position[1]);
    },
    intCode: (state, input, instructionPointer, inputIndex, pauseOnOutput, relativeBase) => {
        let currentIndex = instructionPointer;
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
            while(statusOK && instructionPointer !== undefined && currentIndex < state.length) {
                opAndParams = CarePackage.opcodeToList(state[currentIndex]);
                op = opAndParams[0];
                if(CarePackage.debugIntCode) {
                    CarePackage.printOp(opAndParams, currentIndex);
                }
                if(op === CarePackage.endOP) {
                    halted = true;
                    break;
                } else if(op === CarePackage.addOP || op === CarePackage.multOP || op === CarePackage.equalsOP || op === CarePackage.lessThanOP) {
                    getRWResult = CarePackage.getReadParamValue(state, currentIndex, relativeBase, 1, opAndParams);
                    state = getRWResult.state;
                    valueA = getRWResult.value;

                    getRWResult = CarePackage.getReadParamValue(state, currentIndex, relativeBase, 2, opAndParams);
                    state = getRWResult.state;
                    valueB = getRWResult.value;


                    getRWResult = CarePackage.getWriteParamValue(state, currentIndex, relativeBase, 3, opAndParams);
                    state = getRWResult.state;
                    destination = getRWResult.value;


                    if(op === CarePackage.addOP) {
                        storeValue = valueA+valueB;
                    } else if(op === CarePackage.multOP) {
                        storeValue = valueA*valueB;
                    } else if(op === CarePackage.equalsOP) {
                        storeValue = valueA === valueB ? 1 : 0;
                    } else if(op === CarePackage.lessThanOP) {
                        storeValue = valueA < valueB ? 1 : 0;
                    }
                    state[destination] = storeValue;
                    currentIndex+=4;

                } else if(op === CarePackage.saveOP) {
                    
                    getRWResult = CarePackage.getWriteParamValue(state, currentIndex, relativeBase, 1, opAndParams);
                    state = getRWResult.state;
                    destination = getRWResult.value;
                    
                    if(CarePackage.debugIntCode) {
                        console.log(`Saving ${input[inputIndex]} into location ${destination}`);
                    }
                    state[destination] = input[inputIndex];
                    if(inputIndex<input.length-1) {
                        inputIndex++;
                    }
                    currentIndex+=2;
                } else if(op === CarePackage.outputOP) {
                    getRWResult = CarePackage.getReadParamValue(state, currentIndex, relativeBase, 1, opAndParams);
                    state = getRWResult.state;
                    valueA = getRWResult.value;

                    output.push(valueA);
                    currentIndex+=2;
                    if(pauseOnOutput) { break };
                } else if(op === CarePackage.jumpIfTrueOP || op === CarePackage.jumpIfFalseOP) { 
                    getRWResult = CarePackage.getReadParamValue(state, currentIndex, relativeBase, 1, opAndParams);
                    state = getRWResult.state;
                    valueA = getRWResult.value;

                    getRWResult = CarePackage.getReadParamValue(state, currentIndex, relativeBase, 2, opAndParams);
                    state = getRWResult.state;
                    destination = getRWResult.value;

                    let shouldJump = (op===CarePackage.jumpIfTrueOP&&valueA!==0) || (op===CarePackage.jumpIfFalseOP&&valueA===0);
                    currentIndex = shouldJump ? destination : currentIndex+3;
                    if(CarePackage.debugIntCode) {
                        console.log(`Checking against value ${valueA} -- Should jump ${shouldJump} -- Moving to ${currentIndex}`);
                    }

                } else if(op === CarePackage.relBaseOP) {
                    getRWResult = CarePackage.getReadParamValue(state, currentIndex, relativeBase, 1, opAndParams);
                    state = getRWResult.state;
                    valueA = getRWResult.value;
                    
                    relativeBase += valueA;
                    currentIndex+=2;
                } else {
                    break;
                }
            }
            return {state, output, halted, instructionPointer: currentIndex, inputIndex, relativeBase};
        } catch(e) {
            console.log("Error while creating alarm program state");
            console.log(e);
            console.log({state, output, halted, instructionPointer: currentIndex});
            return {state, output, halted, instructionPointer: currentIndex, relativeBase};
        }
    },
    printOp: (opAndParams, currentIndex) => {
        let op = CarePackage.opToName(opAndParams[0]);
        console.log(`Instruction ${currentIndex}: ${op}`);
    },
    opToName: (op) => {
        if(op === CarePackage.addOP) {
            return 'Add';
        } else if(op === CarePackage.multOP) {
            return 'Multiply';
        } else if(op === CarePackage.saveOP) {
            return 'Save';
        } else if(op === CarePackage.outputOP) {
            return 'Output';
        } else if(op === CarePackage.jumpIfTrueOP) {
            return 'Jump If True';
        } else if(op === CarePackage.jumpIfFalseOP) {
            return 'Jump If False';
        } else if(op === CarePackage.lessThanOP) {
            return 'Less Than';
        }  else if(op === CarePackage.equalsOP) {
            return 'Equals';
        } else if(op === CarePackage.relBaseOP) {
            return 'Change Relative Base';
        } else if(op === CarePackage.endOP) {
            return 'Halt';
        }

        return 'Unknown OP';
    },
    expandMemory(state, idx) {
        let end = idx-(state.length-1);
        for(let addIdx = 0; addIdx < end; addIdx++) { 
            state.push(0);
        }
        return state;
    },
    getReadParamValue: (state, currentIndex, relativeBase, paramNum, opAndParams) => {
        let offset = opAndParams[paramNum] == CarePackage.relMode ? relativeBase : 0;
        let targetIndex = opAndParams[paramNum] == CarePackage.imdMode ? currentIndex+paramNum : state[currentIndex+paramNum]+offset;
        if(targetIndex >= state.length) {
            state = CarePackage.expandMemory(state, targetIndex);
        }
        return {state, value: state[targetIndex]};
    },
    getWriteParamValue: (state, currentIndex, relativeBase, paramNum, opAndParams) => {
        let offset = opAndParams[paramNum] == CarePackage.relMode ? relativeBase : 0;
        let targetIndex = opAndParams[paramNum] == CarePackage.relMode ?  state[currentIndex+paramNum]+offset : state[currentIndex+paramNum];
        if(targetIndex >= state.length) {
            state = CarePackage.expandMemory(state, targetIndex);
        }
        return {state, value: targetIndex};
    },
    opcodeToList: (opcode) => {
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
        for(let idx = 0; idx < CarePackage.maxParams; idx++) {
            result.push(0);
        }

        return result;
    },
    findNounAndVerb: (memory, target, min, max) => {
        let freshMemory = [];
        let currentSolution = [];
        let solutionNoun = 0;
        let solutionVerb = 0;
        let found = false;
        for(let noun=min; noun <= max; noun++) {
            for(let verb=min; verb <= max; verb++) {
                freshMemory = [...memory];
                freshMemory[1] = noun;
                freshMemory[2] = verb;
                currentSolution = CarePackage.solve(freshMemory);
                if(currentSolution[0] === target) {
                    solutionNoun = noun;
                    solutionVerb = verb;
                    found = true;
                    break;
                }
            }
        }
        return found ? [solutionNoun, solutionVerb] : [-1, 1];

    },
    buildPermutations: (input) => {
        let permutations = [];
        if (input.length === 0) {
            return [[]];
        }
        for (let i = 0; i < input.length; i++) {
            let rest = CarePackage.buildPermutations(input.slice(0, i).concat(input.slice(i + 1)));
            for (let j = 0; j < rest.length; j++) {
                permutations.push([input[i]].concat(rest[j]));
            }
        }
        return permutations;
    },
    day9SolvePartOne: (state, input) => {
        return CarePackage.intCode(state,[input, input], 0, 0, false,0);
    },
    day9SolvePartTwo: (state, input) => {
        return CarePackage.intCode(state,[input, input], 0, 0, false,0);
    },
    day7SolvePartOne: (state, input, phaseSettings) => {
        const permutations = CarePackage.buildPermutations(phaseSettings);
        let maxSignal = -1;
        let nextInput = input;
        let output;
        permutations.forEach(permutation => {
            nextInput = input;
            permutation.forEach(phase => {
                output = CarePackage.intCode(state,[phase,nextInput], 0, 0, false, 0).output;
                nextInput = output[output.length-1];
            });
            maxSignal = Math.max(maxSignal, nextInput);
        });
        return maxSignal;
    },
    day7SolvePartTwo: (state, input, phaseSettings, outputAmpIndex) => {
        const permutations = CarePackage.buildPermutations(phaseSettings);
        let maxSignal = -1;
        let nextInput = input;
        let output;
        let amplifiers = [];
        let halted = false;
        let amplifierIndex = 0;
        let amplifier;
        permutations.forEach(permutation => {
            nextInput = input;
            amplifiers = [];
            halted = false;
            amplifierIndex = 0;
            permutation.forEach(phase => {
                amplifiers.push({
                    state: [...state],
                    instructionPointer: 0,
                    output: -1,
                    input: nextInput,
                    phase: phase,
                    inputIndex: 0
                });
            });
            while(!halted) {
                amplifier = amplifiers[amplifierIndex];
                output = CarePackage.intCode(amplifier.state, [amplifier.phase, amplifier.input], amplifier.instructionPointer, amplifier.inputIndex, true, 0);
                amplifier.state = [...output.state];
                amplifier.instructionPointer = output.instructionPointer;
                if(output.output.length > 0) {
                    amplifier.output = output.output[output.output.length-1];
                }
                amplifier.inputIndex = output.inputIndex;

                if(amplifierIndex === outputAmpIndex) {
                    maxSignal = Math.max(maxSignal, amplifier.output);
                }

                halted = output.halted;

                amplifierIndex = amplifierIndex === amplifiers.length-1 ? 0 : amplifierIndex+1;
                amplifiers[amplifierIndex].input = amplifier.output;
            }
            
        });
        return maxSignal;
    },
};

module.exports = CarePackage;