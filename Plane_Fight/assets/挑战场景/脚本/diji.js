
cc.Class({
    extends: cc.Component,

    properties: {
        aimedTag:cc.Node,
    },


    // onLoad () {
       
    // },
    // 初始化敌机
    init(pool,data){
        this.value = data.value;
        this.hp = data.hp;
        this.fakerHp = this.hp;
        this.pool = pool;
        this.id= data.id;
        this.propProb = data.propProb
        this.shootPolicy = data.shootPolicy;
        // 保存行为逻辑
        this.action =this.getActionLogic(this.id);
        this.bulletPool = new cc.NodePool("bullet")
    },
    // 获取行为逻辑
    getActionLogic(id){
        // 设定敌机坐标
        if(id==="ep_001"){
            // cc.log(123)
           let isRight = this.node.x >0?1:-1;
            // 指定敌机行为
            let pList = [
                cc.v2(100,100),
                cc.v2(200,-100),
                cc.v2(2*cc.winSize.width*-isRight,0)
            ];
            let action =  cc.sequence(
                cc.bezierBy(5,pList),
                cc.callFunc(function(){
                    this.pool.put(this.node);
                }.bind(this))
            )
            return action;
        };
        if(id==="ep_002"){
            let action = 
                // cc.bezierBy(5,pList),
                cc.callFunc(function(){
                    this.schedule(this.move,0.01)
                }.bind(this))
            
            return action;
            // let isRight = (Math.random() >0.5? 1:-1)
            // this.node.x =(cc.winSize.width/2+100)*isRight;
            // this.node.y = Math.random()*200 +100;
            // // 指定敌机行为
            // let pList = [
            //     cc.v2(100,100),
            //     cc.v2(200,-100),
            //     cc.v2(2*cc.winSize.width*-isRight,0)
            // ];
            // let action =  cc.sequence(
            //     cc.bezierBy(5,pList),
            //     cc.callFunc(function(){
            //         this.pool.put(this.node);
            //     }.bind(this))
            // )
            // return action;
        };
        if(id==="ep_003"){
            // cc.log(123)
           let isRight = this.node.x >0?1:-1;
            // 指定敌机行为
            let pList = [
                cc.v2(100,100),
                cc.v2(200,-100),
                cc.v2(2*cc.winSize.width*-isRight,0)
            ];
            let action =  cc.sequence(
                cc.bezierBy(5,pList),
                cc.callFunc(function(){
                    this.move()
                }.bind(this))
            )
            return action;
        };
    },
    start () {
        this.speedX = -1;
        this.speedY = -0.5;
    },   
    shoot(){
        // cc.log(this.shootPolicy)
        this.fire(cc.vv.SHOOT_POLICY[this.shootPolicy])
    },
    // 敌机发射子弹
    fire(polity){
        let offset = polity["offset"];
        // 获取当前模式下的子弹；列表
        let bulletList = polity['bulletList'];
        let total = polity['total'];
        let rotationList = polity['rotationList']
        for (let i = 0; i < total; i++) {
            // n拿到完整的子弹信息
            let bulletData =  cc.vv.BULLET_LIST[bulletList[i]]
            let way = cc.v2(0,-1000)
            let bullet = this.bulletPool.get();
            if(!bullet){
                bullet = cc.instantiate(cc.vv.res[bulletData['prefab']]);
            }  
            bullet.getComponent("bullet").init(this.bulletPool,bulletData)
            way = way.rotate((rotationList[i])/180*Math.PI);
            // 更改皮肤
            bullet.getComponent(cc.Sprite).spriteFrame = cc.vv.res[bulletData['skin']];
            bullet.setPosition(this.node.x+offset[i][0],this.node.y+offset[i][1]);
            this.node.zIndex = bullet.zIndex + 1;
            this.node.parent.addChild(bullet);
            bullet.runAction(
                cc.sequence(
                    cc.moveBy(6,way),
                    cc.callFunc(function(){
                        this.bulletPool.put(bullet);
                    }.bind(this)
                    )
                )
            )
        };
    },  
    onCollisionEnter(other,self){        
        if(other.node.group ==="zidan" && this.hp >0){
            let damage = other.getComponent("bullet").damage;
            this.hp = this.hp-damage;
            // cc.log(this.hp)
            if(this.hp <= 0){
                this.node.stopAllActions();
                cc.vv.dj.playEffect(cc.vv.res['putong_boom'])
                this.getComponent(cc.Animation).play();
            }
        }
        if( other.node.group === "youjun" ){
            // cc.log(other.node.name)
            this.node.stopAllActions();
            cc.vv.dj.playEffect(cc.vv.res['putong_boom'])
            this.getComponent(cc.Animation).play();
        }
    },
    // 每次被加载到场景中会执行
    onEnable(){
        this.getActionLogic(this.id)
        this.node.runAction(this.action);
        this.schedule(this.shoot,Math.random()+3);
    },
    reuse(){
        // this.getActionLogic();
    },
    unuse(){
        // cc.log("haha");
    },
    remove(){
        cc.vv.challenge.addScore(this.value)
        this.hp =  this.fakerHp;
        //判断是否爆出道具
        let rand = Math.random();
        if(rand < this.propProb){
            // cc.log("准备发送爆道具事件");
            let customEvent = new cc.Event.EventCustom("爆道具",true);
            this.node.dispatchEvent(customEvent);
        }
        this.pool.put(this.node);
    },
    move(){
        if(this.node.x < -cc.winSize.width/2+this.node.width){
            this.speedX = 2
        }
        // cc.log(this.node.x)
        this.node.x += this.speedX;
        this.node.y += this.speedY;
        if(this.node.x  > cc.winSize.width){
            cc.log("我消失了")
            this.pool.put(this.node);
        }
    },
    move2(){
        this.speedX = -1;
        this.speedY = -0.5;
    }
    // update (dt) {

    // },
});
