export default class Pool<T>{
    private pool: Array<T>;
    private max: number = 0;
    private creater: { new(): T; };

    constructor(c: { new(): T }, nums: number = 10) {
        this.pool = [];
        this.creater = c;
        for (let i = 0; i < nums; i++) {
            this.pool.push(new c());
        }
    }

    pop(): T {
        if (this.pool.length > 0) {
            return this.pool.pop();
        } else {
            return new this.creater();
        }
    }

    push(obj: T) {
        this.pool.push(obj);
    }

    clear(): void {
        this.pool = [];
    }
}