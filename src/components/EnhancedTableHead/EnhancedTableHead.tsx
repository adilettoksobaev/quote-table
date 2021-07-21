import React from 'react';
import { Data, EnhancedTableProps, HeadCell } from '../../state/type';

export function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } = props;
    
    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <thead>
            <tr>
                {headCells.map((headCell) => (
                    <th
                        key={headCell.id}
                        onClick={createSortHandler(headCell.id)}>
                        {headCell.label}
                        {orderBy === headCell.id ? (
                            <span>
                                {order === 'desc' ? ' ▲' : ' ▼'}
                            </span>
                        ) : null}
                    </th>
                ))}
            </tr>
        </thead>
    )
}

const headCells: HeadCell[] = [
    { id: 'symbol', numeric: false, label: 'Ticker' },
    { id: 'bid', numeric: true, label: 'Bid' },
    { id: 'ask', numeric: true, label: 'Ask' },
    { id: 'high', numeric: true, label: 'High' },
    { id: 'low', numeric: true, label: 'Low' },
    { id: 'last', numeric: true, label: 'Last' }
];