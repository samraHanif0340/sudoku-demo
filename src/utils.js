const getCharSeries = (index) => {
    switch (index) {
        case 1:
            return "A";
        case 2:
            return "B";
        case 3:
            return "C";
        case 4:
            return "D";
        case 5:
            return "E";
        case 6:
            return "F";
        case 7:
            return "G";
        case 8:
            return "H";
        case 9:
            return "I";

    }
}


const validatePuzzle = (grid) => {

    for (let i = 0; i < grid.length; i++) {

        // Validate row-wise uniqueness
        let currRow = grid[i];
        currRow = currRow.filter(val => val != '')
        if ((new Set(currRow)).size != currRow.length) {
            console.log(new Set(currRow), " Invalid in row ", i);
            return false;
        }

        // Validate col-wise uniqueness
        let currCol = []
        for (let j = 0; j < grid.length; j++) {
            currCol.push(grid[j][i]);
        }

        currCol = currCol.filter(val => val != '')
        if ((new Set(currCol)).size != currCol.length) {
            console.log("Invalid in column ", i);
            return false;
        }
    }

    return true;

}

export {
    getCharSeries, validatePuzzle
}
