function printThings(input) {
    let count = 1;
    let output = [];
    let prevDir = '';
    input = input.split("").filter(c => c !== '\n').join("");
    
    for(let idx = 1; idx < input.length; idx++) {
        if(input[idx] === '\n') {
            console.log("found new line");
            // do nothing
        } else if(input[idx] === input[idx-1]) {
            count++;
        } else {
            output.push(getDir(prevDir, input[idx-1]));
            output.push(count);
            prevDir = input[idx-1];
            count = 1;
        }
    }
    console.log(output);
}

function getDir(prev, cur) {
    if(prev === '') {
        return 'L';
    } 
    
    else if(prev === '<' && cur === 'v'){
        return 'L';
    } else if(prev === '<' && cur === '^'){
        return 'R';
    }
    else if(prev === '^' && cur === '<'){
        return 'L';
    } else if(prev === '^' && cur === '>'){
        return 'R';
    }

    else if(prev === '>' && cur === '^'){
        return 'L';
    } else if(prev === '>' && cur === 'v'){
        return 'R';
    }

    else if(prev === 'v' && cur === '>'){
        return 'L';
    } else if(prev === 'v' && cur === '<'){
        return 'R';
    } else {
        console.log("Found unexpected combo");
        console.log("Prev: " + prev + " --- Cur: " + cur);
    }
}

let input = `<<<<<<<<<<<<<vvvvvvvvvvvvv>>>>>>>^^^^^^^>>>>>>>>>vvvvv>>>>>>>>>>>>>^^^^^^^^^^^^^<<<<<<<<<<<<<vvvvvvv>>>>>>>^^^^^^^^^^^^^<<<<<<<^^^^^^^^^^^^^>>>>>>>>>vvvvvvvvv<<<<
<vvvvvvvvvvvvv>>>>>>>>>>>>>^^^^^^^^^^^^^<<<<<<<vvvvvvv>>>>>>>>>>>>>^^^^^^^>>>>>>>>>>>>>vvvvvvvvv<<<<<<<<<^^^^^<<<<<<<<<<<<<vvvvvvvvvvvvv>>>>>>>>>>>>>^^^^^^^<<<<<<
<^X`;

printThings(input);