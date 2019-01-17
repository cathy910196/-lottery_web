//抽?人?名?
var allPerson = 095***939;096***935;093***831;098***082;090***368;098***411;098***916;093***152;092***533;098***238;097***305;098***069;091***594;093***593;096***115;";
//??人?名?
var leaderArr = ["321"];
//未中?人?名?
var remainPerson = allPerson.toString().split(";");
//中?人?名?
var luckyMan = [];
var timer;//定?器
var times = 1;//抽?次?,如果不是第一次，不加粗?示??姓名
$(function () {
    iconAnimation();
    //?始抽?
    $("#btnStart").on("click", function () {
        //判?是?始?是?束
        if ($("#btnStart").text() === "?始") {
            if (!$("#txtNum").val()) {
                showDialog("??入中?人?");
                return false;
            }
            if ($("#txtNum").val() > 49) {
                showDialog("一次最多只能?入49人");
                return false;
            }
            if ($("#txtNum").val() > remainPerson.length) {
                showDialog("?前抽?人?大于?池?人?<br>?前抽?人?：<b>" + $("#txtNum").val() + "</b>人,?池人?：<b>" + remainPerson.length + "</b>人");
                return false;
            }
            $("#result").fadeOut();
            //?示??框，?藏中?框
            $("#luckyDrawing").show().next().addClass("hide");
            move();
            $("#btnStart").text("停止");
            $("#bgLuckyDrawEnd").removeClass("bg");
        }
        else {
            $("#btnStart").text("?始");//?置按?文本??始
            var luckyDrawNum = $("#txtNum").val();
            startLuckDraw();//抽??始

            $("#luckyDrawing").fadeOut();
            clearInterval(timer);//停止?入框??展示
            $("#luckyDrawing").val(luckyMan[luckyMan.length - 1]);//?入框?示最后一?中?名字
            $("#result").fadeIn().find("div").removeClass().addClass("p" + luckyDrawNum);//?藏?入框，?示中?框
            $("#bgLuckyDrawEnd").addClass("bg");//添加中?背景光?
            $("#txtNum").attr("placeholder", "?入中?人?(" + remainPerson.length + ")");
        }
    });

    $("#btnReset").on("click", function () {
        //确?重置??框
        var confirmReset = false;
        showConfirm("确?重置?？所有已中?的人?重新回到抽?池！", function () {
            //熏置未中?人?名?
            remainPerson = allPerson.toString().split(";");
            //中?人?框置空
            $("#txtNum").val("").attr("placeholder", "??入中?人?");
            $("#showName").val("");
            //?藏中?名?,然后?示抽?框
            $("#result").fadeOut();//.prev().fadeIn()
            $("#bgLuckyDrawEnd").removeClass("bg");//移除背景光?
            times++;
            console.log(times);

        });
    });
});

//抽?主程序
function startLuckDraw() {
    //抽?人?
    var luckyDrawNum = $("#txtNum").val();
    if (luckyDrawNum > remainPerson.length) {
        alert("抽?人?大于?池人?！?修改人?。或者?重置?始?新一?抽?！");
        return false;
    }
    //?机中?人
    var randomPerson = getRandomArrayElements(remainPerson, luckyDrawNum);
    var tempHtml = "";
    $.each(randomPerson, function (i, person) {
        var sizeStyle = "";
        if (person.length > 3) {
            sizeStyle = " style=font-size:" + 3 / person.length + "em";
        }
        if (leaderArr.indexOf(person) > -1 && times == 1) {
            tempHtml += "<span><span " + sizeStyle + "><b>" + person + "</b></span></span>";
        }
        else {
            tempHtml += "<span><span " + sizeStyle + ">" + person + "</span></span>";
        }
    });
    $("#result>div").html(tempHtml);
    //剩余人?剔除已中?名?
    remainPerson = remainPerson.delete(randomPerson);
    //中?人?
    luckyMan = luckyMan.concat(randomPerson);
    //?置抽?人?框?字?空
    $("#txtNum").val("");
}

//?考?篇文章：http://www.html-js.com/article/JS-rookie-rookie-learned-to-fly-in-a-moving-frame-beating-figures
//跳?的?字
function move() {
    var $showName = $("#showName"); //?示?容的input的ID
    var interTime = 30;//?置?隔??
    timer = setInterval(function () {
        var i = GetRandomNum(0, remainPerson.length);
        $showName.val(remainPerson[i]);//?入框?值
    }, interTime);
}

//?上的小??，?机??
function iconAnimation() {
    var interTime = 200;//?置?隔??
    var $icon = $("#iconDiv>span");
    var arrAnimatoin = ["bounce", "flash", "pulse", "rubberBand", "shake", "swing", "wobble", "tada"];
    var timer2 = setInterval(function () {
        var i = GetRandomNum(0, $icon.length);
        var j = GetRandomNum(0, arrAnimatoin.length);
        //console.log("i:" + i + ",j:" + j);
        $($icon[i]).removeClass().stop().addClass("animated " + arrAnimatoin[j]);//?入框?值
    }, interTime);

}