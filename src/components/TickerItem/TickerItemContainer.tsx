import { Ticker } from '../../state/type';
import './TickerItem.scss';

type Props = {
    ticker: Ticker
};

export function TickerItemContainer(props: Props) {
    const { ticker } = props;

    return (
        <tr>
            <td>{ticker.symbol}</td>
            <td className={ticker.active}>
                {ticker.bid}
            </td>
            <td>{ticker.ask}</td>
            <td>{ticker.high}</td>
            <td>{ticker.low}</td>
            <td>{ticker.last}</td>
        </tr>
    );
};