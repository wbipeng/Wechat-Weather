const getWeatherData=(location, type)=>{
  return  new Promise((resolve, reject)=>{
        //异步操作
    wx.request({
        //url: 'https://free-api.heweather.net/s6/weather/' + type,
        url:"https://devapi.qweather.com/v7/"+type,
        method:'GET',
        data:{
            location,
            key:'2930ac00e3a2445786ea5b2bd50d14a9'
        },
        success(res){
            resolve(res.data)
        },
        fail(err){
            reject(err)
        }
    })
})
}
module.exports=getWeatherData