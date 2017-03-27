/**
 * Created by Qiaoqiao on 2017/3/27.
 */
window.onload = function(){
    var parrent = "myWall";
    var content = "frame";
    var imgdata ={"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"7.jpg"},{"src":"9.jpg"},{"src":"11.jpg"}]};
    locatePictures(parrent,content);
    window.onscroll = function(){
        if (true == checkScroll(content)){
            //加载图片
            var cParrent = document.getElementById(parrent);
            for(var i = 0;i<imgdata.data.length;i++){
                var cFrame = document.createElement("div");
                cFrame.className = "frame";
                cParrent.appendChild(cFrame);
                var cBox = document.createElement("div");
                cBox.className = "box";
                cFrame.appendChild(cBox);
                var cImage = document.createElement("img");
                cImage.className = "pic";
                cImage.src = "./img/"+imgdata.data[i].src;
                cBox.appendChild(cImage);
            }
            locatePictures(parrent,content);
        }
    }
}
function checkScroll(content){
    var picList = document.getElementsByClassName(content);
    var lastPicHeight = picList[picList.length-1].offsetTop;
    var windowHeight = document.documentElement.clientHeight||document.body.clientHeight;
    var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
    if (lastPicHeight<windowHeight+scrollTop){
        return true;
    }
}
function locatePictures(parrent,content){
    var currentHeightArr=[];
    var myWall = document.getElementById(parrent);
    var picList = document.getElementsByClassName(content);
    var picWidth = picList[0].offsetWidth;
    var picInline = Math.floor(document.documentElement.clientWidth/picWidth);
    myWall.style.cssText = "width:"+picWidth*picInline+"px;margin: 0 auto";
    for (var i = 0;i < picList.length; i++){
        if(i<picInline){
            currentHeightArr[i] = picList[i].offsetHeight;
        }else{
            var minHeight = Math.min.apply(null,currentHeightArr);
            var minIndex = currentHeightArr.indexOf(minHeight);
            picList[i].style.position ="absolute";
            picList[i].style.top =minHeight +"px";
            picList[i].style.left =minIndex * picWidth +"px";
            currentHeightArr[minIndex] += picList[i].offsetHeight;
        }
    }
}
function getMinFromArr(Arr){
    if ( Arr.length === 0){
        return null;
    }
    var min = Arr[0];
    for (var i = 1;i<Arr.length;i++){
        if(Arr[i]<min){
            min = Arr[i];
        }
    }
    return min;
}
