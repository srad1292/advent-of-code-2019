const SensorBoost = {
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


    solvePartOne: (state, input) => {
        return SensorBoost.intCode(state,[input, input], 0, 0, false);
    },
    intCode: (state, input, instructionPointer, inputIndex, pauseOnOutput) => {
        startingState = [...state];
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
        let relativeBase = 0;
        let getRWResult = {};

        try {
            while(statusOK && currentIndex < state.length) {
                opAndParams = SensorBoost.opcodeToList(state[currentIndex]);
                op = opAndParams[0];
                if(op === SensorBoost.endOP) {
                    halted = true;
                    break;
                } else if(op === SensorBoost.addOP || op === SensorBoost.multOP || op === SensorBoost.equalsOP || op === SensorBoost.lessThanOP) {
                    getRWResult = SensorBoost.getReadParamValue(state, currentIndex, relativeBase, 1, opAndParams);
                    state = getRWResult.state;
                    valueA = getRWResult.value;

                    getRWResult = SensorBoost.getReadParamValue(state, currentIndex, relativeBase, 2, opAndParams);
                    state = getRWResult.state;
                    valueB = getRWResult.value;


                    destination = state[currentIndex+3];

                    if(op === SensorBoost.addOP) {
                        storeValue = valueA+valueB;
                    } else if(op === SensorBoost.multOP) {
                        storeValue = valueA*valueB;
                    } else if(op === SensorBoost.equalsOP) {
                        storeValue = valueA === valueB ? 1 : 0;
                    } else if(op === SensorBoost.lessThanOP) {
                        storeValue = valueA < valueB ? 1 : 0;
                    }
                    state[destination] = storeValue;
                    currentIndex+=4;
                    // console.log({op: "Add/Mul/Eq/Less", destination, storeValue, currentIndex, relativeBase});

                } else if(op === SensorBoost.saveOP) {
                    // destination = state[currentIndex+1];
                    
                    getRWResult = SensorBoost.getWriteParamValue(state, currentIndex, relativeBase, 1, opAndParams);
                    state = getRWResult.state;
                    destination = getRWResult.value;
                    // console.log("Saving " + input[inputIndex] + " to destination: " + destination);
                    
                    state[destination] = input[inputIndex];
                    if(inputIndex<input.length-1) {
                        inputIndex++;
                    }
                    currentIndex+=2;
                } else if(op === SensorBoost.outputOP) {
                    getRWResult = SensorBoost.getReadParamValue(state, currentIndex, relativeBase, 1, opAndParams);
                    state = getRWResult.state;
                    valueA = getRWResult.value;

                    output.push(valueA);
                    currentIndex+=2;
                    if(pauseOnOutput) { break };
                } else if(op === SensorBoost.jumpIfTrueOP || op === SensorBoost.jumpIfFalseOP) { 
                    getRWResult = SensorBoost.getReadParamValue(state, currentIndex, relativeBase, 1, opAndParams);
                    state = getRWResult.state;
                    valueA = getRWResult.value;

                    getRWResult = SensorBoost.getReadParamValue(state, currentIndex, relativeBase, 2, opAndParams);
                    state = getRWResult.state;
                    destination = getRWResult.value;

                    let shouldJump = (op===SensorBoost.jumpIfTrueOP&&valueA!==0) || (op===SensorBoost.jumpIfFalseOP&&valueA===0);
                    currentIndex = shouldJump ? destination : currentIndex+3;

                } else if(op === SensorBoost.relBaseOP) {
                    getRWResult = SensorBoost.getReadParamValue(state, currentIndex, relativeBase, 1, opAndParams);
                    state = getRWResult.state;
                    valueA = getRWResult.value;
                    
                    relativeBase += valueA;
                    currentIndex+=2;
                } else {
                    break;
                }
            }
            return {state, output, halted, instructionPointer: currentIndex, inputIndex};
        } catch(e) {
            console.log("Error while creating alarm program state");
            console.log(e);
            console.log({state, output, halted, instructionPointer: currentIndex});
            return {state, output, halted, instructionPointer: currentIndex};
        }
    },
    expandMemory(state, idx) {
        let end = idx-(state.length-1);
        for(let addIdx = 0; addIdx < end; addIdx++) { 
            state.push(0);
        }
        return state;
    },
    getReadParamValue: (state, currentIndex, relativeBase, paramNum, opAndParams) => {
        let offset = opAndParams[paramNum] == SensorBoost.relMode ? relativeBase : 0;
        let targetIndex = opAndParams[paramNum] == SensorBoost.imdMode ? currentIndex+paramNum : state[currentIndex+paramNum]+offset;
        if(targetIndex >= state.length) {
            state = SensorBoost.expandMemory(state, targetIndex);
        }
        return {state, value: state[targetIndex]};
    },
    getWriteParamValue: (state, currentIndex, relativeBase, paramNum, opAndParams) => {
        let offset = opAndParams[paramNum] == SensorBoost.relMode ? relativeBase : 0;
        let targetIndex = opAndParams[paramNum] == SensorBoost.relMode ?  state[currentIndex+paramNum]+offset : state[currentIndex+paramNum];
        if(targetIndex >= state.length) {
            state = SensorBoost.expandMemory(state, targetIndex);
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
        for(let idx = 0; idx < SensorBoost.maxParams; idx++) {
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
                currentSolution = SensorBoost.solve(freshMemory);
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
            let rest = SensorBoost.buildPermutations(input.slice(0, i).concat(input.slice(i + 1)));
            for (let j = 0; j < rest.length; j++) {
                permutations.push([input[i]].concat(rest[j]));
            }
        }
        return permutations;
    },
    day7SolvePartOne: (state, input, phaseSettings) => {
        const permutations = SensorBoost.buildPermutations(phaseSettings);
        let maxSignal = -1;
        let nextInput = input;
        let output;
        permutations.forEach(permutation => {
            nextInput = input;
            permutation.forEach(phase => {
                output = SensorBoost.intCode(state,[phase,nextInput], 0, 0, false).output;
                nextInput = output[output.length-1];
            });
            maxSignal = Math.max(maxSignal, nextInput);
        });
        return maxSignal;
    },
    day7SolvePartTwo: (state, input, phaseSettings, outputAmpIndex) => {
        const permutations = SensorBoost.buildPermutations(phaseSettings);
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
                output = SensorBoost.intCode(amplifier.state, [amplifier.phase, amplifier.input], amplifier.instructionPointer, amplifier.inputIndex, true);
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

module.exports = SensorBoost;