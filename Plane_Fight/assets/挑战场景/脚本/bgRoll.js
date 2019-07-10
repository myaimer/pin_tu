
cc.Class({
    extends: cc.Component,

    properties: {
        // 背景-远景层父节点
        farNode:cc.Node,
        cloud:cc.Node

    },


    // onLoad () {},

    start () {
        this.schedule(this.autoRoll,cc.vv.BG_ROLL_INTERVAL)
    },
    // 滚动控制模块
    autoRoll(){
        this.roll(this.farNode,cc.vv.FAR_ROLL_OFFSET);
        this.roll(this.cloud,cc.vv.NEAR_ROLL_OFFSET) 
    },

    // 滚动执行模块
    roll(par,speed){
        if(!par)return;
        let n1 = par.children[0];
        let n2 = par.children[1];
        n1.y -=  speed
        n2.y -= speed;
        if(n1.y + n1.height/2 < -cc.winSize.height/2){
            n1.y = n2.y + n2.height
        }
        if(n2.y + n2.height/2 < -cc.winSize.height/2){
            n2.y = n1.y + n2.height
        }

    }
    // update (dt) {},
});
