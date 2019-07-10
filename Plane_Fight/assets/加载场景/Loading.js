
cc.Class({
    extends: cc.Component,

    properties: {
       spr:cc.Sprite,
    // 剧情界面的加载进度条
       loadProgressBar:cc.ProgressBar
    },


    // onLoad () {},

    start () {
        // 显示剧情
        this.showStory()();
        // 加载游戏资源
        this.loading();
    },
    showStory(){
        self = this;
        let count = 2;
        return function f(){
            cc.loader.loadRes("story/"+ count,cc.SpriteFrame,(err,frame)=>{
                if(err){
                    // console.log("失败")
                }else{
                    // console.log("chenggong")
                    self.spr.spriteFrame = frame ;
                    if(count <11){
                        count ++ ;
                        setTimeout(f,50);
                    }else{
                        // console.log("加载完成")
                        cc.director.loadScene("menu");
    
                    } 
                }  
            });
        }
    },
    loading(){
        let  total = Object.keys(cc.vv.res).length;
        let  hasFinish = 0;
        let self = this;
        for (const key in cc.vv.res) {
            let url = cc.vv.res[key]["url"];
            let type = cc.vv.res[key]["type"];
            cc.loader.loadRes(url,type,function(err,obj){
                if(err){
                    console.log(err)
                }else{
                    // cc.log(obj)
                    cc.vv.res[key] = obj;
                    hasFinish++;
                    self.loadProgressBar.progress = hasFinish/total;
                }
            })
        }
    }
    // update (dt) {},
});
