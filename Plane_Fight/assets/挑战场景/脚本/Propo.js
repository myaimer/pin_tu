
cc.Class({
    extends: cc.Component,

    properties: {
        circle:cc.Node, 
    },


    // onLoad () {},

    start () {
        this.speedX= 2;
        this.speedY = 2;
        // 撞墙次数
        this.step = 0; 
        this.circle.runAction(cc.rotateBy(1,360).repeatForever());
    },
    init(skin){
        this.skin = skin;
    },
    update (dt) {
        this.node.x += this.speedX;
        this.node.y -=this.speedY;
        if(this.node.x  >= cc.winSize.width/2 -  this.node.width*2 ||
            this.node.x  <= -cc.winSize.width/2 + this.node.width*2 ){
                this.speedX *= -1;
                this.step ++;
        }
        if( (this.node.y + this.node.height /2 >= cc.winSize.height/2 ||
            this.node.y + this.node.height /2 <= -cc.winSize.height/2)){
                if(this.step <5){
                    this.speedX = -this.speedX;
                    this.step ++;
                }else{
                    this.node.destroy();
                }
        }
    },
    onCollisionEnter(other,self){
        // cc.log(other.node.name)
        if(other.node.group === "youjun" && other.node.name === 'hero'){
            this.node.destroy();    
        }
    }
});
