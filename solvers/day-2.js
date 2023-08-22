const AlarmProgram = {
    addOP: 1,
    multOP: 2,
    endOP: 99,
    solve: (state) => {
        startingState = [...state];
        let currentIndex = 0;
        let statusOK = true;
        let op = 0;

        let sourceA = 0;
        let sourceB = 0;
        let destination = 0;
        try {
            while(statusOK && currentIndex < state.length) {
                op = state[currentIndex];
                if(op === AlarmProgram.endOP) {
                    break;
                } else if(op === AlarmProgram.addOP) {
                    sourceA = state[currentIndex+1];
                    sourceB = state[currentIndex+2];
                    destination = state[currentIndex+3];
                    state[destination] = state[sourceA]+state[sourceB];
                    currentIndex+=4;
                } else if(op === AlarmProgram.multOP) {
                    sourceA = state[currentIndex+1];
                    sourceB = state[currentIndex+2];
                    destination = state[currentIndex+3];
                    state[destination] = state[sourceA]*state[sourceB];
                    currentIndex+=4;
                } else {
                    break;
                }
            }
            return state;
        } catch(e) {
            console.log("Error while creating alarm program state");
            return state;
        }
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
                currentSolution = AlarmProgram.solve(freshMemory);
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
    solvePartTwo: (memory, target, min, max) => {
        let nounAndVerb = AlarmProgram.findNounAndVerb(memory, target, min, max);
        return 100*nounAndVerb[0]+nounAndVerb[1];
        
    },
}

module.exports = AlarmProgram;