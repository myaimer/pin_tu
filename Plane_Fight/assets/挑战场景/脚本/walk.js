
cc.Class({
    extends: cc.Component,

    properties: {
       
    },


    // onLoad () {},
    setSpeed(speed){
        this.speed = speed;
    },
    start () {
        this.speed = {x:0,y:0}
    },

    update (dt) {
        var a = require("inputControl");
        this.node.x += this.speed.x;
        this.node.y += this.speed.y;
    },
});
