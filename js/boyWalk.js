function boyWalk(){
	var $boy=$('#boy');
	var container=$('#content');
	var visualWidth=container.width();
	var visualHeight=container.height();
	function getValue(className){
		var $ele=$('.'+className+'');
		return {
			height:$ele.height(),
			top:$ele.position().top
		}
	}
	var pathY=function(){
		var data=getValue('a_back_middle');
		return data.height/2+data.top;
	}();
	$boy.css({
		top:pathY-$boy.height()+25+'px'
	});

	//小男孩踏步
	function slowWalk(){
		$boy.addClass('walk');
	}
	//小男孩停止踏步
	function stopWalk(){
		$boy.removeClass('walk');
	}
	function stopflowerWalk(){
		$boy.removeClass('walk');
		$boy.addClass('pauseflowerWalk');
	}

	//计算运动的距离
	function calculateDist(direction,proportion){
		return (direction=='x' ? visualWidth : visualHeight)*proportion;
	}
	function walkRun(time,dist,disY){
		time=time || 3000;
		slowWalk();
		var x=calculateDist('x',dist);
		var y=disY ?  calculateDist('y',disY) : undefined;
		var d1=startRun({
			'left':x+'px',
			'top':y+'px'
		},time);
		return d1;
	}
	function startRun(options,runtime){
		var dtd=$.Deferred();
		$boy.transition(options,runtime,'linear',function(){
			dtd.resolve();
		});
		return dtd;
	}
	var instanceX;
	function toShop(){
		var dtd=$.Deferred();
		var boyLeft=$boy.offset().left;
		var doorLeft=$('.door').offset().left;
		instanceX=(doorLeft+$('.door').width()/2)-(boyLeft+$boy.width()/2);
		//alert('男孩的left:'+boyLeft+',门的left:'+doorLeft+',偏移距离：'+instanceX);
		var walkPlay=startRun({
			transform:'translateX('+instanceX+'px),scale(0.3,0.3)',
			opacity:0.1
		},2000);
		walkPlay.done(function(){
			$boy.css({
				opacity:0
			});
			dtd.resolve();
		});
		return dtd;
	}

	function outShop(){
		var dtd=$.Deferred();
		var walkPlay=startRun({
			transform:'translateX('+instanceX+'px),scale(1,1))',opacity:1
		},2000);
		walkPlay.done(function(){
			dtd.resolve();
		});
		return dtd;
	}

	function talkFlower(){
		var dtd=$.Deferred();
		setTimeout(function(){
			$boy.addClass('slowFlolerWalk');
			dtd.resolve();
		},1000);
		return dtd;
	}



	return {
		walkTo:function(time,onX,onY){
			return walkRun(time,onX,onY);
		},
		pasueWalk:function(){
			stopWalk();
		},
		pauseflowerWalk:function(){
			stopflowerWalk();
		},
		startWalk:function(){
			slowWalk();
		},
		shopping:function(){
			return toShop();
		},
		endShop:function(){
			return outShop();
		},
		flowerWalk:function(){
			return talkFlower();
		},
        // 复位初始状态
        resetOriginal: function() {
            stopWalk();
            // 恢复图片
            $boy.removeClass('walk slowFlolerWalk').addClass('boyOriginal');
        },
        rotate:function(callback){
        	$boy.addClass('boy-rotate');
        	if(callback){
				$boy.on("animationend", function(){ //动画结束时事件 
					callback(); 
					$(this).off();
				}); 
        	}
        }
	}
}

