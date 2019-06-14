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

// addBaby
const addBaby = (arg) => {
  return new Promise((resolve, reject) => {
    request('/ZYDiary/addBaby', arg).then(res => {
      resolve(checkSucces(res));
    })
  })
}

//searchBabyInfo
const searchBabyInfo = () => {
  return new Promise((resolve, reject) => {
    request('/ZYDiary/searchBabyInfo', null).then(res => {
      resolve(checkSucces(res));
    })
  })
}

//sendDietnotes
const sendDietnotes = (arg) => {
  return new Promise((resolve, reject) => {
    request('/ZYDiary/sendDietnotes', arg).then(res => {
      resolve(checkSucces(res));
    })
  })
}

// addBabyweight
const addBabyweight = (arg) => {
  return new Promise((resolve, reject) => {
    request('/ZYDiary/addBabyweight', arg).then(res => {
      resolve(checkSucces(res));
    })
  })
}

// listBabyweight
const listBabyweight = (arg) => {
  return new Promise((resolve, reject) => {
    request('/ZYDiary/listBabyweight', arg).then(res => {
      resolve(checkSucces(res));
    })
  })
}

// addBabyolive
const addBabyolive = (arg) => {
  return new Promise((resolve, reject) => {
    request('/ZYDiary/addBabyolive', arg).then(res => {
      resolve(checkSucces(res));
    })
  })
}

// listBabyolive
const listBabyolive = (arg) => {
  return new Promise((resolve, reject) => {
    request('/ZYDiary/listBabyolive', arg).then(res => {
      resolve(checkSucces(res));
    })
  })
}

const checkSucces = arg => {
  if (arg.data)
  {
    if (arg.data.code === '9001') {
      wx.navigateTo({
        url: '/pages/login/auth'
      })
      return null;
    }
  }
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
  addRelationship,
  addBaby,
  searchBabyInfo,
  sendDietnotes,
  addBabyweight,
  listBabyweight,
  addBabyolive,
  listBabyolive
}