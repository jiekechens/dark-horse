let axjaxcount=0;

export const requset=(parmas)=>{
	uni.showLoading({
	        title: '加载中',
	    })
	axjaxcount++
	const baseUrl=`https://api-hmugo-web.itheima.net`
   return  new Promise ((resolve ,reject )=>{
	    uni.request({
	    	 ...parmas,
			 url:baseUrl+parmas.url,
	    	success: res => {
				resolve(res.data)
			},
	    	fail: (error) => {
				reject(error)
			},
	    	complete: () => {
				axjaxcount--
				if(axjaxcount==0){
					  uni.hideLoading()
				}
			}
	    });
   })
}