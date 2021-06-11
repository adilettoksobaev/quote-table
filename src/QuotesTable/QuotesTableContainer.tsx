import { useEffect, useRef, useState } from 'react';
import QuotesTable from './QuotesTable';
import './QuotesTable.scss';

export type Quotes = {
    id: string;
    baseCurrency: string;
    quoteCurrency: string;
    quantityIncrement: string;
    tickSize: string;
    takeLiquidityRate: string;
    provideLiquidityRate: string;
    feeCurrency: string;
}
function QuotesTableContainer() {
    const [quotes, setQuotes] = useState<Quotes[]>([]);
    const socket = useRef<any>(null);

    const getQuotes = () => {
        socket.current = new WebSocket('wss://api.exchange.bitcoin.com/api/2/ws');
        socket.current.onopen = () => {
            const message = {
                method: "getSymbols"
            }
            socket.current.send(JSON.stringify(message))
        }
        socket.current.onmessage = (event: any) => {
            const _quotes = JSON.parse(event.data);
            setQuotes(_quotes.result);
        }
    }

    useEffect(() => {
        getQuotes();
    }, []);

    useEffect(() => {
        console.log("quotes:", quotes);
    }, [quotes]);

    return (
        <QuotesTable 
            quotes={quotes} />
    );
}

export default QuotesTableContainer;