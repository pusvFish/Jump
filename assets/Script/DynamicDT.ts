
export default class DynamicDT {
    private _mapDt: Map<string, any> = new Map();
    private _name: string;
    private constructor() {

    }
    static _instance: DynamicDT = null;
    static getInstance() {
        if (!DynamicDT._instance) {
            DynamicDT._instance = new DynamicDT();
        }
        return DynamicDT._instance;
    }
    addGame(name: string) {
        if (!name || typeof (name) !== 'string') {
            return;
        }
        this._name = name;
    }

    getGame() {
        return this._name;
    }

    //添加数据
    addData(key, config) {
        if (!key || !config || typeof (key) !== 'string') {
            return;
        }
        this._mapDt.set(key, config);
    }
    //删除数据
    removeData(key) {
        if (!key || typeof (key) !== 'string') {
            return;
        }
        delete this._mapDt[key];
    }
    //获取数据
    getData(key): any {
        if (!key || typeof (key) !== 'string') {
            return null;
        }
        return this._mapDt.get(key);
    }
}