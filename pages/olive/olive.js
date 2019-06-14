// pages/olive/olive.js
const database = require('../../utils/data.js');
const util = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notesdata: util.formatDate(new Date()),
    olive: ''
  },
  DateChange(e) {
    this.setData({
      notesdata: e.detail.value
    })
  },
  formSubmit: function (e) {
    let baby = e.detail.value
    if (!baby.olive) {
      wx.showToast({
        title: '请填写身高！',
        icon: 'none'
      })
      return false;
    }

    console.log('请求：', baby)
    database.addBabyolive(baby).then(res => {
      if (res.code === '0') {
        wx.showToast({
          title: '添加成功！',
          icon: 'success',
          duration: 1000,
          complete: () => {
            setTimeout(() => {
              wx.switchTab({
                url: './../home/home',
              })
            }, 1000)
          }
        })
      } else {
        wx.showToast({
          title: '添加失败',
          icon: 'none'
        })
      }
    });
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