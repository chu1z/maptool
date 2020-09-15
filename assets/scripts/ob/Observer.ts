export interface IObserver {
    updateMsg(cmd: number, data: any);
}


export interface ISubject {
    addObserver(observer: IObserver);
    removeObserver(observer: IObserver);
    sendNotif(cmd: number, data?: any);
}