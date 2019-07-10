var BallLayer = cc.Layer.extend({

    ctor:function () {
        this.speed = 0.1;
        this.speed_x = 0.4;
        this.g = 0.03;
        this._super();
        var size = cc.winSize;
        this.ball = new cc.Sprite(res.ball);
        this.ball.x = size.width / 2;
        this.ball.y = size.height / 2 + 200;
        this.ball.scale = 0.2;
        this.addChild(this.ball);
        var temp = setInterval(this.drop.bind(this),0.08);
    },

    drop:function () {
        this.ball.y -= this.speed;
        this.ball.x += this.speed_x;
        this.speed += this.g;
        if(this.ball.y <= this.ball.height / 10){
            this.speed *= 4 / -5;
            this.ball.runAction(
                cc.sequence(
                    cc.scaleTo(0.5,0.2,0.2 * 0.5),
                    cc.scaleTo(0.5,0.2,0.2)
                )
            )
        }
    }
})

var BallScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new BallLayer();
        this.addChild(layer);
    }
})