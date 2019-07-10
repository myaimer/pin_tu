var Cell = cc.Sprite.extend({
    ctor:function (url,rect,Index) {
        this._super(url,rect);
        this.setControl();
        this.isBlack = false;
        this.Index = Index;
    },
    //在方块上添加点击
    setControl:function () {
        var that = this;
        var listener = cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowtouches:true,
            onTouchBegan:function (touch,event) {
                var pos = touch.getLocation();
                var rect = cc.rect(0,0,that.width,that.height);
                pos = that.convertToNodeSpace(pos);
                if(cc.rectContainsPoint(rect,pos)){
                    cc.log(111);
                    // 调用函数（获取点击方块的下标，执行交换）;
                    that.parent.parent.onClick(that);
                }
            }
        })
        cc.eventManager.addListener(listener,this);
    }
})