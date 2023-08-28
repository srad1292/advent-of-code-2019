const SpaceImageFormat = {

    solvePartOne: (input, columns, rows) => {
        let minZeroCount;
        let countZeros = 0;
        let countOnes = 0;
        let countTwos = 0;
        let result = 0;
        let layers = SpaceImageFormat.markLayers(input,columns,rows);
        for(let idx = 0; idx < layers.length; idx++) {
            if(layers[idx] === "|") {
                if(minZeroCount === undefined || countZeros < minZeroCount) {
                    result = countOnes*countTwos;
                    minZeroCount = countZeros;
                }
                countZeros = 0;
                countOnes = 0;
                countTwos = 0;
            } else {
                if(layers[idx] === '1') {
                    countOnes++;
                } else if(layers[idx] === '2') {
                    countTwos++;
                } else if(layers[idx] === '0') {
                    countZeros++;
                }
            }
        }
        return result;
    },
    markLayers: (input, columns, rows) => {
        let start = 0;
        let layerSize = rows*columns;
        let result = "";
        while(start<input.length) {
            if(result.length > 0) {
                result = `${result}|`;
            }
            result = `${result}${input.slice(start,start+layerSize)}`;
            start = start+layerSize;
        }
        return result;
    },
    solvePartTwo: (input, columns, rows) => {
        let layers = SpaceImageFormat.markLayers(input,columns,rows).split("|");
        let numInLayer = columns*rows;
        let message = [];
        let row = [];
        let currentBit = 2;
        for(let idx = 0; idx < numInLayer; idx++) {
            if(idx%(columns)===0) {
                if(row.length > 0) {
                    message.push(row);
                }
                row = [];
            }
            currentBit = 2;
            for(let layer = 0; layer < layers.length; layer++) {
                if(layers[layer][idx] !== '2') {
                    currentBit = layers[layer][idx];
                    break;
                }
            }
            row.push(currentBit);
        }
        message.push(row);
        message.forEach(row => {
            let line = "";
            row.forEach(col => {
                if(col === "1") {
                    line = `${line} ⬛`;
                } else {
                    line = `${line} ⬜`;
                }
            });
            console.log(line);
        });
    },
    createLayers: (input, columns, rows) => {
        let layers = [];
        let layer = [];
        let row = [];
        let idx = 0;
        while(idx < input.length) {
            layer = [];
            for(let row = 0; row < rows; row++) {
                row = [];
                for(let col = 0; col < columns; col++) {
                    row.push(input[idx]);
                }
                layer.push(row);
            }
            layers.push(layer);
        }
    }
}

module.exports = SpaceImageFormat;