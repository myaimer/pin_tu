
cc.Class({
    extends: cc.Component,

    properties: {
       hero:cc.Node
    },


    // onLoad () {},

    start () {
        this.node.on("touchmove",this.onHeroDragged,this);
        cc.log(this.node.name)
        this.speedX = 0;
        this.speedY = 0;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    onHeroDragged(touch){
        // 获取当前位置与上一帧位置的偏移量
        let offset = touch.getDelta();
        this.checkCross(offset.x,offset.y)
        this.hero.x += offset.x;
        this.hero.y += offset.y;
    },
    onKeyDown(event){
        let keyCode = event.keyCode;
        switch(keyCode){
            case cc.macro.KEY.w ||cc.macro.KEY.W:
                this.speedY = 5;
                // cc.log("向上")
                break;
            case cc.macro.KEY.s ||cc.macro.KEY.S :
                this.speedY = -5;
                // cc.log("向下")
                break;
            case cc.macro.KEY.a||cc.macro.KEY.A :
                this.speedX =-5;
                // cc.log("向左")
                break;
            case cc.macro.KEY.d ||cc.macro.KEY.D:
                this.speedX = 5;
                // cc.log("向右")
                break;
        }
    },
    onKeyUp(event){
        let keyCode = event.keyCode;
        switch(keyCode){
            case cc.macro.KEY.w ||cc.macro.KEY.W :
            case cc.macro.KEY.s ||cc.macro.KEY.S :
            case cc.macro.KEY.a ||cc.macro.KEY.A :
            case cc.macro.KEY.d ||cc.macro.KEY.D :
                this.speedY = 0;
                this.speedX = 0;
                break;
        }
    },
    update (dt) {
        this.checkCross( this.speedX,this.speedY);
        this.hero.x +=  this.speedX;
        this.hero.y +=  this.speedY;
    },
    checkCross(x,y){
        if(this.hero.x + this.hero.width/2 >cc.winSize.width/2 ){
            this.hero.x = cc.winSize.width/2 - this.hero.width/2;
            x = 0;
        }
        if(this.hero.x  < -cc.winSize.width/2 +this.hero.width/2 ){
            this.hero.x = -cc.winSize.width/2 +this.hero.width/2;
            x = 0;
        }
        if(this.hero.y + this.hero.height/2 > cc.winSize.height/2 ){
            this.hero.y = cc.winSize.height/2 - this.hero.height/2;
            y= 0;
        }
        if(this.hero.y - this.hero.height/2 < -cc.winSize.height/2 ){
            this.hero.y =-(cc.winSize.height/2 - this.hero.height/2);
            y = 0;
        }
    }
});
