const SunnyAsteroids = {
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

    solvePartOne: (state, input) => {
        const result = SunnyAsteroids.intCode(state,input);
        return result.output[result.output.length-1];
    },
    solvePartTwo: (state, input) => {
        const result = SunnyAsteroids.intCode(state,input);
        return result.output[result.output.length-1];
    },
    intCode: (state, input) => {
        let currentIndex = 0;
        let statusOK = true;
        let op = 0;
        let opAndParams = [];
        let valueA = 0;
        let valueB = 0;
        let storeValue = 0;
        let destination = 0;
        let output = [];
        try {
            while(statusOK && currentIndex < state.length) {
                opAndParams = SunnyAsteroids.opcodeToList(state[currentIndex]);
                op = opAndParams[0];
                if(op === SunnyAsteroids.endOP) {
                    break;
                } else if(op === SunnyAsteroids.addOP || op === SunnyAsteroids.multOP || op === SunnyAsteroids.equalsOP || op === SunnyAsteroids.lessThanOP) {
                    valueA = opAndParams[1] == SunnyAsteroids.posMode ? state[state[currentIndex+1]] : state[currentIndex+1];
                    valueB = opAndParams[2] == SunnyAsteroids.posMode ? state[state[currentIndex+2]] : state[currentIndex+2];
                    destination = state[currentIndex+3];
                    if(op === SunnyAsteroids.addOP) {
                        storeValue = valueA+valueB;
                    } else if(op === SunnyAsteroids.multOP) {
                        storeValue = valueA*valueB;
                    } else if(op === SunnyAsteroids.equalsOP) {
                        storeValue = valueA === valueB ? 1 : 0;
                    } else if(op === SunnyAsteroids.lessThanOP) {
                        storeValue = valueA < valueB ? 1 : 0;
                    }
                    state[destination] = storeValue;
                    currentIndex+=4;
                } else if(op === SunnyAsteroids.saveOP) {
                    destination = state[currentIndex+1];
                    state[destination] = input;
                    currentIndex+=2;
                } else if(op === SunnyAsteroids.outputOP) {
                    valueA = opAndParams[1] == SunnyAsteroids.posMode ? state[state[currentIndex+1]] : state[currentIndex+1];
                    output.push(valueA);
                    currentIndex+=2;
                } else if(op === SunnyAsteroids.jumpIfTrueOP || op === SunnyAsteroids.jumpIfFalseOP) { 
                    valueA = opAndParams[1] == SunnyAsteroids.posMode ? state[state[currentIndex+1]] : state[currentIndex+1];
                    destination = opAndParams[2] == SunnyAsteroids.posMode ? state[state[currentIndex+2]] : state[currentIndex+2];
                    let shouldJump = (op===SunnyAsteroids.jumpIfTrueOP&&valueA!==0) || (op===SunnyAsteroids.jumpIfFalseOP&&valueA===0);
                    currentIndex = shouldJump ? destination : currentIndex+3;
                } else {
                    break;
                }
            }
            return {state, output};
        } catch(e) {
            console.log("Error while creating alarm program state");
            return {state, output};
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
        for(let idx = 0; idx < SunnyAsteroids.maxParams; idx++) {
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
                currentSolution = SunnyAsteroids.solve(freshMemory);
                if(currentSolution[0] === target) {
                    // console.log("Found target");
                    // console.log(`Noun: ${noun} --- Verb: ${verb} --- Got value: ${currentSolution[0]}`);
                    solutionNoun = noun;
                    solutionVerb = verb;
                    found = true;
                    break;
                }
            }
        }
        return found ? [solutionNoun, solutionVerb] : [-1, 1];

    },

};

module.exports = SunnyAsteroids;