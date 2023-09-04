const Day12 = require('../solvers/day-12');
const BodyProblem = Day12.BodyProblem;


function solvePartOne() {
    let testInput = `<x=-1, y=0, z=2>
    <x=2, y=-10, z=-7>
    <x=4, y=-8, z=8>
    <x=3, y=5, z=-1>`;

    let testInput2 = `<x=-8, y=-10, z=0>
    <x=5, y=5, z=10>
    <x=2, y=-7, z=3>
    <x=9, y=-8, z=-3>`;
    
    let input = `<x=-16, y=15, z=-9>
    <x=-14, y=5, z=4>
    <x=2, y=0, z=6>
    <x=-3, y=18, z=9>`;

    let energyOfSystem = BodyProblem.solvePartOne(input, 1000);
    console.log(energyOfSystem);
}

solvePartOne();

function solvePartTwo() {
    let testInput = `<x=-1, y=0, z=2>
    <x=2, y=-10, z=-7>
    <x=4, y=-8, z=8>
    <x=3, y=5, z=-1>`;

    let testInput2 = `<x=-8, y=-10, z=0>
    <x=5, y=5, z=10>
    <x=2, y=-7, z=3>
    <x=9, y=-8, z=-3>`;
    
    let input = `<x=-16, y=15, z=-9>
    <x=-14, y=5, z=4>
    <x=2, y=0, z=6>
    <x=-3, y=18, z=9>`;

    let stepsForRepeat = BodyProblem.solvePartTwo(input, 4686774927);
    console.log(stepsForRepeat);
}

// 4686774924
// 55151147929308720000

solvePartTwo();