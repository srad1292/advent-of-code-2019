const MonitoringStation = {

    //coordinates are col/row so 0,0 is top left and 1,0 is directly to the right of that
    // # = asteroid
    // . = empty
    Asteroid: '#',
    Empty: '.',
    Blocked: 'x',
    debugRow: 4,
    debugCol: 3,
    shouldDebug: false,


    // for each asteroid A, go through every other spot
    // if spot is asteroid B, find lcd distance between x/y
    // go through each location from A using lcd steps and mark any after the first one as blocked 
    // go through each location and count visible asteroids to store in solution
    solvePartOne: (input) => {
        let chart = MonitoringStation.convertInputToChart(input);
        if(MonitoringStation.shouldDebug) {
            console.log("CHART");
            console.log(chart);
        }
        
        let visibleCounts = MonitoringStation.countVisibleAsteroids(chart); 
        if(MonitoringStation.shouldDebug) {
            console.log("\nVISIBLE COUNTS");
            console.log(visibleCounts);
        }
        
        let mostVisibleAsteroids = MonitoringStation.mostVisibleAsteroids(visibleCounts);
        return mostVisibleAsteroids;
    },
    convertInputToChart: (input) => {
        let chart = [];
        let row = [];
        for(let idx = 0; idx < input.length; idx++) {
            if(input[idx] === ' ') {
                continue;
            }
            else if(input[idx] === '\n') {
                chart.push(row);
                row = [];
            }
            else if(idx === input.length-1 && input[idx] !== '\n') {
                row.push(input[idx]);
                chart.push(row);
            } else {
                row.push(input[idx]);
            }
        }
        return chart;
    },
    countVisibleAsteroids: (chart) => {
        let copy = [];
        let visibleCounts = MonitoringStation.copyChart(chart);
        let gcd = 0;
        let rowChange, colChange;
        let startRow, startCol;
        let firstFind = true;
        for(let rowA = 0; rowA < chart.length; rowA++) {
            for(let colA = 0; colA < chart[0].length; colA++) {
                if(chart[rowA][colA] === MonitoringStation.Empty) {
                    visibleCounts[rowA][colA] = 0;
                    continue;
                }
                visibleCounts[rowA][colA] = 0;
                copy = MonitoringStation.copyChart(chart);
                for(let rowB = 0; rowB < chart.length; rowB++) {
                    for(let colB = 0; colB < chart[0].length; colB++) {
                        if(colB === colA && rowB === rowA) {
                            continue;
                        }
                        firstFind = true;
                        // Could add an || === Blocked as an assumption that if
                        // something is marked as blocked, every other one in that pattern already is
                        // I will get it working without that and then add it in to test
                        if(chart[rowB][colB] === MonitoringStation.Empty) {
                            continue;
                        }
                        gcd = MonitoringStation.gcd(rowB-rowA, colB-colA);
                        rowChange = Math.floor(Math.abs(rowB-rowA)/gcd);
                        colChange = Math.floor(Math.abs(colB-colA)/gcd);
                        startRow = rowB < rowA ? rowA-rowChange : rowA+rowChange;
                        startCol = colB < colA ? colA-colChange : colA+colChange;
                        if(MonitoringStation.shouldDebug && rowA === MonitoringStation.debugRow && colA === MonitoringStation.debugCol) {
                            if(rowB === 0 && colB === 0) {
                                console.log({val: chart[rowB][colB], shouldBeSkipped: chart[rowB][colB] === MonitoringStation.Empty});
                            }
                            console.log({rowA, colA, rowB, colB, rowChange, colChange});
                            console.log({gcd});
                        }
                        while(startRow < chart.length && startRow >= 0 && startCol < chart[0].length && startCol >= 0) {
                            if(MonitoringStation.shouldDebug && rowA === MonitoringStation.debugRow && colA === MonitoringStation.debugCol) {
                                console.log({startRow, startCol});
                            }
                            if(chart[startRow][startCol] === MonitoringStation.Asteroid) {
                                copy[startRow][startCol] = firstFind ? copy[startRow][startCol] : MonitoringStation.Blocked;
                                firstFind = false; 
                            }
                            if(MonitoringStation.shouldDebug && rowA === MonitoringStation.debugRow && colA === MonitoringStation.debugCol) {
                                console.log(copy);
                            }
                            startRow = rowB < rowA ? startRow-rowChange : startRow+rowChange;
                            startCol = colB < colA ? startCol-colChange : startCol+colChange;
                        }

                        if(MonitoringStation.shouldDebug && rowA === MonitoringStation.debugRow && colA === MonitoringStation.debugCol) {
                            console.log("Past While");
                            console.log({rowB, colB, gcd, startRow, startCol});
                            console.log("---------");
                        }
                    }
                }


                for(let rowCount = 0; rowCount < chart.length; rowCount++) {
                    for(let colCount = 0; colCount < chart[0].length; colCount++) {
                        if(MonitoringStation.shouldDebug && rowA === MonitoringStation.debugRow && colA === MonitoringStation.debugCol) {
                            console.log(copy[rowCount][colCount]);
                        }
                        if(copy[rowCount][colCount] === MonitoringStation.Asteroid && !(rowCount===rowA && colCount===colA)) {
                            visibleCounts[rowA][colA] = visibleCounts[rowA][colA]+1;
                            if(MonitoringStation.shouldDebug && rowA === MonitoringStation.debugRow && colA === MonitoringStation.debugCol) {
                                console.log("Added to count: " + visibleCounts[rowA][colA]);
                            }
                        }
                    }
                }
            }
        }
        return visibleCounts;

    },
    gcd: (a, b) => {
        a = Math.abs(a);
        b = Math.abs(b);
        if (b > a) {var temp = a; a = b; b = temp;}
        while (true) {
            if (b == 0) return Math.abs(a);
            a %= b;
            if (a == 0) return Math.abs(b);
            b %= a;
        }
    },
    mostVisibleAsteroids: (visibleCounts) => {
        let largest = -1;
        for(let row=0; row < visibleCounts.length; row++) {
            for(let col=0; col<visibleCounts[0].length; col++) {
                largest = Math.max(largest, visibleCounts[row][col]);
            }
        }
        return largest;
    },
    copyChart(chart) {
        let copy = [];
        chart.forEach(row => {
            copy.push([...row]);
        });
        return copy;
    }
};

module.exports = MonitoringStation;