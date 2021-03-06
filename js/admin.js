var $HeyanDiv = $("div#Heyan");
var $PanelDiv = $("div#Panel");
var $temple = $("div#Panel div#temple");
var $jqObj;
var selected=[0,0];
var isselected=0;
var pageload=0;
var jsload=0;
var money,population;
var temple = new Array();
var gridpopul = new Array(38);

//onload関数

window.onload = function(){
	pageload=1;
	if (jsload==1) {
		$("#Loading").css("display","none");
	}
}

//平安京データをパースしてアップデート

function parseAndUpdate(data) {
	var line = data.split("\n");
	var cnt=0;
	money=parseInt(line[cnt]);
	cnt++;
	$("div#Infobar div#money div.statsval").text(line[0]+"文");
	population=parseInt(line[cnt]);
	cnt++;
	$("div#Infobar div#popul div.statsval").text(population+"人");
	n=parseInt(line[cnt]);
	cnt++;
	temple = [];
	for (var i=0;i<n;i++) {
		loadX=parseInt(line[cnt].split(" ")[0]);
		loadY=parseInt(line[cnt].split(" ")[1]);
		temple.push( [ loadX, loadY ] );
		cnt++;
	}
	for (var i=0;i<38;i++) {
		var nums = line[cnt].split(" ");
		cnt++;
		gridpopul[i] = new Array(32);
		for (var j=0;j<32;j++) {
			gridpopul[i][j] = parseInt(nums[j]);
			if (isTemple(j,i)==1) {
				$("div#Heyan div#"+j+"_"+i).addClass("templebox").css("background-image","url(/img/div_temple.png)");
			} else {
				$("div#Heyan div#"+j+"_"+i).removeClass("templebox").css("background-image","url(/img/div.png)");
			}
		}
	}
	if (isselected==1) selectDiv(selected[0],selected[1]);
}

//データ読み込み

$.get("/data.txt",{},function(data){
	createDiv();
	parseAndUpdate(data);
});

//指定した区画が寺か判定

function isTemple(x,y) {
	for (i=0;i<temple.length;i++) {
		if ( temple[i][0] == x && temple[i][1] == y ) {
			return 1;
		}
	}
	return 0;
}

//指定した区画を選択

function selectDiv(x,y) {
	if (isTemple(x,y)==0) $("div#Panel div#temple").css("display","block");
	else $("div#Panel div#temple").css("display","none");
	isselected=1;
	selected=[x,y];
	selectedUpdate();
}

//指定した区画をクリック

function clickDiv(x,y) {
	if (isselected==0 || selected[0] != x || selected[1] != y) {
		selectDiv(x,y);
	} else {
		$("div#Panel div#temple").css("display","none");
		isselected=0;
		selectedUpdate();
	}
}

//区画を生成

function createDiv() {
	
	for ( x = 0 ; x < 32 ; x++ ) {
		for ( y = 0 ; y < 38 ; y++ ) {
			if (x < 12 || 20 <= x || 10 <= y) {
				$jqObj = $("<div/>").css("top",(y*24+4)+"px").css("left",(x*24+4)+"px").addClass("box").attr("id",x+"_"+y);
				$HeyanDiv.append($jqObj);
			}
		}
	}

	//マウスオーバー処理

	$("div#Heyan div.box").hover(function(){
		var point = idToPoint( $(this).attr("id") );
		$(this).css("background-image","url(/img/div_on.png)");
		$("div#info").css("display","block");
		$("div#info").css("top",(point[1]*24-40)+"px");
		$("div#info").css("left",(point[0]*24-46)+"px");
		$("div#info p").html( pointToText(point[0],point[1]) + "<br>" + gridpopul[point[1]][point[0]] + "人");
	}, function(){
		if (!$(this).hasClass('currentPage')) {
			var point = idToPoint( $(this).attr("id") );
			if (isTemple(point[0],point[1])==1) $(this).css("background-image","url(/img/div_temple.png)");
			else $(this).css("background-image","url(/img/div.png)");;
			$("div#info").css("display","none");
		}
	});

	//クリック処理

	$("div#Heyan div.box").click(function(){
		var point = idToPoint( $(this).attr("id") );
		clickDiv(point[0],point[1]);
	});
	
}

//大内裏を生成

$jqObj = $("<div/>").css("top","4px").css("left","292px").attr("id","daidairi");
$HeyanDiv.append($jqObj);

//寺生成ボタンを生成

$jqObj = $("<div/>").css("display","none").attr("class","button").attr("id","temple").text("寺を建造");
$PanelDiv.append($jqObj);

//年送りボタンを生成

$jqObj = $("<div/>").css("display","block").attr("class","button").attr("id","nextyear").text("次の年");
$PanelDiv.append($jqObj);

//リセットボタンを生成

$jqObj = $("<div/>").css("display","block").attr("class","button").attr("id","reset").text("リセット");
$PanelDiv.append($jqObj);

//ボタンのマウスオーバー処理

$("div#Panel div.button").hover(function(){
	$(this).css("background-color","#EEE");
}, function(){
	$(this).css("background-color","#DDD");
});

//寺生成処理

$("div#Panel div#temple").click(function(){
	$.get("/cgi-bin/test.py",{"x":selected[0],"y":selected[1]},function(data){
		parseAndUpdate(data);
		//document.write(data);
	});
});

//マウスオーバー処理

$("div#Heyan div#daidairi").hover(function(){
	$(this).css("background-image","url(/img/daidairi_on.png)");
}, function(){
	if (!$(this).hasClass('currentPage')) {
		$(this).css("background-image","url(/img/daidairi.png)");
	}
});

//情報ウィンドウを生成

$jqObj = $("<div/>").css("display","none").attr("id","info");
$HeyanDiv.append($jqObj);

//情報ウィンドウテキストを生成

$jqObj = $("<p/>");
$("div#info").append($jqObj);

//選択枠を作成

$jqObj = $("<img>").css("display","none").attr("id","selected").attr("src","/img/selected.png");
$HeyanDiv.append($jqObj);

//選択情報をアップデート

function selectedUpdate() {
	if (isselected==0) {
		$("img#selected").css("display","none");
	} else {
		$("img#selected").css("display","block");
		$("img#selected").css("top",selected[1]*24+"px");
		$("img#selected").css("left",selected[0]*24+"px");
	} 
}

//キー操作

$(window).keydown(function(e){
	var nextX, nextY;
	if (isselected!=0) {
		switch (e.keyCode) {
		case 37:
			nextX = selected[0]-1;
			nextY = selected[1];
			break;
		case 38:
			nextX = selected[0];
			nextY = selected[1]-1;
			break;
		case 39:
			nextX = selected[0]+1;
			nextY = selected[1];
			break;
		case 40:
			nextX = selected[0];
			nextY = selected[1]+1;
			break;
		}
		if (0 <= nextX && nextX < 32 && 0 <= nextY && nextY < 38 && (nextX < 12 || 20 <= nextX || 10 <= nextY) ) {
			selectDiv(nextX,nextY);
		}
	}
});

//onloadでロード画面を消す

jsload=1;
if (pageload==1) {
	$("#Loading").css("display","none");
}