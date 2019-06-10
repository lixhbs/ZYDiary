// pages/home/home.js
const database = require('../../utils/data.js');
const utils = require('../../utils/util.js');
const logic = require('../../utils/dataLogic.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Dietnote: {},
    isfeed: false,
    MenuList: [{
      title: '喂食',
      name: 'red',
      text: 'feed',
      color: '#e54d42',
      url: './../feed/menu/menu',
      badge: 0,
      icon: "icon-weinai"
    },
    {
      title: '排泄',
      name: 'orange',
      text: 'egest',
      color: '#f37b1d',
      badge: 0,
      icon: "icon-dabian"
    },
    {
      title: '体重',
      name: 'yellow',
      text: 'weight',
      color: '#fbbd08',
      badge: 0,
      icon: "icon-tizhong"
    },
    {
      title: '三围',
      name: 'olive',
      text: 'bwh',
      color: '#8dc63f',
      badge: 0,
      icon: "icon-tubiao-"
    },
    {
      title: '预防',
      name: 'green',
      text: 'prevent',
      color: '#39b54a',
      badge: 0,
      icon: "icon-yufang"
    },
    {
      title: '提醒',
      name: 'cyan',
      text: 'remind',
      color: '#1cbbb4',
      badge: 0,
      icon: "icon-tixing"
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
    let that = this;
    // 结束记录前应该查询本次记录是否真正结束？
    wx.showModal({
      title: '提示',
      content: '是否结束本次记录',
      success(res) {
        if (res.confirm) {
          database.endSetting(that.data.Dietnote).then(res => {
            if (res.data) {
              wx.showToast({
                title: '记录成功',
                icon: 'none',
                complete: () => {
                  setTimeout(() => {
                    that.searchDietnote()
                  }, 2000)
                }
              })
            }
          });
        }
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
    // 首先查询登录情况和是否注册
    utils.getUserInfo().then(data => {
      if (data) {
        this.searchDietnote();
        logic.searchRelationship(data);
      }
    })
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