(function(mui, owner) {
	/**
	 * 双击退出
	 * */	
     owner.back = function(){
     	// 退出的逻辑 
		var backButtonPress = 0; 
		mui.back = function(event) {
			backButtonPress++;
			if (backButtonPress > 1) {
				plus.runtime.quit();
			} else {
				plus.nativeUI.toast('再按一次退出应用');
			}
			setTimeout(function() {
				backButtonPress = 0;
			}, 1000);
			return false;
		};
     
    }	
    /**
	 * 打开新页面
	 * */
    owner.open=function(url1,ids,obj,type){
		if(type==undefined){		
			type='pop-in'
		}
		if(obj==undefined){
			obj={}
		}		
			mui.openWindow({
			url:url1,
			id:ids,
			show: {
					aniShow: type,									
				},		    					
			waiting:{
		      autoShow:false,//自动显示等待框，默认为true						    
		          },
		    extras:obj
		})	
	}
    /**
     * 断网处理
     * */
    owner.wang=function(call){
    	   onNetChange()
    	   document.addEventListener("netchange",onNetChange,false);
			 function onNetChange(){
			　　//获取当前网络类型
			　　var nt = plus.networkinfo.getCurrentType();
			　　switch(nt){					　　　　
			　          case plus.networkinfo.CONNECTION_ETHERNET:
			　　　　case plus.networkinfo.CONNECTION_WIFI:
			　　　　case plus.networkinfo.CONNECTION_CELL2G:
			　　　　case plus.networkinfo.CONNECTION_CELL3G:
			　　　　case plus.networkinfo.CONNECTION_CELL4G:
			           console.log("当前网络非WiFi")
                       return call(true)
			　　　　　　break;
			　　　　default:
                       
			           console.log("当前没有网络")
                       return call(false)
			           
			　　　　　　break;
			　　}
			}   	   	  	
    }

    	
    
    
}(mui, window.api = {}));