var $HeyanDiv = $("div#Heyan");
var $PanelDiv = $("div#Panel");
var $temple = $("div#Panel div#temple");
var $jqObj;
var selected=[0,0];
var isselected=0;

$("p#hoge").text("hoge");

//区画を生成

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
	$("div#info").text( pointToText(point[0],point[1]) );
}, function(){
	if (!$(this).hasClass('currentPage')) {
		$(this).css("background-image","url(/img/div.png)");
		$("div#info").css("display","none");
	}
});

//クリック処理

$("div#Heyan div.box").click(function(){
	var point = idToPoint( $(this).attr("id") );
	if (isselected==0 || selected[0] != point[0] || selected[1] != point[1]) {
		$("img#selected").css("display","block");
		$("img#selected").css("top",point[1]*24+"px");
		$("img#selected").css("left",point[0]*24+"px");
		$("div#Panel div#temple").css("display","block");
		isselected=1;
		selected=point;
	} else {
		$("img#selected").css("display","none");
		$("div#Panel div#temple").css("display","none");
		isselected=0;
	}
});

//大内裏を生成

$jqObj = $("<div/>").css("top","4px").css("left","292px").attr("id","daidairi");
$HeyanDiv.append($jqObj);

//寺生成ボタンを生成

$jqObj = $("<div/>").css("display","none").attr("class","button").attr("id","temple").text("寺を建造");
$PanelDiv.append($jqObj);

//クリック処理

$("div#Heyan div.box").click(function(){
};

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

//選択枠を作成

$jqObj = $("<img>").css("display","none").attr("id","selected").attr("src","/img/selected.png");
$HeyanDiv.append($jqObj);