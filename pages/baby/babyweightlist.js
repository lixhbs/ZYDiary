// pages/baby/babyweightlist.js
const util = require('../../utils/util.js');
const database = require('../../utils/data.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weightlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '体重管理',
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
    database.listBabyweight({}).then(res => {
      const weightlist = res.data;
      let increase = "--";
      if (weightlist.length > 1){
        increase = parseFloat(weightlist[0].weight - weightlist[1].weight).toFixed(1)
      }
      this.setData({
        weightlist: res.data,
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