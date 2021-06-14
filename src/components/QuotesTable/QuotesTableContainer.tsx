import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentTickerState, tickersState } from '../../state';
import { Ticker } from '../../state/type';
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

const GET_SYMBOLS_MESSAGE_ID = "getSymbols";
const TICKER_NOTIFICATION_ID = "TICKER_NOTIFICATION";

const getSymbolsMessage = () => ({
    method: "getSymbols",
    id: GET_SYMBOLS_MESSAGE_ID,
})

const sendMessage = (socket: WebSocket, payload: any) => {
    socket.send(JSON.stringify(payload));
}

const subscribeTickers = (socket: WebSocket, data: any) => {
    for (let quote of data.result) {
        const payloadTicker = {
            method: "subscribeTicker",
            params: {
                symbol: quote.id
            },
            id: TICKER_NOTIFICATION_ID,
        }
        sendMessage(socket, payloadTicker);
    }
}

function QuotesTableContainer() {
    const [tickers, setTickers] = useRecoilState(tickersState);
    const [currentTicker, setCurrentTicker] = useRecoilState(currentTickerState);
    const [sortToggle, setSortToggle] = useState(false);
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
                        setCurrentTicker(dataTicker.params);
                    }
                }
            }
        }
    }

    // const connect = () => {
    //     socket.current = new WebSocket('wss://api.exchange.bitcoin.com/api/2/ws');
    //     socket.current.onopen = () => {
    //         sendMessage(socket.current, getSymbolsMessage());
    //         socket.current.onmessage = (event: any) => {
    //             const data = JSON.parse(event.data);
    //             switch (data.id) {
    //                 case GET_SYMBOLS_MESSAGE_ID:
    //                     subscribeTickers(socket.current, data);
    //                     break;
    //                 case TICKER_NOTIFICATION_ID:
    //                     if (data && data.params) {
    //                         //you should update ticker by symbol instead of setTicker
    //                         setCurrentTicker(data.params);
    //                     }
    //                     break;
    //             }
    //         }
    //     }
    // }

    useEffect(() => {
        connect();
    }, []);

    useEffect(() => {
        if(currentTicker) {
            const index = tickers.findIndex((listItem) => listItem.symbol === currentTicker.symbol);
            if(index > 0) {
                setTickers(
                    getItemsWithUpdateItem(tickers, currentTicker)
                );
            } else {
                setTickers((oldItemList) => [
                    ...oldItemList,
                    currentTicker
                ]);
            }
        }
    }, [currentTicker]);

    const sortByAsc = () => {
        const newArray = tickers.slice().sort((a, b) => (Number(a.bid) - Number(b.bid)));
        setTickers(newArray);
    }

    const sortByDesc = () => {
        const newArray = tickers.slice().sort((a, b) => (Number(b.bid) - Number(a.bid)));
        setTickers(newArray);
    }

    const handleSortToggle = () => {
        setSortToggle(!sortToggle);
    }

    useEffect(() => {
        if(sortToggle) {
            sortByDesc();
        } else {
            sortByAsc();
        }
    }, [sortToggle]);

    return (
        <QuotesTable  
            tickers={tickers} 
            handleSortToggle={handleSortToggle} />
    );
}

function getItemsWithUpdateItem(items: Ticker[], item: Ticker) {
    return items.map((_item) => {
      if (_item.symbol === item.symbol) {
        return item;
      }
      return _item;
    });
}

export default QuotesTableContainer;