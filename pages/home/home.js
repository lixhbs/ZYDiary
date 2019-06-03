// pages/home/home.js
const database = require('../../utils/data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Dietnote: {},
    isfeed: true,
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
  overClick: function() {
    database.endSetting(this.data.Dietnote).then(res => {
      if (res.data) {
        this.searchDietnote()
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
    
    this.searchDietnote()
  },
  searchDietnote: function (){
    database.searchDietnote().then(res => {
      if (res.data) {
        this.setData({
          isfeed: true,
          Dietnote: res.data
        });
      } else{
        this.setData({
          isfeed: false,
          Dietnote: {}
        });
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