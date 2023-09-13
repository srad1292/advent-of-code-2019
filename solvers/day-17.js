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

const Ascii = {
    Scaffold: {value: 35, display: '#'},
    OpenSpace: {value: 46, display: '.'},
    NewLine: {value: 10, display: '\n'},
    Up: {value: 94, display: '^'},
    Down: {value: 86, display: 'v'},
    Left: {value: 60, display: '<'},
    Right: {value: 62, display: '>'},
    InSpace: {value: 88, display: 'X'}, 
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

const SetAndForget = { 
    debugPartOne: false,
    debugBuildGrid: false,
    solvePartOne: (state) => {
        let grid = SetAndForget.buildGrid(state);
        if(SetAndForget.debugPartOne) {
            SetAndForget.printGrid(grid);
        }
        let intersections = SetAndForget.findIntersections(grid);
        if(SetAndForget.debugPartOne) {
            console.log(intersections);
        }
        let alignmentSum = intersections.reduce((prev, curr) => prev + (curr.horizontal*curr.vertical), 0);
        return alignmentSum;
    },
    buildGrid: (state) => {
        let robot = new IntCode(false, state, [0,0], 0, 0, true, 0);
        let halted = false;
        let snapshot;
        let output;
        let grid = [];
        let row = [];
        while(!halted) {
            snapshot = robot.run([0,0]);
            robot.updateValues(snapshot);

            halted = snapshot.halted;
            if(!halted) {
                output = snapshot.output[0];
                if(this.debugBuildGrid) {
                    console.log(output);
                }
                if(output === Ascii.NewLine.value) {
                    grid.push(row);
                    row = [];
                } else if(output === Ascii.OpenSpace.value){
                    row.push(Ascii.OpenSpace.display);
                } else if(output === Ascii.Scaffold.value){
                    row.push(Ascii.Scaffold.display);
                } else if(output === Ascii.Up.value) {
                    row.push(Ascii.Up.display);
                }  else if(output === Ascii.Down.value) {
                    row.push(Ascii.Down.display);
                }  else if(output === Ascii.Left.value) {
                    row.push(Ascii.Left.display);
                }  else if(output === Ascii.Right.value) {
                    row.push(Ascii.Right.display);
                } else {
                    console.log("Unexpected out: " + output);
                }
            }
            
        }
        return grid;
    }, 
    printGrid: (grid) => {
        for(let row = 0; row < grid.length; row++) {
            let line = ``;
            for(let col = 0; col < grid[row].length; col++) {
                line = `${line}${grid[row][col]}`;
            }
            console.log(line);
        }
    },
    findIntersections: (grid) => {
        let intersections = [];
        // Intersections can't be along the border so don't bother searching for those
        for(let vertical = 1; vertical < grid.length-1; vertical++) {
            for(let horizontal = 1; horizontal < grid[vertical].length-1; horizontal++) {
                if(grid[vertical][horizontal] === Ascii.Scaffold.display &&
                    grid[vertical][horizontal-1] === Ascii.Scaffold.display &&
                    grid[vertical][horizontal+1] === Ascii.Scaffold.display &&
                    grid[vertical-1][horizontal] === Ascii.Scaffold.display &&
                    grid[vertical+1][horizontal] === Ascii.Scaffold.display
                ) {
                    intersections.push(new Vector2(vertical, horizontal));
                }
            }
        }
        return intersections;
    }
};

module.exports = SetAndForget;