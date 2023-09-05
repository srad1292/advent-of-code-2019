const SpacePolice = {
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
    black: '.',
    white: '#',
    blackPanel: 0,
    whitePanel: 1,
    paintBlack: 0,
    paintWhite: 1,
    turnLeft: 0,
    turnRight: 1,
    direction: {
        Up: 0,
        Right: 1,
        Down: 2,
        Left: 3
    },
    outputType: {
        Paint: 0,
        Turn: 1,
    },
    debugPart2: false,
    debugIntCode: false,

    solvePartOne: (state) => {
        // key = row-col  val = {color: black or white, painted: bool}
        let position = [0,0];
        let grid = {};
        grid[`${position[0]}-${position[1]}`] = {color: SpacePolice.black, painted: false};
        let facing = SpacePolice.direction.Up;
        let outputType = SpacePolice.outputType.Paint;
        let halted = false;

        let robot = {
            state: [...state],
            instructionPointer: 0,
            output: -1,
            input: -1,
            phase: -1,
            inputIndex: 0,
            relativeBase: 0
        };
        let output;

        while(!halted) {
            if(grid[`${position[0]}-${position[1]}`] === undefined) {
                grid[`${position[0]}-${position[1]}`] = {color: SpacePolice.black, painted: false};            
            }

            robot.input = grid[`${position[0]}-${position[1]}`].color === SpacePolice.black ? SpacePolice.blackPanel : SpacePolice.whitePanel;

            // console.log({position, facing, input: robot.input});
            output = SpacePolice.intCode(robot.state, [robot.input, robot.input], robot.instructionPointer, robot.inputIndex, true, robot.relativeBase);
            // console.log("Pointer: " + output.instructionPointer);
            robot.state = [...output.state];
            robot.instructionPointer = output.instructionPointer;
            robot.relativeBase = output.relativeBase;
            if(output.output.length > 0) {
                robot.output = output.output[0];
            }
            // console.log({outputVal: robot.output});
            robot.inputIndex = output.inputIndex;

            halted = output.halted;

            if(!halted) {
                if(outputType === SpacePolice.outputType.Paint) {
                    outputType = SpacePolice.outputType.Turn;
                    if(grid[`${position[0]}-${position[1]}`] === undefined) {
                        grid[`${position[0]}-${position[1]}`] = {color: SpacePolice.black, painted: false};            
                    }
                    grid[`${position[0]}-${position[1]}`] = {
                        color: robot.output === SpacePolice.paintBlack ? SpacePolice.black : SpacePolice.white,
                        painted: true
                    };
                    // console.log(`Painted: ${position[0]}-${position[1]} to ${robot.output === SpacePolice.paintBlack ? "black": "white"}`);
                } else {
                    outputType = SpacePolice.outputType.Paint;
                    facing = SpacePolice.rotate(facing, robot.output);
                    position = SpacePolice.move(facing, position);
                    // console.log("Turned and moved");
                    // console.log({facing, position});
                }
            }
        }

        // console.log(grid);
        // console.log("Halted: " + `${halted ? 'yes' : 'no'}`);
        let paintedCount = 0;
        Object.keys(grid).forEach(key => {
            if(grid[key].painted) {
                paintedCount++;
            }
        });
        return paintedCount;
    },
    solvePartTwo: (state) => {
        // key = row-col  val = {color: black or white, painted: bool}
        let minX = 0;
        let maxX = 0;
        let minY = 0;
        let maxY = 0;
        let position = [0,0];
        let grid = {};
        grid[`${position[0]}-${position[1]}`] = {color: SpacePolice.white, painted: false};
        let facing = SpacePolice.direction.Up;
        let outputType = SpacePolice.outputType.Paint;
        let halted = false;

        let robot = {
            state: [...state],
            instructionPointer: 0,
            output: -1,
            input: -1,
            phase: -1,
            inputIndex: 0,
            relativeBase: 0
        };

        let tileColor = SpacePolice.whitePanel;
        let output;
        let run = 0;
        while(!halted && robot.instructionPointer !== undefined) {
            if(grid[`${position[0]}-${position[1]}`] === undefined) {
                grid[`${position[0]}-${position[1]}`] = {color: SpacePolice.black, painted: false};            
            }

            if(outputType === SpacePolice.outputType.Paint) {
                tileColor = grid[`${position[0]}-${position[1]}`].color === SpacePolice.black ? SpacePolice.blackPanel : SpacePolice.whitePanel;
            }

            robot.input = tileColor;

            // console.log({position, facing, input: robot.input});
            output = SpacePolice.intCode(robot.state, [robot.input, robot.input], robot.instructionPointer, robot.inputIndex, true, robot.relativeBase);
            if(run < 100 && SpacePolice.debugPart2) {
                console.log({output: output.output, halted: output.halted, instructionPointer: output.instructionPointer});
                run++;
            }
            // console.log("Pointer: " + output.instructionPointer);
            robot.state = [...output.state];
            robot.instructionPointer = output.instructionPointer;
            robot.relativeBase = output.relativeBase;
            if(output.output.length > 0) {
                robot.output = output.output[0];
            }
            // console.log({outputVal: robot.output});
            robot.inputIndex = output.inputIndex;

            halted = output.halted;

            if(!halted) {
                if(outputType === SpacePolice.outputType.Paint) {
                    outputType = SpacePolice.outputType.Turn;
                    if(grid[`${position[0]}-${position[1]}`] === undefined) {
                        grid[`${position[0]}-${position[1]}`] = {color: SpacePolice.black, painted: false};            
                    }
                    grid[`${position[0]}-${position[1]}`] = {
                        color: robot.output === SpacePolice.paintBlack ? SpacePolice.black : SpacePolice.white,
                        painted: true
                    };
                    // console.log(`Painted: ${position[0]}-${position[1]} to ${robot.output === SpacePolice.paintBlack ? "black": "white"}`);
                } else {
                    outputType = SpacePolice.outputType.Paint;
                    facing = SpacePolice.rotate(facing, robot.output);
                    position = SpacePolice.move(facing, position);
                    maxX = Math.max(position[1], maxX);
                    minX = Math.min(position[1], minX);
                    maxY = Math.max(position[0], maxY);
                    minY = Math.min(position[0], minY);
                    // console.log("Turned and moved");
                    // console.log({facing, position});
                }
            }
        }

        // console.log(grid);
        // console.log("Halted: " + `${halted ? 'yes' : 'no'}`);
        let paintedCount = 0;
        Object.keys(grid).forEach(key => {
            if(grid[key].painted) {
                paintedCount++;
            }
        });
        // console.log({paintedCount, minX, maxX, minY, maxY});
        // Output KRZEAJHB
        for(let row = minY; row <= maxY; row++) {
            let line = "";
            for(let col = minX; col <= maxX; col++) {
                if(grid[`${row}-${col}`] === undefined || grid[`${row}-${col}`].color === SpacePolice.black) {
                    line = `${line} ⬛`;
                } else {
                    line = `${line} ⬜`;
                }
            }
            console.log(line);
        }
    },
    rotate: (facing, turn) => {
        if(turn === SpacePolice.turnLeft) {
            return facing === 0 ? 3 : facing-1;
        } else {
            return facing === 3 ? 0 : facing+1;
        }
    },
    move: (facing, position) => {
        if(facing === SpacePolice.direction.Up) {
            return [position[0]-1, position[1]];
        } else if(facing === SpacePolice.direction.Right) {
            return [position[0], position[1]+1];
        } else if(facing === SpacePolice.direction.Down) {
            return [position[0]+1, position[1]];
        } else {
            return [position[0], position[1]-1];
        }
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
                opAndParams = SpacePolice.opcodeToList(state[currentIndex]);
                op = opAndParams[0];
                if(SpacePolice.debugIntCode) {
                    SpacePolice.printOp(opAndParams, currentIndex);
                }
                if(op === SpacePolice.endOP) {
                    halted = true;
                    break;
                } else if(op === SpacePolice.addOP || op === SpacePolice.multOP || op === SpacePolice.equalsOP || op === SpacePolice.lessThanOP) {
                    getRWResult = SpacePolice.getReadParamValue(state, currentIndex, relativeBase, 1, opAndParams);
                    state = getRWResult.state;
                    valueA = getRWResult.value;

                    getRWResult = SpacePolice.getReadParamValue(state, currentIndex, relativeBase, 2, opAndParams);
                    state = getRWResult.state;
                    valueB = getRWResult.value;


                    getRWResult = SpacePolice.getWriteParamValue(state, currentIndex, relativeBase, 3, opAndParams);
                    state = getRWResult.state;
                    destination = getRWResult.value;


                    if(op === SpacePolice.addOP) {
                        storeValue = valueA+valueB;
                    } else if(op === SpacePolice.multOP) {
                        storeValue = valueA*valueB;
                    } else if(op === SpacePolice.equalsOP) {
                        storeValue = valueA === valueB ? 1 : 0;
                    } else if(op === SpacePolice.lessThanOP) {
                        storeValue = valueA < valueB ? 1 : 0;
                    }
                    state[destination] = storeValue;
                    currentIndex+=4;

                } else if(op === SpacePolice.saveOP) {
                    
                    getRWResult = SpacePolice.getWriteParamValue(state, currentIndex, relativeBase, 1, opAndParams);
                    state = getRWResult.state;
                    destination = getRWResult.value;
                    
                    if(SpacePolice.debugIntCode) {
                        console.log(`Saving ${input[inputIndex]} into location ${destination}`);
                    }
                    state[destination] = input[inputIndex];
                    if(inputIndex<input.length-1) {
                        inputIndex++;
                    }
                    currentIndex+=2;
                } else if(op === SpacePolice.outputOP) {
                    getRWResult = SpacePolice.getReadParamValue(state, currentIndex, relativeBase, 1, opAndParams);
                    state = getRWResult.state;
                    valueA = getRWResult.value;

                    output.push(valueA);
                    currentIndex+=2;
                    if(pauseOnOutput) { break };
                } else if(op === SpacePolice.jumpIfTrueOP || op === SpacePolice.jumpIfFalseOP) { 
                    getRWResult = SpacePolice.getReadParamValue(state, currentIndex, relativeBase, 1, opAndParams);
                    state = getRWResult.state;
                    valueA = getRWResult.value;

                    getRWResult = SpacePolice.getReadParamValue(state, currentIndex, relativeBase, 2, opAndParams);
                    state = getRWResult.state;
                    destination = getRWResult.value;

                    let shouldJump = (op===SpacePolice.jumpIfTrueOP&&valueA!==0) || (op===SpacePolice.jumpIfFalseOP&&valueA===0);
                    currentIndex = shouldJump ? destination : currentIndex+3;
                    if(SpacePolice.debugIntCode) {
                        console.log(`Checking against value ${valueA} -- Should jump ${shouldJump} -- Moving to ${currentIndex}`);
                    }

                } else if(op === SpacePolice.relBaseOP) {
                    getRWResult = SpacePolice.getReadParamValue(state, currentIndex, relativeBase, 1, opAndParams);
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
        let op = SpacePolice.opToName(opAndParams[0]);
        console.log(`Instruction ${currentIndex}: ${op}`);
    },
    opToName: (op) => {
        if(op === SpacePolice.addOP) {
            return 'Add';
        } else if(op === SpacePolice.multOP) {
            return 'Multiply';
        } else if(op === SpacePolice.saveOP) {
            return 'Save';
        } else if(op === SpacePolice.outputOP) {
            return 'Output';
        } else if(op === SpacePolice.jumpIfTrueOP) {
            return 'Jump If True';
        } else if(op === SpacePolice.jumpIfFalseOP) {
            return 'Jump If False';
        } else if(op === SpacePolice.lessThanOP) {
            return 'Less Than';
        }  else if(op === SpacePolice.equalsOP) {
            return 'Equals';
        } else if(op === SpacePolice.relBaseOP) {
            return 'Change Relative Base';
        } else if(op === SpacePolice.endOP) {
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
        let offset = opAndParams[paramNum] == SpacePolice.relMode ? relativeBase : 0;
        let targetIndex = opAndParams[paramNum] == SpacePolice.imdMode ? currentIndex+paramNum : state[currentIndex+paramNum]+offset;
        if(targetIndex >= state.length) {
            state = SpacePolice.expandMemory(state, targetIndex);
        }
        return {state, value: state[targetIndex]};
    },
    getWriteParamValue: (state, currentIndex, relativeBase, paramNum, opAndParams) => {
        let offset = opAndParams[paramNum] == SpacePolice.relMode ? relativeBase : 0;
        let targetIndex = opAndParams[paramNum] == SpacePolice.relMode ?  state[currentIndex+paramNum]+offset : state[currentIndex+paramNum];
        if(targetIndex >= state.length) {
            state = SpacePolice.expandMemory(state, targetIndex);
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
        for(let idx = 0; idx < SpacePolice.maxParams; idx++) {
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
                currentSolution = SpacePolice.solve(freshMemory);
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
            let rest = SpacePolice.buildPermutations(input.slice(0, i).concat(input.slice(i + 1)));
            for (let j = 0; j < rest.length; j++) {
                permutations.push([input[i]].concat(rest[j]));
            }
        }
        return permutations;
    },
    day9SolvePartOne: (state, input) => {
        return SpacePolice.intCode(state,[input, input], 0, 0, false,0);
    },
    day9SolvePartTwo: (state, input) => {
        return SpacePolice.intCode(state,[input, input], 0, 0, false,0);
    },
    day7SolvePartOne: (state, input, phaseSettings) => {
        const permutations = SpacePolice.buildPermutations(phaseSettings);
        let maxSignal = -1;
        let nextInput = input;
        let output;
        permutations.forEach(permutation => {
            nextInput = input;
            permutation.forEach(phase => {
                output = SpacePolice.intCode(state,[phase,nextInput], 0, 0, false, 0).output;
                nextInput = output[output.length-1];
            });
            maxSignal = Math.max(maxSignal, nextInput);
        });
        return maxSignal;
    },
    day7SolvePartTwo: (state, input, phaseSettings, outputAmpIndex) => {
        const permutations = SpacePolice.buildPermutations(phaseSettings);
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
                output = SpacePolice.intCode(amplifier.state, [amplifier.phase, amplifier.input], amplifier.instructionPointer, amplifier.inputIndex, true, 0);
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

module.exports = SpacePolice;