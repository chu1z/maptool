import { ISubject, IObserver } from "../ob/Observer";

export class DataBase implements ISubject {

    protected _observers: Array<IObserver> = [];

    addObserver(observer: IObserver) {
        if (this._observers.indexOf(observer) == -1) {
            this._observers.push(observer);
        }
    }

    removeObserver(observer: IObserver) {
        let index: number = this._observers.indexOf(observer);
        if (index > -1) {
            this._observers[index] = null;
        }
    }

    sendNotif(cmd: number, data?: any) {
        let len = this._observers.length;
        for (let i = 0; i < len;) {
            if (this._observers[i]) {
                this._observers[i].updateMsg(cmd, data);
                i++;
            } else {
                this._observers.splice(i, 1);
                len--;
            }
        }
    }
}