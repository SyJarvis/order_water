Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusType: ["全部", "待出单", "已出单", "配送中", "待评价"],
    status:["-8"],
    currentType: 0,
    tabClass: ["", "", "", "", ""]
  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      currentType: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    console.log(this.data.currentType);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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


})