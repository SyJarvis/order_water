// app.js
App({
  onLaunch() {
    // 展示本地存储能力
  },
  globalData: {
    userInfo: null,
    version: "1.0",
    shopName: "工贸订水",
    domain:"http://120.25.1.147:8999/api"
  },
  tip:function(params){
    var that = this;
    var title = params.hasOwnProperty('title')?params['title']:'提示信息';
    var content = params.hasOwnProperty('pontent')?params['content']:'';
    wx.showModal({
      title: title,
      content: content,
      success: function(res){
        if (res.confirm){
          
        }
      }
    })
  },
  console:function(msg){
    console.log(msg);
  },
  alert:function(params){
    var title = params.hasOwnProperty('title')?params['title']:'提示信息';
    var content = params.hasOwnProperty('content')?params['content']:'';
    wx.showModal({
      title:title,
      content:content,
      success (res){
        if (res.confirm){
          console.log("用户点击确定");
        }else if (res.cancel){
          console.log('用户点击取消');
        }
      }
    })
  },
  buildUrl:function(path, params){
    var url = this.globalData.domain + path;
    var _paramUrl = "";
    if (params){
      _paramUrl = Object.keys(params).map(function(k){
        return [encodeURIComponent(k), encodeURIComponent(params[k])].join("=")
      }).join("&")

      _paramUrl = "?" + _paramUrl;
    }

    return url + _paramUrl;
  },
  getRequestHeader:function(){
      return {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization':  wx.getStorageSync('token')
      }
  }

})
