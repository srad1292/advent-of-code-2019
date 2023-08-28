var fs = require('fs');

process.argv.forEach(function (val, index, array) {
    if(index === 2 && parseInt(val) !== NaN) {
        console.log("Going to create files for day: " + val);
        createFiles(val);
    } else if(index === 2) {
        console.log("Error with input - Must be a number.  Ex node new-day.js 9");
    }
});

function createFiles(day) {
    let promises = [
        openFile(`./print-solution/day-${day}.js`),
        openFile(`./solvers/day-${day}.js`),
        openFile(`./tests/day-${day}.test.js`)
    ]

    Promise.all(promises).then(result => {
        result.forEach(path => {
            console.log(`Success: ${path}`);
        })
    });
}

function openFile(path) {
    return new Promise((resolve, reject) => {
        fs.open(path, 'w', function (err, file) {
            if (err) {
                console.log("Error: " + path);
                reject(err);
            } else {
                resolve(path);
            }
        });
    });
}

