const AmplificationCircuit = require('../solvers/day-7');


describe("Build permutation", () => {
    test("Three numbers returns 6 permutations", () => {
        let input = [0,1,2];
        let expected = 6; // 3*2*1
        let actual = AmplificationCircuit.buildPermutations(input).length;
        expect(actual).toEqual(expected);
    });

    test("Four numbers returns 24 permutations", () => {
        let input = [0,1,2,3];
        let expected = 24; // 4*3*2*1
        let actual = AmplificationCircuit.buildPermutations(input).length;
        expect(actual).toEqual(expected);
    });

    test("Five numbers returns 120 permutations", () => {
        let input = [0,1,2,3,4];
        let expected = 120; // 5*4*3*2*1
        let actual = AmplificationCircuit.buildPermutations(input).length;
        expect(actual).toEqual(expected);
    });

    test("Permutations are different - Part A", () => {
        let input = [0,1];
        let expected = [0,1];
        let actual = AmplificationCircuit.buildPermutations(input)[0];
        expect(actual).toStrictEqual(expected);
    });

    test("Permutations are different - Part B", () => {
        let input = [0,1];
        let expected = [1,0];
        let actual = AmplificationCircuit.buildPermutations(input)[1];
        expect(actual).toStrictEqual(expected);
    });
});

describe("Find Max Signal", () => {
    test("Sample One", () => {
        let startingState = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0];
        let input = 0;
        let phaseSettings = [0,1,2,3,4];
        let actual = AmplificationCircuit.solvePartOne(startingState,input,phaseSettings);
        let expected = 43210;
        expect(actual).toEqual(expected);
    });

    test("Sample Two", () => {
        let startingState = [3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0];
        let input = 0;
        let phaseSettings = [0,1,2,3,4];
        let actual = AmplificationCircuit.solvePartOne(startingState,input,phaseSettings);
        let expected = 54321;
        expect(actual).toEqual(expected);
    });

    test("Sample Three", () => {
        let startingState = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0];
        let input = 0;
        let phaseSettings = [0,1,2,3,4];
        let actual = AmplificationCircuit.solvePartOne(startingState,input,phaseSettings);
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
        let actual = AmplificationCircuit.solvePartOne(startingState,input,phaseSettings);
        let expected = 38834;
        expect(actual).toEqual(expected);
    });
});

describe("Find Max Signal Circuit Mode", () => {
    test("Sample One", () => {
        let startingState = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5];
        let input = 0;
        let phaseSettings = [9,8,7,6,5];
        let outputAmpIndex = 4;
        let actual = AmplificationCircuit.solvePartTwo(startingState,input,phaseSettings, outputAmpIndex);
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
        let actual = AmplificationCircuit.solvePartTwo(startingState,input,phaseSettings, outputAmpIndex);
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
        let actual = AmplificationCircuit.solvePartTwo(startingState,input,phaseSettings, outputAmpIndex);
        let expected = 69113332;
        expect(actual).toEqual(expected);
    });
});