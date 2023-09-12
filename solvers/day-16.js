const FFT = {
    solvePartOne: (str, pattern, phases) => {
        let input = FFT.inputStrToArr(str);
        return FFT.calculateOutput(input, pattern, phases).slice(0,8);
    },
    solvePartTwo: (str, pattern, phases) => {
        // 82994322
        let bigStr = '';
        for(let idx = 0; idx < 10000; idx++) {
            bigStr = `${bigStr}${str}`
        }

        let input = FFT.inputStrToArr(bigStr);
        let offset = parseInt(input.slice(0,7).join(""));
        // Offset is after halfway so we can remove anything before the offset
        let reduced = input.slice(offset);

        for (let phase = 1; phase <= 100; phase++) {
            for (let i = reduced.length-1; i >= 0; i--) {
                reduced[i] = Math.abs((reduced[i + 1] || 0) + reduced[i]) % 10;
            }
        }
        return reduced.slice(0, 8);

    },
    inputStrToArr: (str) => {
        return str.split("").map(val => parseInt(val));
    },
    buildRepeatingPattern: (pattern, phase) => {
        let repeating = [];
        for(let patternIdx = 0; patternIdx<pattern.length; patternIdx++) {
            for(let count = 0; count < phase; count++) {
                repeating.push(pattern[patternIdx]);
            }
        }
        return repeating;
    },
    calculateOutput: (input, pattern, phases) => {
        if(phases === 0) { return input; }

        let output = [];
        for(let phase = 0; phase < phases; phase++) {
            for(let idx = 0; idx < input.length; idx++) {
                let repeated = FFT.buildRepeatingPattern(pattern, idx+1);   
                let value = 0;
                let patternIdx = 1+idx;   
                     
                for(let col = idx; col < input.length; col++) {
                    value = value + (input[col] * repeated[patternIdx]);
                    patternIdx++;
                    if(patternIdx >= repeated.length) { patternIdx = 0; }
                }
                output.push(Math.abs(value)%10);
            }
            input = [...output];
            output = [];
        }

        return input;
    }
}

module.exports = FFT;