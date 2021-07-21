import { useEffect, useRef, useState } from 'react';
import { StateTrakers } from '../../state/stateTrakers';
import { Data, Order } from '../../state/type';
import QuotesTable from './QuotesTable';
import './QuotesTable.scss';


function QuotesTableContainer() {
    const [sortToggle, setSortToggle] = useState(true);
    const [counter, setCounter] = useState(0);
    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof Data>('last');

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
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
                        if(dataTicker.params && dataTicker.params.symbol) {
                            StateTrakers.add(dataTicker.params);
                        }
                    }
                }

            }
        }
    }

    useEffect(() => {
        let interval: any;
        interval = setInterval(() => {
            setCounter(counter => counter + 1);
        }, 150);
        return () => clearInterval(interval);
    }, [counter]);

    useEffect(() => {
        connect();
    }, []);

    const handleSortToggle = () => {
        setSortToggle(!sortToggle);
    }

    return (
        <QuotesTable  
            tickers={StateTrakers.getTickers(sortToggle)} 
            handleSortToggle={handleSortToggle} 
            sortToggle={sortToggle} 
            order={order} 
            orderBy={orderBy} 
            handleRequestSort={handleRequestSort} />
    );
}

export default QuotesTableContainer;