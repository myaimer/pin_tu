
cc.Class({
    extends: cc.Component,

    properties: {
       
    },


    // onLoad () {},

    start () {

    },
    init(pool,data){
        this.pool = pool;
        this.damage = data.damage;
    },
    // reuse(){
    //     this.node.setPosition(0,0);
    // },
    // 碰撞开始
    onCollisionEnter(other,self){
        if(other.node.group ==="dijun"){
            this.node.stopAllActions();
            this.getComponent(cc.Animation).play();
        }
        if(other.node.group ==="youjun"){
            this.remove();
        }
        if(other.node.group ==="Boss"){
            this.node.stopAllActions();
            this.getComponent(cc.Animation).play();
        }
    },
    remove(){
        this.pool.put(this.node)
    },
    // 碰撞保持
    // onCollisionStay(other,self){

    // },
    //  // 碰撞开始
    //  onCollisionExit(other,self){

    // },

    
    // update (dt) {},
});
