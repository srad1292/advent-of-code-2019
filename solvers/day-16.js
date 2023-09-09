const FFT = {
    solvePartOne: (str, pattern, phases) => {
        let input = FFT.inputStrToArr(str);
        return FFT.calculateOutput(input, pattern, phases).slice(0,8);
    },
    solvePartTwo: (str, pattern, phases) => {
        let bigStr = '';
        for(let idx = 0; idx < 10000; idx++) {
            bigStr = `${bigStr}${str}`
        }
        console.log("Big str length: " + bigStr.length);
        let singleInput = FFT.inputStrToArr(bigStr);
        // let fullInput = [];
        // for(let idx = 0; idx < 10000; idx++) {
            // fullInput = [...fullInput,...singleInput];
        // }
        let offset = parseInt(singleInput.slice(0,7).join(""));
        console.log("offset: " + offset);
        return FFT.calculateOutput(singleInput, pattern, phases).slice(offset,offset+8);
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

        let line = '';
        for(let phase = 0; phase < phases; phase++) {
            for(let idx = 0; idx < input.length; idx++) {
                line = '';
                let repeated = FFT.buildRepeatingPattern(pattern, idx+1);   
                // console.log("Repeated: ");
                // console.log(repeated); 
                let value = 0;
                let patternIdx = 1;        
                for(let col = 0; col < input.length; col++) {
                    value = value + (input[col] * repeated[patternIdx]);
                    
                    line = `${line}${input[col]}*${repeated[patternIdx]}`;
                    if(col<input.length) { line = `${line} + `;}
                
                    patternIdx++;
                    if(patternIdx >= repeated.length) { patternIdx = 0; }
                }
                line = `${line} = ${Math.abs(value)%10}`;
                // console.log(line);
                output.push(Math.abs(value)%10);
            }
            input = [...output];
            output = [];
        }

        return input;
    }
}

module.exports = FFT;