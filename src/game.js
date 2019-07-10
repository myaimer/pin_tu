var gameLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;
        //设置背景图片
        var background = new cc.Sprite(res.backGround);
        background.attr({
            x:size.width / 2,
            y:size.height / 2
        })
        //将图片添加到图层上
        this.addChild(background,1);

        // 创建菜单按钮
        var start = new cc.MenuItemImage(
            res.startButton1,
            res.startButton2,
            function () {
                cc.director.runScene(new levelScene());
            },this);
        //设置属性
        start.attr({
            x:size.width / 2,
            y:size.height / 8
        })

        var menu = new cc.Menu(start);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu,2);



    }
})



var gameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new gameLayer();
        this.addChild(layer);
    }
})