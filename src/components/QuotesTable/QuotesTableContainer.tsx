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

export type Ticker = {
    ask: string,
    bid: string,
    last: string,
    open: string,
    low: string,
    high: string,
    volume: string,
    volumeQuote: string,
    timestamp: string,
    symbol: string
}

function QuotesTableContainer() {
    const [tickers, setTickers] = useState<Ticker[]>([]);
    const [ticker, setTicker] = useState<Ticker | null>(null);
    const socket = useRef<any>(null);

    const connect = () => {
        socket.current = new WebSocket('wss://api.exchange.bitcoin.com/api/2/ws');
        socket.current.onopen = () => {
            const payload = {
                method: "getSymbols"
            }
            socket.current.send(JSON.stringify(payload));
            socket.current.onmessage = (event: any) => {
                const data = JSON.parse(event.data);
                for(let quote of data.result) {
                    const payloadTicker = {
                        method: "subscribeTicker",
                        params: {
                            symbol: quote.id
                        }
                    }

                    socket.current.send(JSON.stringify(payloadTicker));
                    socket.current.onmessage = (eventTicker: any) => {
                        const dataTicker = JSON.parse(eventTicker.data);
                        setTicker(dataTicker.params);
                    }
                }
            }
        }
    }

    useEffect(() => {
        connect();
    }, []);

    useEffect(() => {
        // console.log("ticker", ticker)
    }, [ticker])

    return (
        <QuotesTable  
            tickers={tickers} />
    );
}

export default QuotesTableContainer;