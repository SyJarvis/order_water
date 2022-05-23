// index.js
// 获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        remind: '加载中',
        angle: 0,
        regFlag: true

    },
    onLoad() {
        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true
            })
        }

    },
    goToIndex:function(){
        wx.switchTab({
          url: '/pages/food/index',
        })
    },
    getUserProfile(e) {
        var that = this;
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
            desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {

                var data = res.userInfo
                console.log(res.userInfo)
                wx.login({
                    
                    success(res) {
                        console.log(res);
                        console.log(res.code);
                        if (!res.code) {
                            app.alert({
                                'content': '登录失败，请再次点击'
                            })
                            return;
                        }
                        console.log("sss")
                        data['code'] = res.code;
                        wx.request({
                            url: app.buildUrl("/member/login"),
                            header: {
                                'content-type': 'application/x-www-form-urlencoded',
                            },
                            method: 'POST',
                            data: data,
                            success: function (res) {
                                if (res.data.code != 200) {
                                    console.log('error300')
                                } else {
                                    that.goToIndex();
                                    console.log('ok');
                                    console.log(res.data);
                                    wx.setStorageSync('token', res.data.data.token);
                                    console.log("nihao")
                                    console.log(res.data.data.token);
                                }
                            }
                        })
                    }
                })
            }
        })
        
    },
    getUserInfo(e) {
        // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
        console.log(e)
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    click_tap: function () {
        app.alert({
            'content': '登录失败，请再次点击'
        })
    },    
    
})