const MonitoringStation = require ('../solvers/day-10');


function solvePartOne() {
    let input = `.#..#
    .....
    #####
    ....#
    ...##`;
    console.log(MonitoringStation.solvePartOne(input));
}

solvePartOne();