
cc.Class({
    extends: cc.Component,

    properties: {
        HPProgressBar:cc.ProgressBar
    },


    onLoad () {
        // 开启物理系统
        cc.director.getPhysicsManager().enabled = true;
    },

    start () {
        let leafNode  = this.getLeafNode(this.node);
        // 给每一个叶节点绑定一个脚本组件
        leafNode.forEach(element => {
            // 把节点的分到boss组里面去
            element.group = "Boss";
            // 添加脚本的同时，并且初始化
            element.addComponent("Part");
            element.getComponent("Part").init(this);
            // cc.log(element);
        });
    },
    init(data){
        this.hp = data.hp;
        this.allHP = data.hp;
        this.shootPolicy = data.shootPolicy;
        this.bulletPool = new cc.NodePool("bullet");
        // cc.log(data)
    },
    shoot(){
        this.fire(cc.vv.SHOOT_POLICY[this.shootPolicy])
    },

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
    update (dt) {
        if(this.node.x < cc.winSize.height/2 - this.node.height){
            this.schedule(this.shoot,1)
        }
    },
    boom(){
        let c = this.getLeafNode(this.node);
        for(let i = 0; i < c.length; i++){
            // 移除包围盒
            c[i].removeComponent(cc.PolygonCollider);
            // 添加碰撞组件
            c[i].addComponent(cc.PhysicsBoxCollider);
            // 把碰撞组件的类型改为刚体的静态类型
            c[i].getComponent(cc.RigidBody).type = cc.RigidBodyType.Static;
            let flyDis = cc.v2(20,0);
            let r = Math.PI * 2 / c.length;
            let v = flyDis.rotate(r * i);
            // 给碰撞组件一个初始的向量力，这样的话在类型改为自由的时候就会爆炸飞出去
            c[i].getComponent(cc.RigidBody)._b2Body.m_linearVelocity.x = v.x;
            c[i].getComponent(cc.RigidBody)._b2Body.m_linearVelocity.y = v.y;
             // 把碰撞组件的类型改为刚体的动态类型 不然的话刚体不会飞
            c[i].getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic;
        }
        this.HPProgressBar.node.active = false;
    },
    // 通过闭包加递归。获取一个节点的叶节点
    getLeafNode(root){
        let leafNodeList = [];
        (function  f(node){
            let children = node.children;
            if(children.length >0){
                for (let i = 0; i < children.length; i++) {
                    f(children[i])   
                }
            }else{
                leafNodeList.push(node)
            }
        })(root) 
        return leafNodeList
    },
    hurt(damage){
        this.hp -= damage;
        this.HPProgressBar.progress =this.hp/this.allHP;
        if(this.hp <= 0){
            this.boom();
        }
    }
});
