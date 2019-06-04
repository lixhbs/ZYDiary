const util = require('../../utils/util.js');
const database = require('../../utils/data.js');
const app = getApp();
// pages/feed/feed.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    readonly: false,
    picker: ['母乳', '奶粉', '辅食'],
    index: '0',
    time: util.formatTimes(new Date()),
    date: util.formatDate(new Date()),
    imgList: [],
    previewImage: [],
    DietnoteInfo: {},
    notes: ""
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
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        let tempFilePath = res.tempFilePaths[0];
        let that = this;
        wx.uploadFile({
          url: `${app.globalData.baseUrl}/upload/uploadImage`,
          filePath: res.tempFilePaths[0],
          name: 'file',
          success(res) {
            const fileData = JSON.parse(res.data);
            const error = fileData.error;
            if(error){
              wx.showToast({
                title: "上传图片失败请重新上传!",
                icon: "none"
              })
              return false;
            }
            let foleData = [{
              tempFilePath: tempFilePath,
              fileData: fileData,
              filePath: `${app.globalData.baseUrl}/upload/downloadUpload${fileData.datafile}${fileData.name}`,
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
            that.setData({
              previewImage: that.data.previewImage.concat([foleData[0].filePath])
            })
            
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
      urls: this.data.previewImage,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '宝宝的相片',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '删了',
      success: res => {
        let that = this;
        if (res.confirm) {
          const delindex = e.currentTarget.dataset.index;
          const filetable = this.data.imgList[delindex].fileData;
          wx.request({
            url: `${app.globalData.baseUrl}/upload/deleteUpload`, 
            data: filetable,
            method: "DELETE",
            success(res) {
              console.log(res.data)
              that.data.imgList.splice(e.currentTarget.dataset.index, 1);
              that.setData({
                imgList: that.data.imgList
              })
            },
            fail(e){
              wx.showToast({
                title: '删除失败',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  },
  overClick: function () {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '是否结束本次记录',
      success(res) {
        if (res.confirm) {
          database.endSetting(that.data.DietnoteInfo).then(res => {
            if (res.data) {
              wx.showToast({
                title: '记录成功',
                icon: 'success',
                complete: () => {
                  setTimeout(() => {
                    wx.switchTab({
                      url: './../home/home',
                    })
                  }, 2000)
                }
              })
            }
          });
        }
      }
    })
  },
  formSubmit: function (e) {
    let dietnotes = e.detail.value
    dietnotes.imglist = JSON.stringify(this.data.imgList)
    dietnotes.begintime = `${dietnotes.date} ${dietnotes.time}:00`
    console.log('请求：', dietnotes)
    wx.request({
      url: `${app.globalData.baseUrl}/ZYDiary/addDietnote`,
      data: dietnotes,
      method: "POST",
      success(res) {
        res = res.data
        if (res.code === "0") {
          wx.showToast({
            title: '开始记录！',
            icon: 'success',
            duration: 2000,
            complete: () => {
              setTimeout(() => {
                wx.switchTab({
                  url: './../home/home',
                })
              }, 2000)
            }
          })
        } else{
          wx.showToast({
            title: '记录失败',
            icon: 'none'
          })
        }
      },
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
    this.searchDietnote()
  },
  searchDietnote: function () {
    let that = this;
    wx.request({
      url: `${app.globalData.baseUrl}/ZYDiary/searchDietnote`,
      data: { 
        endtime: "endtime"
      },
      method: "POST",
      success(res) {
        if (res.data.data){
          console.log(res.data.data)
          that.setData({
            DietnoteInfo: res.data.data,
            notes: res.data.data.notes,
            readonly: true
          })
          wx.showToast({
            title: "正在喂奶中。。。",
            icon: "none"
          })
        }
      },
      fail(e) {
        wx.showToast({
          title: '查询失败',
          icon: 'none'
        })
      }
    })
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