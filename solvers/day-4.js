const SecureContainer = {
    solvePartOne: (min, max) => {
        let digits = [];
        let foundDouble = false;
        let neverDecreasing = true;
        let possiblePasswords = 0;
        for(let num = min; num <= max; num++) {
            foundDouble = false;
            neverDecreasing = true;
            digits = SecureContainer.numberToDigits(num);
            for(let digit = 1; digit<digits.length; digit++) {
                if(digits[digit] === digits[digit-1]) {
                    foundDouble = true;
                }
                else if(digits[digit] < digits[digit-1]) {
                    neverDecreasing = false;
                }
            }
            if(foundDouble && neverDecreasing) {
                possiblePasswords++;
            }
        }
        return possiblePasswords;
    },
    solvePartTwo: (min, max) => {
        let digits = [];
        let foundDouble = false;
        let neverDecreasing = true;
        let currentStreak = 1;
        let possiblePasswords = 0;
        for(let num = min; num <= max; num++) {
            currentStreak = 1;
            foundDouble = false;
            neverDecreasing = true;
            digits = SecureContainer.numberToDigits(num);
            for(let digit = 1; digit<digits.length; digit++) {
                if(digits[digit] === digits[digit-1]) {
                    currentStreak++;
                    if(currentStreak === 2 && (digit === digits.length-1 || digits[digit] !== digits[digit+1])) {
                        foundDouble = true;
                    }
                } else {
                    currentStreak = 1;
                }
                
                if(digits[digit] < digits[digit-1]) {
                    neverDecreasing = false;
                }
            }
            if(foundDouble && neverDecreasing) {
                possiblePasswords++;
            }
        }
        return possiblePasswords;
    },
    numberToDigits: (num) => {
        let digits = [];
        while(num > 0) {
            digits.push(num%10);
            num = Math.floor(num / 10);
        }
        digits.reverse();
        return digits;
    }
};

module.exports = SecureContainer;