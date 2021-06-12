import { Ticker } from './QuotesTableContainer';
import './QuotesTable.scss';

type Props = {
    tickers: Ticker[]
}

function QuotesTable(props: Props) {
    const { tickers } = props;

    return (
        <div className="container">
            <h1>Exchange Quotes</h1>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Ticker</th>
                            <th>Bid</th>
                            <th>Ask</th>
                            <th>High</th>
                            <th>Low</th>
                            <th>Last</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {ticker.map(item => (
                            <tr key={item.symbol}>
                                <td>{item.symbol}</td>
                                <td>38117.32</td>
                                <td>38117.32</td>
                                <td>38117.32</td>
                                <td>38117.32</td>
                                <td>38117.32</td>
                            </tr>
                        ))} */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default QuotesTable;