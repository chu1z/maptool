export function Singleton<T>() {
    class Singleton {
        private static _ins: Singleton = null;
        public static get ins(): T {
            if (!this._ins)
                this._ins = new this();
            return this._ins as T;
        }
    }

    return Singleton;
}