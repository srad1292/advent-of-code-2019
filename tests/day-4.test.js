const SecureContainer = require("../solvers/day-4");

describe("Convert number to digits", () => {
    test("Six digit number", () => {
        let actual = SecureContainer.numberToDigits(353096);
        let expected = [3,5,3,0,9,6];
        expect(actual).toStrictEqual(expected);
    });
});

describe("Solve Part One", () => {
    test("Simple Sample", () => {
        // 111111, 111112, 111113, 111114, 111115, 111116, 111117, 111118, 111119 = 9
        let actual = SecureContainer.solvePartOne(111110,111120);
        let expected = 9;
        expect(actual).toEqual(expected);
    });

    test("Simple Sample Two", () => {
        // 111111, 111112, 111113, 111114, 111115, 111116, 111117, 111118, 111119 = 9
        // 111122, 111123, 111124, 111125, 111126, 111127, 111128, 111129 = 8
        // 111133, 111134, 111135, 111136, 111137, 111138, 111139 = 7
        let actual = SecureContainer.solvePartOne(111110,111140);
        let expected = 24;
        expect(actual).toEqual(expected);
    });

    test("Smaller numbers for easier test", () => {
        // 111, 112, 113, 114, 115, 116, 117, 118, 119
        // 122,
        // 133,
        // 144,
        let actual = SecureContainer.solvePartOne(110,150);
        let expected = 12;
        expect(actual).toEqual(expected);
    });

    test("Four digits", () => {
        // 1111, 1112, 1113, 1114, 1115, 1116, 1117, 1118, 1119
        // 1122, 1123, 1124, 1125, 1126, 1127, 1128, 1129
        // 1133, 1134, 1135, 1136, 1137, 1138, 1139
        // 1144, 1145, 1146, 1147, 1148, 1149
        let actual = SecureContainer.solvePartOne(1110,1150);
        let expected = 30;
        expect(actual).toEqual(expected);
    });

    test("Actual Input", () => {
        let actual = SecureContainer.solvePartOne(353096,843212);
        let expected = 579;
        expect(actual).toEqual(expected);
    });

    
});


describe("Solve Part Two", () => {
    test("Simple Sample", () => {
        // All have lots of 1s in a row -> 0
        let actual = SecureContainer.solvePartTwo(111110,111120);
        let expected = 0;
        expect(actual).toEqual(expected);
    });

    test("Simple Sample Two", () => {
        // 111122
        // 111133
        let actual = SecureContainer.solvePartTwo(111110,111140);
        let expected = 2;
        expect(actual).toEqual(expected);
    });

    test("Smaller numbers for easier test", () => {
        // 112, 113, 114, 115, 116, 117, 118, 119
        // 122,
        // 133,
        // 144,
        let actual = SecureContainer.solvePartTwo(110,150);
        let expected = 11;
        expect(actual).toEqual(expected);
    });

    test("Four digits", () => {
        // 1122, 1123, 1124, 1125, 1126, 1127, 1128, 1129
        // 1133, 1134, 1135, 1136, 1137, 1138, 1139
        // 1144, 1145, 1146, 1147, 1148, 1149
        let actual = SecureContainer.solvePartTwo(1110,1150);
        let expected = 21;
        expect(actual).toEqual(expected);
    });

    test("Actual Input", () => {
        let actual = SecureContainer.solvePartTwo(353096,843212);
        let expected = 358;
        expect(actual).toEqual(expected);
    });

    
});