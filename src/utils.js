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

const setEmptyStringsToZero = (grid) => {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] == "") {
                grid[i][j] = 0
            } else {
                grid[i][j] = Number(grid[i][j])
            }
        }
    }

    return grid
}

const encodePuzzleData = (grid) => {

    let tempGrid = setEmptyStringsToZero(grid)

    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')

    const encodeParams = (params) =>
        Object.keys(params)
            .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
            .join('&');

    const data = { board: tempGrid }
    return encodeParams(data);
}

export {
    getCharSeries, validatePuzzle, setEmptyStringsToZero, encodePuzzleData
}
