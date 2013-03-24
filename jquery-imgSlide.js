;(function($){
	 $.fn.imgSlide=function(options){
	 	var opts=$.extend({},$.fn.imgSlide.defaults,options),
	 		$fb,$ff,$arrow,_normal,_middle,_sec=10,_speed=0,_mousePoint=0,_newV=0,
	 		_ffcss,_arrowcss,_bindType,_targetV,_nowDis,_t,_mBol=false,_nowV;
	 		return this.each(function(){
				$fb=$(this);
		 		$ff=$(opts.front);
		 		$arrow=$(opts.arrow);
		 		_bindType=("createTouch" in document)?"touchmove":"mousemove";		
		 		$fb.bind(_bindType,mouseMove);
		 		if(opts.direction=="vertical"){
		 			_ffcss='height';
		 			_arrowcss='top';
		 			_normal=$fb.height()-opts.reserve+$fb.offset().top;
		 		}else{
		 			_ffcss='width';
		 			_arrowcss='left';
		 			_normal=$fb.width()-opts.reserve+$fb.offset().left;
		 		}
		 		_middle=parseInt(_normal/2);
			});
			function  distance(x1 ,x2){
				var dist = Math.abs(x2-x1);
				return dist;
			}
			function changeTarge(){
		 		_speed*=(distance(_mousePoint,$ff.height()))*0.3;
		 		_nowV=opts.direction=="vertical"?$ff.height():$ff.width();
		 		_newV=distance(_mousePoint,(_nowV+_speed))<_nowDis?(_nowV+_speed):_targetV;
		 		if(_newV<opts.reserve){
		 			_newV=opts.reserve;
		 		}
		 		$ff.css(_ffcss,_newV);
		 		$arrow.css(_arrowcss,_newV);
		 		if(_nowV==_targetV){
		 			window.clearInterval(_t);
		 			_t=null;
		 			delete _t;
		 			_mBol=false;	
		 					
		 		}
		 	}
		 	function mouseMove(e){
		 		e.preventDefault();
		 		if(_bindType=="mousemove"){
		 			_mousePoint=opts.direction=="vertical"?e.pageY:e.pageX;
		 		}else{
		 			 var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		 			_mousePoint=opts.direction=="vertical"?touch.pageY:touch.pageX;
		 		}		
		 		_speed=(_middle-_mousePoint)<0?-1:1;
		 		_targetV=_normal-parseInt(_normal*(_mousePoint/_normal));
		 		_nowDis=distance(_mousePoint,_targetV);
		 		if(_mBol==false&&_t==null){
		 			_mBol=true;
		 			_t=setInterval(changeTarge,_sec);
		 			}
		 	}
	 	}
	 	$.fn.imgSlide.defaults={direction:'vertical',front:'#img-slide-front',arrow:'#img-slide-arrow',reserve:0}
})(jQuery);
