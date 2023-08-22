const CrossedWires = {
    solvePartOne: (input) => {
        let wires = CrossedWires.convertInputToWires(input);
        return CrossedWires.findClosestIntersectionDistance(wires);
    },
    findClosestIntersectionDistance: (wires) => {
        let instruction = [];
        let row = 0;
        let col = 0;
        let wire1Map = {};
        let closestDistance;
        let currDistance;
        let coordStr = '';
        wires[0].forEach(move => {
            instruction = CrossedWires.convertMoveStringToInstruction(move);
            for(let idx = 1; idx <= instruction[1]; idx++) {
                if(instruction[0] === 'U') { row -= 1; }
                else if(instruction[0] === 'D') { row += 1; }
                else if(instruction[0] === 'L') { col -= 1; }
                else if(instruction[0] === 'R') { col += 1; }
                coordStr = `${row}-${col}`;
                if(wire1Map[coordStr] === undefined) {
                    wire1Map[coordStr] = [row,col];
                }
            }
        });

        row = 0;
        col = 0;
        steps = 0;
        wires[1].forEach(move => {
            instruction = CrossedWires.convertMoveStringToInstruction(move);
            for(let idx = 1; idx <= instruction[1]; idx++) {
                if(instruction[0] === 'U') { row -= 1; }
                else if(instruction[0] === 'D') { row += 1; }
                else if(instruction[0] === 'L') { col -= 1; }
                else if(instruction[0] === 'R') { col += 1; }
                coordStr = `${row}-${col}`;
                if(wire1Map[coordStr] !== undefined) {
                    // console.log("Found intersection at " + row + ", " + col);
                    currDistance = CrossedWires.calculateManhattanDifference([0,0], [row,col]);
                    // console.log("Distance: " + currDistance);
                    if(closestDistance === undefined || currDistance < closestDistance) {
                        closestDistance = currDistance;
                    }
                }
            }
        });
        return closestDistance;
        
    },
    solvePartTwo: (input) => {
        let wires = CrossedWires.convertInputToWires(input);
        return CrossedWires.findClosestIntersectionSteps(wires);
    },
    findClosestIntersectionSteps: (wires) => {
        let instruction = [];
        let row = 0;
        let col = 0;
        let steps = 0;
        let wire1Map = {};
        let intersection = {};
        let coordStr = '';
        let leastSteps;

        wires[0].forEach(move => {
            instruction = CrossedWires.convertMoveStringToInstruction(move);
            for(let idx = 1; idx <= instruction[1]; idx++) {
                steps++;
                if(instruction[0] === 'U') { row -= 1; }
                else if(instruction[0] === 'D') { row += 1; }
                else if(instruction[0] === 'L') { col -= 1; }
                else if(instruction[0] === 'R') { col += 1; }
                coordStr = `${row}-${col}`;
                if(wire1Map[coordStr] === undefined) {
                    wire1Map[coordStr] = steps;
                }
            }
        });

        row = 0;
        col = 0;
        steps = 0;
        wires[1].forEach(move => {
            instruction = CrossedWires.convertMoveStringToInstruction(move);
            for(let idx = 1; idx <= instruction[1]; idx++) {
                steps++;
                if(instruction[0] === 'U') { row -= 1; }
                else if(instruction[0] === 'D') { row += 1; }
                else if(instruction[0] === 'L') { col -= 1; }
                else if(instruction[0] === 'R') { col += 1; }
                coordStr = `${row}-${col}`;
                if(wire1Map[coordStr] !== undefined) {
                    if(intersection[coordStr] === undefined) {
                        intersection[coordStr] = wire1Map[coordStr] + steps;
                    } else {
                        intersection[coordStr] = Math.min(intersection[coordStr], wire1Map[coordStr]+steps);
                    }

                    if(leastSteps === undefined || leastSteps > intersection[coordStr]) {
                        leastSteps = intersection[coordStr];
                    }
                }
            }
        });
        return leastSteps;        
    },
    convertInputToWires: (input) => {
        let splitWires = input.split("\n");
        let wireOne = splitWires[0].trim().split(",");
        let wireTwo = splitWires[1].trim().split(",");
        return [wireOne, wireTwo];
    },
    convertMoveStringToInstruction: (move) =>{
        return [move[0], parseInt(move.slice(1))];
    },
    calculateManhattanDifference: (vector1, vector2) => {
        return Math.abs(vector1[0]-vector2[0])+Math.abs(vector1[1]-vector2[1]);
    }
    
};

module.exports = CrossedWires;