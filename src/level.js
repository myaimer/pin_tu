var levelLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        //星星运动的锁
        this.isrun = true;
        var size = cc.winSize;
        var sprite = new cc.Sprite(res.gameBackGround);
        sprite.attr({
            x:size.width / 2,
            y:size.height / 2
        })
        this.addChild(sprite);

        this.clover = new cc.Sprite(res.clover);
        this.clover.attr({
            x:size.width / 2,
            y:size.height - 5 - this.clover.height / 2
        })
        this.addChild(this.clover);

        this.runScene = cc.callFunc(function () {
            cc.director.runScene(new puzzleScene());
        })
        var enter = new cc.MenuItemImage(
            res.enter1,
            res.enter2,
            function () {
                // cc.log('跳转到第三个场景')
                this.isrun = true;
                this.star.runAction(
                    cc.sequence(
                        cc.moveTo(0.2,this.clover.width / 2,this.clover.height / 2),
                        cc.spawn(
                            cc.rotateBy(0.2,720),
                            cc.scaleTo(0.2,3),
                            cc.fadeOut(0.2)
                        ),
                        this.runScene
                    )
                )

            },this);

        enter.attr({
            x:size.width / 2,
            y:size.height / 6
        });

        var Menu =new cc.Menu(enter);
        Menu.attr({
            x:0,
            y:0
        })
        this.addChild(Menu);

        //返回按钮
        var returnButton = new cc.MenuItemImage(
            res.return1,
            res.return2,
            function () {
                cc.director.runScene(new gameScene())
            },this)

        returnButton.attr({
            x:size.width - returnButton.width / 2 - 3,
            y:returnButton.height / 2 + 3
        })

        var Menu1 = new cc.Menu(returnButton);
        Menu1.attr({
            x:0,
            y:0
        })
        this.addChild(Menu1);

        //添加星星
        this.star = new cc.Sprite(res.star);
        this.star.x = this.clover.width / 2;
        this.star.y = this.clover.height / 2;
        this.star.scale = 2;
        this.clover.addChild(this.star);
        // 定义回调函数（当动作执行完毕后执行）
        var callback = cc.callFunc(function () {
            this.isrun = false;
        }.bind(this))
        var spawn = cc.spawn(
                cc.scaleTo(1,1,1),
                cc.rotateBy(1,720)
            )
        this.star.runAction(
            cc.sequence(
                spawn,
                callback
            )
        )
        this.setInputControl();
    },
    
    setInputControl:function () {
        var that = this;
        //创建了一个监听者
        var listener = cc.EventListener.create({
            //指定监听类型
            //触摸类型
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            //设置事件吞没
            swallowtouches:true,
            onTouchBegan:function (touch,event) {
                    if(this.click ==2)
                    that.star.runAction(
                        cc.sequence(
                            cc.moveTo(0.2,that.clover.width / 2,that.clover.height / 2),
                            cc.spawn(
                                cc.rotateBy(0.5,720),
                                cc.scaleTo(0.5,3),
                                cc.fadeOut(0.5)
                            ),
                            that.runScene
                        )
                    )

                if(that.isrun){
                    return;
                }
                that.isrun = true;
                // cc.log(touch,event);
                var callback = cc.callFunc(function () {
                    that.isrun = false;
                })
                // 获取点击点的坐标
                var pos = touch.getLocation();
                // 得到点击响应的区域
                var rect = cc.rect(0,that.clover.y - that.clover.height / 2,that.clover.width,that.clover.height);
                //判断点是否在矩形内
                if(cc.rectContainsPoint(rect,pos)){
                    pos = that.clover.convertToNodeSpaceAR(pos);
                    //点击第二象限
                    if(pos.x < 0 && pos.y > 0){
                        cc.vv.level = 1;
                        var spawn = cc.spawn(
                            cc.moveTo(0.25,cc.p(that.clover.width / 4,(that.clover.height / 4) * 3)),
                            cc.rotateBy(0.25,72)
                        )
                        that.star.runAction(
                            cc.sequence(
                                spawn,
                                callback
                            )
                        )

                    }
                    //点击第一象限
                    if(pos.x > 0 && pos.y > 0){
                        cc.vv.level = 2;
                        that.star.runAction(
                            cc.spawn(
                                cc.moveTo(0.25,cc.p((that.clover.width / 4) * 3,(that.clover.height / 4) * 3)),
                                cc.rotateBy(0.25,72)
                            )
                        )
                    }
                    //点击第三象限
                    if(pos.x < 0 && pos.y < 0){
                        cc.vv.level = 3;
                        that.star.runAction(
                            cc.spawn(
                                cc.moveTo(0.25,cc.p((that.clover.width / 4),(that.clover.height / 4))),
                                cc.rotateBy(0.25,72)
                            )
                        )
                    }
                    //点击第四象限
                    if(pos.x > 0 && pos.y < 0){
                        cc.vv.level = 4;
                        that.star.runAction(
                            cc.spawn(
                                cc.moveTo(0.25,cc.p((that.clover.width / 4) * 3,(that.clover.height / 4))),
                                cc.rotateBy(0.25,72)
                            )
                        )
                    }

                }
                    setTimeout(function () {
                        that.isrun =false;
                    },270)
                    //将世界坐标系转换为以图片左下角为原点的坐标系
                    // pos = that.clover.convertToNodeSpace(pos);
                    // cc.log(pos);
                }
            })
        //将我们的创建的监听者添加至监听管理中
        cc.eventManager.addListener(listener,this);
    }
})

var levelScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new levelLayer();
        this.addChild(layer);
    }
})