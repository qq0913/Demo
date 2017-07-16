/**
 * Created by Qiaoqiao on 2017/3/22.
 */
var stage = new createjs.Stage("gameView");
createjs.Ticker.setFPS(20);
createjs.Ticker.addEventListener("tick",stage);
var gameView = new createjs.Container();
stage.addChild(gameView);
var n=2;
var level=1;
var range=140;
var light=60;
var b=15;
var k=33;
var start_flag = false;
function addRect(start_flag){
    gameView.removeAllChildren();
    var color="#";
    var diffcolor="#";
    var tt=Math.random();
    for (var i=0;i<3;i++){
        var cl=parseInt(Math.random()*range)+light;
        var tmp=parseInt(k/level+b);
        var dcl=tt>0.5?cl+tmp:cl-tmp;
        cl = cl.toString(16);
        dcl = dcl.toString(16);
        if(cl.length<2){
            cl="0"+cl;
        }
        if(dcl.length<2){
            dcl="0"+dcl;
        }
        color=color+cl;
        diffcolor=diffcolor+dcl;
    }
    var x=parseInt(Math.random()*n);//设置不同颜色方块的位置
    var y=parseInt(Math.random()*n);
    for(var indexX=0;indexX<n;indexX++){
        for(var indexY=0;indexY<n;indexY++){
            var r=new Rect(n,color,diffcolor);
            gameView.addChild(r);
            r.x=indexX;
            r.y=indexY;
            if(r.x==x && r.y==y){
                r.setRectType(2);
            }
            r.x=indexX*400/n;
            r.y=indexY*400/n;
            if(start_flag == true &&r.getRectType()==1){
                r.addEventListener("click",function(){
                    var curr_level = level;
                    level = 1;
                    n = 2;
                    if(start_flag == true){
                        document.getElementById("pid").innerHTML="第" + curr_level + "关：游戏结束";
                        btn.innerHTML = "Start";
                    }
                    start_flag = false;
                })
            }
            if(start_flag == true &&r.getRectType()==2){
                r.addEventListener("click",function(){
                    if(n<7){
                        ++n;
                    }
                    level++;
                    if(start_flag == true){
                        document.getElementById("level").innerHTML=level;
                    }else{
                        return;
                    }
                    if(level > 50){
                        document.getElementById("pid").innerHTML="第"+(level-1)+"关：恭喜，通关啦！";
                        start_flag = false;
                        return;
                    }else{
                        addRect(start_flag);
                    }
                })
            }
        }
    }
}
var btn = document.getElementById("btn");
btn.onclick = function(){
    btn.innerHTML = "Restart";
    n = 2;
    level = 1;
    start_flag = true;
    document.getElementById("pid").innerHTML="第<span id='level'>"+level+"</span>关";
    addRect(start_flag);
}
addRect(start_flag);
