const MonitoringStation = {

    //coordinates are col/row so 0,0 is top left and 1,0 is directly to the right of that
    // # = asteroid
    // . = empty
    Asteroid: '#',
    Empty: '.',
    Blocked: 'x',
    Deleted: 'D',
    debugRow: 4,
    debugCol: 3,
    shouldDebug: false,
    shouldPrintInSolves: false,

    solvePartOne: (input) => {
        let chart = MonitoringStation.convertInputToChart(input);
        if(MonitoringStation.shouldPrintInSolves) {
            console.log("CHART");
            console.log(chart);
        }
        
        let visibleCounts = MonitoringStation.countVisibleAsteroids(chart); 
        if(MonitoringStation.shouldPrintInSolves) {
            console.log("\nVISIBLE COUNTS");
            console.log(visibleCounts);
        }
        
        let mostVisibleAsteroids = MonitoringStation.mostVisibleAsteroids(visibleCounts);
        return mostVisibleAsteroids;
    },
    solvePartTwo: (input, deletionTarget) => {
        let chart = MonitoringStation.convertInputToChart(input);
        if(MonitoringStation.shouldPrintInSolves) {
            console.log("CHART");
            console.log(chart);
        }
        
        let visibleCounts = MonitoringStation.countVisibleAsteroids(chart); 

        let stationCoordinates = MonitoringStation.getStationCoordinates(visibleCounts);
        if(MonitoringStation.shouldPrintInSolves) {
            console.log("\nStation Coordinates");
            console.log("Row=" + stationCoordinates[0] + "  Col=" + stationCoordinates[1]);
        }
        let orderOfDeletion = MonitoringStation.orderOfDeletion(chart, stationCoordinates);
        if(MonitoringStation.shouldPrintInSolves) {
            console.log("\nDeletion Order");
            console.log(orderOfDeletion);
        }
        let deleted = orderOfDeletion[deletionTarget-1];
        if(MonitoringStation.shouldPrintInSolves) {
            console.log("X=" + deleted.col + " --- Y=" + deleted.row);
        }
        return deleted.col*100+deleted.row;
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
        for(let rowA = 0; rowA < chart.length; rowA++) {
            for(let colA = 0; colA < chart[0].length; colA++) {
                if(chart[rowA][colA] === MonitoringStation.Empty) {
                    visibleCounts[rowA][colA] = 0;
                    continue;
                }
                visibleCounts[rowA][colA] = 0;
                copy = MonitoringStation.getVisibleChart(chart, rowA, colA);


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
    getVisibleChart: (chart, compRow, compCol) => {
        let gcd = 0;
        let rowChange, colChange;
        let startRow, startCol;
        let firstFind = true;
        let copy = MonitoringStation.copyChart(chart);
        for(let rowB = 0; rowB < chart.length; rowB++) {
            for(let colB = 0; colB < chart[0].length; colB++) {
                if(colB === compCol && rowB === compRow) {
                    continue;
                }
                firstFind = true;
                if(chart[rowB][colB] === MonitoringStation.Empty || chart[rowB][colB] === MonitoringStation.Blocked) {
                    continue;
                }
                gcd = MonitoringStation.gcd(rowB-compRow, colB-compCol);
                rowChange = Math.floor(Math.abs(rowB-compRow)/gcd);
                colChange = Math.floor(Math.abs(colB-compCol)/gcd);
                startRow = rowB < compRow ? compRow-rowChange : compRow+rowChange;
                startCol = colB < compCol ? compCol-colChange : compCol+colChange;
                if(MonitoringStation.shouldDebug && compRow === MonitoringStation.debugRow && compCol === MonitoringStation.debugCol) {
                    if(rowB === 0 && colB === 0) {
                        console.log({val: chart[rowB][colB], shouldBeSkipped: chart[rowB][colB] === MonitoringStation.Empty});
                    }
                    console.log({compRow, compCol, rowB, colB, rowChange, colChange});
                    console.log({gcd});
                }
                while(startRow < chart.length && startRow >= 0 && startCol < chart[0].length && startCol >= 0) {
                    if(MonitoringStation.shouldDebug && compRow === MonitoringStation.debugRow && compCol === MonitoringStation.debugCol) {
                        console.log({startRow, startCol});
                    }
                    if(chart[startRow][startCol] === MonitoringStation.Asteroid) {
                        copy[startRow][startCol] = firstFind ? copy[startRow][startCol] : MonitoringStation.Blocked;
                        firstFind = false; 
                    }
                    if(MonitoringStation.shouldDebug && compRow === MonitoringStation.debugRow && compCol === MonitoringStation.debugCol) {
                        console.log(copy);
                    }
                    startRow = rowB < compRow ? startRow-rowChange : startRow+rowChange;
                    startCol = colB < compCol ? startCol-colChange : startCol+colChange;
                }

                if(MonitoringStation.shouldDebug && compRow === MonitoringStation.debugRow && compCol === MonitoringStation.debugCol) {
                    console.log("Past While");
                    console.log({rowB, colB, gcd, startRow, startCol});
                    console.log("---------");
                }
            }
        }
        return copy;
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
    getStationCoordinates: (visibleCounts) => {
        let largest = -1;
        let coordinates = [0,0];
        for(let row=0; row < visibleCounts.length; row++) {
            for(let col=0; col<visibleCounts[0].length; col++) {
                if(visibleCounts[row][col] > largest) {
                    largest = visibleCounts[row][col];
                    coordinates = [row,col];
                }
            }
        }
        return coordinates;
    },
    orderOfDeletion: (chart, stationCoordinates) => {
        let deleted = [];
        let batch = [];
        let distanceX, distanceY;
        let chartCopy = MonitoringStation.copyChart(chart);
        let visible;
        let maxRuns = 1000;
        let run = 0;
        while(MonitoringStation.asteroidCount(chartCopy, stationCoordinates) > 0 && run < maxRuns) {
            run++;
            batch = [];
            visible = MonitoringStation.getVisibleChart(chartCopy, stationCoordinates[0], stationCoordinates[1]);
            for(let row = 0; row < chart.length; row++) {
                distanceY = row - stationCoordinates[0];
                for (let col = 0; col < chart[0].length; col++) {
                    if(visible[row][col] === MonitoringStation.Asteroid && !(row===stationCoordinates[0] && col===stationCoordinates[1])) {
                        distanceX = col - stationCoordinates[1];
                        batch.push({row, col, div: distanceY/distanceX, quadrant: MonitoringStation.getQuadrant(distanceX, distanceY)});
                        chartCopy[row][col] = MonitoringStation.deleted;
                    }
                }
            }
            batch.sort((a,b) => a.quadrant-b.quadrant || a.div-b.div);
            batch.forEach(asteroid => {deleted.push(asteroid)});
        }

        return deleted;
    },
    asteroidCount: (chart, stationCoordinates) => {
        let count = 0;
        for(let row = 0; row < chart.length; row++) {
            for (let col = 0; col < chart[0].length; col++) {
                if(chart[row][col] === MonitoringStation.Asteroid && !(row===stationCoordinates[0] && col===stationCoordinates[1])) {
                    count++;
                }
            }
        }
        if(MonitoringStation.shouldDebug) {
            console.log("Asteroid count: " + count);
        }
        return count;
    },
    getQuadrant: (dx, dy) => {
        // -dy = above
        // +dy = below
        // -dx = left
        // +dx = right
        if(dy < 0 && dx >= 0) {
            return 1;
        } else if(dy >= 0 && dx > 0) {
            return 2;
        } else if(dy > 0 && dx <= 0) {
            return 3;
        } else if(dy <= 0 && dx < 0) {
            return 4;
        }
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