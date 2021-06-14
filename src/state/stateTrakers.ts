import { Ticker } from "../state/type";

export class StateTrakers {
    static state: { [name: string]: Ticker } = {};

    static add(ticker: Ticker) {
        const prevState = this.state[ticker.symbol];
        if(prevState) {
            if(prevState.bid < ticker.bid) {
                ticker.active = "up"
            }
            if(prevState.bid > ticker.bid) {
                ticker.active = "down"
            }
        }
        this.state[ticker.symbol] = ticker
    }

    static getTickers(): Ticker[] {
        return Object.values(this.state);
    }
}