
cc.Class({
    extends: cc.Component,

    properties: {
        // 背景滚动层的父节点
        bgLayer:cc.Node,
        // 暂停界面
        pauseView:cc.Node,
        // 必杀技能特效
        allSkill:cc.Animation,
        // 暴走技能特效
        godLike:cc.Animation,
        // 英雄 
        hero:cc.Sprite,
        // 得分的文本
        score:cc.Label,
        // 生命值文本
        life:cc.Label,
        // 血量进度条
        loadProgressBar:cc.ProgressBar,
        // 战斗层
        battle:cc.Node,
    },


    onLoad () {
        // 播放背景音乐
        cc.vv.dj.playBgm(cc.vv.res["challenge"],true);
        // 将当前脚本的指针赋值到
        cc.vv.challenge = this;
        // 初始化游戏得分
        cc.vv.score = 0;
        this.score.string = 0;
        // 获取碰撞管理器
        let manager = cc.director.getCollisionManager();
        // 开启碰撞
        manager.enabled = true;
        // 绘制包围盒
        // manager.enabledDebugDraw = true;
        // 拿到当前关卡背景滚动的预制件
        var map ='map_' + cc.vv.CURENT_SELECT_LEVEL
        let mapPrefab  = cc.vv.res[map];
        let mapNode = cc.instantiate(mapPrefab);
        this.bgLayer.addChild(mapNode)
        // 获取关卡数据
        this.levelData = cc.vv.levelData[cc.vv.CURENT_SELECT_LEVEL-1]
        // 敌机列表
        this.enemyList = this.levelData['enemyList'];
        this.bossData = this.levelData["boss"]
        // 爆道具
        this.node.on("爆道具",function({target}){
            // cc.log("接受爆道具");
            this.createProp(target)
        },this)
    },
    start () {
        //获取所有敌机对象池
        this.enemyPool  = [];
        for (let i = 0; i < this.enemyList.length; i++) {
            this.enemyPool[i]  = new cc.NodePool("diji");  
        }
        // 启动敌机生成的计时器
        this.schedule(this.createEnemy,1);
        // 当前攻击目标
        this.curAttackTarget = null;
    },
    createBoss(){
        cc.log(cc.vv.BOSS_LIST[this.bossData])
        let bossData  = cc.vv.BOSS_LIST[this.bossData]
        let boss = cc.instantiate(cc.vv.res[bossData["prefab"]]);
        boss.getComponent("boss").init(bossData);
        boss.setPosition(100,100);
        this.battle.addChild(boss)
    },
    createEnemy(){
        // 随机获取敌机数据
        let index = Math.floor(Math.random()*this.enemyList.length)
        let enemyData =cc.vv.ENEMY_LIST[this.enemyList[index]];
        // 生成对应的敌机
        let id = enemyData["id"];   
        // 给敌机匹配自己对应的对象池
        let pool = this.enemyPool[index]
        this["createEnemy_" +parseInt(id.split("ep_")[1])](enemyData,pool);
    },
    // 获取敌机节点
    getEnemyNode(pool,data){
        let enemyNode =  pool.get();
        let prefab = cc.vv.res[data["prefab"]]
        if(!enemyNode){
            enemyNode = cc.instantiate(prefab);
            enemyNode.getComponent("diji").init(pool,data);
        };
        return enemyNode;
    },
    // 敌机1
    createEnemy_1(data,pool){
        // 取得对应的预制件
        let enemy = this.getEnemyNode(pool,data)
        let isRight = (Math.random() >0.5? 1:-1)
        enemy.x =(cc.winSize.width/2+100)*isRight;
        enemy.y = Math.random()*200 +100;
        this.battle.addChild(enemy);

    },
    // 敌机2
    createEnemy_2(data,pool){
        for (let i = 0; i < 3; i++) {
            // 取得对应的预制件
            let enemy = this.getEnemyNode(pool,data)
            enemy.x =cc.winSize.width/2 +55*i;
            enemy.y =cc.winSize.height/2 +20*i;
            this.battle.addChild(enemy);
        }
    },
    createEnemy_3(data,pool){
        for (let i = 0; i < 3; i++) {
            // 取得对应的预制件
            let enemy = this.getEnemyNode(pool,data)
            enemy.x =-cc.winSize.width + 20*i;
            enemy.y = Math.random()*200 +100;
            this.battle.addChild(enemy);
        }
    },
    // 爆装备
    createProp(enemy){
        let keys  = Object.keys(cc.vv.PROP_LIST);
        let key = keys[parseInt(Math.random()*keys.length)]
        let prop  =cc.instantiate(cc.vv.res[cc.vv.PROP_LIST[key]["prefab"]])
        prop.setPosition(enemy.getPosition());
        prop.getComponent("Propo").init(cc.vv.PROP_LIST[key]["skin"])
        this.battle.addChild(prop);
    },
    onButtonClick(event,customData){
        this[customData]();
    },
    //暂停
    pauseGame(){
        // 弹出暂停界面
        this.pauseView.active = true;
        // 暂停游戏
        cc.director.pause();

        // cc.log("zhanting")

    },
    // 必杀
    allKill(){
        this.allSkill.node.active = true;
        this.allSkill.play();
        // cc.log(this.node.children)
    },
    // 磁暴
    strom(){
        // cc.log("cibao")
        this.godLike.node.active = true;
        this.godLike.play();
    },
    addScore(add){
        cc.vv.score += add;
        this.score.string = cc.vv.score;
        if(cc.vv.score >2000){
            this.createBoss();
        }
    },
  
    
    // 碰撞
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
    },
    // 锁定目标
    setGoals(){
        let enemyList = this.node.children;
    },
    update (dt) {
        this.hero.spriteFrame = cc.vv.res['plane_' + cc.vv.CUREENT_PLANE_TYPE]
    },
});
