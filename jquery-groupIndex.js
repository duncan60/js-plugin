;(function($){
	$.fn.groupIndex=function(options){
		var opts=$.extend({},$.fn.groupIndex.defaults,options);
		var _index=0,_c,_this,ie7Bol=false;
		return this.each(function(){
				_this=$(this).bind(opts.bindType,thisClick);
				_c=_this.children(); 
				if(opts.initIndex!=-1){
					if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/7./i)=="7.")  
					{ 
						ie7Bol=true;
					}
					_index=opts.initIndex;	
					//getIndex(_c.eq(!ie7Bol?_index:_index+1));
					getIndex(_c.eq(_index));
				}
		});
		function thisClick(e){
				e.preventDefault();	
				if(opts.emabledBol==true)_c.eq(_index).removeClass(opts.emabledClass);
				getTarget(e.target);	
		};
		function getTarget(e){
			var t=$(e);
			if(!t.is(_c)){
				getTarget(t.parent());
			}else{
				getIndex(t);
				
			}
		};
		function getIndex(t){
			var $target =$(t);	
			_index=_c.index( $target );
			//opts.callBack(!ie7Bol?_index:_index-1,$target);
			opts.callBack(_index,$target);
			if(opts.emabledBol==true)$target.addClass(opts.emabledClass);
		};	
	};
	$.fn.groupIndex.defaults={
		bindType:'click',
		callBack:function(){},
		emabledBol:true,
		emabledClass:'',
		initIndex:0	
	};
})(jQuery);