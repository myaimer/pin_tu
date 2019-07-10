
var puzzleLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.levelNum = cc.vv.config[cc.vv.level]
        var size = cc.winSize;
        var background = new cc.Sprite(res.gameBackGround);
        background.x = size.width / 2;
        background.y = size.height / 2;
        this.addChild(background);

        var minbox = new cc.Sprite(res.box);
        minbox.scale = 0.5;
        minbox.x = 3 + minbox.width / 4;
        minbox.y = size.height - 3 - minbox.height/4;
        this.addChild(minbox);

        var simple = new cc.Sprite(this.levelNum.pic);
        simple.scale = 0.5;
        simple.x = minbox.x;
        simple.y = minbox.y;
        this.addChild(simple);

        var maxbox = new cc.Sprite(res.box);
        maxbox.x = size.width / 2;
        maxbox.y = 20 + maxbox.height / 2;
        maxbox.opacity = 190;
        this.addChild(maxbox);

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

        //试试
        // var test =new cc.Sprite(res.level1,cc.rect(0,0,100,100));
        // test.x = maxbox.width / 2;
        // test.y = maxbox.height / 2;
        // maxbox.addChild(test);
        //计算小方块的宽高
        var cell_wid = simple.width / this.levelNum.wid;
        var cell_hei = simple.height / this.levelNum.hei;
        //计算缝隙大小
        this.gap = (maxbox.width - simple.width) / (this.levelNum.wid + 1);
        //计算基准点
        var basepos = {
            x:this.gap + cell_wid / 2,
            y:maxbox.height - this.gap - cell_hei / 2
        }
        this.cellList = []
        //切割图片并将图片加载到界面中
        for(var i = 0; i < this.levelNum.hei; i++){
            this.cellList[i] = [];
            for(var j = 0; j < this.levelNum.wid; j++){
                var cell = new Cell(this.levelNum.pic,cc.rect(j * cell_wid,i * cell_hei,cell_wid,cell_hei),[i,j]);
                cell.x = basepos.x + j * (cell_wid + this.gap);
                cell.y = basepos.y - i * (cell_hei + this.gap);
                maxbox.addChild(cell);
                this.cellList[i][j] = cell;
                if(i === this.levelNum.hei - 1&&j === this.levelNum.wid - 1){
                    this.cellList[i][j].isBlack = true;
                }else{
                    this.cellList[i][j].isBlack = false;
                }

            }
        }
        //保存黑块的下标
        this.blackIndex = [this.levelNum.hei-1,this.levelNum.wid-1];
        this.changeOpacity();
        this.init()
    },

    //改变右下角方块的透明度
    changeOpacity:function () {
        this.cellList[this.levelNum.hei-1][this.levelNum.wid-1].opacity = 0;
    },
    //初始化
    init:function () {
        //打乱
        this.disrupt();
        this.goHome();
        if(this.isWin()){
            this.init();
        }
    },
    //黑块归位
    goHome:function () {
        while(this.blackIndex[0] != this.levelNum.hei-1){
            this.exchangeCell(this.blackIndex,[this.blackIndex[0] + 1,this.blackIndex[1]]);
            this.blackIndex = [this.blackIndex[0] + 1,this.blackIndex[1]];
        }

        while(this.blackIndex[1] != this.levelNum.wid-1){
            this.exchangeCell(this.blackIndex,[this.blackIndex[0],this.blackIndex[1]+1]);
            this.blackIndex = [this.blackIndex[0],this.blackIndex[1] + 1];
        }
    },
    //打乱用
    disrupt:function () {
        // 黑块走的四个方向
        var dir = [[0,-1],[-1,0],[0,1],[1,0]];
        //记录黑块走了多少步
        var count = 0;
        while (count < 100){
            var ran = (Math.random() * 4) | 0;
            var index = [this.blackIndex[0] + dir[ran][0],this.blackIndex[1] + dir[ran][1]]
            // 判断是否越界
            if(this.cross(index)){
                this.exchangeCell(this.blackIndex,index);
                this.blackIndex = index;
                count++
            }

        }
    },
    //越界判断
    cross:function (index) {
        return index[0] <= this.levelNum.hei-1 && index[0] >= 0 && index[1] <= this.levelNum.wid-1 && index[1] >= 0;
    },
    //交换两个碎片
    exchangeCell:function (index1,index2) {
        //显示层面的交换
        var pos = this.cellList[index1[0]][index1[1]].getPosition();
        this.cellList[index1[0]][index1[1]].setPosition(this.cellList[index2[0]][index2[1]].getPosition())
        this.cellList[index2[0]][index2[1]].setPosition(pos);
        //数组上的交换
        var obj = this.cellList[index1[0]][index1[1]];
        this.cellList[index1[0]][index1[1]] = this.cellList[index2[0]][index2[1]];
        this.cellList[index2[0]][index2[1]] = obj;
    },
    
    onClick:function (cell) {
        cc.log(cell.index)
        // 寻找方块的下标
        var cellPos = this.getIndexByCell(cell);
        //点击的方块是否与黑色方块相邻
        if(this.isNeighbor(cellPos)){
            //调用交换与黑色方块进行交换
            this.exchangeCell(cellPos,this.blackIndex);
            this.blackIndex = cellPos;
            this.isWin();
        }else{
            if(!cell.isBlack){
                cell.runAction(
                    cc.sequence(
                        cc.tintBy(0,255,255,100),
                        cc.delayTime(0.2),
                        cc.tintBy(0,-255,-255,-100)
                    )

                )
            }
        }

    },
    isNeighbor:function (index) {
        return (1 === Math.abs(index[0] - this.blackIndex[0]) + Math.abs(index[1] - this.blackIndex[1]));
    },
    //寻找传入方块的下标
    getIndexByCell:function (cell) {
        for(var i = 0; i < this.cellList.length; i++){
            for(var j = 0; j < this.cellList[i].length;j++){
                if(this.cellList[i][j] === cell){
                    return [i,j];
                }
            }
        }
    },
    isWin:function () {
        for(var i = 0; i < this.cellList.length;i++){
            for(var j = 0; j < this.cellList[i].length;j++){
                if(!(this.cellList[i][j].Index[0] == i && this.cellList[i][j].Index[1] == j)){
                    return;
                }
            }
        }
        this.gameOver();
        return true;
    },
    gameOver:function () {
        cc.log('win');

    }
})

var puzzleScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new puzzleLayer();
        this.addChild(layer);
    }
})