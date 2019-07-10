cc.vv = cc.vv || {};

// 背景滚动的时间间隔
cc.vv.BG_ROLL_INTERVAL = 0.02;

// 远景滚动的偏移量

cc.vv.FAR_ROLL_OFFSET = 3;

// 远景滚动的偏移量

cc.vv.NEAR_ROLL_OFFSET = 7;

// 游戏总关卡数

cc.vv.TOTAL_LEVEL = 16;

// 当前使用的战机类型

cc.vv.CUREENT_PLANE_TYPE = 3;
// 当前点击的关卡
cc.vv.CURENT_SELECT_LEVEL = 1;
// 导弹打 的敌机
cc.vv.BEKILLENEMY = null;
//游戏得分
cc.vv.score = 0;
// 挑战场景主线脚本
cc.vv.challenge = null;
// 游戏音乐控制模块
cc.vv.dj = null;

// 用户信息
cc.vv.userInfo = {
    // 玩家当前星星的数量
    startCount : 1,
    // 已解锁的关卡
    unlockLevel :8,
    // 金币数量
    goldCount :1000,
    // 当前战机
    curPlane :'hr-001',
    // 当前战机列表
    planeList:[
        {"id":"h1-001","level":1},
        {"id":"h1-002","level":2},
        {"id":"h1-003","level":3},
        {"id":"h1-004","level":4}

    ],
    // 碎片列表   todo
}
cc.vv.HeroData = [
    {
        "life" : 3,
     }
]
// 关卡信息
cc.vv.levelData =[
    {
        // 地图
        map:"map_1",
        // 任务
        mission: {} ,
        // // 敌机类型
        enemyList:["eb_1","eb_2","eb_3"],
        boss:"boss_01",
        // 通关奖励
        bonus:{},
        // 解锁需求
        unlockCondition:0,
    },
    {
        // 地图
        map:"map_2",
        // 任务
        mission: {} ,
        // // 敌机类型
        enemyList:["eb_1","eb_2","eb_3"],
        boss:"boss_02",
        // 通关奖励
        bonus:{},
        // 解锁需求
        unlockCondition:2,
    },
    {
        // 地图
        map:"map_2",
        // 任务
        mission: {} ,
        // // 敌机类型
        enemyList:["eb_1","eb_2","eb_3"],
        boss:"boss_01",
        // 通关奖励
        bonus:{},
        // 解锁需求
        unlockCondition:2,
    },
    {
        // 地图
        map:"map_3",
        // 任务
        mission: {} ,
        // // 敌机类型
        enemyList:["eb_1","eb_2","eb_3"],
        boss:"boss_01",
        // 通关奖励
        bonus:{},
        // 解锁需求
        unlockCondition:4,
    },
    {
        // 地图
        map:"map_4",
        // 任务
        mission: {} ,
        // // 敌机类型
        enemyList:["eb_1","eb_2","eb_3"],
        boss:"boss_01",
        // 通关奖励
        bonus:{},
        // 解锁需求
        unlockCondition:6,
    },
    {
        // 地图
        map:"map_5",
        // 任务
        mission: {} ,
        // // 敌机类型
        enemyList:["eb_1","eb_2","eb_3"],
        boss:"boss_01",
        // 通关奖励
        bonus:{},
        // 解锁需求
        unlockCondition:8,
    },
    {
        // 地图
        map:"map_6",
        // 任务
        mission: {} ,
        // // 敌机类型
        enemyList:["eb_1","eb_2","eb_3"],
        boss:"boss_01",
        // 通关奖励
        bonus:{},
        // 解锁需求
        unlockCondition:10,
    },
    {
        // 地图
        map:"map_7",
        // 任务
        mission: {} ,
        // // 敌机类型
        enemyList:["eb_1","eb_2","eb_3"],
        boss:"boss_01",
        // 通关奖励
        bonus:{},
        // 解锁需求
        unlockCondition:12,
    },
    {
        // 地图
        map:"map_8",
        // 任务
        mission: {} ,
        // // 敌机类型
        enemyList:["eb_1","eb_2","eb_3"],
        boss:"boss_01",
        // 通关奖励
        bonus:{},
        // 解锁需求
        unlockCondition:14,
    },
    {
        // 地图
        map:"map_9",
        // 任务
        mission: {} ,
        // // 敌机类型
        enemyList:["eb_1","eb_2","eb_3"],
        boss:"boss_01",
        // 通关奖励
        bonus:{},
        // 解锁需求
        unlockCondition:16,
    },
    {
        // 地图
        map:"map_10",
        // 任务
        mission: {} ,
        // // 敌机类型
        enemyList:["eb_1","eb_2","eb_3"],
        boss:"boss_01",
        // 通关奖励
        bonus:{},
        // 解锁需求
        unlockCondition:18,
    },
    {
        // 地图
        map:"map_11",
        // 任务
        mission: {} ,
        // // 敌机类型
        enemyList:["eb_1","eb_2","eb_3"],
        boss:"boss_01",
        // 通关奖励
        bonus:{},
        // 解锁需求
        unlockCondition:20,
    },
    {
        // 地图
        map:"map_12",
        // 任务
        mission: {} ,
        // // 敌机类型
        enemyList:["eb_1","eb_2","eb_3"],
        boss:"boss_01",
        // 通关奖励
        bonus:{},
        // 解锁需求
        unlockCondition:22,
    },
    {
        // 地图
        map:"map_13",
        // 任务
        mission: {} ,
        // // 敌机类型
        enemyList:["eb_1","eb_2","eb_3"],
        boss:"boss_01",
        // 通关奖励
        bonus:{},
        // 解锁需求
        unlockCondition:24,
    },
    {
        // 地图
        map:"map_14",
        // 任务
        mission: {} ,
        // // 敌机类型
        enemyList:["eb_1","eb_2","eb_3"],
        boss:"boss_01",
        // 通关奖励
        bonus:{},
        // 解锁需求
        unlockCondition:26,
    },
    {
        // 地图
        map:"map_15",
        // 任务
        mission: {} ,
        // // 敌机类型
        enemyList:["eb_1","eb_2","eb_3"],
        boss:"boss_01",
        // 通关奖励
        bonus:{},
        // 解锁需求
        unlockCondition:28,
    },
    {
        // 地图
        map:"map_16",
        // 任务
        mission: {} ,
        // // 敌机类型
        enemyList:["eb_1","eb_2","eb_3"],
        boss:"boss_01",
        // 通关奖励
        bonus:{},
        // 解锁需求
        unlockCondition:30,
    },
  
]
// 道具列表
cc.vv.PROP_LIST = {
    "cibao":{
        "type":"prop_001",
        "prefab":"prop_1_cibao",
        "skin" :"proptext2"
    },
    "baozou":{
        "type":"prop_002",
        "prefab":"prop_2_baozou",
        "skin":"",
    },
    "life":{
        "type":"prop_003",
        "prefab":"prop_3_life",
        "skin":"proptext8"
    },
    "wuqi":{
        "type":"prop_003",
        "prefab":"prop_4_wuqi",
        "skin":"proptext3"
    },
    "bisha":{
        "type":"prop_005",
        "prefab":"prop_5_bisha",
        "skin":"proptext7"
    },
}
cc.vv.BOSS_LIST = {
    "boss_01":{
        // boss类型
        "id":"boss_01",
        // boss预制件
        "prefab":"boss_01",
        // 发射模式
        'shootPolicy':"5",
        // boss血量
        "hp":10000,
        // boss分值
        "value":1000,
        // 伤害
        "damage":100,

    }
}

// 敌机配置表
cc.vv.ENEMY_LIST = {
    "eb_1":{
        // 敌机类型
        'id':'ep_001',
        // 预制件
        "prefab":"ep_1",
        // 发射模式
        "shootPolicy":"5",
        // 敌机血量
        "hp":100,
        // 分值
        "value":20,
        // 伤害
        "damage":50,
        //爆出道具概率
        "propProb":0.5,
    },
    "eb_2":{
        // 敌机类型
        'id':'ep_002',
        // 预制件
        "prefab":"ep_2",
        // 发射模式
        "shootPolicy":"5",
        // 敌机血量
        "hp":100,
        // 分值
        "value":20,
        // 伤害
        "damage":50,
        //爆出道具概率
        "propProb":0.5,
    },
    "eb_3":{
        // 敌机类型
        'id':'ep_003',
        // 预制件
        "prefab":"ep_3",
        // 发射模式
        "shootPolicy":"5",
        // 敌机血量
        "hp":100,
        // 分值
        "value":20,
        // 伤害
        "damage":50,
        //爆出道具概率
        "propProb":0.5,
    }
}
// 子弹列表
cc.vv.BULLET_LIST = {
    "hb_1":{
        // 预制件
        "prefab":"hb_1",
        // 皮肤
        'skin':"hb_skin_1",
        //伤害
        "damage":20,
    },
    "hb_2":{
        // 预制件
        "prefab":"hb_2",
        // 皮肤
        'skin':"hb_skin_2",
        //伤害
        "damage":20,
    },
    "hb_3":{
        // 预制件
        "prefab":"hb_1",
        // 皮肤
        'skin':"hb_skin_3",
        //伤害
        "damage":20,
    },
    "hb_4":{
        // 预制件
        "prefab":"hb_1",
        // 皮肤
        'skin':"hb_skin_4",
        //伤害
        "damage":20,
    },
    "eb_1":{
        // 预制件
        "prefab":"eb_1",
        // 皮肤
        'skin':"eb_skin_1",
        //伤害
        "damage":20,
    },
    
    
}
// 资源配置列表
    cc.vv.res = {
        // 当前使用飞机图片
        'plane_1':{url:"hero/1",                 type:cc.SpriteFrame},
        'plane_2':{url:"hero/2",                  type:cc.SpriteFrame},
        'plane_3':{url:"hero/3",                  type:cc.SpriteFrame},
        'plane_4':{url:"hero/4",                   type:cc.SpriteFrame},
        //底座
        "dizuo":{url:"dizuo",                       type:cc.Prefab},
        //地图资源 键名：{url:；路径，type:类型}
        "map_1":{url:"map/map1",                     type:cc.Prefab},
        "map_2":{url:"map/map2",                     type:cc.Prefab},
        "map_3":{url:"map/map3",                     type:cc.Prefab},
        "map_4":{url:"map/map4",                     type:cc.Prefab},
        "map_5":{url:"map/map5",                     type:cc.Prefab},
        "map_6":{url:"map/map6",                    type:cc.Prefab},
        "map_7":{url:"map/map7",                    type:cc.Prefab},
        "map_8":{url:"map/map8",                    type:cc.Prefab},
        // 单颗子弹预制件
        'hb_1':{url:"bullets/hb_1" ,                type:cc.Prefab},
        'hb_2':{url:"bullets/hb_2" ,                type:cc.Prefab},

        // 子弹皮肤
        'hb_skin_1':{url:"herobullet/lockinghead0" ,type:cc.SpriteFrame},
        'hb_skin_2':{url:"herobullet/lockinghead1" ,type:cc.SpriteFrame},
        'hb_skin_3':{url:"herobullet/lockinghead0" ,type:cc.SpriteFrame},
        'hb_skin_4':{url:"herobullet/lockinghead1" ,type:cc.SpriteFrame},
        'hb_skin_5':{url:"herobullet/lockinghead2" ,type:cc.SpriteFrame},
        // 敌机预制件
        'ep_1':{url:"enemy/frame0_01",              type :cc.Prefab},
        'ep_2':{url:"enemy/frame0_02",              type :cc.Prefab},
        'ep_3':{url:"enemy/frame0_03",              type :cc.Prefab},
        // 敌机子弹
        'eb_1':{url:"bullets/eb_1" ,                type:cc.Prefab},
        'eb_skin_1':{url:"herobullet/locking1" ,type:cc.SpriteFrame},
        'eb_skin_2':{url:"herobullet/locking2" ,type:cc.SpriteFrame},
        'eb_skin_3':{url:"herobullet/locking3" ,type:cc.SpriteFrame},
        'eb_skin_4':{url:"herobullet/locking4" ,type:cc.SpriteFrame},

        // 背景音乐
        "welcome":{url:"music/mainMainMusic",       type :cc.AudioClip},
        "challenge":{url:"music/bgMusic" ,          type :cc.AudioClip},
        "bullet":{url:"music/bullet" ,              type :cc.AudioClip},
        "putong_boom":{url:"music/explosion_small", type :cc.AudioClip},
        // 道具预制件
        "prop_1_cibao":{url:"道具预制件/prop_1_cibao", type :cc.Prefab },
        "prop_2_baozou":{url:"道具预制件/prop_2_baozou", type :cc.Prefab },
        "prop_3_life":{url:"道具预制件/prop_3_life", type :cc.Prefab },
        "prop_4_wuqi":{url:"道具预制件/prop_4_wuqi", type :cc.Prefab },
        "prop_5_bisha":{url:"道具预制件/prop_5_bisha", type :cc.Prefab },
        //道具皮肤
        "prop_1_cibao_skin":{url:"skill/proptext2"           ,type:cc.SpriteFrame},
        "prop_4_wuqi_skin":{url:"skill/proptext3"           ,type:cc.SpriteFrame},
        "prop_5_bisha_skin":{url:"skill/proptext7"           ,type:cc.SpriteFrame},
        "prop_3_life_skin":{url:"skill/proptext8"           ,type:cc.SpriteFrame},
        // boss
        "boss_01":{url:"boss/boss_01" ,                  type:cc.Prefab   }

    }
    // 发射模式
    cc.vv.SHOOT_POLICY = {
        "1":{
            total:3,
            offset:[[-30,0],[0,30],[30,0]],
            bulletList:["hb_1","hb_1","hb_1"],
            rotationList:[0,0,0]   
        },
        "2":{   
            total:5,
            offset:[[-30,0],[-15,15],[0,10],[15,15],[30,0]],
            bulletList:["hb_2","hb_2","hb_2","hb_2","hb_2"],
            rotationList:[30,15,0,-15,-30]  
        }, 
        "3":{   
            total:5,
            offset:[[-30,0],[-15,15],[0,10],[15,15],[30,0]],
            bulletList:["hb_2","hb_2","hb_1","hb_2","hb_2"],
            rotationList:[30,15,0,-15,-30]  
        }, 
        "4":{   
            total:5,
            offset:[[-30,0],[-15,15],[0,10],[15,15],[30,0]],
            bulletList:["hb_2","hb_1","hb_2","hb_1","hb_2"],
            rotationList:[30,15,0,-15,-30]  
        }, 
        "5":{   
            total:3,
            offset:[[-25,25],[0,-45],[25,25]],
            bulletList:["eb_1","eb_1","eb_1","eb_1","eb_1",],
            rotationList:[0,0,0]  
        }
    }