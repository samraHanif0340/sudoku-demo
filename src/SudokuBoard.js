import React, { useEffect, useState } from "react";
import { getCharSeries, encodePuzzleData } from './utils'
import SudokuCell from "./SudokuCell";

const Difficulty = {
    Easy: 'easy',
    Medium: 'medium',
    Hard: 'hard'
}

const Status = {
    Valid: 'VALID',
    InValid: 'IN-VALID',
    Solved: 'SOLVED'
}


function SudokuBoard() {

    const [puzzleGrid, setPuzzleGrid] = useState(null);
    const [puzzleStatus, setPuzzleStatus] = useState(Status.Valid);
    const [currDifficulty, setCurrDifficulty] = useState(Difficulty.Easy);

    const fetchAndInitializeBoard = (difficulty) => {
        setCurrDifficulty(difficulty)
        const grid = [];
        setPuzzleGrid(null);
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
                setPuzzleStatus(Status.Valid)
            });
    }

    const solveSudokuBoard = () => {

        const data = encodePuzzleData(puzzleGrid)

        fetch('https://sugoku.herokuapp.com/solve', {
            method: 'POST',
            body: data,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(response => response.json())
            .then(res => {
                setPuzzleGrid(null)
                setPuzzleGrid(res.solution)
                setPuzzleStatus(Status.Solved)
            });

    }


    useEffect(() => {
        fetchAndInitializeBoard(Difficulty.Easy);
    }, [])

    const onCellValChange = (row, col, val) => {
        puzzleGrid[row][col] = val;
        setPuzzleGrid(puzzleGrid)
    }

    const checkGridStatus = () => {

        const data = encodePuzzleData(puzzleGrid)

        fetch('https://sugoku.herokuapp.com/validate', {
            method: 'POST',
            body: data,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(response => response.json())
            .then(res => {
                if (res.status === 'broken') {
                    setPuzzleStatus(Status.InValid)
                } else {
                    setPuzzleStatus(Status.Valid)
                }
            });
    }

    return (
        <div className="container">
            <h3 className="title">SUDOKU GAME !!</h3>
            {puzzleGrid && <div className="class-center">
                <div>
                    <table>
                        <tbody>
                            {puzzleGrid.map((row, rowIndex) =>
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) =>
                                        <td key={cellIndex}>
                                            <SudokuCell row={rowIndex} col={cellIndex} val={cell} onValChange={onCellValChange} />
                                        </td>
                                    )}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="action-buttons">
                <div className="btn-group my-3 mr-3">
                    <button  type="button" className="btn btn-outline-success" onClick={checkGridStatus}>Validate</button>
                    <button  className="btn btn-outline-success" onClick={solveSudokuBoard}>Solve</button>
                    </div>

                    <div className="btn-group my-3 ml-3">
                    <button type="button" className="btn btn-outline-secondary" onClick={() => { fetchAndInitializeBoard(Difficulty.Easy) }}>Easy</button>
                    <button type="button" className="btn btn-outline-secondary" onClick={() => { fetchAndInitializeBoard(Difficulty.Medium) }}>Medium</button>
                    <button type="button" className="btn btn-outline-secondary" onClick={() => { fetchAndInitializeBoard(Difficulty.Hard) }}>Hard</button>
                    </div>
               
                </div>
                <div class="row">
                <div className="col-lg-6 puzzle-status">
                    Status : {puzzleStatus}
                </div>
                <div className="col-lg-6 puzzle-difficulty">
                    Difficulty : {currDifficulty.toUpperCase()}
                </div>
                </div>
                
            </div>}
            {!puzzleGrid && <div>
                Initializing grid...
            </div>}
        </div>
    );
}

export default SudokuBoard    