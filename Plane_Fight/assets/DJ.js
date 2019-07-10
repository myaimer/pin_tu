
cc.Class({
    extends: cc.Component,

    properties: {
    
    },


    onLoad () {
        cc.game.addPersistRootNode(this.node);
        cc.vv.dj = this;
    },

    start () {
        // 当前正在播放的音乐
        this.bgm = null;

    },
    // 播放背景音乐
    playBgm(clip){
        if(this.bgm){
            cc.audioEngine.stopMusic(this.bgm)
        }
        cc.audioEngine.play(clip,true,0.5);            // true:表示循环播放 false：播放一次
        this.bgm = clip;
    },
    // 播放音效
    playEffect(clip){
        cc.audioEngine.play(clip,false,1)
    },
    // 关闭声音
    
    // update (dt) {},
});
