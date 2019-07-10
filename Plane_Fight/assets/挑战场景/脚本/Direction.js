
cc.Class({
    extends: cc.Component,

    properties: {
       ball:cc.Node,
       hero:cc.Node
    },


    // onLoad () {},

    start () {
        this.maxSpeed = 10;
        this.curSpeed = 0;
        this.oldPos = this.ball.getPosition();
        this.ball.on("touchmove",this.onTouchMove,this);
        this.ball.on("touchend",this.goBack,this);
        this.ball.on("touchcancel",this.goBack,this);
    },
    onTouchMove(touch){
        let offset = touch.getDelta();
        let location = this.node.convertToNodeSpaceAR(touch.getLocation());
        let  distance = location.mag();
        if(distance > this.node.width/2){
            this.curSpeed = 10;
            this.ball.setPosition(location.mul((this.node.width/2)/distance))
        }else{
            this.curSpeed = distance /(this.node.width/2)*this.maxSpeed ;
            this.ball.x +=offset.x;
            this.ball.y += offset.y;
        }
        let speed = location.normalizeSelf().mul(this.curSpeed);
        this.hero.getComponent("walk").setSpeed(speed)
    },
    goBack(){
        this.ball.setPosition(this.oldPos);
        this.hero.getComponent("walk").setSpeed(cc.v2(0,0))
    }
    // update (dt) {},
});
