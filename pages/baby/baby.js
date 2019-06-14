// pages/baby/baby.js
const util = require('../../utils/util.js');
const database = require('../../utils/data.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    babyInfo: {},
    photosrc: ''
  },
  CopyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.number,
      success: res => {
        wx.showToast({
          title: '已复制',
          duration: 1000,
        })
      }
    })
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
    database.searchBabyInfo().then(res => {
      const babyInfo = res.data;
      let photosrc = '';
      if (babyInfo.photo) {
        const photo = JSON.parse(babyInfo.photo)[0];
        photosrc = `${app.globalData.baseUrl}/upload/downloadUpload` + photo.fileData.datafile + photo.fileData.name;
      }
      this.setData({
        babyInfo: babyInfo,
        photosrc: photosrc
      })
    });
    // 查询身高
    database.listBabyweight({}).then(res => {
      const weights = res.data;

      if (weights && weights.length > 0) {
        const weight = weights[0];
        this.setData({
          weight: weight.weight
        })
      }
    });

    // 查询体重
    database.listBabyolive({}).then(res => {
      const olives = res.data;
      if (olives && olives.length > 0) {
        const olive = olives[0];
        this.setData({
          olive: olive.olive
        })
      }
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