const AlarmProgram = require('../solvers/day-2');

describe("Function: solve", () => {
    test("Sample One", () => {
        let starting = [1,0,0,0,99];
        let expected = [2,0,0,0,99];
        let actual = AlarmProgram.solve(starting);
        expect(actual).toStrictEqual(expected);
    });

    test("Sample Two", () => {
        let starting = [2,3,0,3,99];
        let expected = [2,3,0,6,99];
        let actual = AlarmProgram.solve(starting);
        expect(actual).toStrictEqual(expected);
    });

    test("Sample Three", () => {
        let starting = [2,4,4,5,99,0];
        let expected = [2,4,4,5,99,9801];
        let actual = AlarmProgram.solve(starting);
        expect(actual).toStrictEqual(expected);
    });

    test("Sample Four", () => {
        let starting = [1,1,1,4,99,5,6,0,99];
        let expected = [30,1,1,4,2,5,6,0,99];
        let actual = AlarmProgram.solve(starting);
        expect(actual).toStrictEqual(expected);
    });
});

describe("Solution to problem one", () => {
    test("Get value of first index after running problem state", () => {
        let starting = [
            1,12,2,3,1,1,2,3,1,3,4,3,1,5,0,3,2,6,1,19,1,19,5,23,2,9,23,
            27,1,5,27,31,1,5,31,35,1,35,13,39,1,39,9,43,1,5,43,47,1,47,
            6,51,1,51,13,55,1,55,9,59,1,59,13,63,2,63,13,67,1,67,10,71,1,
            71,6,75,2,10,75,79,2,10,79,83,1,5,83,87,2,6,87,91,1,91,6,95,1,
            95,13,99,2,99,13,103,1,103,9,107,1,10,107,111,2,111,13,115,1,10,
            115,119,1,10,119,123,2,13,123,127,2,6,127,131,1,13,131,
            135,1,135,2,139,1,139,6,0,99,2,0,14,0
        ];
        let result = AlarmProgram.solve(starting);
        expect(result[0]).toEqual(4090689);
    });
});

describe("Solution to problem two", () => {
    test("Get value of 100*noun+verb for noun and verb that gives target", () => {
        let starting = [
            1,12,2,3,1,1,2,3,1,3,4,3,1,5,0,3,2,6,1,19,1,19,5,23,2,9,23,
            27,1,5,27,31,1,5,31,35,1,35,13,39,1,39,9,43,1,5,43,47,1,47,
            6,51,1,51,13,55,1,55,9,59,1,59,13,63,2,63,13,67,1,67,10,71,1,
            71,6,75,2,10,75,79,2,10,79,83,1,5,83,87,2,6,87,91,1,91,6,95,1,
            95,13,99,2,99,13,103,1,103,9,107,1,10,107,111,2,111,13,115,1,10,
            115,119,1,10,119,123,2,13,123,127,2,6,127,131,1,13,131,
            135,1,135,2,139,1,139,6,0,99,2,0,14,0
        ];
        let actual = AlarmProgram.solvePartTwo([...starting], 19690720, 0, 99);
        let expected = 7733;
        expect(actual).toEqual(expected);
    });
});


