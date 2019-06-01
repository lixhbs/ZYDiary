const util = require('../../utils/util.js');
const app = getApp();
// pages/feed/feed.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    picker: ['母乳', '奶粉', '辅食'],
    index: '0',
    time: util.formatTimes(new Date()),
    date: util.formatDate(new Date()),
    imgList: []
  },

  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        let tempFilePath = res.tempFilePaths[0];
        let that = this;
        wx.uploadFile({
          url: `${app.globalData.baseUrl}/upload/uploadImage`,
          filePath: res.tempFilePaths[0],
          name: 'file',
          success(res) {
            const fileData = JSON.parse(res.data);
            let foleData = [{
              tempFilePath: tempFilePath,
              fileData: fileData,
              filePath: `${app.globalData.baseUrl}/upload/downloadUpload/${fileData.datafile}/${fileData.name}`,
            }]
            if (that.data.imgList.length != 0) {
              that.setData({
                imgList: that.data.imgList.concat(foleData)
              })
            } else {
              that.setData({
                imgList: foleData
              })
            }
          },
          fail(e) {
            console.log(e)
          }
        })
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '宝宝',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
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