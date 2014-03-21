
//---------------
//MatchstickMen by Action
//This file can be set the MatchsticMen Action on html5Canvas.
//You should include man_ModuleExtend.js and man_Action.js in your job
//Copyright 2011/12, Sigglas
//http://sites.google.com/site/siggblog/home
//---------------
onmessage = function(e) {
var tAngle = null;
var manPoint; //火柴人的基準位置=頭的中心點
var manSize; //火柴人的大小,頭的中心點至軀幹的末梢
var headSize; //火柴人頭的大小=manSize/5
var handLength; //handLength=manSize+manSize/5 - manSize / 3
var legLength; //legLength=manSize+manSize/3 - manSize / 3
var doMode; //行動原則
var modeStep = 0; //目前行動步驟

var cnting = 0; //現在畫格
var peopleSumPoint = 0;


function Point(x, y) {
    this.x = x;
    this.y = y;
}
function manMove() {
    if (cnting <= 15) {
        tAngle = new setAllAngle(
        0,
        -45 + cnting * 6,
        -45 + cnting * 6,

        45 - cnting * 6,
        45 - cnting * 6,

        -45 + cnting * 6,
        (-45 + cnting * 6) / 3,

        45 - cnting * 6,
        (45 - cnting * 6) / 3
        );
    }
    else
        tAngle = new setAllAngle(
        0,
        45 - (cnting - 15) * 6,
        45 - (cnting - 15) * 6,

        -45 + (cnting - 15) * 6,
        -45 + (cnting - 15) * 6,

        45 - (cnting - 15) * 6,
        (45 - (cnting - 15) * 6) / 3,

        -45 + (cnting - 15) * 6,
        (-45 + (cnting - 15) * 6) / 3
        );
}
function ifdefault() {
    tAngle = new setAllAngle(
        0,

        15,
        15,

        -15,
        -15,

        15,
        15,

        -15,
        -15
        );
}

//-------------------------------------------------------------------------------------
function setAllAngle(body, rHand1, rHand2, lHand1, lHand2, rLeg1, rLeg2, lLeg1, lLeg2) {
    tmpTheta = Math.PI / 180;
    this.bodyAngle = body * tmpTheta; //軀幹的角度
    this.rHandAngle1 = rHand1 * tmpTheta; //右手1的角度
    this.rHandAngle2 = rHand2 * tmpTheta; //右手2的角度
    this.lHandAngle1 = lHand1 * tmpTheta; //左手1的角度
    this.lHandAngle2 = lHand2 * tmpTheta; //左手2的角度
    this.rLegAngle1 = rLeg1 * tmpTheta; //右腳1的角度
    this.rLegAngle2 = rLeg2 * tmpTheta; //右腳2的角度
    this.lLegAngle1 = lLeg1 * tmpTheta; //左腳的角度
    this.lLegAngle2 = lLeg2 * tmpTheta; //左腳的角度
}
function manDefault(tAngle) {
    var ent = manSize / 3;
    var angle = tAngle.bodyAngle;
    this.head_datumX = manPoint.x - headSize;
    this.head_datumY = manPoint.y - headSize;
    this.head_lengthX = this.head_lengthY = headSize * 2;
    this.body_baseX = manPoint.x;
    this.body_baseY = manPoint.y;
    this.body_endX = manPoint.x + manSize * Math.sin(angle);
    this.body_endY = manPoint.y + manSize * Math.cos(angle);

    var hLength = handLength / 2;
    //----
    this.rHand_baseX1 = this.body_baseX + ent * Math.sin(angle);
    this.rHand_baseY1 = this.body_baseY + ent * Math.cos(angle);
    this.rHand_endX1 = this.rHand_baseX1 + hLength * Math.sin(tAngle.rHandAngle1);
    this.rHand_endY1 = this.rHand_baseY1 + hLength * Math.cos(tAngle.rHandAngle1);

    this.rHand_baseX2 = this.rHand_endX1;
    this.rHand_baseY2 = this.rHand_endY1;
    this.rHand_endX2 = this.rHand_baseX2 + hLength * Math.sin(tAngle.rHandAngle2);
    this.rHand_endY2 = this.rHand_baseY2 + hLength * Math.cos(tAngle.rHandAngle2);
    //---

    //---
    this.lHand_baseX1 = this.body_baseX + ent * Math.sin(angle);
    this.lHand_baseY1 = this.body_baseY + ent * Math.cos(angle);
    this.lHand_endX1 = this.lHand_baseX1 + hLength * Math.sin(tAngle.lHandAngle1);
    this.lHand_endY1 = this.lHand_baseY1 + hLength * Math.cos(tAngle.lHandAngle1);

    this.lHand_baseX2 = this.lHand_endX1;
    this.lHand_baseY2 = this.lHand_endY1;
    this.lHand_endX2 = this.lHand_baseX2 + hLength * Math.sin(tAngle.lHandAngle2);
    this.lHand_endY2 = this.lHand_baseY2 + hLength * Math.cos(tAngle.lHandAngle2);
    //---

    var lLength = legLength / 2;
    //---
    this.rLeg_baseX1 = this.body_baseX + manSize * Math.sin(angle);
    this.rLeg_baseY1 = this.body_baseY + manSize * Math.cos(angle);
    this.rLeg_endX1 = this.rLeg_baseX1 + lLength * Math.sin(tAngle.rLegAngle1);
    this.rLeg_endY1 = this.rLeg_baseY1 + lLength * Math.cos(tAngle.rLegAngle1);

    this.rLeg_baseX2 = this.rLeg_endX1;
    this.rLeg_baseY2 = this.rLeg_endY1;
    this.rLeg_endX2 = this.rLeg_baseX2 + lLength * Math.sin(tAngle.rLegAngle2);
    this.rLeg_endY2 = this.rLeg_baseY2 + lLength * Math.cos(tAngle.rLegAngle2);
    //---

    //---
    this.lLeg_baseX1 = this.body_baseX + manSize * Math.sin(angle);
    this.lLeg_baseY1 = this.body_baseY + manSize * Math.cos(angle);
    this.lLeg_endX1 = this.lLeg_baseX1 + lLength * Math.sin(tAngle.lLegAngle1);
    this.lLeg_endY1 = this.lLeg_baseY1 + lLength * Math.cos(tAngle.lLegAngle1);

    this.lLeg_baseX2 = this.lLeg_endX1;
    this.lLeg_baseY2 = this.lLeg_endY1;
    this.lLeg_endX2 = this.lLeg_baseX2 + lLength * Math.sin(tAngle.lLegAngle2);
    this.lLeg_endY2 = this.lLeg_baseY2 + lLength * Math.cos(tAngle.lLegAngle2);
    //---
}

    var doMode = e.data[0];
    cnting = e.data[1];
    peopleSumPoint = e.data[2];

    //------------此為位置及大小的定義
    manPoint = new Point(10 + (peopleSumPoint * 30) + cnting * 2, 40); //顯示在圖像的位置
    manSize = 25; //人物大小
    headSize = manSize / 5; //頭的大小
    handLength = manSize - manSize / 7.5; //手的長度 //+ manSize / 5 - manSize / 3;
    legLength = manSize + manSize / 3; //腳的長度
    //------------------------------------

    switch (doMode) {
        case "move":
            manMove();
            break;
        default:
            ifdefault();
            break;
    }

    myManSet = new manDefault(tAngle);
    postMessage(myManSet);
};

