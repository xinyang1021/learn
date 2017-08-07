;(function(){
	function extend(defaultSetting,yourSetting){
		var newSetting = {};
		yourSetting = yourSetting || {};
		//对于defaultSetting中的每一个属性，
		//  如果这个属性在yourSetting有，就用yourSetting中的属性值
		//  如果这个属性在yourSetting没有，就用 defaultSetting 中的属性值
		for(var p in defaultSetting){
			if(yourSetting.hasOwnProperty( p )){
				newSetting[p] = yourSetting[p];
			}
			else{
				newSetting[p] = defaultSetting[p];
			}
		}
	
		return newSetting;
	} 
	
	function Circle( dom, userSetting={}){
		var defaultSetting = {
			fontSize:25,
			bgColor:"rgba(0,0,0,.2)",
			frontColor:"red",
			lineWidth : 3,
			data : 88
		}
		var setting = extend(defaultSetting,userSetting);
		var can = dom.querySelector("canvas");
		
		this.data = dom.dataset["number"];
		var data = dom.dataset["number"];
		var currentData = 0 ;//当前的数值 
		var ctx = can.getContext("2d"); //画布
		var pointX = can.offsetWidth/2 ;
		var pointY = can.offsetHeight/2;   //圆心
		var r      = can.offsetWidth/2 - 10 ; 
	
		var start  = -Math.PI/2; 				   //起始的弧度
		var end    = start + data/100 * 2*Math.PI; //结束的弧度
		
		
		var timer = setInterval(function(){
			ctx.clearRect(0,0,can.offsetWidth,can.offsetHeight);
//			console.info( currentData);
		//最大不能超过data
			currentData < data && currentData++
			end = start + currentData/100 * 2 * Math.PI;
			ctx.lineWidth = setting.lineWidth;	
		//画背景的圆弧			
			ctx.strokeStyle=setting.bgColor;
			ctx.beginPath();
			ctx.arc(pointX,pointY,r,0,2*Math.PI);
			ctx.stroke();
			
		//画前景的圆弧
			ctx.strokeStyle=setting.frontColor;
			ctx.beginPath();
			ctx.arc(pointX,pointY,r,start,end);
			ctx.stroke();
		//写字
			ctx.textAlign="center";    //水平居中
			ctx.textBaseline="middle"; //垂直居中
			
			var fontContent = currentData+"%"
			ctx.font= setting.fontSize + "px 黑体";
			ctx.fillText(fontContent,pointX ,pointY );
		//清除定时器	
			currentData == data && clearInterval(timer);
		}
		
		,50);
	}
		

		
	window.Circle = Circle;
	
})();
	