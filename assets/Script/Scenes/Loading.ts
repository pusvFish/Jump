import ResMgr from "./ResMgr";
import G from '../G'
import GameRoot from '../GameRoot'
const { ccclass, property } = cc._decorator;

@ccclass
export default class Loading extends cc.Component {

    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null;

    @property(cc.Node)
    gameRoot: cc.Node = null;


    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        cc.game.addPersistRootNode(this.gameRoot);
        G.getInstance().gameRoot = this.gameRoot.getComponent(GameRoot);


        cc.resources.loadDir(
            "./",
            (finishCount, totalCount, item) => {
                this.progressBar.progress = finishCount / totalCount;
            },
            (err, assets) => {
                if (err) {
                    return;
                }

                for (let i = 0; i < assets.length; i++) {
                    let asset = assets[i];

                    if (asset instanceof cc.Prefab) {
                        ResMgr.getInstance().addData('prefab', asset.name, asset);
                    } else if (asset instanceof cc.AudioClip) {
                        ResMgr.getInstance().addData('audioClip', asset.name, asset);
                    } else if (asset instanceof cc.SpriteFrame) {
                        ResMgr.getInstance().addData('spriteFrame', asset.name, asset);
                    } else if (asset instanceof cc.SpriteAtlas) {
                        let arrName = asset.name.split('.');
                        ResMgr.getInstance().addData('atlas', arrName[0], asset);
                    } else if (asset instanceof cc.TiledMapAsset) {
                        ResMgr.getInstance().addData('tiledMap', asset.name, asset);
                    }
                }

                cc.director.loadScene('HallScene');
            }
        );
    }

    start() {

    }

    // update (dt) {}
}
