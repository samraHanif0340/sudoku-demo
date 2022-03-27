import React, { useEffect, useState } from "react";

function SudokuCell(props) {

    const { row, col, val, onValChange } = props;
    const [cellValue, setCellValue] = useState(val);

    return (
        <input className="cell" type="text" value={cellValue == 0 ? "" : cellValue} maxLength="1"
            onChange={(e) => {
                let val = e.target.value;
                if (isNaN(Number(val)) || Number(val) < 1 || Number(val) > 9) { val = ''; }
                onValChange(row, col, val);
                setCellValue(val);
            }}
        />
    );
}

export default SudokuCell    