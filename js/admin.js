var $HeyanDiv = $("div#Heyan");
var $jqObj;

$("p#hoge").text("hoge");

//���𐶐�

for ( x = 0 ; x < 32 ; x++ ) {
	for ( y = 0 ; y < 38 ; y++ ) {
		if (x < 12 || 20 <= x || 10 <= y) {
			$jqObj = $("<div/>").css("top",y*24+"px").css("left",x*24+"px").addClass("box").attr("id",x+"_"+y);
			$HeyanDiv.append($jqObj);
		}
	}
}

//�}�E�X�I�[�o�[����

$(function(){
	$("div#Heyan div.box").hover(function(){
		$(this).css("background-image","url(/img/div_on.png)");
	}, function(){
		if (!$(this).hasClass('currentPage')) {
			$(this).css("background-image","url(/img/div.png)");
		}
	});
});

//������𐶐�

$jqObj = $("<div/>").css("top","0px").css("left","288px").attr("id","daidairi");
$HeyanDiv.append($jqObj);

//�}�E�X�I�[�o�[����

$(function(){
	$("div#Heyan div#daidairi").hover(function(){
		$(this).css("background-image","url(/img/daidairi_on.png)");
	}, function(){
		if (!$(this).hasClass('currentPage')) {
			$(this).css("background-image","url(/img/daidairi.png)");
		}
	});
});


