export type Ticker = {
    ask: string;
    bid: string;
    last: string;
    open: string;
    low: string;
    high: string;
    volume: string;
    volumeQuote: string;
    timestamp: string;
    symbol: string;
    bidActive: string;
    askActive: string;
    lastActive: string;
}

export interface Data {
    symbol: string;
    bid: string;
    ask: string;
    last: string;
    low: string;
    high: string;
}

export interface HeadCell {
    id: keyof Data;
    label: string;
    numeric: boolean;
}

export type Order = 'asc' | 'desc';

export interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}