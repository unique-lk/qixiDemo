function Swipe(container){
	var warp=container.find(':first');//获取三个页面的父容器
	var pages=warp.find('li');//获取三个页面
	var width=container.width();
	var height=container.height();
	warp.css({
		width:(width*pages.length)+'px',
		height:height+'px'
	});//设置父容器的大小
	$.each(pages,function(index){
		var page=pages.eq(index);
		page.css({
			width:width+'px',
			height:height+'px'
		});
	});
	Swipe.scrool=function(x,speed){
		warp.css({
			'transform':'translate3d(-'+x+'px,0px,0px)',
			'transition':'all '+speed+'ms  linear'
		});
		return this;
	}
	return Swipe;

}