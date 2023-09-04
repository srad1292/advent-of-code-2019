const SpacePolice = require("../solvers/day-11");

describe("Solve Part One", () => {
    test("Part One", () => {
        let startingState = [3,8,1005,8,350,1106,0,11,0,0,0,104,1,104,0,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,1,10,4,10,102,1,8,29,1006,0,82,1006,0,40,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,0,10,4,10,1002,8,1,57,1,102,15,10,1,1005,14,10,1006,0,33,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,102,1,8,90,1,1008,14,10,2,3,19,10,1006,0,35,1006,0,21,3,8,102,-1,8,10,1001,10,1,10,4,10,108,1,8,10,4,10,1002,8,1,125,1,1105,11,10,2,1105,9,10,1,4,1,10,2,1,4,10,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,0,10,4,10,101,0,8,164,1006,0,71,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,1002,8,1,189,1006,0,2,1,5,17,10,1006,0,76,1,1002,7,10,3,8,1002,8,-1,10,101,1,10,10,4,10,108,1,8,10,4,10,1001,8,0,224,1,3,5,10,3,8,1002,8,-1,10,101,1,10,10,4,10,108,1,8,10,4,10,101,0,8,250,1,1,20,10,1,102,13,10,2,101,18,10,3,8,1002,8,-1,10,101,1,10,10,4,10,108,0,8,10,4,10,102,1,8,284,2,105,0,10,1,105,20,10,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,1,10,4,10,1002,8,1,315,1006,0,88,1,2,4,10,2,8,17,10,2,6,2,10,101,1,9,9,1007,9,1056,10,1005,10,15,99,109,672,104,0,104,1,21102,1,847069688728,1,21101,0,367,0,1106,0,471,21102,386577216404,1,1,21102,378,1,0,1105,1,471,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21101,97952923867,0,1,21102,425,1,0,1106,0,471,21101,0,29033143319,1,21102,436,1,0,1105,1,471,3,10,104,0,104,0,3,10,104,0,104,0,21102,1,868410614628,1,21101,0,459,0,1105,1,471,21101,837896909672,0,1,21101,0,470,0,1105,1,471,99,109,2,22102,1,-1,1,21101,40,0,2,21102,502,1,3,21102,492,1,0,1106,0,535,109,-2,2105,1,0,0,1,0,0,1,109,2,3,10,204,-1,1001,497,498,513,4,0,1001,497,1,497,108,4,497,10,1006,10,529,1102,1,0,497,109,-2,2105,1,0,0,109,4,2101,0,-1,534,1207,-3,0,10,1006,10,552,21101,0,0,-3,22101,0,-3,1,22101,0,-2,2,21102,1,1,3,21101,571,0,0,1106,0,576,109,-4,2106,0,0,109,5,1207,-3,1,10,1006,10,599,2207,-4,-2,10,1006,10,599,21202,-4,1,-4,1105,1,667,21202,-4,1,1,21201,-3,-1,2,21202,-2,2,3,21102,1,618,0,1106,0,576,21201,1,0,-4,21101,0,1,-1,2207,-4,-2,10,1006,10,637,21102,0,1,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,659,21202,-1,1,1,21101,659,0,0,106,0,534,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2105,1,0];
        let expected = 2054;
        let actual = SpacePolice.solvePartOne(startingState);
        expect(actual).toEqual(expected);
    });
});

describe("Day 7 - Build permutation", () => {
    test("Three numbers returns 6 permutations", () => {
        let input = [0,1,2];
        let expected = 6; // 3*2*1
        let actual = SpacePolice.buildPermutations(input).length;
        expect(actual).toEqual(expected);
    });

    test("Four numbers returns 24 permutations", () => {
        let input = [0,1,2,3];
        let expected = 24; // 4*3*2*1
        let actual = SpacePolice.buildPermutations(input).length;
        expect(actual).toEqual(expected);
    });

    test("Five numbers returns 120 permutations", () => {
        let input = [0,1,2,3,4];
        let expected = 120; // 5*4*3*2*1
        let actual = SpacePolice.buildPermutations(input).length;
        expect(actual).toEqual(expected);
    });

    test("Permutations are different - Part A", () => {
        let input = [0,1];
        let expected = [0,1];
        let actual = SpacePolice.buildPermutations(input)[0];
        expect(actual).toStrictEqual(expected);
    });

    test("Permutations are different - Part B", () => {
        let input = [0,1];
        let expected = [1,0];
        let actual = SpacePolice.buildPermutations(input)[1];
        expect(actual).toStrictEqual(expected);
    });
});

describe("Day 7 - Find Max Signal", () => {
    test("Sample One", () => {
        let startingState = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0];
        let input = 0;
        let phaseSettings = [0,1,2,3,4];
        let actual = SpacePolice.day7SolvePartOne(startingState,input,phaseSettings);
        let expected = 43210;
        expect(actual).toEqual(expected);
    });

    test("Sample Two", () => {
        let startingState = [3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0];
        let input = 0;
        let phaseSettings = [0,1,2,3,4];
        let actual = SpacePolice.day7SolvePartOne(startingState,input,phaseSettings);
        let expected = 54321;
        expect(actual).toEqual(expected);
    });

    test("Sample Three", () => {
        let startingState = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0];
        let input = 0;
        let phaseSettings = [0,1,2,3,4];
        let actual = SpacePolice.day7SolvePartOne(startingState,input,phaseSettings);
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
        let actual = SpacePolice.day7SolvePartOne(startingState,input,phaseSettings);
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
        let actual = SpacePolice.day7SolvePartTwo(startingState,input,phaseSettings, outputAmpIndex);
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
        let actual = SpacePolice.day7SolvePartTwo(startingState,input,phaseSettings, outputAmpIndex);
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
        let actual = SpacePolice.day7SolvePartTwo(startingState,input,phaseSettings, outputAmpIndex);
        let expected = 69113332;
        expect(actual).toEqual(expected);
    });
});

describe("Day 9 - Expand Memory", () => {
    test("Sample One", () => {
        let state = [0,2,3];
        let indexToGoTo = 9;
        let actual = SpacePolice.expandMemory(state, indexToGoTo).length;
        let expected = indexToGoTo+1;
        expect(actual).toEqual(expected);
    });
});

describe("Day 9 - Solve Part One", () => {
    test("Sample One", () => {
        let startingState = [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99];
        let output = SpacePolice.day9SolvePartOne(startingState, 0);
        let expected = [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99];
        let actual = output.output;
        expect(actual).toStrictEqual(expected);
    });
    
    test("Sample Two", () => {
        let startingState = [1102,34915192,34915192,7,4,7,99,0];
        let output = SpacePolice.day9SolvePartOne(startingState, 0);
        let expected = 16;
        let actual = (output.output[0]).toString().length;
        expect(actual).toEqual(expected);
    });
    
    test("Sample Three", () => {
        let startingState = [104,1125899906842624,99];
        let output = SpacePolice.day9SolvePartOne(startingState, 0);
        let expected = 1125899906842624;
        let actual = output.output[0];
        expect(actual).toEqual(expected);
    });

    test("Sample Four", () => {
        let startingState = [109, -1, 4, 1, 99];
        let output = SpacePolice.day9SolvePartOne(startingState, 0);
        let expected = -1;
        let actual = output.output[0];
        expect(actual).toEqual(expected);
    });

    test("Sample Five", () => {
        let startingState = [109, -1, 104, 1, 99];
        let output = SpacePolice.day9SolvePartOne(startingState, 0);
        let expected = 1;
        let actual = output.output[0];
        expect(actual).toEqual(expected);
    });

    test("Sample Six", () => {
        let startingState = [109, -1, 204, 1, 99];
        let output = SpacePolice.day9SolvePartOne(startingState, 0);
        let expected = 109;
        let actual = output.output[0];
        expect(actual).toEqual(expected);
    });

    test("Sample Seven", () => {
        let startingState = [109, 1, 9, 2, 204, -6, 99];
        let output = SpacePolice.day9SolvePartOne(startingState, 0);
        let expected = 204;
        let actual = output.output[0];
        expect(actual).toEqual(expected);
    });

    test("Sample Eight", () => {
        let startingState = [109, 1, 109, 9, 204, -6, 99];
        let output = SpacePolice.day9SolvePartOne(startingState, 0);
        let expected = 204;
        let actual = output.output[0];
        expect(actual).toEqual(expected);
    });

    test("Sample Nine", () => {
        let startingState = [109, 1, 209, -1, 204, -106, 99];
        let output = SpacePolice.day9SolvePartOne(startingState, 0);
        let expected = 204;
        let actual = output.output[0];
        expect(actual).toEqual(expected);
    });

    test("Sample Ten", () => {
        let startingState = [109, 1, 3, 3, 204, 2, 99];
        let input = 11;
        let expected = input;
        let output = SpacePolice.day9SolvePartOne(startingState, input);
        let actual = output.output[0];
        expect(actual).toEqual(expected);
    });

    test("Sample Eleven", () => {
        let startingState = [109, 1, 203, 2, 204, 2, 99];
        let input = 11;
        let expected = input;
        let output = SpacePolice.day9SolvePartOne(startingState, input);
        let actual = output.output[0];
        expect(actual).toEqual(expected);
    });

    test("Actual Answer", () => {
        let startingState = [1102,34463338,34463338,63,1007,63,34463338,63,1005,63,53,1102,1,3,1000,109,988,209,12,9,1000,209,6,
            209,3,203,0,1008,1000,1,63,1005,63,65,1008,1000,2,63,1005,63,904,1008,1000,0,63,1005,63,58,4,25,104,0,99,4,0,104,0,99,
            4,17,104,0,99,0,0,1101,0,0,1020,1101,34,0,1004,1101,0,26,1008,1102,1,37,1011,1101,39,0,1018,1102,587,1,1022,1101,1,0,
            1021,1102,22,1,1012,1101,0,33,1014,1101,24,0,1016,1101,0,752,1029,1101,36,0,1002,1101,35,0,1006,1101,32,0,1009,1102,38,1,1003,
            1102,584,1,1023,1101,0,20,1001,1102,892,1,1025,1102,29,1,1000,1101,411,0,1026,1102,1,901,1024,1101,0,761,1028,1101,23,0,1017,1102,
            30,1,1013,1101,0,27,1015,1102,28,1,1005,1101,408,0,1027,1101,25,0,1007,1102,31,1,1019,1101,0,21,1010,109,5,1207,-2,39,63,1005,63,199,
            4,187,1105,1,203,1001,64,1,64,1002,64,2,64,109,12,21102,40,1,-1,1008,1016,40,63,1005,63,229,4,209,1001,64,1,64,1106,0,229,1002,64,2,64,
            109,-5,1207,-5,24,63,1005,63,249,1001,64,1,64,1106,0,251,4,235,1002,64,2,64,109,-14,2102,1,6,63,1008,63,32,63,1005,
            63,271,1106,0,277,4,257,1001,64,1,64,1002,64,2,64,109,2,1202,1,1,63,1008,63,20,63,1005,63,303,4,283,1001,64,1,64,
            1106,0,303,1002,64,2,64,109,7,2108,34,2,63,1005,63,319,1106,0,325,4,309,1001,64,1,64,1002,64,2,64,109,6,2101,0,-6,
            63,1008,63,24,63,1005,63,349,1001,64,1,64,1105,1,351,4,331,1002,64,2,64,109,4,21107,41,42,0,1005,1017,369,4,357,1105,
            1,373,1001,64,1,64,1002,64,2,64,109,5,21101,42,0,-5,1008,1017,41,63,1005,63,397,1001,64,1,64,1106,0,399,4,379,1002,64,
            2,64,109,9,2106,0,-4,1106,0,417,4,405,1001,64,1,64,1002,64,2,64,109,-20,21108,43,43,0,1005,1011,435,4,423,1105,1,439,
            1001,64,1,64,1002,64,2,64,109,-15,2102,1,8,63,1008,63,34,63,1005,63,465,4,445,1001,64,1,64,1105,1,465,1002,64,2,64,109,
            3,1201,6,0,63,1008,63,28,63,1005,63,491,4,471,1001,64,1,64,1106,0,491,1002,64,2,64,109,18,21108,44,46,0,1005,1017,511,1001,
            64,1,64,1106,0,513,4,497,1002,64,2,64,109,12,1205,-8,527,4,519,1105,1,531,1001,64,1,64,1002,64,2,64,109,-17,1208,-3,32,63,
            1005,63,553,4,537,1001,64,1,64,1105,1,553,1002,64,2,64,109,-13,1208,10,31,63,1005,63,573,1001,64,1,64,1105,1,575,4,559,1002,
            64,2,64,109,17,2105,1,7,1105,1,593,4,581,1001,64,1,64,1002,64,2,64,109,-8,2107,19,-7,63,1005,63,615,4,599,1001,64,1,64,1105,1,615,1002,64,2,64,109,4,1206,8,
            629,4,621,1106,0,633,1001,64,1,64,1002,64,2,64,109,-2,2101,0,-6,63,1008,63,34,63,1005,63,655,4,639,1105,1,659,1001,64,1,64,1002,64,2,64,109,10,1205,
            0,671,1105,1,677,4,665,1001,64,1,64,1002,64,2,64,109,-21,2107,26,8,63,1005,63,693,1106,0,699,4,683,1001,64,1,64,1002,64,2,64,109,19,1201,-9,0,63,1008,63,
            30,63,1005,63,719,1105,1,725,4,705,1001,64,1,64,1002,64,2,64,109,9,1206,-6,741,1001,64,1,64,1106,0,743,4,731,1002,64,2,64,109,-5,2106,0,6,4,749,1001,64,1,
            64,1105,1,761,1002,64,2,64,109,-14,1202,-1,1,63,1008,63,27,63,1005,63,781,1105,1,787,4,767,1001,64,1,64,1002,64,2,64,109,1,21107,45,44,5,1005,1014,807,1001,
            64,1,64,1105,1,809,4,793,1002,
            64,2,64,109,8,21101,46,0,0,1008,1017,46,63,1005,63,835,4,815,1001,64,1,64,1106,0,835,1002,64,2,64,109,-26,2108,20,10,63,1005,63,857,4,841,1001,64,1,64,
            1106,0,857,1002,64,2,64,109,24,21102,47,1,-5,1008,1010,46,63,1005,63,881,1001,64,1,64,1106,0,883,4,863,1002,64,2,64,109,6,2105,1,3,4,889,1001,64,1,64,1105,
            1,901,4,64,99,21102,27,1,1,21101,915,0,0,1105,1,922,21201,1,29830,1,204,1,99,109,3,1207,-2,3,63,1005,63,
            964,21201,-2,-1,1,21101,0,942,0,1105,1,922,21202,1,1,-1,21201,-2,-3,1,21102,1,957,0,1105,1,922,22201,1,-1,-2,1105,1,968,21201,-2,0,-2,109,-3,2106,0,0
        ];
        let input = 1;
        let expected = 2745604242;
        let output = SpacePolice.day9SolvePartOne(startingState, input);
        let actual = output.output[0];
        expect(actual).toEqual(expected);
    });

});

describe("Day 9 Solve Part Two", () => {
    test("Actual Answer", () => {
        let startingState = [1102,34463338,34463338,63,1007,63,34463338,63,1005,63,53,1102,1,3,1000,109,988,209,12,9,1000,209,6,
            209,3,203,0,1008,1000,1,63,1005,63,65,1008,1000,2,63,1005,63,904,1008,1000,0,63,1005,63,58,4,25,104,0,99,4,0,104,0,99,
            4,17,104,0,99,0,0,1101,0,0,1020,1101,34,0,1004,1101,0,26,1008,1102,1,37,1011,1101,39,0,1018,1102,587,1,1022,1101,1,0,
            1021,1102,22,1,1012,1101,0,33,1014,1101,24,0,1016,1101,0,752,1029,1101,36,0,1002,1101,35,0,1006,1101,32,0,1009,1102,38,1,1003,
            1102,584,1,1023,1101,0,20,1001,1102,892,1,1025,1102,29,1,1000,1101,411,0,1026,1102,1,901,1024,1101,0,761,1028,1101,23,0,1017,1102,
            30,1,1013,1101,0,27,1015,1102,28,1,1005,1101,408,0,1027,1101,25,0,1007,1102,31,1,1019,1101,0,21,1010,109,5,1207,-2,39,63,1005,63,199,
            4,187,1105,1,203,1001,64,1,64,1002,64,2,64,109,12,21102,40,1,-1,1008,1016,40,63,1005,63,229,4,209,1001,64,1,64,1106,0,229,1002,64,2,64,
            109,-5,1207,-5,24,63,1005,63,249,1001,64,1,64,1106,0,251,4,235,1002,64,2,64,109,-14,2102,1,6,63,1008,63,32,63,1005,
            63,271,1106,0,277,4,257,1001,64,1,64,1002,64,2,64,109,2,1202,1,1,63,1008,63,20,63,1005,63,303,4,283,1001,64,1,64,
            1106,0,303,1002,64,2,64,109,7,2108,34,2,63,1005,63,319,1106,0,325,4,309,1001,64,1,64,1002,64,2,64,109,6,2101,0,-6,
            63,1008,63,24,63,1005,63,349,1001,64,1,64,1105,1,351,4,331,1002,64,2,64,109,4,21107,41,42,0,1005,1017,369,4,357,1105,
            1,373,1001,64,1,64,1002,64,2,64,109,5,21101,42,0,-5,1008,1017,41,63,1005,63,397,1001,64,1,64,1106,0,399,4,379,1002,64,
            2,64,109,9,2106,0,-4,1106,0,417,4,405,1001,64,1,64,1002,64,2,64,109,-20,21108,43,43,0,1005,1011,435,4,423,1105,1,439,
            1001,64,1,64,1002,64,2,64,109,-15,2102,1,8,63,1008,63,34,63,1005,63,465,4,445,1001,64,1,64,1105,1,465,1002,64,2,64,109,
            3,1201,6,0,63,1008,63,28,63,1005,63,491,4,471,1001,64,1,64,1106,0,491,1002,64,2,64,109,18,21108,44,46,0,1005,1017,511,1001,
            64,1,64,1106,0,513,4,497,1002,64,2,64,109,12,1205,-8,527,4,519,1105,1,531,1001,64,1,64,1002,64,2,64,109,-17,1208,-3,32,63,
            1005,63,553,4,537,1001,64,1,64,1105,1,553,1002,64,2,64,109,-13,1208,10,31,63,1005,63,573,1001,64,1,64,1105,1,575,4,559,1002,
            64,2,64,109,17,2105,1,7,1105,1,593,4,581,1001,64,1,64,1002,64,2,64,109,-8,2107,19,-7,63,1005,63,615,4,599,1001,64,1,64,1105,1,615,1002,64,2,64,109,4,1206,8,
            629,4,621,1106,0,633,1001,64,1,64,1002,64,2,64,109,-2,2101,0,-6,63,1008,63,34,63,1005,63,655,4,639,1105,1,659,1001,64,1,64,1002,64,2,64,109,10,1205,
            0,671,1105,1,677,4,665,1001,64,1,64,1002,64,2,64,109,-21,2107,26,8,63,1005,63,693,1106,0,699,4,683,1001,64,1,64,1002,64,2,64,109,19,1201,-9,0,63,1008,63,
            30,63,1005,63,719,1105,1,725,4,705,1001,64,1,64,1002,64,2,64,109,9,1206,-6,741,1001,64,1,64,1106,0,743,4,731,1002,64,2,64,109,-5,2106,0,6,4,749,1001,64,1,
            64,1105,1,761,1002,64,2,64,109,-14,1202,-1,1,63,1008,63,27,63,1005,63,781,1105,1,787,4,767,1001,64,1,64,1002,64,2,64,109,1,21107,45,44,5,1005,1014,807,1001,
            64,1,64,1105,1,809,4,793,1002,
            64,2,64,109,8,21101,46,0,0,1008,1017,46,63,1005,63,835,4,815,1001,64,1,64,1106,0,835,1002,64,2,64,109,-26,2108,20,10,63,1005,63,857,4,841,1001,64,1,64,
            1106,0,857,1002,64,2,64,109,24,21102,47,1,-5,1008,1010,46,63,1005,63,881,1001,64,1,64,1106,0,883,4,863,1002,64,2,64,109,6,2105,1,3,4,889,1001,64,1,64,1105,
            1,901,4,64,99,21102,27,1,1,21101,915,0,0,1105,1,922,21201,1,29830,1,204,1,99,109,3,1207,-2,3,63,1005,63,
            964,21201,-2,-1,1,21101,0,942,0,1105,1,922,21202,1,1,-1,21201,-2,-3,1,21102,1,957,0,1105,1,922,22201,1,-1,-2,1105,1,968,21201,-2,0,-2,109,-3,2106,0,0
        ];
        let input = 2;
        let expected = 51135;
        let output = SpacePolice.day9SolvePartTwo(startingState, input);
        let actual = output.output[0];
        expect(actual).toEqual(expected);
    });

});