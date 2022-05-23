const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        TabCur: 0,
        scrollLeft: 0,
        regFlag: false,
        cardCur: 0,
        categories:[
            "饮用水",
            "饮水机"
        ],
        goods:[
            {
                "id":1,
                "pic_url": "/images/water.png",
                "name": "喜士饮用水",
                "price": 7.8
            },
            {
                "id":2,
                "pic_url": "/images/water.png",
                "name": "农夫山泉饮用水",
                "price": 8
            },
            {
                "id":3,
                "pic_url": "/images/water.png",
                "name": "农夫山泉饮用水",
                "price": 8
            },
            {
                "id":4,
                "pic_url": "/images/water.png",
                "name": "农夫山泉饮用水",
                "price": 8
            }
        ],
        swiperList: [{
            id: 0,
            type: 'image',
            url: '/images/water.png'
        }, {
            id: 1,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
        }, {
            id: 2,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
        }, {
            id: 3,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
        }, {
            id: 4,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
        }, {
            id: 5,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
        }, {
            id: 6,
            type: 'image',
            url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
        }],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        this.checkAuth();
        wx.getStorage({
            key: "token",
            success(res) {
                console.log(res.data);
            }
        })
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
    tabSelect(e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id - 1) * 60
        })
    },
    checkAuth: function () {
        if (this.data.regFlag == false) {
            var title = '为了更好的提供订水服务，请您先登录后再进行操作!';
            var content = '';
            wx.showModal({
                title: title,
                content: content,
                success(res) {
                    if (res.confirm) {
                        wx.navigateTo({
                            url: '/pages/login/index',
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }
            })
        }
    },
    checkLogin: function () {
        var that = this;
        wx.login({
            success: function (res) {
                app.console("checkLogin");
                if (!res.code) {
                    app.alert({
                        'content': '登录失败，请再次点击'
                    });
                    return;
                }
                wx.request({
                    url: app.buildUrl("/member/check-reg"),
                    header: app.getRequestHeader(),

                })
            }
        })
    },
    getUserProfile: function (e) {
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
                                    app.alert({
                                        'content': res.data.msg
                                    });
                                    return;
                                } else {
                                    app.setCache("token", res.data.data.token);
                                }
                            }
                        })
                    }
                })
            }
        })

    },
})