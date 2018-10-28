const app = new getApp();

Page({

  data: {
    address: null,
    isShowAddress: false,
    isShowOpenSetting: false
  },
  onShow: function() {

  },
  /***
   * 第一种
   */
  oneAddress: function() {
    wx.showLoading({
      title: '正在处理',
    })
    app.getSetting('scope.address').then((data) => {
      console.log(data)
      this.getHandleAddress()
    }).catch((err) => {
      console.log(err)
      wx.hideLoading()
      this.setData({
        isShowOpenSetting: true
      })
    })
  },
  //取消事件
  cancelEvent() {
    wx.showModal({
      title: '警告',
      content: '不授权获取使用',
      showCancel: false
    })
    this.setData({
      isShowOpenSetting: false
    })
  },
  //确认事件
  confirmEvent(e) {
    if (e.detail.state && e.detail.scope === 'scope.address') {
      wx.showToast({
        title: '授权成功'
      })
      this.setData({
        isShowOpenSetting: false
      })
      this.getHandleAddress()
    }
  },
  /**
   *  第二种
   */
  handleSetting: function(e) {
    if (!e.detail.authSetting['scope.address']) {
      wx.showModal({
        title: '警告',
        content: '不授权无法使用',
        showCancel: false
      })
      this.setData({
        isShowAddress: true
      })
    } else {
      wx.showToast({
        title: '授权成功'
      })
      this.setData({
        isShowAddress: false
      })
    }
  },
  twoAddress: function() {
    wx.showLoading({
      title: '正在处理',
    })
    wx.chooseAddress({
      success: (res) => {
        wx.hideLoading()
        console.log(res)
        this.setData({
          isShowAddress: false
        })
      },
      fail: (err) => {
        wx.hideLoading()
        if (err.errMsg === "chooseAddress:fail cancel") {
        
        }else{
          this.setData({
            isShowAddress: true
          })
        }
      }
    })
  },

  /**
   *  第三种
   */
  threeAddress: function() {
    wx.showLoading({
      title: '正在处理',
    })
    wx.chooseAddress({
      success: (res) => {
        wx.hideLoading()
        console.log(res)

      },
      fail: (err) => {
        console.log(err)
        wx.hideLoading()

        if (err.errMsg === "chooseAddress:fail cancel"){

        }else{
          app.getSetting('scope.address').then((data) => {
            wx.showLoading({
              title: '正在处理',
            })
            this.getHandleAddress()
          }).catch((err) => {
            console.log(err)

            wx.hideLoading()
            this.setData({
              isShowOpenSetting: true
            })
          })
        }
      }
    })
  },




  getHandleAddress: function() {
    wx.chooseAddress({
      success: (res) => {
        wx.hideLoading()
        console.log(res)

      },
      fail: (err) => {
        wx.hideLoading()

      }
    })
  },
  onShareAppMessage: function() {

  }
})