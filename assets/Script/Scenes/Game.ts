import DynamicDT from '../DynamicDT';
import ResMgr from './ResMgr';
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {



    start() {
        let preName = DynamicDT.getInstance().getGame();
        let gamePre = ResMgr.getInstance().getPrefab(preName);
        let gameNode = cc.instantiate(gamePre);

        gameNode.parent = this.node;

    }

    // update (dt) {}
}
