
export class SingletonFactory {

    public static ins = {};

    public static getIns<T>(c: { new(): T; }): T {

        let key = c.toString();

        if (!this.ins[key]) {
            this.ins[key] = new c();
        }

        return this.ins[key];
    }

}