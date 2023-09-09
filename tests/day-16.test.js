const FFT = require("../solvers/day-16");

describe("Input to Array", () => {
    test("Length of array matches length of string", () => {
        let actual = FFT.inputStrToArr("12345678").length;
        let expected = 8;
        expect(actual).toEqual(expected);
    });

    test("Elements are numbers", () => {
        let actual = Number.isInteger(FFT.inputStrToArr("12345678")[0]);
        let expected = true;
        expect(actual).toEqual(expected);
    });
});

describe("Build Repeating Pattern", () => {
    test("Sample One - Phase One", () => {
        let actual = FFT.buildRepeatingPattern([0, 1, 0, -1], 1);
        let expected = [0,1,0,-1];
        expect(actual).toStrictEqual(expected);
    });

    test("Sample Two - Phase Two", () => {
        let actual = FFT.buildRepeatingPattern([0, 1, 0, -1], 2);
        let expected = [0,0,1,1,0,0,-1,-1];
        expect(actual).toStrictEqual(expected);
    });

    test("Sample Two - Phase Three", () => {
        let actual = FFT.buildRepeatingPattern([0, 1, 0, -1], 3);
        let expected = [0,0,0,1,1,1,0,0,0,-1,-1,-1];
        expect(actual).toStrictEqual(expected);
    });

    test("Sample Two - Phase Four", () => {
        let actual = FFT.buildRepeatingPattern([0, 1, 0, -1], 4);
        let expected = [0,0,0,0,1,1,1,1,0,0,0,0,-1,-1,-1,-1];
        expect(actual).toStrictEqual(expected);
    });
});

describe("Solve Part One", () => {
    test("Sample One - 1 phase", () => {
        let actual = FFT.solvePartOne("12345678", [0, 1, 0, -1], 1);
        let expected = [4,8,2,2,6,1,5,8];
        expect(actual).toStrictEqual(expected);
    });

    test("Sample One - 2 phases", () => {
        let actual = FFT.solvePartOne("12345678", [0, 1, 0, -1], 2);
        let expected = [3,4,0,4,0,4,3,8];
        expect(actual).toStrictEqual(expected);
    });

    test("Sample One - 3 phases", () => {
        let actual = FFT.solvePartOne("12345678", [0, 1, 0, -1], 3);
        let expected = [0,3,4,1,5,5,1,8];
        expect(actual).toStrictEqual(expected);
    });

    test("Sample One - 4 phases", () => {
        let actual = FFT.solvePartOne("12345678", [0, 1, 0, -1], 4);
        let expected = [0,1,0,2,9,4,9,8];
        expect(actual).toStrictEqual(expected);
    });

    test("Sample Two - 100 phases", () => {
        let actual = FFT.solvePartOne("80871224585914546619083218645595", [0, 1, 0, -1], 100);
        let expected = [2,4,1,7,6,1,7,6];
        expect(actual).toStrictEqual(expected);
    });

    test("Sample Three - 100 phases", () => {
        let actual = FFT.solvePartOne("19617804207202209144916044189917", [0, 1, 0, -1], 100);
        let expected = [7,3,7,4,5,4,1,8];
        expect(actual).toStrictEqual(expected);
    });

    test("Sample Four - 100 phases", () => {
        let actual = FFT.solvePartOne("69317163492948606335995924319873", [0, 1, 0, -1], 100);
        let expected = [5,2,4,3,2,1,3,3];
        expect(actual).toStrictEqual(expected);
    });

    test("Actual - 100 phases", () => {
        let actual = FFT.solvePartOne("59705379150220188753316412925237003623341873502562165618681895846838956306026981091618902964505317589975353803891340688726319912072762197208600522256226277045196745275925595285843490582257194963750523789260297737947126704668555847149125256177428007606338263660765335434914961324526565730304103857985860308906002394989471031058266433317378346888662323198499387391755140009824186662950694879934582661048464385141787363949242889652092761090657224259182589469166807788651557747631571357207637087168904251987880776566360681108470585488499889044851694035762709053586877815115448849654685763054406911855606283246118699187059424077564037176787976681309870931", [0, 1, 0, -1], 100);
        let expected = [9, 0, 7, 4, 4, 7, 1, 4];
        expect(actual).toStrictEqual(expected);
    });
});