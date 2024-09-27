import React, {useState, useEffect} from 'react';
import Button from './Button';

const Table = ({
    source = [],
}) => {
    const [tableMap, setTableMap] = useState({});
    const [selectedMap, setSelectedMap] = useState({});

    useEffect(() => {
        if (source?.length) {
            initializeTableData(source);
        }
    }, []);

    const initializeTableData = (tableSource) => {
        const balancedMap = {};
        tableSource.forEach((item, index) => {
            const columnIndex = index % 2;
            const column = balancedMap?.[columnIndex] || [];
            
            column.push(item);
            balancedMap[columnIndex] = column;
        });

        setTableMap(balancedMap);
    };

    const renderColumn = (columnIndex) => {
        const columnSource = tableMap[columnIndex];

        return (
            <div className='table-column'>
                {columnSource?.map((item, index) => {
                    const checkedValue = selectedMap?.[columnIndex]?.includes(index) || false;
                    return (
                        <div
                            className='table-column-row'
                            key={`${item}-${index}`}
                            onClick={() => onCheckboxClick(!checkedValue, columnIndex, index)}
                        >
                            <input
                                className='table-column-row-checkbox'
                                type='checkbox'
                                checked={checkedValue}
                                onChange={(e) => onCheckboxClick(e.target.checked, columnIndex, index)}
                            />
                            <span className='table-column-row-label'>{item}</span>
                        </div>
                    );
                })}
            </div>
        );
    };

    const moveAll = (columnIndex) => {
        const updatedTableMap = structuredClone(tableMap);
        const updatedSelectedMap = structuredClone(selectedMap);
        const otherColumnIndex = (columnIndex + 1) % 2;
        const sourceColumn = updatedTableMap[columnIndex] || [];
        const targetColumn = updatedTableMap[otherColumnIndex] || [];

        targetColumn.push(...sourceColumn);

        updatedTableMap[columnIndex] = [];
        updatedTableMap[otherColumnIndex] = targetColumn;
        updatedSelectedMap[columnIndex] = [];

        setTableMap(updatedTableMap);
        setSelectedMap(updatedSelectedMap);
    };

    const moveSelected = (columnIndex) => {
        const updatedSelectedMap = structuredClone(selectedMap);
        const selectedElements = structuredClone(updatedSelectedMap[columnIndex]);
        const updatedTableMap = structuredClone(tableMap);
        const otherColumnIndex = (columnIndex + 1) % 2;
        const sourceColumn = updatedTableMap[columnIndex] || [];
        const targetColumn = updatedTableMap[otherColumnIndex] || [];

        selectedElements.forEach((elementIndex) => {
            const sourceIndex = sourceColumn?.indexOf(tableMap[columnIndex][elementIndex]);
            sourceColumn.splice(sourceIndex, 1);
            targetColumn.push(tableMap[columnIndex][elementIndex]);
        });
        
        updatedTableMap[columnIndex] = sourceColumn;
        updatedTableMap[otherColumnIndex] = targetColumn;
        
        updatedSelectedMap[columnIndex] = [];
        
        setTableMap(updatedTableMap);
        setSelectedMap(updatedSelectedMap);
    };

    const onCheckboxClick = (value, columnIndex, rowIndex) => {
        const updatedSelectedMap = structuredClone(selectedMap);
        const column = updatedSelectedMap[columnIndex] || [];
        if (value) {
            column.push(rowIndex);
        } else {
            const itemIndex = updatedSelectedMap[columnIndex]?.indexOf(rowIndex);

            if (itemIndex > -1) {
                column.splice(itemIndex, 1);
            }

        }

        updatedSelectedMap[columnIndex] = column;

        setSelectedMap(updatedSelectedMap);
    };

    return (
        <div className='table'>
            {renderColumn(0)}
            <div className='table-pagination'>
                <Button
                    className="table-pagination-button"
                    label="<<"
                    onClick={() => moveAll(1)}
                    disabled={!tableMap[1]?.length}
                />
                <Button
                    className="table-pagination-button"
                    label="<"
                    onClick={() => moveSelected(1)}
                    disabled={!selectedMap[1]?.length}
                />
                <Button
                    className="table-pagination-button"
                    label=">"
                    onClick={() => moveSelected(0)}
                    disabled={!selectedMap[0]?.length}
                />
                <Button
                    className="table-pagination-button"
                    label=">>"
                    onClick={() => moveAll(0)}
                    disabled={!tableMap[0]?.length}
                />
            </div>
            {renderColumn(1)}
        </div>
    )
};

export default Table;