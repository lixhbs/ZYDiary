// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    MenuList: [{
      title: '喂食',
      name: 'red',
      text: 'feed',
      color: '#e54d42',
      url: './../feed/feed'
    },
    {
      title: '排泄',
      name: 'orange',
      text: 'egest',
      color: '#f37b1d'
    },
    {
      title: '体重',
      name: 'yellow',
      text: 'weight',
      color: '#fbbd08'
    },
    {
      title: '三围',
      name: 'olive',
      text: 'bwh',
      color: '#8dc63f'
    },
    {
      title: '预防',
      name: 'green',
      text: 'prevent',
      color: '#39b54a'
    },
    {
      title: '提醒',
      name: 'cyan',
      text: 'remind',
      color: '#1cbbb4'
    }
    ]
  },

  menuNavigateTo: e => {
    const url = e.currentTarget.dataset.url;
    if (url) {
      wx.navigateTo({
        url: url,
      })
    } else {
      wx.showToast({
        title: '开发中。。。',
        icon: 'none'
      })
    }
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