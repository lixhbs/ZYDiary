// pages/olive/oliveList.js
const util = require('../../utils/util.js');
const database = require('../../utils/data.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    olivelist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '身高管理',
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
    database.listBabyolive({}).then(res => {
      const olivelist = res.data;
      let increase = "--";
      if (olivelist.length > 1) {
        increase = parseFloat(olivelist[0].olive - olivelist[1].olive).toFixed(1)
      }
      this.setData({
        olivelist: res.data,
        increase: increase
      });
    });
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