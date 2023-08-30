const SensorBoost = require('../solvers/day-9');


describe("Day 7 - Build permutation", () => {
    test("Three numbers returns 6 permutations", () => {
        let input = [0,1,2];
        let expected = 6; // 3*2*1
        let actual = SensorBoost.buildPermutations(input).length;
        expect(actual).toEqual(expected);
    });

    test("Four numbers returns 24 permutations", () => {
        let input = [0,1,2,3];
        let expected = 24; // 4*3*2*1
        let actual = SensorBoost.buildPermutations(input).length;
        expect(actual).toEqual(expected);
    });

    test("Five numbers returns 120 permutations", () => {
        let input = [0,1,2,3,4];
        let expected = 120; // 5*4*3*2*1
        let actual = SensorBoost.buildPermutations(input).length;
        expect(actual).toEqual(expected);
    });

    test("Permutations are different - Part A", () => {
        let input = [0,1];
        let expected = [0,1];
        let actual = SensorBoost.buildPermutations(input)[0];
        expect(actual).toStrictEqual(expected);
    });

    test("Permutations are different - Part B", () => {
        let input = [0,1];
        let expected = [1,0];
        let actual = SensorBoost.buildPermutations(input)[1];
        expect(actual).toStrictEqual(expected);
    });
});

describe("Day 7 - Find Max Signal", () => {
    test("Sample One", () => {
        let startingState = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0];
        let input = 0;
        let phaseSettings = [0,1,2,3,4];
        let actual = SensorBoost.day7SolvePartOne(startingState,input,phaseSettings);
        let expected = 43210;
        expect(actual).toEqual(expected);
    });

    test("Sample Two", () => {
        let startingState = [3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0];
        let input = 0;
        let phaseSettings = [0,1,2,3,4];
        let actual = SensorBoost.day7SolvePartOne(startingState,input,phaseSettings);
        let expected = 54321;
        expect(actual).toEqual(expected);
    });

    test("Sample Three", () => {
        let startingState = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0];
        let input = 0;
        let phaseSettings = [0,1,2,3,4];
        let actual = SensorBoost.day7SolvePartOne(startingState,input,phaseSettings);
        let expected = 65210;
        expect(actual).toEqual(expected);
    });

    test("Actual Part One", () => {
        let startingState = [3,8,1001,8,10,8,105,1,0,0,21,34,51,76,101,114,195,276,357,438,99999,3,9,
            1001,9,3,9,1002,9,3,9,4,9,99,3,9,101,4,9,9,102,4,9,9,1001,9,5,9,4,9,99,3,9,1002,9,4,9,101,3,9,9,
            102,5,9,9,1001,9,2,9,1002,9,2,9,4,9,99,3,9,1001,9,3,9,102,2,9,9,101,4,9,9,102,3,9,9,101,2,9,9,4,9,
            99,3,9,102,2,9,9,101,4,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,
            9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,
            9,4,9,3,9,101,2,9,9,4,9,99,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,
            4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,
            9,1001,9,2,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,
            9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,
            99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,
            2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,
            3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,
            4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,99
        ];
        let input = 0;
        let phaseSettings = [0,1,2,3,4];
        let actual = SensorBoost.day7SolvePartOne(startingState,input,phaseSettings);
        let expected = 38834;
        expect(actual).toEqual(expected);
    });
});

describe("Day 7 - Find Max Signal Circuit Mode", () => {
    test("Sample One", () => {
        let startingState = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5];
        let input = 0;
        let phaseSettings = [9,8,7,6,5];
        let outputAmpIndex = 4;
        let actual = SensorBoost.day7SolvePartTwo(startingState,input,phaseSettings, outputAmpIndex);
        let expected = 139629729;
        expect(actual).toEqual(expected);
    });

    test("Sample Two", () => {
        let startingState = [3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,
            -5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,
            53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10
        ];
        let input = 0;
        let phaseSettings = [9,8,7,6,5];
        let outputAmpIndex = 4;
        let actual = SensorBoost.day7SolvePartTwo(startingState,input,phaseSettings, outputAmpIndex);
        let expected = 18216;
        expect(actual).toEqual(expected);
    });

    test("Actual Part One", () => {
        let startingState = [3,8,1001,8,10,8,105,1,0,0,21,34,51,76,101,114,195,276,357,438,99999,3,9,
            1001,9,3,9,1002,9,3,9,4,9,99,3,9,101,4,9,9,102,4,9,9,1001,9,5,9,4,9,99,3,9,1002,9,4,9,101,3,9,9,
            102,5,9,9,1001,9,2,9,1002,9,2,9,4,9,99,3,9,1001,9,3,9,102,2,9,9,101,4,9,9,102,3,9,9,101,2,9,9,4,9,
            99,3,9,102,2,9,9,101,4,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,
            9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,
            9,4,9,3,9,101,2,9,9,4,9,99,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,
            4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,
            9,1001,9,2,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,
            9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,
            99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,
            2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,
            3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,
            4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,99
        ];
        let input = 0;
        let phaseSettings = [9,8,7,6,5];
        let outputAmpIndex = 4;
        let actual = SensorBoost.day7SolvePartTwo(startingState,input,phaseSettings, outputAmpIndex);
        let expected = 69113332;
        expect(actual).toEqual(expected);
    });
});

describe("Today - Expand Memory", () => {
    test("Sample One", () => {
        let state = [0,2,3];
        let indexToGoTo = 9;
        let actual = SensorBoost.expandMemory(state, indexToGoTo).length;
        let expected = indexToGoTo+1;
        expect(actual).toEqual(expected);
    });
});

describe("Solve Part One", () => {
    test("Sample One", () => {
        let startingState = [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99];
        let output = SensorBoost.solvePartOne(startingState, 0);
        let expected = [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99];
        let actual = output.output;
        expect(actual).toStrictEqual(expected);
    });
    
    test("Sample Two", () => {
        let startingState = [1102,34915192,34915192,7,4,7,99,0];
        let output = SensorBoost.solvePartOne(startingState, 0);
        let expected = 16;
        let actual = (output.output[0]).toString().length;
        expect(actual).toEqual(expected);
    });
    
    test("Sample Three", () => {
        let startingState = [104,1125899906842624,99];
        let output = SensorBoost.solvePartOne(startingState, 0);
        let expected = 1125899906842624;
        let actual = output.output[0];
        expect(actual).toEqual(expected);
    });

    test("Sample Four", () => {
        let startingState = [109, -1, 4, 1, 99];
        let output = SensorBoost.solvePartOne(startingState, 0);
        let expected = -1;
        let actual = output.output[0];
        expect(actual).toEqual(expected);
    });

    test("Sample Five", () => {
        let startingState = [109, -1, 104, 1, 99];
        let output = SensorBoost.solvePartOne(startingState, 0);
        let expected = 1;
        let actual = output.output[0];
        expect(actual).toEqual(expected);
    });

    test("Sample Six", () => {
        let startingState = [109, -1, 204, 1, 99];
        let output = SensorBoost.solvePartOne(startingState, 0);
        let expected = 109;
        let actual = output.output[0];
        expect(actual).toEqual(expected);
    });

    test("Sample Seven", () => {
        let startingState = [109, 1, 9, 2, 204, -6, 99];
        let output = SensorBoost.solvePartOne(startingState, 0);
        let expected = 204;
        let actual = output.output[0];
        expect(actual).toEqual(expected);
    });

    test("Sample Eight", () => {
        let startingState = [109, 1, 109, 9, 204, -6, 99];
        let output = SensorBoost.solvePartOne(startingState, 0);
        let expected = 204;
        let actual = output.output[0];
        expect(actual).toEqual(expected);
    });

    test("Sample Nine", () => {
        let startingState = [109, 1, 209, -1, 204, -106, 99];
        let output = SensorBoost.solvePartOne(startingState, 0);
        let expected = 204;
        let actual = output.output[0];
        expect(actual).toEqual(expected);
    });

    test("Sample Ten", () => {
        let startingState = [109, 1, 3, 3, 204, 2, 99];
        let input = 11;
        let expected = input;
        let output = SensorBoost.solvePartOne(startingState, input);
        let actual = output.output[0];
        expect(actual).toEqual(expected);
    });

    test("Sample Eleven", () => {
        let startingState = [109, 1, 203, 2, 204, 2, 99];
        let input = 11;
        let expected = input;
        let output = SensorBoost.solvePartOne(startingState, input);
        let actual = output.output[0];
        expect(actual).toEqual(expected);
    });

});