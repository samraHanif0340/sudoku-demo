import React, { useEffect, useState } from "react";
import { getCharSeries } from './utils'

function SudokuApp() {

    const [puzzleGrid, setPuzzleGrid] = useState(null);

    const fetchAndInitializeBoard = (difficulty) => {
        const grid = [];
        fetch("https://vast-chamber-17969.herokuapp.com/generate?difficulty=" + difficulty)
            .then(res => res.json())
            .then(res => {
                const puzzle = res.puzzle;
                let currRow;
                for (let i = 1; i < 10; i++) {
                    const charSeries = getCharSeries(i);
                    currRow = [];
                    for (let j = 1; j < 10; j++) {
                        const currCharSeriesNo = charSeries + j
                        if (puzzle[currCharSeriesNo]) { currRow.push(puzzle[currCharSeriesNo]) }
                        else { currRow.push("") }
                    }
                    grid.push(currRow)
                }
                setPuzzleGrid(grid)
            });
    }

    useEffect(() => {
        fetchAndInitializeBoard();
    }, [])

    return (
        <div>
            Sudoku App
        </div>
    );
}

export default SudokuApp    