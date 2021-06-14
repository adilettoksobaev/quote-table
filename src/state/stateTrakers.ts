import { Ticker } from "../state/type";

export class StateTrakers {
    static state: { [name: string]: Ticker } = {};

    static add(ticker: Ticker) {
        const prevState = this.state[ticker.symbol];
        if(prevState) {
            if(prevState.bid < ticker.bid) {
                ticker.bidActive = "up";
            }
            if(prevState.ask < ticker.ask) {
                ticker.askActive = "up";
            }
            if(prevState.high < ticker.high) {
                ticker.lastActive = "up";
            }
            if(prevState.bid > ticker.bid) {
                ticker.bidActive = "down";
            }
            if(prevState.ask > ticker.ask) {
                ticker.askActive = "down";
            }
            if(prevState.last > ticker.last) {
                ticker.lastActive = "down";
            }
        }
        this.state[ticker.symbol] = ticker
    }

    static getTickers(sortToggle: boolean): Ticker[] {
        const limit = 50;
        const sortArray = Object.values(this.state).sort((a, b) => {
            return parseInt(b.last) - parseInt(a.last);
        });

        if(sortToggle) {
            return sortArray.slice(0, limit);
        } else {
            return sortArray;
        }
    }
}