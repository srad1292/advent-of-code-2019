const FuelCalculator = {
    solvePartOne: (input) => {
        return input.reduce((accumulator, current) => accumulator + (Math.floor(current/3)-2), 0);
    },
    solvePartTwo: (input) => {
        return input.reduce((accumulator, current) => {
            let fuelForModule = (Math.floor(current/3)-2);
            let fuelForFuel = fuelForModule;
            while(fuelForFuel >= 3) {
                fuelForFuel = (Math.floor(fuelForFuel/3)-2);
                if(fuelForFuel > 0) {
                    fuelForModule += fuelForFuel;
                }
            }
            return accumulator + fuelForModule;
        }, 0);
    }
}

module.exports = FuelCalculator;

