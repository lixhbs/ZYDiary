// pages/baby/binding/binding.js

const util = require('../../../utils/util.js');
const database = require('../../../utils/data.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    relationship: [],
    index: '0',
    number: ''
  },
  bindKeyInput: function (e) {
    this.setData({
      number: e.detail.value
    })
  },
  relationshipChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    });
  },
  bindbaby(arg) {
    let data = {};
    data.codeid = this.data.relationship[this.data.index].codeid;
    data.number = this.data.number
    database.addRelationship(data).then(res => {
      console.log(res);
      if (res.code === '0') {
        wx.switchTab({
          url: './../home/home',
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      }
    })
    console.log(data);
  },

  createinfo(arg) {
    console.log(arg);
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
    database.listCodeValuesByName("zyrj_relationship").then(res => {
      this.setData({
        relationship: res.data
      })
      console.log(res);
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