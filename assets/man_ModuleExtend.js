//---------------
//MatchstickMen
//This file can be create the MatchsticMen on html5Canvas.
//You should include man_ModuleExtend.js and man_Action.js in your job
//Copyright 2011/12, Sigglas
//http://sites.google.com/site/siggblog/home
//---------------
//function clearCanvas() {
//    canvas.width = canvas.width;
//}
//--動作模組
//--------------------------------------------------------------------------------------------------

function man_Moudle(canname, whichSet, t, sum) {
    this.worker = new Worker("http://localhost:8080/static/fio2/assets/man_Action.js");
    this.Replay = function() { this.worker.replay_f = true; };
    this.Start = function() { this.init(canname, whichSet, t, sum); };
    this.init = function(canname, whichSet, t, sum) {
        //    alert(whichSet);
        var canvas = document.getElementById(canname);
        var c = canvas.getContext("2d");
        var arr = new Array(whichSet, 1, sum);

        this.doCanvas(this.worker, arr, canvas, t, c);
    }
    ///cnting畫格數
    doCanvas = this.doCanvas = function(wk, arr, canvas, cnting, c) {
        wk.postMessage(arr);
        wk.onmessage =
    function(e) {
        w = canvas.width;
        h = canvas.height;

        if (this.replay_f == true) {
            arr[1] = 1;
            this.replay_f = false;
        }
        c.clearRect(0, 0, w, h);
        myManSet = e.data; // 更新資訊 (e.data可取得觸發傳入值)

        c.strokeStyle = 'black'; //"black";
        c.lineWidth = 2;
        c.fillStyle = 'black'; //"blue";

        c.beginPath();
        //頭
        c.fillRect(myManSet.head_datumX, myManSet.head_datumY, myManSet.head_lengthX, myManSet.head_lengthY);

        //軀幹 取頭的中心點+基數
        c.moveTo(myManSet.body_baseX, myManSet.body_baseY);
        c.lineTo(myManSet.body_endX, myManSet.body_endY);
        c.stroke();

        //右手1 取軀幹的1/3+長度後擺至位置
        c.moveTo(myManSet.rHand_baseX1, myManSet.rHand_baseY1);
        c.lineTo(myManSet.rHand_endX1, myManSet.rHand_endY1);
        c.stroke();

        //右手2 右手1+長度後擺至位置
        c.moveTo(myManSet.rHand_baseX2, myManSet.rHand_baseY2);
        c.lineTo(myManSet.rHand_endX2, myManSet.rHand_endY2);
        c.stroke();

        //左手1 取軀幹的1/3+長度後擺至位置
        c.moveTo(myManSet.lHand_baseX1, myManSet.lHand_baseY1);
        c.lineTo(myManSet.lHand_endX1, myManSet.lHand_endY1);
        c.stroke();

        //左手2 左手1+長度後擺至位置
        c.moveTo(myManSet.lHand_baseX2, myManSet.lHand_baseY2);
        c.lineTo(myManSet.lHand_endX2, myManSet.lHand_endY2);
        c.stroke();

        //右腳1 取軀幹的末端+長度後擺至位置
        c.moveTo(myManSet.rLeg_baseX1, myManSet.rLeg_baseY1);
        c.lineTo(myManSet.rLeg_endX1, myManSet.rLeg_endY1);

        //右腳2 右腳1+長度後擺至位置
        c.moveTo(myManSet.rLeg_baseX2, myManSet.rLeg_baseY2);
        c.lineTo(myManSet.rLeg_endX2, myManSet.rLeg_endY2);

        //左腳1 取軀幹的末端+長度後擺至位置
        c.moveTo(myManSet.lLeg_baseX1, myManSet.lLeg_baseY1);
        c.lineTo(myManSet.lLeg_endX1, myManSet.lLeg_endY1);

        //左腳2 左腳1+長度後擺至位置
        c.moveTo(myManSet.lLeg_baseX2, myManSet.lLeg_baseY2);
        c.lineTo(myManSet.lLeg_endX2, myManSet.lLeg_endY2);

        c.closePath();
        c.stroke();

        c.fill();

        c.font = 'small';
        c.textBaseline = 'top';
        c.fillStyle = 'black'; //"blue";
        c.fillText(arr[1], myManSet.head_datumX + 10, myManSet.head_datumY);

        if (arr[1] >= cnting) {
            arr[1] = 1;
            this.terminate();
            c.clearRect(0, 0, w, h);
            document.getElementById('text_zone').removeChild(canvas);
//            wk = arr = w = h = cnting = c = null;
//            canvas = null;
            return;
        }

        setTimeout(function() {
            doCanvas(wk, arr, canvas, cnting, c);
        }
        , 70);
        arr[1]++;
    }
        wk.onerror = function(e) {
            this.terminate();
            alert("於第[" + e.lineno + "]行發生錯誤 : " + e.message); //顯示錯誤訊息
        }


    }

}
