const Day12 = require('../solvers/day-12');
const BodyProblem = Day12.BodyProblem;
const Moon = Day12.Moon;
const Vector3 = Day12.Vector3;

describe("Parse Input", () => {
    test("Moon 1", () => {
        let input = `<x=-1, y=0, z=2>
            <x=2, y=-10, z=-7>
            <x=4, y=-8, z=8>
            <x=3, y=5, z=-1>`;
        let moons = BodyProblem.inputToMoons(input);
        let expectedVector = new Vector3(-1,0,2);
        let actual = moons[0].position.equals(expectedVector);
        expect(actual).toEqual(true);
    });

    test("Moon 2", () => {
        let input = `<x=-1, y=0, z=2>
            <x=2, y=-10, z=-7>
            <x=4, y=-8, z=8>
            <x=3, y=5, z=-1>`;
        let moons = BodyProblem.inputToMoons(input);
        let expectedVector = new Vector3(2,-10,-7);
        let actual = moons[1].position.equals(expectedVector);
        expect(actual).toEqual(true);
    });

    test("Moon 3", () => {
        let input = `<x=-1, y=0, z=2>
            <x=2, y=-10, z=-7>
            <x=4, y=-8, z=8>
            <x=3, y=5, z=-1>`;
        let moons = BodyProblem.inputToMoons(input);
        let expectedVector = new Vector3(4,-8,8);
        let actual = moons[2].position.equals(expectedVector);
        expect(actual).toEqual(true);
    });

    test("Moon 4", () => {
        let input = `<x=-1, y=0, z=2>
            <x=2, y=-10, z=-7>
            <x=4, y=-8, z=8>
            <x=3, y=5, z=-1>`;
        let moons = BodyProblem.inputToMoons(input);
        let expectedVector = new Vector3(3,5,-1);
        let actual = moons[3].position.equals(expectedVector);
        expect(actual).toEqual(true);
    });
});

describe("Simulate Motion", () => {
    test("Moon 1", () => {
        let input = `<x=-1, y=0, z=2>
            <x=2, y=-10, z=-7>
            <x=4, y=-8, z=8>
            <x=3, y=5, z=-1>`;
        let moons = BodyProblem.inputToMoons(input);
        moons = BodyProblem.simulateMotion(moons, 10);
        let expectedVector = new Vector3(2,1,-3);
        let actual = moons[0].position.equals(expectedVector);
        expect(actual).toEqual(true);
    });

    test("Moon 2", () => {
        let input = `<x=-1, y=0, z=2>
            <x=2, y=-10, z=-7>
            <x=4, y=-8, z=8>
            <x=3, y=5, z=-1>`;
        let moons = BodyProblem.inputToMoons(input);
        moons = BodyProblem.simulateMotion(moons, 10);
        let expectedVector = new Vector3(1,-8,0);
        let actual = moons[1].position.equals(expectedVector);
        expect(actual).toEqual(true);
    });

    test("Moon 3", () => {
        let input = `<x=-1, y=0, z=2>
            <x=2, y=-10, z=-7>
            <x=4, y=-8, z=8>
            <x=3, y=5, z=-1>`;
        let moons = BodyProblem.inputToMoons(input);
        moons = BodyProblem.simulateMotion(moons, 10);
        let expectedVector = new Vector3(3,-6,1);
        let actual = moons[2].position.equals(expectedVector);
        expect(actual).toEqual(true);
    });

    test("Moon 4", () => {
        let input = `<x=-1, y=0, z=2>
            <x=2, y=-10, z=-7>
            <x=4, y=-8, z=8>
            <x=3, y=5, z=-1>`;
        let moons = BodyProblem.inputToMoons(input);
        moons = BodyProblem.simulateMotion(moons, 10);
        let expectedVector = new Vector3(2,0,4);
        let actual = moons[3].position.equals(expectedVector);
        expect(actual).toEqual(true);
    });
});

describe("Solve Part One", () => {
    test("Sample 1", () => {
        let input = `<x=-1, y=0, z=2>
            <x=2, y=-10, z=-7>
            <x=4, y=-8, z=8>
            <x=3, y=5, z=-1>`;
        let actual = BodyProblem.solvePartOne(input, 10);
        let expected = 179;
        expect(actual).toEqual(expected);
    });

    test("Sample 2", () => {
        let input = `<x=-8, y=-10, z=0>
        <x=5, y=5, z=10>
        <x=2, y=-7, z=3>
        <x=9, y=-8, z=-3>`;
        let actual = BodyProblem.solvePartOne(input, 100);
        let expected = 1940;
        expect(actual).toEqual(expected);
    });

    test("Actual", () => {
        let input = `<x=-16, y=15, z=-9>
        <x=-14, y=5, z=4>
        <x=2, y=0, z=6>
        <x=-3, y=18, z=9>`;
        let actual = BodyProblem.solvePartOne(input, 1000);
        let expected = 10664;
        expect(actual).toEqual(expected);
    });
});


describe("Solve Part Two", () => {
    test("Sample 1", () => {
        let input = `<x=-1, y=0, z=2>
        <x=2, y=-10, z=-7>
        <x=4, y=-8, z=8>
        <x=3, y=5, z=-1>`;
        let actual = BodyProblem.solvePartTwo(input);
        let expected = 2772;
        expect(actual).toEqual(expected);
    });

    test("Sample 2", () => {
        let input = `<x=-8, y=-10, z=0>
        <x=5, y=5, z=10>
        <x=2, y=-7, z=3>
        <x=9, y=-8, z=-3>`;
        let actual = BodyProblem.solvePartTwo(input);
        let expected = 4686774924;
        expect(actual).toEqual(expected);
    });

    test("Actual", () => {
        let input = `<x=-16, y=15, z=-9>
        <x=-14, y=5, z=4>
        <x=2, y=0, z=6>
        <x=-3, y=18, z=9>`;
        let actual = BodyProblem.solvePartTwo(input);
        let expected = 303459551979256;
        expect(actual).toEqual(expected);
    });
});