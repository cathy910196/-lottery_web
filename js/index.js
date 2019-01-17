//��?�H?�W?
var allPerson = 095***939;096***935;093***831;098***082;090***368;098***411;098***916;093***152;092***533;098***238;097***305;098***069;091***594;093***593;096***115;";
//??�H?�W?
var leaderArr = ["321"];
//����?�H?�W?
var remainPerson = allPerson.toString().split(";");
//��?�H?�W?
var luckyMan = [];
var timer;//�w?��
var times = 1;//��?��?,�p�G���O�Ĥ@���A���[��?��??�m�W
$(function () {
    iconAnimation();
    //?�l��?
    $("#btnStart").on("click", function () {
        //�P?�O?�l?�O?��
        if ($("#btnStart").text() === "?�l") {
            if (!$("#txtNum").val()) {
                showDialog("??�J��?�H?");
                return false;
            }
            if ($("#txtNum").val() > 49) {
                showDialog("�@���̦h�u��?�J49�H");
                return false;
            }
            if ($("#txtNum").val() > remainPerson.length) {
                showDialog("?�e��?�H?�j�_?��?�H?<br>?�e��?�H?�G<b>" + $("#txtNum").val() + "</b>�H,?���H?�G<b>" + remainPerson.length + "</b>�H");
                return false;
            }
            $("#result").fadeOut();
            //?��??�ءA?�ä�?��
            $("#luckyDrawing").show().next().addClass("hide");
            move();
            $("#btnStart").text("����");
            $("#bgLuckyDrawEnd").removeClass("bg");
        }
        else {
            $("#btnStart").text("?�l");//?�m��?�奻??�l
            var luckyDrawNum = $("#txtNum").val();
            startLuckDraw();//��??�l

            $("#luckyDrawing").fadeOut();
            clearInterval(timer);//����?�J��??�i��
            $("#luckyDrawing").val(luckyMan[luckyMan.length - 1]);//?�J��?�̦ܳZ�@?��?�W�r
            $("#result").fadeIn().find("div").removeClass().addClass("p" + luckyDrawNum);//?��?�J�ءA?�ܤ�?��
            $("#bgLuckyDrawEnd").addClass("bg");//�K�[��?�I����?
            $("#txtNum").attr("placeholder", "?�J��?�H?(" + remainPerson.length + ")");
        }
    });

    $("#btnReset").on("click", function () {
        //��?���m??��
        var confirmReset = false;
        showConfirm("��?���m?�H�Ҧ��w��?���H?���s�^���?���I", function () {
            //���m����?�H?�W?
            remainPerson = allPerson.toString().split(";");
            //��?�H?�ظm��
            $("#txtNum").val("").attr("placeholder", "??�J��?�H?");
            $("#showName").val("");
            //?�ä�?�W?,�M�Z?�ܩ�?��
            $("#result").fadeOut();//.prev().fadeIn()
            $("#bgLuckyDrawEnd").removeClass("bg");//�����I����?
            times++;
            console.log(times);

        });
    });
});

//��?�D�{��
function startLuckDraw() {
    //��?�H?
    var luckyDrawNum = $("#txtNum").val();
    if (luckyDrawNum > remainPerson.length) {
        alert("��?�H?�j�_?���H?�I?�ק�H?�C�Ϊ�?���m?�l?�s�@?��?�I");
        return false;
    }
    //?��?�H
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
    //�ѧE�H?�簣�w��?�W?
    remainPerson = remainPerson.delete(randomPerson);
    //��?�H?
    luckyMan = luckyMan.concat(randomPerson);
    //?�m��?�H?��?�r?��
    $("#txtNum").val("");
}

//?��?�g�峹�Ghttp://www.html-js.com/article/JS-rookie-rookie-learned-to-fly-in-a-moving-frame-beating-figures
//��?��?�r
function move() {
    var $showName = $("#showName"); //?��?�e��input��ID
    var interTime = 30;//?�m?�j??
    timer = setInterval(function () {
        var i = GetRandomNum(0, remainPerson.length);
        $showName.val(remainPerson[i]);//?�J��?��
    }, interTime);
}

//?�W���p??�A?��??
function iconAnimation() {
    var interTime = 200;//?�m?�j??
    var $icon = $("#iconDiv>span");
    var arrAnimatoin = ["bounce", "flash", "pulse", "rubberBand", "shake", "swing", "wobble", "tada"];
    var timer2 = setInterval(function () {
        var i = GetRandomNum(0, $icon.length);
        var j = GetRandomNum(0, arrAnimatoin.length);
        //console.log("i:" + i + ",j:" + j);
        $($icon[i]).removeClass().stop().addClass("animated " + arrAnimatoin[j]);//?�J��?��
    }, interTime);

}