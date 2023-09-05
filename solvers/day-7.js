const AmplificationCircuit = {
    addOP: 1,
    multOP: 2,
    saveOP: 3,
    outputOP: 4,
    jumpIfTrueOP: 5,
    jumpIfFalseOP: 6,
    lessThanOP: 7,
    equalsOP: 8,
    endOP: 99,
    imdMode: 1,
    posMode: 0,
    maxParams: 2,

    solvePartOne: (state, input, phaseSettings) => {
        const permutations = AmplificationCircuit.buildPermutations(phaseSettings);
        let maxSignal = -1;
        let nextInput = input;
        let output;
        permutations.forEach(permutation => {
            nextInput = input;
            permutation.forEach(phase => {
                output = AmplificationCircuit.intCode(state,[phase,nextInput], 0, 0, false).output;
                nextInput = output[output.length-1];
            });
            maxSignal = Math.max(maxSignal, nextInput);
        });
        return maxSignal;
    },
    solvePartTwo: (state, input, phaseSettings, outputAmpIndex) => {
        const permutations = AmplificationCircuit.buildPermutations(phaseSettings);
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
                output = AmplificationCircuit.intCode(amplifier.state, [amplifier.phase, amplifier.input], amplifier.instructionPointer, amplifier.inputIndex, true);
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
    intCode: (state, input, instructionPointer, inputIndex, pauseOnOutput) => {
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
        try {
            while(statusOK && currentIndex < state.length) {
                opAndParams = AmplificationCircuit.opcodeToList(state[currentIndex]);
                op = opAndParams[0];
                if(op === AmplificationCircuit.endOP) {
                    halted = true;
                    break;
                } else if(op === AmplificationCircuit.addOP || op === AmplificationCircuit.multOP || op === AmplificationCircuit.equalsOP || op === AmplificationCircuit.lessThanOP) {
                    valueA = opAndParams[1] == AmplificationCircuit.posMode ? state[state[currentIndex+1]] : state[currentIndex+1];
                    valueB = opAndParams[2] == AmplificationCircuit.posMode ? state[state[currentIndex+2]] : state[currentIndex+2];
                    destination = state[currentIndex+3];
                    if(op === AmplificationCircuit.addOP) {
                        storeValue = valueA+valueB;
                    } else if(op === AmplificationCircuit.multOP) {
                        storeValue = valueA*valueB;
                    } else if(op === AmplificationCircuit.equalsOP) {
                        storeValue = valueA === valueB ? 1 : 0;
                    } else if(op === AmplificationCircuit.lessThanOP) {
                        storeValue = valueA < valueB ? 1 : 0;
                    }
                    state[destination] = storeValue;
                    currentIndex+=4;
                } else if(op === AmplificationCircuit.saveOP) {
                    destination = state[currentIndex+1];
                    state[destination] = input[inputIndex];
                    if(inputIndex<input.length-1) {
                        inputIndex++;
                    }
                    currentIndex+=2;
                } else if(op === AmplificationCircuit.outputOP) {
                    valueA = opAndParams[1] == AmplificationCircuit.posMode ? state[state[currentIndex+1]] : state[currentIndex+1];
                    output.push(valueA);
                    currentIndex+=2;
                    if(pauseOnOutput) { break };
                } else if(op === AmplificationCircuit.jumpIfTrueOP || op === AmplificationCircuit.jumpIfFalseOP) { 
                    valueA = opAndParams[1] == AmplificationCircuit.posMode ? state[state[currentIndex+1]] : state[currentIndex+1];
                    destination = opAndParams[2] == AmplificationCircuit.posMode ? state[state[currentIndex+2]] : state[currentIndex+2];
                    let shouldJump = (op===AmplificationCircuit.jumpIfTrueOP&&valueA!==0) || (op===AmplificationCircuit.jumpIfFalseOP&&valueA===0);
                    currentIndex = shouldJump ? destination : currentIndex+3;
                } else {
                    break;
                }
            }
            return {state, output, halted, instructionPointer: currentIndex, inputIndex};
        } catch(e) {
            console.log("Error while creating alarm program state");
            return {state, output, halted, instructionPointer: currentIndex};
        }
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
        for(let idx = 0; idx < AmplificationCircuit.maxParams; idx++) {
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
                currentSolution = AmplificationCircuit.solve(freshMemory);
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
            let rest = AmplificationCircuit.buildPermutations(input.slice(0, i).concat(input.slice(i + 1)));
            for (let j = 0; j < rest.length; j++) {
                permutations.push([input[i]].concat(rest[j]));
            }
        }
        return permutations;
    }
};

module.exports = AmplificationCircuit;