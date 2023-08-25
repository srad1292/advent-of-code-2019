const SunnyAsteroids = require('../solvers/day-5');


describe("Convert opcode to list of operation and param mode", () => {
    test("Sample One", () => {
        const opcode = 1002;
        const expected = [2, 0, 1,0,0];
        const actual = SunnyAsteroids.opcodeToList(opcode);
        expect(actual).toStrictEqual(expected);
    });

    test("Sample Two", () => {
        const opcode = 10103;
        const expected = [3, 1, 0, 1,0,0];
        const actual = SunnyAsteroids.opcodeToList(opcode);
        expect(actual).toStrictEqual(expected);
    });

    test("Sample One", () => {
        const opcode = 99;
        const expected = [99,0,0];
        const actual = SunnyAsteroids.opcodeToList(opcode);
        expect(actual).toStrictEqual(expected);
    });
});

describe("Inputs from day-2 still work", () => {
    test("Sample One", () => {
        let starting = [1,0,0,0,99];
        let expected = [2,0,0,0,99];
        let actual = SunnyAsteroids.intCode(starting,1);
        expect(actual.state).toStrictEqual(expected);
    });

    test("Sample Two", () => {
        let starting = [2,3,0,3,99];
        let expected = [2,3,0,6,99];
        let actual = SunnyAsteroids.intCode(starting,1);
        expect(actual.state).toStrictEqual(expected);
    });

    test("Sample Three", () => {
        let starting = [2,4,4,5,99,0];
        let expected = [2,4,4,5,99,9801];
        let actual = SunnyAsteroids.intCode(starting,1);
        expect(actual.state).toStrictEqual(expected);
    });

    test("Sample Four", () => {
        let starting = [1,1,1,4,99,5,6,0,99];
        let expected = [30,1,1,4,2,5,6,0,99];
        let actual = SunnyAsteroids.intCode(starting,1);
        expect(actual.state).toStrictEqual(expected);
    });

    test("Solution One", () => {
        let starting = [
            1,12,2,3,1,1,2,3,1,3,4,3,1,5,0,3,2,6,1,19,1,19,5,23,2,9,23,
            27,1,5,27,31,1,5,31,35,1,35,13,39,1,39,9,43,1,5,43,47,1,47,
            6,51,1,51,13,55,1,55,9,59,1,59,13,63,2,63,13,67,1,67,10,71,1,
            71,6,75,2,10,75,79,2,10,79,83,1,5,83,87,2,6,87,91,1,91,6,95,1,
            95,13,99,2,99,13,103,1,103,9,107,1,10,107,111,2,111,13,115,1,10,
            115,119,1,10,119,123,2,13,123,127,2,6,127,131,1,13,131,
            135,1,135,2,139,1,139,6,0,99,2,0,14,0
        ];
        let expected = 4090689;
        let actual = SunnyAsteroids.intCode(starting,1);
        expect(actual.state[0]).toStrictEqual(expected);
    });
});

describe("Add and Mult With Imm Mode", () => {
    test("Sample One - Add", () => {
        let starting = [1001,4,3,4,96];
        let expected = [1001,4,3,4,99];
        let actual = SunnyAsteroids.intCode(starting,1);
        expect(actual.state).toStrictEqual(expected);
    });

    test("Sample Two - Add", () => {
        let starting = [1101,100,-1,4,0];
        let expected = [1101,100,-1,4,99];
        let actual = SunnyAsteroids.intCode(starting,1);
        expect(actual.state).toStrictEqual(expected);});

    test("Sample One - Mult", () => {
        let starting = [1002,4,3,4,33];
        let expected = [1002,4,3,4,99];
        let actual = SunnyAsteroids.intCode(starting,1);
        expect(actual.state).toStrictEqual(expected);
    });
});

describe("Save Op", () => {
    test("Sample One", () => {
        let starting = [3,0,3,3,99];
        let expected = [1,0,3,1,99];
        let actual = SunnyAsteroids.intCode(starting,1);
        expect(actual.state).toStrictEqual(expected);
    });

    test("Sample Two", () => {
        let starting = [3,4,1102,5,0,0,99];
        let expected = [15,4,1102,5,3,0,99];
        let actual = SunnyAsteroids.intCode(starting,3);
        expect(actual.state).toStrictEqual(expected);
    });
});

describe("Return Op", () => {
    test("Sample One", () => {
        let starting = [2,2,4,0,4,0,99]; //[16,2,4,0,4,0,99]
        let expected = [16]; // item[0]
        let actual = SunnyAsteroids.intCode(starting,1);
        expect(actual.output).toStrictEqual(expected);
    });

    test("Sample One - Immediate Mode", () => {
        let starting = [2,2,4,0,104,3,104,22,99]; //[16,2,4,0,4,3,99]
        let expected = [3,22]; // value of param after 104
        let actual = SunnyAsteroids.intCode(starting,1);
        expect(actual.output).toStrictEqual(expected);
    });
});

describe("Solve Part One", () => {
    test("Solution", () => {
        const startingState = [
            3,225,1,225,6,6,1100,1,238,225,104,0,1102,89,49,225,1102,35,88,224,101,-3080,224,224,
            4,224,102,8,223,223,1001,224,3,224,1,223,224,223,1101,25,33,224,1001,224,-58,224,4,224,
            102,8,223,223,101,5,224,224,1,223,224,223,1102,78,23,225,1,165,169,224,101,-80,224,224,4,224,
            102,8,223,223,101,7,224,224,1,224,223,223,101,55,173,224,1001,224,-65,224,4,224,1002,223,8,
            223,1001,224,1,224,1,223,224,223,2,161,14,224,101,-3528,224,224,4,224,1002,223,8,223,1001,
            224,7,224,1,224,223,223,1002,61,54,224,1001,224,-4212,224,4,224,102,8,223,223,1001,224,1,
            224,1,223,224,223,1101,14,71,225,1101,85,17,225,1102,72,50,225,1102,9,69,225,1102,71,53,225,
            1101,10,27,225,1001,158,34,224,101,-51,224,224,4,224,102,8,223,223,101,6,224,224,1,223,224,223,
            102,9,154,224,101,-639,224,224,4,224,102,8,223,223,101,2,224,224,1,224,223,223,4,223,99,0,0,0,677,
            0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,
            1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,
            1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,
            0,0,1105,1,99999,108,226,226,224,102,2,223,223,1006,224,329,101,1,223,223,1007,677,677,224,1002,223,2,
            223,1005,224,344,1001,223,1,223,8,226,677,224,1002,223,2,223,1006,224,359,1001,223,1,223,108,226,677,224,
            1002,223,2,223,1005,224,374,1001,223,1,223,107,226,677,224,102,2,223,223,1006,224,389,101,1,223,223,1107,
            226,226,224,1002,223,2,223,1005,224,404,1001,223,1,223,1107,677,226,224,102,2,223,223,1005,224,419,101,1,
            223,223,1007,226,226,224,102,2,223,223,1006,224,434,1001,223,1,223,1108,677,226,224,1002,223,2,223,1005,224,
            449,101,1,223,223,1008,226,226,224,102,2,223,223,1005,224,464,101,1,223,223,7,226,677,224,102,2,223,223,1006,
            224,479,101,1,223,223,1008,226,677,224,1002,223,2,223,1006,224,494,101,1,223,223,1107,226,677,224,1002,223,2,223,1005,
            224,509,1001,223,1,223,1108,226,226,224,1002,223,2,223,1006,224,524,101,1,223,223,7,226,226,224,102,2,223,223,1006,224,
            539,1001,223,1,223,107,226,226,224,102,2,223,223,1006,224,554,101,1,223,223,107,677,677,224,102,2,223,223,1006,224,569,
            101,1,223,223,1008,677,677,224,1002,223,2,223,1006,224,584,1001,223,1,223,8,677,226,224,1002,223,2,223,1005,224,599,101,
            1,223,223,1108,226,677,224,1002,223,2,223,1005,224,614,101,1,223,223,108,677,677,224,102,2,223,223,1005,224,629,1001,223,
            1,223,8,677,677,224,1002,223,2,223,1005,224,644,1001,223,1,223,7,677,226,224,102,2,223,223,1006,224,659,1001,223,1,223,
            1007,226,677,224,102,2,223,223,1005,224,674,101,1,223,223,4,223,99,226
        ];
        const input = 1;
        const actual = SunnyAsteroids.solvePartOne(startingState, input);
        const expected = 7839346;
        expect(actual).toStrictEqual(expected);
    });
});

describe("Jump Test", () => {
    test("Sample One - Input 0", () => {
        let startingState = [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9];
        let input = 0;
        let expected = [0];
        let actual = SunnyAsteroids.intCode(startingState, input);
        expect(actual.output).toStrictEqual(expected);
    });

    test("Sample One - Input -3", () => {
        let startingState = [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9];
        let input = -3;
        let expected = [1];
        let actual = SunnyAsteroids.intCode(startingState, input);
        expect(actual.output).toStrictEqual(expected);
    });

    test("Sample One - Input 4", () => {
        let startingState = [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9];
        let input = 4;
        let expected = [1];
        let actual = SunnyAsteroids.intCode(startingState, input);
        expect(actual.output).toStrictEqual(expected);
    });

    test("Sample Two - Input 0", () => {
        let startingState = [3,3,1105,-1,9,1101,0,0,12,4,12,99,1];
        let input = 0;
        let expected = [0];
        let actual = SunnyAsteroids.intCode(startingState, input);
        expect(actual.output).toStrictEqual(expected);
    });

    test("Sample Two - Input -3", () => {
        let startingState = [3,3,1105,-1,9,1101,0,0,12,4,12,99,1];
        let input = -3;
        let expected = [1];
        let actual = SunnyAsteroids.intCode(startingState, input);
        expect(actual.output).toStrictEqual(expected);
    });

    test("Sample Two - Input 4", () => {
        let startingState = [3,3,1105,-1,9,1101,0,0,12,4,12,99,1];
        let input = 4;
        let expected = [1];
        let actual = SunnyAsteroids.intCode(startingState, input);
        expect(actual.output).toStrictEqual(expected);
    });

    test("Large Sample - Input < 8", () => {
        let startingState = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
            1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
            999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99];
        let input = 5;
        let expected = [999];
        let actual = SunnyAsteroids.intCode(startingState, input);
        expect(actual.output).toStrictEqual(expected);
    });

    test("Large Sample - Input === 8", () => {
        let startingState = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
            1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
            999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99];
        let input = 8;
        let expected = [1000];
        let actual = SunnyAsteroids.intCode(startingState, input);
        expect(actual.output).toStrictEqual(expected);
    });

    test("Large Sample - Input > 8", () => {
        let startingState = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
            1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
            999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99];
        let input = 10;
        let expected = [1001];
        let actual = SunnyAsteroids.intCode(startingState, input);
        expect(actual.output).toStrictEqual(expected);
    });
});

describe("Solve Part Two", () => {
    test("Solution", () => {
        const startingState = [
            3,225,1,225,6,6,1100,1,238,225,104,0,1102,89,49,225,1102,35,88,224,101,-3080,224,224,
            4,224,102,8,223,223,1001,224,3,224,1,223,224,223,1101,25,33,224,1001,224,-58,224,4,224,
            102,8,223,223,101,5,224,224,1,223,224,223,1102,78,23,225,1,165,169,224,101,-80,224,224,4,224,
            102,8,223,223,101,7,224,224,1,224,223,223,101,55,173,224,1001,224,-65,224,4,224,1002,223,8,
            223,1001,224,1,224,1,223,224,223,2,161,14,224,101,-3528,224,224,4,224,1002,223,8,223,1001,
            224,7,224,1,224,223,223,1002,61,54,224,1001,224,-4212,224,4,224,102,8,223,223,1001,224,1,
            224,1,223,224,223,1101,14,71,225,1101,85,17,225,1102,72,50,225,1102,9,69,225,1102,71,53,225,
            1101,10,27,225,1001,158,34,224,101,-51,224,224,4,224,102,8,223,223,101,6,224,224,1,223,224,223,
            102,9,154,224,101,-639,224,224,4,224,102,8,223,223,101,2,224,224,1,224,223,223,4,223,99,0,0,0,677,
            0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,
            1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,
            1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,
            0,0,1105,1,99999,108,226,226,224,102,2,223,223,1006,224,329,101,1,223,223,1007,677,677,224,1002,223,2,
            223,1005,224,344,1001,223,1,223,8,226,677,224,1002,223,2,223,1006,224,359,1001,223,1,223,108,226,677,224,
            1002,223,2,223,1005,224,374,1001,223,1,223,107,226,677,224,102,2,223,223,1006,224,389,101,1,223,223,1107,
            226,226,224,1002,223,2,223,1005,224,404,1001,223,1,223,1107,677,226,224,102,2,223,223,1005,224,419,101,1,
            223,223,1007,226,226,224,102,2,223,223,1006,224,434,1001,223,1,223,1108,677,226,224,1002,223,2,223,1005,224,
            449,101,1,223,223,1008,226,226,224,102,2,223,223,1005,224,464,101,1,223,223,7,226,677,224,102,2,223,223,1006,
            224,479,101,1,223,223,1008,226,677,224,1002,223,2,223,1006,224,494,101,1,223,223,1107,226,677,224,1002,223,2,223,1005,
            224,509,1001,223,1,223,1108,226,226,224,1002,223,2,223,1006,224,524,101,1,223,223,7,226,226,224,102,2,223,223,1006,224,
            539,1001,223,1,223,107,226,226,224,102,2,223,223,1006,224,554,101,1,223,223,107,677,677,224,102,2,223,223,1006,224,569,
            101,1,223,223,1008,677,677,224,1002,223,2,223,1006,224,584,1001,223,1,223,8,677,226,224,1002,223,2,223,1005,224,599,101,
            1,223,223,1108,226,677,224,1002,223,2,223,1005,224,614,101,1,223,223,108,677,677,224,102,2,223,223,1005,224,629,1001,223,
            1,223,8,677,677,224,1002,223,2,223,1005,224,644,1001,223,1,223,7,677,226,224,102,2,223,223,1006,224,659,1001,223,1,223,
            1007,226,677,224,102,2,223,223,1005,224,674,101,1,223,223,4,223,99,226
        ];
        const input = 5;
        const actual = SunnyAsteroids.solvePartOne(startingState, input);
        const expected = 447803;
        expect(actual).toStrictEqual(expected);
    });
});