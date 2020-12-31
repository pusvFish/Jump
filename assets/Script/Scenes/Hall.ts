import G from '../G'
import DynamicDT from '../DynamicDT'
const { ccclass, property } = cc._decorator;

@ccclass
export default class Hall extends cc.Component {

    @property(cc.Button)
    Jump: cc.Button = null;

    onLoad() {
        this.Jump.node.on('click', () => { DynamicDT.getInstance().addGame('Jump'); this.startGame(); }, this);

    }

    startGame() {
        cc.director.loadScene('GameScene');
    }
    start() {
        // cc.director.loadScene('GameScene');
    }



    // update (dt) {}
}
