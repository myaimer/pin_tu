
cc.Class({
    extends: cc.Component,

    properties: {
       
    },


    // onLoad () {},

    start () {

    },
    onCollisionEnter(other,self){
            if(other.node.group === "diju_bullet"){
                other.node.stopAllActions();
                other.node.getComponent("bullet").pool.put(other.node);
            }
            if(other.node.group === "dijun"){
                other.node.stopAllActions();
                other.node.getComponent(cc.Animation).play();
            }
    },
    remove(){
        // cc.log("激活被关闭了");
        this.node.active = false;
    }
    // update (dt) {},
});
