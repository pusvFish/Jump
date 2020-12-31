import GameRoot from './GameRoot'

export default class Global {
    private static instance: Global = null;
    public gameRoot: GameRoot = null;

    private constructor() {
    }

    public static getInstance(): Global {
        if (!Global.instance) {
            Global.instance = new Global();
        }
        return Global.instance;
    }


    public returnHall() {
        cc.director.loadScene("HallScene");
    }
}