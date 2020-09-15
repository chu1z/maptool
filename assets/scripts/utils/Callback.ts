export class CallBack {

    public func: Function;

    public thisArg;


    public args: any[];

    constructor($func: Function, $thisObject, ...args) {

        this.func = $func;

        this.thisArg = $thisObject;

        this.args = args;

    }

    public exec(...args) {
        if (this.func) {

            let argArray = args;

            if (this.args) {
                argArray = this.args.concat(args);
            }

            this.func.apply(this.thisArg, argArray);
        }

    }


}