
cc.Class({
    extends: cc.Component,

    properties: {
        set_1:cc.Node,
        set_2:cc.Node
    },


    // onLoad () {},

    start () {
        this.node.on('touchstart',function(){
            console.log(13);
            
        })
    },
    onButtonClick(event,customData){
        this[customData]();
    },
    // 继续游戏
    resumeGame(){
        this.node.active = false;
        cc.director.resume();
    },
    // 退出游戏
    leaveGame(){
        cc.director.resume();
        cc.director.loadScene("levelScene")
    },
    // 关闭声音
    closeTheVoice(){
        cc.log('关闭声音')
        cc.audioEngine.stopMusic();

        this.set_1.active = false;
        this.set_2.active = !this.set_1.active;
    },
    // 开启声音
    openTheVoice(){
        cc.log("开启声音")
        this.set_1.active = true;
        this.set_2.active = !this.set_1.active;
    },

    // update (dt) {},
});
