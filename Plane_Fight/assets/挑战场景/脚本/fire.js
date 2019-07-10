
cc.Class({
    extends: cc.Component,

    properties: {
        daoDan:cc.Prefab,
        //道具皮肤
        propSkin:cc.Sprite,
        //暴走
        bombToCrystal:cc.Node
    },


    // onLoad () {},

    start () {
        //创建子弹的对象池
        this.hbPool = new cc.NodePool('Bullet');
        // 攻击导弹的对象池
        // this.DFPool = new cc.NodePool('DF');
        this.shootPolicy = 1;
        //发射子弹的计时器
        this.schedule(this["shoot"+this.shootPolicy],0.2);
        this.heroHP = 100;
        this.life = 3
    },

    shoot1(){
        // cc.log(this.shootPolicy)
        this.fire(cc.vv.SHOOT_POLICY[this.shootPolicy])
    },
    shoot2(){
        // cc.log(this.shootPolicy)
        this.fire(cc.vv.SHOOT_POLICY[this.shootPolicy])
    },
    shoot3(){
        // cc.log(this.shootPolicy)
        this.fire(cc.vv.SHOOT_POLICY[this.shootPolicy])
    },
    shoot4(){
        // cc.log(this.shootPolicy)
        this.fire(cc.vv.SHOOT_POLICY[this.shootPolicy])
    },
    shoot5(){
        // cc.log(this.shootPolicy)
        this.fire(cc.vv.SHOOT_POLICY[this.shootPolicy])
    },
    fire(polity){
        cc.vv.dj.playEffect(cc.vv.res["bullet"])
        // let pList =  [cc.v2(-200,100),cc.v2(100,-100),cc.v2(-100,-100)]  
        let offset = polity["offset"];
        // 获取当前模式下的子弹；列表
        let bulletList = polity['bulletList'];
        let total = polity['total'];
        let rotationList = polity['rotationList']
        for (let i = 0; i < total; i++) {
            // n拿到完整的子弹信息
            let bulletData =  cc.vv.BULLET_LIST[bulletList[i]]
            let way = cc.v2(0,1000)
            let bullet = this.hbPool.get();
            if(!bullet){
                bullet = cc.instantiate(cc.vv.res[bulletData['prefab']]);
            }  
            bullet.getComponent("bullet").init(this.hbPool,bulletData)
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
                        this.hbPool.put(bullet);
                    }.bind(this)
                    )
                )
            )
        };
        // for (let i = 0; i < 2; i++) {
        //     let ration = i? 1:-1;
        //     let way2 = [cc.v2(-100*ration,-400),cc.v2(-100*ration,0),cc.v2(-200*ration,100)];
        //     let DF = this.DFPool.get();
        //     if(!DF){
        //         DF = cc.instantiate(this.daoDan);
        //         DF.getComponent("DF").init(cc.vv.BEKILLENEMY,this.DFPool)
        //     }
        //     DF.rotation = 0;
        //     DF.setPosition(this.node.getPosition());
        //     this.node.parent.addChild(DF);
        //     DF.runAction(
        //         cc.sequence(
        //             cc.bezierBy(2,way2),
        //             cc.callFunc(function(){
        //                 DF.getComponent('DF').isFollow = true;
        //             }.bind(this))
        //         )
        //     )
        // }
    },

    //升级武器
    upgradeWeapons(){
        // 关闭前一个计时器
        this.unschedule(this['shoot'+this.shootPolicy])
        this.shootPolicy +=1;
        // 开启定时器
        if(this.shootPolicy >= 5){
            this.shootPolicy  = 1;
        }
        this.schedule(this["shoot"+this.shootPolicy],0.1 );
    },

    onCollisionEnter(other,self){   
        if(other.node.group ==="dijun"){
            if(this.life == 0){
                alert("被撞死了")
            }
            this.life -=1;
            this.heroHP = 100;
            cc.vv.challenge.loadProgressBar.progress = this.heroHP/100;
            cc.vv.challenge.life.string = "life:" + this.life;
        }
        if(other.node.group ==="diju_bullet"){ 
            let damage = other.getComponent("bullet").damage;
            this.heroHP  =  this.heroHP -damage;
            cc.vv.challenge.loadProgressBar.progress = this.heroHP/100;
                //  cc.log(this.heroHP)
            if(this.heroHP <= 0 ){
                cc.log("111111")
                if(this.life <= 0){
                    cc.vv.challenge.loadProgressBar.progress = this.heroHP/100;
                    alert("wosile")
                }
                this.life --;
                cc.log(this.life)
                cc.vv.challenge.life.string = "life:" + this.life;
                this.heroHP = 100;
                cc.vv.challenge.loadProgressBar.progress = this.heroHP/100;
            }
        }
        if(other.node.group === "prop"){
            if(other.node.name === "prop_1_cibao"){
                this.challengeSkin(other.node.name)
                this.bombToCrystal.active = true;
                this.bombToCrystal.getComponent(cc.Animation).play();
                setTimeout(function(){
                    this.bombToCrystal.active = false;
                }.bind(this),5000)
            }
            if(other.node.name === "prop_2_baozou"){
                // this.upgradeWeapons()
                this.challengeSkin(other.node.name)
                cc.vv.challenge.strom()
            }
            if(other.node.name === "prop_3_life"){
                this.challengeSkin(other.node.name)
                this.life++
                cc.vv.challenge.life.string = "life:" + this.life;
            }
            if(other.node.name === "prop_4_wuqi"){
                this.challengeSkin(other.node.name)
                this.upgradeWeapons()
            }
            if(other.node.name === "prop_5_bisha"){
                this.challengeSkin(other.node.name)
                cc.vv.challenge.allKill()
            }
        }
    },
    challengeSkin(name){
        this.propSkin.node.active = true;
        this.propSkin.spriteFrame = cc.vv.res[name + "_skin"];
        setTimeout(function(){
            this.propSkin.node.active = false;
        }.bind(this),1000)
    },
    update (dt) {},
});
