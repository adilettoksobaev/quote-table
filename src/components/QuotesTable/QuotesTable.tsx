import { Data, Order, Ticker } from '../../state/type';
import { getComparator, stableSort } from '../../utils/utils';
import { EnhancedTableHead } from '../EnhancedTableHead/EnhancedTableHead';
import './QuotesTable.scss';

type Props = {
    tickers: Ticker[];
    sortToggle: boolean;
    handleSortToggle: () => void;
    order: Order;
    orderBy: keyof Data;
    handleRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
}
  

function QuotesTable(props: Props) {
    const { 
        tickers,
        handleSortToggle,
        sortToggle,
        order,
        orderBy,
        handleRequestSort
    } = props;

    return (
        <div className="container">
            <h1>Exchange Quotes</h1>
            <div 
                className="toggle-link"
                onClick={handleSortToggle}>
                {!sortToggle ? "Show top 50" : "Show all"}
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

export default QuotesTable;