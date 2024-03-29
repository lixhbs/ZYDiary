// pages/login/auth.js
const utils = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  bindGetUserInfo: function (t) {
    var errMsg = t.detail.errMsg
    if (errMsg == 'getUserInfo:ok') {
      wx.setStorageSync("userInfo", t.detail.userInfo)
      wx.setStorageSync("userData", t.detail)
      app.globalData.userInfo = t.detail.userInfo
      utils.InitUserInfo(t.detail.userInfo).then(res => {
        wx.setStorageSync("userData", res);
        wx.navigateBack({
          delta: 1,
        })
      })
      
    } else {
      wx.showToast({
        title: '请授权！',
        icon: 'none',
        mask: true,
      })
    }
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