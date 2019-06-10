const app = getApp()

const request = (url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${app.globalData.baseUrl}${url}`,
      data: data,
      method: 'POST',
      success(res) {
        resolve(res)
      }
    });
  })
}

const listCodeValuesByName = (name) => {
  return new Promise((resolve, reject) => {
    request('/codevalue/listCodeValuesByName', name).then(res => {
      resolve(checkSucces(res));
    })
  })
}
const searchDietnote = () => {
  return new Promise((resolve, reject) => {
    request('/ZYDiary/searchDietnote', {
      endtime: 'endtime'
    }).then( res => {
      resolve(checkSucces(res));
    })
  })
}

const endSetting = (arg) => {
  return new Promise((resolve, reject) => {
    request('/ZYDiary/endSetting', arg).then(res => {
      resolve(checkSucces(res));
    })
  })
}

const getUserInfoBySession = (arg) => {
  return new Promise((resolve, reject) => {
    request('/User/getUserInfoBySession', arg).then(res => {
      resolve(checkSucces(res));
    })
  })
}

// listDietnote

const listDietnote = (arg) => {
  return new Promise((resolve, reject) => {
    request('/ZYDiary/listDietnote', arg).then(res => {
      resolve(checkSucces(res));
    })
  })
}

// searchRelationship

const searchRelationship = () => {
  return new Promise((resolve, reject) => {
    request('/ZYDiary/searchRelationship', null).then(res => {
      resolve(checkSucces(res));
    })
  })
}

const addRelationship = (arg) => {
  return new Promise((resolve, reject) => {
    request('/ZYDiary/addRelationship', arg).then(res => {
      resolve(checkSucces(res));
    })
  })
}

const checkSucces = arg => {
  return arg.data
}

module.exports = {
  searchDietnote: searchDietnote,
  endSetting: endSetting,
  request: request,
  getUserInfoBySession,
  listDietnote,
  searchRelationship,
  listCodeValuesByName,
  addRelationship
}