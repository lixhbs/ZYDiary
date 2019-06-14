// pages/baby/babyinfo.js
const util = require('../../utils/util.js');
const database = require('../../utils/data.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexSex: '0',
    sex: ['男', '女'],
    index: 0,
    imgList: [],
    previewImage: [],
    birthtime: '20:21',
    birthday: '2019-05-26',
    relationship: [{ 'codeid': '0', 'value': '请选择'}],
    reindex: '0',
    name: '',
    milkname: '',
  },
  TimeChange(e) {
    this.setData({
      birthtime: e.detail.value
    })
  },
  relationshipChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      reindex: e.detail.value
    });
  },
  DateChange(e) {
    this.setData({
      birthday: e.detail.value
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
            if (error) {
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
      content: '确定要删除这张照片吗？',
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
            fail(e) {
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

  formSubmit: function (e) {
    let baby = e.detail.value
    if (this.data.imgList && this.data.imgList.length > 0) {
      baby.photo = JSON.stringify(this.data.imgList)
    }
    if (!baby.name) {
      wx.showToast({
        title: '请填写姓名！',
        icon: 'none'
      })
      return false;
    }

    if (!baby.milkname) {
      wx.showToast({
        title: '请填写小名！',
        icon: 'none'
      })
      return false;
    }

    if (this.data.reindex === '0'){
      wx.showToast({
        title: '请选择关系！',
        icon: 'none'
      })
      return false;
    }

    if (!baby.photo) {
      wx.showToast({
        title: '请至少添加一张照片！',
        icon: 'none'
      })
      return false;
    }

    const data = {
      baby: baby,
      relationship: this.data.reindex
    }
    console.log('请求：', data)
    database.addBaby(data).then(res => {
      if (res.code === '0'){
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
          title: '创建失败',
          icon: 'none'
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '宝宝档案',
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
    database.listCodeValuesByName("zyrj_relationship").then(res => {
      this.setData({
        relationship: this.data.relationship.concat(res.data)
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