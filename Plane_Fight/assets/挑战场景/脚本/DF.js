
// cc.Class({
//     extends: cc.Component,

//     properties: {
       
//     },


//     // onLoad () {},

//     start () {

//     },
//     init(enemy,pool){
//         // 确定目标
//         this.enemy = enemy;
//         // 是否开启跟踪
//         this.isFollow = false;
//         this.pool = pool;
//     },
 
//     update (dt) {
//         if(this.isFollow){
//             // cc.log(this.enemy);
//             let p1 =cc.vv.BEKILLENEMY.getPosition();
//             let dis = p1.sub(this.node.getPosition());
//             let offset = dis.normalize().mul(10);
//             let rotation = Math.atan(offset.x/offset.y)/Math.PI*180;
//             this.node.rotation = rotation;
//             this.node.x += offset.x;
//             this.node.y += offset.y;
//             let box1 = this.node.getBoundingBoxToWorld();
//             let box2 = cc.vv.BEKILLENEMY.getBoundingBoxToWorld();
//             if(box1.intersects(box2)){
//                 this.isFollow = false;
//                 this.pool.put(this.node)
//             }
//         }
//     },
// });