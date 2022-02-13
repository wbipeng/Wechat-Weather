// pages/weather/weather.js
const QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
// 实例化API核心类
const qqmapsdk = new QQMapWX({
    key: 'PZVBZ-AJACD-MST4T-HRGJD-3ULB2-HVBEO'
})
const getWeatherData=require('../../utils/request.js')
const condIconBase='../../images/icon/'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address:'',//当前位置信息
        nowWeather:{},
        forecastWeather:[],
        location:''
    },
    //获取当前位置信息
    getLocation(){
        wx.getLocation({
            type: 'gcj02',
            success: res=> {
                console.log(res)
                //当前经纬度信息
              const latitude = res.latitude
              const longitude = res.longitude
                //逆地址解析 经纬度-> 街道信息
                this.getReverseGrocoder(latitude, longitude)
                //获取实时天气数据
                this.getNowWeather(longitude+','+latitude)
                //获取七天天气
                this.get7DayWeather(longitude+','+latitude)
                wx.hideLoading()
            }
        })
    },
    //完成逆地址解析
    getReverseGrocoder(latitude, longitude){
                qqmapsdk.reverseGeocoder({
                    location:{
                        latitude,
                        longitude
                    },
                    success:res=>{
                        console.log(res)
                        this.setData({
                            address:res.result.address,
                            location:longitude+','+latitude
                        })
                    }
                })
            },
      async  getNowWeather(location){
        const res=await getWeatherData(location,'weather/now')
        console.log(res)
        if(res.code==="200"){
            const now=res.now
            this.setData({
                nowWeather:{ 
                    ...now,
                condIcon:"/images/icons/"+now.icon+".svg",
                updateTime:now.obsTime.slice(5,16).replace("T","  ")}
               
            })
        }

        },
       async get7DayWeather(location){
          const res= await getWeatherData(location,"weather/7d")
          console.log(res)
          if(res.code==='200'){
              const daily=res.daily
              daily.map(item=>{
                  item.date=item.fxDate.slice(5),
                  item.iconDay='/images/icons/'+item.iconDay+'.svg'
                  item.iconNight='/images/icons/'+item.iconNight+'.svg'
              })
              this.setData({
                  forecastWeather:daily
              })
          }
        },
        goDetail(){
            wx.navigateTo({
              url: '/pages/detail/detail?location='+this.data.location,
            })
        },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getLocation()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})