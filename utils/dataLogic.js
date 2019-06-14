const apiData = require('./data.js');

const searchRelationship = (arg) => {
  
  return new Promise((resolve, reject) => {
    apiData.searchBabyInfo().then(data => {
      if (data && data.code === "1") {
        if (!data.data){
          wx.showToast({
            title: '未添加/绑定宝宝信息',
            icon: 'none',
            complete: () => {
              setTimeout(() => {
                wx.navigateTo({
                  url: './../baby/binding/binding',
                })
              }, 2000)
            }
          })
        }
      }
    })
  })
}

module.exports = {
  searchRelationship
}