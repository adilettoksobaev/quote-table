import { useState } from 'react';
import { Ticker } from '../../state/type';
import './QuotesTable.scss';

type Props = {
    tickers: Ticker[];
    sortToggle: boolean;
    handleSortToggle: () => void;
}
  

function QuotesTable(props: Props) {
    const { 
        tickers,
        handleSortToggle,
        sortToggle
    } = props;

    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof Data>('last');

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <div className="container">
            <h1>Exchange Quotes</h1>
            <div 
                className="toggle-link"
                onClick={handleSortToggle}>
                {sortToggle ? "Show top 50" : "Show all"}
            </div>
            <div className="table-container">
                <table className="table">
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={tickers.length}
                    />
                    <tbody>
                        {stableSort(tickers, getComparator(order, orderBy))
                            .map((item, index) => (
                                <tr key={item.symbol + index}>
                                    <td>{item.symbol}</td>
                                    <td className={item.bidActive}>
                                        {item.bid}
                                    </td>
                                    <td className={item.askActive}>
                                        {item.ask}
                                    </td>
                                    <td>
                                        {item.high}
                                    </td>
                                    <td>
                                        {item.low}
                                    </td>
                                    <td className={item.lastActive}>
                                        {item.last}
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

interface Data {
    symbol: string;
    bid: string;
    ask: string;
    last: string;
    low: string;
    high: string;
}

interface HeadCell {
    id: keyof Data;
    label: string;
    numeric: boolean;
}
  
const headCells: HeadCell[] = [
    { id: 'symbol', numeric: false, label: 'Ticker' },
    { id: 'bid', numeric: true, label: 'Bid' },
    { id: 'ask', numeric: true, label: 'Ask' },
    { id: 'high', numeric: true, label: 'High' },
    { id: 'low', numeric: true, label: 'Low' },
    { id: 'last', numeric: true, label: 'Last' }
];

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}
  
function EnhancedTableHead(props: EnhancedTableProps) {
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

function descendingComparator<T>(a: any, b: any, orderBy: keyof any) {
    const parseIntA: any = {
        symbol: a.symbol,
        bid: parseInt(a.bid),
        ask: parseInt(a.ask),
        high: parseInt(a.high),
        low: parseInt(a.low),
        last: parseInt(a.last),
    }
    const parseIntB: any = {
        symbol: b.symbol,
        bid: parseInt(b.bid),
        ask: parseInt(b.ask),
        high: parseInt(b.high),
        low: parseInt(b.low),
        last: parseInt(b.last),
    }

    if (parseIntB[orderBy] < parseIntA[orderBy]) {
        return -1;
    }
    if (parseIntB[orderBy] > parseIntA[orderBy]) {
        return 1;
    }
    return 0;
}
  
type Order = 'asc' | 'desc';
  
function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
  
function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export default QuotesTable;