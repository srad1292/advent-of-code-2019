const BodyProblem = require('../solvers/day-12');


function solvePartOne() {
    let input = `<x=-16, y=15, z=-9>
    <x=-14, y=5, z=4>
    <x=2, y=0, z=6>
    <x=-3, y=18, z=9>`;

    BodyProblem.solvePartOne(input);
}

solvePartOne();