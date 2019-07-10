
cc.Class({
    extends: cc.Component,

    properties: {
        // 显示屏
        screen :cc.Node,
        //战机动画节点
        planeAin:cc.Animation,

        
    },


    // onLoad () {},

    start () {

    },

    onPlaneClick(event,customData){
        this.screen.getComponent(cc.Animation).play();
        // cc.log("p"+obj)
        this.planeAin.play("p"+customData);
        //更新当前使用飞机的类型
        cc.vv.CUREENT_PLANE_TYPE = customData;
    },
    // 按钮点击回调事件
    onButtonClicked(event,customData){
        this[customData]();
    },
    // 返回
    back(){

    },
    // 强化
    upgrade(){

    },
    // 礼包
    giftBag(){

    },

    // update (dt) {},
});
