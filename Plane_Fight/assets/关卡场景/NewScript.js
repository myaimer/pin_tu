
cc.Class({
    extends: cc.Component,

    properties: {
        dizuoPrefab:cc.Prefab,
    //    滚动视图的内容显示区域
        content:cc.Node,
        // 确定按钮
        button:cc.Node,
        // 开始游戏按钮
        startGame:cc.Node,
        content:cc.Node,
        // 滑动层
        slidingLayer:cc.ScrollView,
        // 总星星的数量文本
        totalStarTxt:cc.Label,
        // 当前关卡解锁需要的星星数量
        needStarTxt:cc.Label,
        // 战机选择界面
        planeChooseView:cc.Node,
        // 关卡选择界面
        levelChooseView:cc.Node,
        // 我的战机图片
        curPlane:cc.Sprite
    },


    // onLoad () {},

    start () {
        // 最近解锁的关卡底座
        this.lastUnlockDizuo = null;
        // 当前选中关卡为空
        // this.curLevel = null;
        this.clickedDizuo =null;
        // 绘制关卡滚动视图
        this.drawDizuo();
        // this.setLevel(this.lastUnlock.getComponent("dizuo"));
        // this.button.on("touchstart",this.goBack,this)
        this.comfirm();
    },
    drawDizuo(){
        for (let i = 1; i < cc.vv.TOTAL_LEVEL; i++) {
            let dizuo = cc.instantiate(cc.vv.res['dizuo']);
            // cc.log(dizuo);
            dizuo.getComponent('dizuo').init(i,this);
            this.content.addChild(dizuo);
        }
        // for(let i = 0 ; i <cc.vv.TOTAL_LEVEL;i++){
        //     let dizuo  =cc.instantiate(this.dizuoPrefab)
        //     if(i%2 ===0){
        //         dizuo.y += 30;
        //     }else{
        //         dizuo.y -= 30;
        //         dizuo.getComponent("dizuo").Line.scaleY = -1;
        //     }
        //     if( i === cc.vv.TOTAL_LEVEL -1){
        //         dizuo.getComponent("dizuo").Line.active = false;

        //     }
        //     if(i>cc.vv.userInfo.unlockLevel-1){
        //         dizuo.getComponent("dizuo").lock.node.active = true; 
        //     }else{
        //         dizuo.getComponent("dizuo").gradeTxt.string = i+1;
        //     }
        //     dizuo.getComponent("dizuo").par = this;
        //     this.content.addChild(dizuo);
        // }
    },
    // 底座被点中的相应函数
    onDizuoClick(dz){ 
        if(this.clickedDizuo){
            this.clickedDizuo.isSelected = false;
        }
        dz.isSelected = true;
        this.clickedDizuo = dz; 
        this.button.active = (dz.grade > cc.vv.userInfo.unlockLevel);
        this.startGame.active = !(dz.grade > cc.vv.userInfo.unlockLevel);
        // 显示已经获得得星星数
        this.totalStarTxt.string = cc.vv.userInfo.startCount;
        // 设置任务信息版的解锁需求
        this.needStarTxt.string = dz.needStarCount;
        // 更新当前选中的关卡
        cc.vv.CURENT_SELECT_LEVEL = dz.grade;
        cc.log( cc.vv.CURENT_SELECT_LEVEL)
    },


    onButtonClick(event,customData){
        this[customData]();
    },
    // 返回
    back(){
        cc.director.loadScene("menu")
    },
    // 我的战机
    myPlane(){
        this.planeChooseView.active = true;
        this.levelChooseView.active = false;
        cc.log(123)
    },
    // 确定
    comfirm(){
            // 处理滚动视图滚动阶段与我们设置的动作冲突
        if(this.slidingLayer.isAutoScrolling()){
            this.slidingLayer.stopAutoScroll();
            cc.log(12)
        }
        // 弹回逻辑 
            // 1.最近解锁的关卡距离屏幕的中间的距离
        let p1 = this.lastUnlockDizuo.node.convertToWorldSpaceAR(cc.v2(0,0));
        let s1 = Math.abs(p1.x -cc.winSize.width/2);
        let p2 = this.content.convertToWorldSpaceAR(cc.v2(0,0));
        let s2 = Math.abs(p2.x)
        let s3 = (s1 < s2)? s1:s2;
        // 计算运动时间
        let t = s3/3000
        this.content.runAction(cc.moveBy(t,cc.v2(s3,0))).easing(cc.easeInOut(3.0))
        this.lastUnlockDizuo.onSelected()
    },
    // 开始游戏
    startGame1(){
        cc.director.loadScene("challenge")
    },

    // setLevel(level){
    //     // 如果没有关卡被选中
    //     if(!this.curLevel){
    //         this.curLevel = level;
    //         level.isSelected = true;
    //     }else{
    //         if(this.curLevel !== level){
    //             this.curLevel.isSelected = false;
    //             level.isSelected = true;
    //             this.curLevel = level;
    //         }
    //     }
    // },
    goBack(){
        this.planeChooseView.active = false;
        cc.log("123")
    },
    update (dt) {
        if(!this.planeChooseView.active){
            this.levelChooseView.active = true; 
        }
        // 更新选中飞机的图片
        this.curPlane.spriteFrame = cc.vv.res['plane_' + cc.vv.CUREENT_PLANE_TYPE]
    },
});
