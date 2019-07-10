
cc.Class({
    extends: cc.Component,

    properties: {
        blue:cc.Node,
        yellow:cc.Node,
        // 等级文本
        gradeTxt:cc.Label,
        // 尾线
        line:cc.Node,
        // 锁的标志
        lock:cc.Sprite,
    },


    // onLoad () {},

    start () {
        // this.par = null;       因为节点的渲染顺序问题，所以这里的会被后运行，所以不能重新赋值   在NewScript脚本32行中有关联
        // 给底座添加点击事件
        this.node.on("touchstart",this.onSelected,this);
    },
    init(grade,par){
        // 保存当前关卡的解锁需求
        this.needStarCount = cc.vv.levelData[grade-1]['unlockCondition'];
        // 保存关卡界面的主线脚本的指针
        this.par = par;
        // 保存当前关卡数
        this.grade = grade
        // 初始化底座的标签
        this.isSelected =false;
        if(grade === cc.vv.userInfo.unlockLevel){
            this.onSelected();
            this.par.lastUnlockDizuo = this;
        }
        // 显示关卡数
        this.gradeTxt.string = grade;
        // 上下y坐标错开
        this.node.y += (grade%2) ? 30:-30;
        // 设置尾线的反转
        this.line.scaleY = (grade%2) ? 1:-1;
        //隐藏最后一个关卡的尾线
        this.line.active = !(grade === cc.vv.TOTAL_LEVEL-1);
        // 设置关卡文本的显示和不显示
        this.gradeTxt.node.active = (grade <= cc.vv.userInfo.unlockLevel);
        //设置未解锁标识的显示
        this.lock.node.active =!(grade <= cc.vv.userInfo.unlockLevel);
    },
    onSelected(){
        if(!this.isSelected){
            this.isSelected = true;
            this.getComponent(cc.Animation).play();
            this.par.onDizuoClick(this);
        }

        let canvas =cc.find("Canvas").getComponent("NewScript");
        // cc.log(canvas)
        // if(this.lock.node.active){
        //     canvas.button.active = true;
        //     canvas.startGame.active = false;
        //     // cc.log(this.node.x,canvas.content.x)   
        // }else{
        //     canvas.button.enabled =false;
        //     canvas.button.active = false;
        //     canvas.startGame.active = true;
        //     // cc.log(this.node.x,canvas.content.x)
        // }
    },
    
    update (dt) {
            this.blue.active = !this.isSelected;
            this.yellow.active =this.isSelected ;
    },
    goHome(){
        cc.log(123)
        // let pos = this.node.x - (this.node.width+50)*8-50;
        // // cc.log(canvas.content.x)
        // obj.content.runAction(
        //     cc.moveBy(1,cc.v2(pos,0))
        // )
    }
    
});
