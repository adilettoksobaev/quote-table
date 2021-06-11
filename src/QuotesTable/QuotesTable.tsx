import './QuotesTable.scss';
import { Quotes } from './QuotesTableContainer';

type Props = {
    quotes: Quotes[]
}

function QuotesTable(props: Props) {
    const { quotes } = props;

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
                        {quotes.map(item => (
                            <tr key={item.id}>
                                <td>{item.quoteCurrency} / {item.id}</td>
                                <td>38117.32</td>
                                <td>38117.32</td>
                                <td>38117.32</td>
                                <td>38117.32</td>
                                <td>38117.32</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default QuotesTable;