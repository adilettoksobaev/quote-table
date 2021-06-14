import { Ticker } from '../state/type';
import { TickerItemContainer } from '../TickerItem';
import './QuotesTable.scss';

type Props = {
    tickers: Ticker[];
    handleSortToggle: () => void;
}

function QuotesTable(props: Props) {
    const { 
        tickers,
        handleSortToggle
    } = props;

    return (
        <div className="container">
            <h1>Exchange Quotes</h1>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Ticker</th>
                            <th onClick={handleSortToggle}>
                                Bid
                            </th>
                            <th>Ask</th>
                            <th>High</th>
                            <th>Low</th>
                            <th>Last</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickers.map((item, index) => (
                            <TickerItemContainer 
                                key={item.symbol + index}  
                                ticker={item} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default QuotesTable;