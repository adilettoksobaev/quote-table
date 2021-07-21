import { Order } from "../state/type";

export function descendingComparator(a: any, b: any, orderBy: keyof any) {
    const parseFloatA: any = {
        symbol: a.symbol,
        bid: parseFloat(a.bid),
        ask: parseFloat(a.ask),
        high: parseFloat(a.high),
        low: parseFloat(a.low),
        last: parseFloat(a.last),
    }
    const parseFloatB: any = {
        symbol: b.symbol,
        bid: parseFloat(b.bid),
        ask: parseFloat(b.ask),
        high: parseFloat(b.high),
        low: parseFloat(b.low),
        last: parseFloat(b.last),
    }

    if (parseFloatB[orderBy] < parseFloatA[orderBy]) {
        return -1;
    }
    if (parseFloatB[orderBy] > parseFloatA[orderBy]) {
        return 1;
    }
    return 0;
}
  
export function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
  
export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}