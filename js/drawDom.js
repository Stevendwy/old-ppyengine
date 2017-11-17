var canvasContainer = `<div class="FeedbackContainer" style="display:none">
<div class="textAreaContainer">
	<div class="textAreaHearder">
		反馈意见
	</div>
	<textarea class="textAreaInput" cols="33" rows="10" autofocus="autofocus"></textarea>
</div>
<div class="ImageParkContainer"><canvas id="canvas"></canvas><div class="ImageParkSelectorContainer">
<div class="ImageParkSelector">
	<div class="msgalert">插入矩形</div>
	<img class="ImageParkSelectorImg" src="/img/rectangle.png" alt="text">
</div>
<div class="ImageParkSelector">
	<div class="msgalert">插入椭圆</div>
	<img class="ImageParkSelectorImg" src="/img/circle.png" alt="text">
</div>
<div class="ImageParkSelector">
	<div class="msgalert">插入箭头</div>
	<img class="ImageParkSelectorImg" src="/img/arrow.png" alt="text">
</div>
<div class="ImageParkSelector">
	<div class="msgalert">插入文字</div>
	<img class="ImageParkSelectorImg" src="/img/text.png" alt="text">
</div>
<div class="ImageParkSelector"><img class="ImageParkSelectorImg" src="/img/icon_chexiao.png" alt="text"></div><div class="ImageParkSelector"><img class="ImageParkSelectorImg" src="/img/icon_quxiao.png" alt="text"></div><div class="ImageParkSelector"><img class="ImageParkSelectorImg" src="/img/icon_tijiao.png" alt="text"></div></div></div></div><div id="FeedBackButton" class="FeedBackButton"></div>
<div class="feedSuccessContainer" style="display:none">
	<p>反馈已提交!</br>
	我们会做得更好.
	</p>
	<span>
		3
	</span>
</div>
<div class="flexDivs" style="display:none">
<div class="flexBorder">
</div>
<div class="flexTop">
</div>
<div class="flexRight">
</div>
<div class="flexBottom">
</div>
<div class="flexLeft">
</div>
</div>
`

//<span class="cutLine"></span>
$("body").append(canvasContainer);
var temp = false;
var startX;
var startY;
var originX;
var textflag = true;
var originY;
$(".textAreaHearder").on("mousedown", function(e) {
  startX = e.clientX;
  startY = e.clientY;
  originX = parseInt($('.textAreaContainer').css("right"));
  originY = parseInt($('.textAreaContainer').css("top"));
  temp = true;
}).on("mousemove", function(e) {
  if (temp) {
    var _currentX = e.clientX
    var _currentY = e.clientY
    var _moveX = _currentX - startX
    var _moveY = _currentY - startY
    var _BottomLastLocal = originY + _moveY;
    var _RightLastLocal = originX - _moveX;
    $(".textAreaContainer").css("top", _BottomLastLocal + "px").css("right", _RightLastLocal + "px")
  }
}).on("mouseup", function() {
  temp = false;
})


//$("body").scroll(function(){
$("body").on("mousewheel", function() {
  if (parseInt((this).scrollTop) > 50) {
    $("#FeedBackButton").show()
  } else {
    $("#FeedBackButton").hide()
  }
})

$(".ImageParkSelector").on("click", function() {
  var index = $(".ImageParkSelector").index(this);
  $(".ImageParkSelectorContainer img").each((index, item) => {
    $(item).attr("src", $(item).attr("src").replace("_selected", ""));
  });
  switch (index) {
    case 0:
      $(this).find("img").attr("src", "/img/rectangle_selected.png");
      tools.tool = "pencil";
      tools.graphic = "rect";
      break;
    case 1:
      $(this).find("img").attr("src", "/img/circle_selected.png");
      tools.tool = "pencil";
      tools.graphic = "circle";
      break;
    case 2:
      $(this).find("img").attr("src", "/img/arrow_selected.png");
      tools.tool = "pencil";
      tools.graphic = "line";
      break;
    case 3:
      $(this).find("img").attr("src", "/img/text_selected.png");
      tools.tool = "word";
      break;
    case 4:
      tools.tool = "pencil";
      tools.graphic = "";
      break;
  }
}).on("mouseover", function() {
  //var index = $(".ImageParkSelector").index(this);
  //防止需求有变
})
var tools = {
  tool: "pencil",
  graphic: "",
  color: ""
}
var canvasHeight = $(window).height() - 35;
var canvasWidth = $(window).width();
$(window).resize(function() {
  var canvasHeight = $(window).height();
  var canvasWidth = $(window).width();
  $("#canvas").attr({
    "width": canvasWidth,
    "height": canvasHeight,
  }).css({
    "width": canvasWidth + "px",
    "height": canvasHeight + "px"
  })
});
window.onload = function() {
  //	var urls = "#";
  var url = "#";
  var img;
  //点击出现截图工具

  // 鼠标操作开关
  var flag = false;
  // 初始化起点坐标值及保存点
  var x, y = "";
  // 初始化字体属性
  var fontsize = "24px",
    fontfamily = "Arial",
    fontweight = "",
    fontstyle = "";
  var feedBackContainer = $(`<div class="FeedBackButton" style="cursor:pointer">
								<b></b>	
								<span>反馈</span>
							</div>`)
    //  $("<textarea rows='3' cols='20' style='background:transparent;position:fixed;display:none;'></textarea>");

  $(".TopRightContainer").append(feedBackContainer);

  $(".FeedBackButton").on("click", function() {
    $("#canvas").css({
      "position": "fixed",
      "left": "0",
      "width": $(window).width() + "px",
      "height": $(window).height() + "px"
    }).attr({
      "width": $(window).width(),
      "height": $(window).height()
    });
    $(".FeedbackContainer").show();
    $('.flexDivs').show();
    $(".textAreaContainer").animate({
      "top": "41px"
    }, 500);
    $(".textAreaInput").focus();
    canvasHeight = $(window).height();
    canvasWidth = $(window).width();
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.beginPath();
    //	    context.fillStyle="rgba(0, 0, 0, 0.2)";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    //		context.beginPath();
    //	    context.clearRect(40,40,canvasWidth-80,canvasHeight-75);//context的clearRect方法
    context.clearRect(0, 0, canvas.width, canvas.height);
    urls = canvas.toDataURL();
    //	    url= urls;
    loadImg();

  });



  //	context.strokeStyle = "transparent";
  //	context.save();
  //  context.lineWidth=4;
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  loadImg();
  // 初始化文本输入框
  var fontTip = $("<textarea rows='3' cols='20' style='background:transparent;position:fixed;display:none;'></textarea>");
  $(".ImageParkContainer").append(fontTip);

  $("canvas").mousedown(function(event) {
    // 绘制开始
    //loadImg();
    context.strokeStyle = "red";
    flag = true;
    // 获取起点坐标值
    x = event.offsetX;
    y = event.offsetY;
    beginPoint.x = x;
    beginPoint.y = y;
  }).mouseup(function(event) {
    // 绘制完毕
    flag = false;
    url = canvas.toDataURL();
    loadImg();
    fontTip.focus();
    if (tools.tool == "word") {
      inputWord(event);
    }
  }).mousemove(function(event) {
    if (tools.tool == "pencil" && tools.graphic == "") {
      drawPencil(event);
    } else if (tools.tool == "pencil" && tools.graphic == "line") {
      drawLine(event);
    } else if (tools.tool == "pencil" && tools.graphic == "rect") {
      drawRect(event);
    } else if (tools.tool == "pencil" && tools.graphic == "circle") {
      drawCircle(event);
    } else if (tools.tool == "pencil" && tools.graphic == "triangle") {
      drawTriangle(event);
    } else if (tools.tool == "eraser") {
      drawPencil(event);
    } else if (tools.tool == "word") {
      //inputWord(event);
    }
  })

  //  $("canvas").on("touchstart",function(event) {
  //      // 绘制开始
  // 	 	//loadImg();
  //  		context.strokeStyle = "red";
  //      flag = true;
  //      // 获取起点坐标值
  //      x = event.offsetX;
  //      y = event.offsetY;
  //      beginPoint.x = x;
  //     	beginPoint.y = y;       	
  //  }).on("touchend",function(event) {
  //      // 绘制完毕
  //      flag = false;
  //      url = canvas.toDataURL();
  // 	 	loadImg();
  //      fontTip.focus();
  //      if(tools.tool == "word"){
  //          inputWord(event);
  //      }
  //  }).on("touchmove",function(event) {
  //      if (tools.tool == "pencil" && tools.graphic == "") {
  //          drawPencil(event);
  //      } else if (tools.tool == "pencil" && tools.graphic == "line") {
  //          drawLine(event);
  //      } else if (tools.tool == "pencil" && tools.graphic == "rect") {
  //          drawRect(event);
  //      } else if (tools.tool == "pencil" && tools.graphic == "circle") {
  //          drawCircle(event);
  //      } else if (tools.tool == "pencil" && tools.graphic == "triangle") {
  //          drawTriangle(event);
  //      } else if (tools.tool == "eraser") {
  //          drawPencil(event);
  //      } else if (tools.tool == "word") {
  //         //inputWord(event);
  //      }
  //  })



  // 绘制画笔
  function drawPencil(event) {
    if (flag) {
      context.lineTo(event.offsetX, event.offsetY);
      context.stroke();
    } else {
      context.beginPath();
      context.moveTo(event.offsetX, event.offsetY);
    }
  }

  //、、、、、、、、、、、、、、、、、、、绘制箭头方法、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、//
  var beginPoint = {},
    stopPoint = {},
    polygonVertex = [],
    CONST = {
      edgeLen: 50,
      angle: 25
    };
  //封装的作图对象
  var Plot = {
    angle: "",
    //在CONST中定义的edgeLen以及angle参数
    //短距离画箭头的时候会出现箭头头部过大，修改：
    dynArrowSize: function() {
      var x1 = stopPoint.x - beginPoint.x,
        y1 = stopPoint.y - beginPoint.y,
        length = Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2));
      if (length < 250) {
        CONST.edgeLen = CONST.edgeLen / 2;
        CONST.angle = CONST.angle / 2;
      } else if (length < 500) {
        CONST.edgeLen = CONST.edgeLen * length / 500;
        CONST.angle = CONST.angle * length / 500;
      }
    },

    //getRadian 返回以起点与X轴之间的夹角角度值
    getRadian: function(beginPoint, stopPoint) {
      Plot.angle = Math.atan2(stopPoint.y - beginPoint.y, stopPoint.x - beginPoint.x) / Math.PI * 180;
      paraDef(50, 25);
      Plot.dynArrowSize();
    },

    ///获得箭头底边两个点
    arrowCoord: function(beginPoint, stopPoint) {
      polygonVertex[0] = beginPoint.x;
      polygonVertex[1] = beginPoint.y;
      polygonVertex[6] = stopPoint.x;
      polygonVertex[7] = stopPoint.y;
      Plot.getRadian(beginPoint, stopPoint);
      polygonVertex[8] = stopPoint.x - CONST.edgeLen * Math.cos(Math.PI / 180 * (Plot.angle + CONST.angle));
      polygonVertex[9] = stopPoint.y - CONST.edgeLen * Math.sin(Math.PI / 180 * (Plot.angle + CONST.angle));
      polygonVertex[4] = stopPoint.x - CONST.edgeLen * Math.cos(Math.PI / 180 * (Plot.angle - CONST.angle));
      polygonVertex[5] = stopPoint.y - CONST.edgeLen * Math.sin(Math.PI / 180 * (Plot.angle - CONST.angle));
    },

    //获取另两个底边侧面点
    sideCoord: function() {
      var midpoint = {};
      midpoint.x = (polygonVertex[4] + polygonVertex[8]) / 2;
      midpoint.y = (polygonVertex[5] + polygonVertex[9]) / 2;
      polygonVertex[2] = (polygonVertex[4] + midpoint.x) / 2;
      polygonVertex[3] = (polygonVertex[5] + midpoint.y) / 2;
      polygonVertex[10] = (polygonVertex[8] + midpoint.x) / 2;
      polygonVertex[11] = (polygonVertex[9] + midpoint.y) / 2;
    },
  };

  function paraDef(edgeLen, angle) {
    CONST.edgeLen = edgeLen;
    CONST.angle = angle;
  }
  // 绘制箭头
  function drawLine(event) {
    if (flag) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      //          // 载入上次保存点
      loadImg();
      stopPoint.x = event.offsetX;
      stopPoint.y = event.offsetY;
      Plot.arrowCoord(beginPoint, stopPoint);
      Plot.sideCoord();
      context.fillStyle = "red";
      context.beginPath();
      context.moveTo(polygonVertex[0], polygonVertex[1]);
      context.lineTo(polygonVertex[2], polygonVertex[3]);
      context.lineTo(polygonVertex[4], polygonVertex[5]);
      context.lineTo(polygonVertex[6], polygonVertex[7]);
      context.lineTo(polygonVertex[8], polygonVertex[9]);
      context.lineTo(polygonVertex[10], polygonVertex[11]);
      context.closePath();
      context.fill();
    }
  }
  // 绘制矩形
  function drawRect(event) {
    if (flag) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      // 载入上次保存点
      loadImg();

      context.beginPath();
      context.lineWidth = 4;
      context.rect(x, y, event.offsetX - x, event.offsetY - y);
      if (tools.color != "") {
        context.fill();
        context.stroke();
      } else {
        context.stroke();
      }
    }
  }
  // 绘制圆形
  function drawCircle(event) {
    if (flag) {
      var rx = (event.offsetX - x) / 2;
      var ry = (event.offsetY - y) / 2;
      var r = Math.sqrt(rx * rx + ry * ry);
      context.lineWidth = 4;
      context.clearRect(0, 0, canvas.width, canvas.height);
      // 载入上次保存点
      loadImg();

      context.beginPath();
      context.arc(rx + x, ry + y, r, 0, Math.PI * 2);
      if (tools.color != "") {
        context.fill();
        context.stroke();
      } else {
        context.stroke();
      }
    }
  }

  // 文字输入
  function inputWord(event) {
    if (textflag) {
      fontTip.css({
        top: y,
        left: x,
        width: '410px',
        height: '43px',
        fontSize: '14px',
        fontFamily: fontfamily,
        color: "red",
        fontStyle: fontstyle,
        fontWeight: fontweight
      }).show().focus();
    }
  }

  // 绘制文字
  function drawWord(event) {
    var words = fontTip.val().trim();
    if (fontTip.css("display") != "none" && words) {
      var offset1 = $("#canvas").offset();
      var offset2 = fontTip.offset();
      context.fillStyle = "red";
      context.font = fontstyle + fontweight + fontsize + " " + fontfamily;

      if (isNaN(fontsize)) {
        var size = Number(fontsize.substring(0, fontsize.length - 2));
      }

      context.fillText(words, offset2.left - offset1.left + 2, offset2.top - offset1.top + size + 3);
      fontTip.val("");
    }
    fontTip.hide();
    textflag = false;
    setTimeout(() => {
      textflag = true;
    }, 200)
  }
  fontTip.blur(drawWord);
  // 禁止框变化
  //	$(".ImageParkContainer").on("keyup","textarea",function(){
  //		textflag = false;
  //	}).on("click","textarea",function(){
  //		textflag = false;
  //	})
  //清除画板
  $(".ImageParkSelectorContainer>div:eq(4)").on("click", function() {
      resetAndClear();
    })
    //隐藏截图并重置
  function resetAndClear() {
    flag = false;
    context.clearRect(0, 0, canvas.width, canvas.height);
    url = urls || "#";
    loadImg();
    tools.tool = "pencil";
    tools.graphic = "";
  }

  $(document).on("keydown", function(event) {

    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 27) {
      if ($(".FeedbackContainer").css('display') == "block") {
        resetAndClear();
        $('.flexDivs').hide();
        $(".FeedbackContainer").hide();
        $(".textAreaContainer").css({
          "top": '-179px',
          "right": "0px"
        });
        $(".textAreaInput").val("");
      }
    }
  })

  $(".ImageParkSelectorContainer>div:eq(5)").on("click", function() {
      resetAndClear();
      $('.flexDivs').hide();
      $(".FeedbackContainer").hide();
      $(".textAreaContainer").css({
        "top": '-179px',
        "right": "0px"
      });
      $(".textAreaInput").val("");
    })
    //隐藏截图并上传
  $(".ImageParkSelectorContainer>div:eq(6)").on("click", function() {
    $("body").css("overflow", "auto");
    resetAndClear();
    html2canvas($('body')[0], {
      onrendered: function(canvas) {
        var Pic = canvas.toDataURL("image/png");
        Pic = Pic.replace(/^data:image\/(png|jpg);base64,/, "")
        var advise = $(".textAreaInput").val();
        var objData = {
          "imageData": Pic,
          "advise": advise
        }
        $.ajax({
          type: 'POST',
          url: '/userfeedback',
          data: objData,
          success: function(data) {
            if (data.code == 1) {
              //							resetAndClear();

            }
          }
        });
        $(".textAreaInput").val("");
      },


    });

    $('.flexDivs').hide();
    $(".FeedbackContainer").hide();
    $(".feedSuccessContainer").show();
    var timer = setInterval(function() {
      var time = parseInt($('.feedSuccessContainer span').html());
      time--;
      $('.feedSuccessContainer span').html(time);
    }, 1000)
    setTimeout(function() {
      $('.feedSuccessContainer').hide();
      clearInterval(timer);
      $('.feedSuccessContainer span').html("3");
    }, 3000)
  });
  //隐藏画板并且清除
  function loadImg() {
    img = new Image();
    img.src = url;
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
  }
}
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?05e21600fc9a2fed6a3083dc789817bd";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();