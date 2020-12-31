import Player from "./JumpPlayer";
import Stage from "./JumpStage";
import { STATE } from "./JumpConstants";
import Progress from "./JumpProgress";
import G from "../G";
import { Emitter } from '../Emitter'
const { ccclass, property } = cc._decorator;

@ccclass
export default class JumpScene extends cc.Component {

    @property(Stage)
    private stage: Stage = null;
    @property(Progress)
    private progress: Progress = null;
    @property(cc.Node)
    private ignoreStoryButton: cc.Node = null;

    public state: STATE = STATE.NONE;

    start() {
        this.addListeners();
        this.startGame();
    }

    private startGame() {
        this.state = STATE.READY;
        this.stage.init(this);
        // console.log("aaa");

        this.stage.showStartStory(() => {
            this.ignoreStoryButton.active = false;
            this.progress.init(200);
            this.progress.show();
            this.state = STATE.START;
            this.stage.startGame();
        }, this);
    }

    private overGame(isSuccess: boolean) {
        if (isSuccess) {
            this.progress.hide();
            this.state = STATE.OVER;
            this.stage.endGame(() => {
                G.getInstance().gameRoot.showMaskMessage("原来我不是男主",
                    {
                        label: "打扰了", cb: () => {
                            G.getInstance().returnHall();
                        }, target: this
                    });
            }, this);
        } else {
            this.state = STATE.OVER;
            Emitter.getInstance().emit('showMaskMessage', "缘已至此", {
                label: "放不下", cb: () => {
                    // this.stage.startGame();
                    //this.state = STATE.START;
                    // this.progress.updateProgress(0); 
                    cc.director.loadScene('GameScene');
                }, target: this
            }, {
                label: "算了吧", cb: () => {
                    G.getInstance().returnHall();
                }, target: this
            }, this);
            /* this.state = STATE.OVER;
            G.getInstance().gameRoot.showMaskMessage("缘已至此",
                {
                    label: "放不下", cb: () => {
                        // this.stage.startGame();
                        //this.state = STATE.START;
                       // this.progress.updateProgress(0); 
                        cc.director.loadScene('GameScene');
                    }, target: this
                },
                {
                    label: "算了吧", cb: () => {
                        G.getInstance().returnHall();
                    }, target: this
                }); */
        }

    }

    private onScreenTouchStart() {
        if (this.state === STATE.START) {
            this.stage.playerReadyJump();
        }
    }

    private onScreenTouchEnd() {
        if (this.state === STATE.START) {
            this.stage.playerJump((playerIndex: number, needNewBlock: boolean) => {
                if (playerIndex === -1) {
                    this.state = STATE.NONE;
                    this.stage.playerDie(() => {
                        this.overGame(false);
                    }, this);
                } else {
                    let isSuccess = this.progress.updateProgress(playerIndex);
                    if (isSuccess) {
                        this.overGame(true);
                    } else {
                        if (needNewBlock) {
                            this.stage.addNewBlock();
                        }
                    }
                }
            }, this);
        }
    }

    private ignoreStory() {
        this.stage.ignoreStory();
    }

    private addListeners() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onScreenTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onScreenTouchEnd, this);
    }

    private removeListeners() {

    }

}

