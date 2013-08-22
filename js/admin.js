var $HeyanDiv = $("div#Heyan");
var $jqObj;

$("p#hoge").text("hoge");

//区画を生成

for ( x = 0 ; x < 32 ; x++ ) {
	for ( y = 0 ; y < 38 ; y++ ) {
		if (x < 12 || 20 <= x || 10 <= y) {
			$jqObj = $("<div/>").css("top",y*24+"px").css("left",x*24+"px").addClass("box").attr("id",x+"_"+y);
			$HeyanDiv.append($jqObj);
		}
	}
}

//マウスオーバー処理

$(function(){
	$("div#Heyan div.box").hover(function(){
		var point = idToPoint( $(this).attr("id") );
		$(this).css("background-image","url(/img/div_on.png)");
		$("div#info").css("display","block");
		$("div#info").css("top",(point[1]*24-50)+"px");
		$("div#info").css("left",(point[0]*24-50)+"px");
		$("div#info").text( pointToText(point[0],point[1]) );
	}, function(){
		if (!$(this).hasClass('currentPage')) {
			$(this).css("background-image","url(/img/div.png)");
			$("div#info").css("display","none");
		}
	});
});

//大内裏を生成

$jqObj = $("<div/>").css("top","0px").css("left","288px").attr("id","daidairi");
$HeyanDiv.append($jqObj);

//マウスオーバー処理

$(function(){
	$("div#Heyan div#daidairi").hover(function(){
		$(this).css("background-image","url(/img/daidairi_on.png)");
	}, function(){
		if (!$(this).hasClass('currentPage')) {
			$(this).css("background-image","url(/img/daidairi.png)");
		}
	});
});

//情報ウィンドウを生成

$jqObj = $("<div/>").css("display","none").attr("id","info");
$HeyanDiv.append($jqObj);

//idを座標にパース

function idToPoint(id) {
	prs= id.split("_");
	return [parseInt(prs[0]),parseInt(prs[1])];
}

//座標を番地名に変換

function pointToText(x,y) {
	var text="";
	switch ( Math.floor(x/4.0) ) {
	case 0:	text+="右京四坊"; break;
	case 1:	text+="右京三坊"; break;
	case 2:	text+="右京二坊"; break;
	case 3:	text+="右京一坊"; break;
	case 4:	text+="左京一坊"; break;
	case 5:	text+="左京二坊"; break;
	case 6:	text+="左京三坊"; break;
	case 7:	text+="左京四坊"; break;
	}
	switch ( Math.floor((y+2)/4.0) ) {
	case 0:	text+="北辺"; break;
	case 1:	text+="一条"; break;
	case 2:	text+="二条"; break;
	case 3:	text+="三条"; break;
	case 4:	text+="四条"; break;
	case 5:	text+="五条"; break;
	case 6:	text+="六条"; break;
	case 7:	text+="七条"; break;
	case 8:	text+="八条"; break;
	case 9:	text+="九条"; break;
	}
	if ( x<16 ) {
		if ( y<2 ) {
			switch ( x%4*2 + y ) {
			case 0: text+="八町"; break;
			case 1: text+="七町"; break;
			case 2: text+="五町"; break;
			case 3: text+="六町"; break;
			case 4: text+="四町"; break;
			case 5: text+="三町"; break;
			case 6: text+="一町"; break;
			case 7: text+="二町"; break;
			}
		} else {
			switch ( x%4*4 + (y+2)%4 ) {
			case 0: text+="十六町"; break;
			case 1: text+="十五町"; break;
			case 2: text+="十四町"; break;
			case 3: text+="十三町"; break;
			case 4: text+="九町"; break;
			case 5: text+="十町"; break;
			case 6: text+="十一町"; break;
			case 7: text+="十二町"; break;
			case 8: text+="八町"; break;
			case 9: text+="七町"; break;
			case 10: text+="六町"; break;
			case 11: text+="五町"; break;
			case 12: text+="一町"; break;
			case 13: text+="二町"; break;
			case 14: text+="三町"; break;
			case 15: text+="四町"; break;
			}
		}
	} else {
		if ( y<2 ) {
			switch ( x%4*2 + y ) {
			case 0: text+="一町"; break;
			case 1: text+="二町"; break;
			case 2: text+="四町"; break;
			case 3: text+="三町"; break;
			case 4: text+="五町"; break;
			case 5: text+="六町"; break;
			case 6: text+="八町"; break;
			case 7: text+="七町"; break;
			}
		} else {
			switch ( x%4*4 + (y+2)%4 ) {
			case 0: text+="一町"; break;
			case 1: text+="二町"; break;
			case 2: text+="三町"; break;
			case 3: text+="四町"; break;
			case 4: text+="八町"; break;
			case 5: text+="七町"; break;
			case 6: text+="六町"; break;
			case 7: text+="五町"; break;
			case 8: text+="九町"; break;
			case 9: text+="十町"; break;
			case 10: text+="十一町"; break;
			case 11: text+="十二町"; break;
			case 12: text+="十六町"; break;
			case 13: text+="十五町"; break;
			case 14: text+="十四町"; break;
			case 15: text+="十三町"; break;
			}
		}
	}
	return text;
}
