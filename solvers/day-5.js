const SunnyAsteroids = {
    addOP: 1,
    multOP: 2,
    saveOP: 3,
    outputOP: 4,
    endOP: 99,
    imdMode: 1,
    posMode: 0,
    maxParams: 2,

    solvePartOne: (state, input) => {
        const result = SunnyAsteroids.intCode(state,input);
        return result.output[result.output.length-1];
    },
    intCode: (state, input) => {
        startingState = [...state];
        let currentIndex = 0;
        let statusOK = true;
        let op = 0;
        let opAndParams = [];
        let valueA = 0;
        let valueB = 0;
        let destination = 0;
        let output = [];
        try {
            while(statusOK && currentIndex < state.length) {
                opAndParams = SunnyAsteroids.opcodeToList(state[currentIndex]);
                op = opAndParams[0];
                if(op === SunnyAsteroids.endOP) {
                    break;
                } else if(op === SunnyAsteroids.addOP || op === SunnyAsteroids.multOP) {
                    valueA = opAndParams[1] == SunnyAsteroids.posMode ? state[state[currentIndex+1]] : state[currentIndex+1];
                    valueB = opAndParams[2] == SunnyAsteroids.posMode ? state[state[currentIndex+2]] : state[currentIndex+2];
                    destination = state[currentIndex+3];
                    state[destination] = op === SunnyAsteroids.addOP ? valueA+valueB : valueA*valueB;
                    currentIndex+=4;
                } else if(op === SunnyAsteroids.saveOP) {
                    destination = state[currentIndex+1];
                    state[destination] = input;
                    currentIndex+=2;
                } else if(op === SunnyAsteroids.outputOP) {
                    valueA = opAndParams[1] == SunnyAsteroids.posMode ? state[state[currentIndex+1]] : state[currentIndex+1];
                    output.push(valueA);
                    currentIndex+=2;
                }else {
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
    solvePartTwo: () => {},

};

module.exports = SunnyAsteroids;