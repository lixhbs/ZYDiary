const apiData = require('./data.js');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

const formatTimes = date => {
  const hour = date.getHours()
  const minute = date.getMinutes()
  return [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const uploadFile = filePath => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: `${app.globalData.baseUrl}/upload/uploadImage`,
      filePath: filePath,
      name: 'file',
      success(res) {
        // const data = res.data
        //do something
        resolve(res)
      }
    });
  })
}

function checkSession() {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success(arg) {
        resolve(true)
      },
      fail(e) {
        resolve(false)
      }
    })
  })
}

function getLoginCode() {
  return new Promise((resolve) => {
    wx.login({
      success(res) {
        resolve(res)
      }
    })
  })
}
function getUserInfo() {
  return new Promise((resolve, reject) => {
    checkSession().then(flag => {
      const userData = wx.getStorageSync("userData")
      if (flag && userData){
        apiData.getUserInfoBySession().then(userSession => {
          if (!userSession.data) {
            InitUserInfo(userData).then(data => {
              resolve(data)
            });
          } else {
            resolve(userData)
          }
        });
      } else {
        wx.navigateTo({
          url: '/pages/login/auth'
        })
      }
    })
  });
}

function InitUserInfo(arg) {
  return new Promise((resolve, reject) => {
    getLoginCode().then(res => {
      if (res.code && arg) {
        arg.appid = 'wx52768c4ab925bedc'
        arg.loginCode = res.code
        apiData.request('/User/getUserInfoByLoginCode', arg).then(data => {
          if (data && data.data.code === '0') {
            resolve(data.data.data)
            // wx.setStorageSync('Cookie_user', data.cookies[0])
            wx.setStorageSync("userData", data.data.data)
          } else{
            wx.navigateTo({
              url: '/pages/login/auth'
            })
          }
        }, reason => {
          reject(reason)
        }).catch(function (reason) {
          console.log('[InitUserInfo] catch:', reason)
          wx.showModal({
            title: '[InitUserInfo] catch',
            content: JSON.stringify(reason)
          })
        })
      }
    }).catch(function (reason) {
      console.log('[InitUserInfo] catch:', reason)
    })
  }).catch(function (reason) {
    console.log('[InitUserInfo] catch:', reason)
  })
}

const login = (arg) => {
  wx.showLoading({
    title: '加载中',
    mask: true,
  })
  
  if (!wx.getStorageSync("userData")) {
    wx.navigateTo({
      url: '/pages/login/auth',
    })
    return null;
  } else {
    wx.hideLoading()
  }
  
}

module.exports = {
  formatTime,
  formatDate,
  formatTimes,
  uploadFile,
  login,
  checkSession,
  getLoginCode,
  InitUserInfo,
  getUserInfo
}
