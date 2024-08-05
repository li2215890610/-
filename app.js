//app.js
App({
  onLaunch: function () {

  },
  globalData: {
    userInfo: null
  },
  getSetting: function (type) {
    return new Promise((resolve, reject) => {
      debugger
      //查询一下用户是否授权  type
      wx.getSetting({
        success: (res) => {
          debugger
          //不存在 或者 type === false 取反 
          if (!res.authSetting[type]) {
            wx.authorize({
              scope: type,
              success: (success) => {
                // success ....
                resolve(success)
                console.log(success) //1
              },
              fail: (err) => {
                console.log(err)
                reject(err)
              }
            })
          } else {
            // 授权成功 type === true
            // success ....
            resolve(res)
          }
        }
      })
    })
  }
})