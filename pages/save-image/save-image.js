const app = getApp();
Page({
  data: {
    isPic: false,
    isShowOpenSetting: false,
    urlStr: 'http://wx.qlogo.cn/mmopen/98Nz5LFElxzjUXYDtia8tTpU3fQGqB80BasKdDFVMKibwNnIib3ZMD9Km53YM58sMFCdHxB74aicFVibyM37ZAYibmpNpQyYiafeibzu/0'
  },
  /****** 
   * 第一种方式
   */
  oneSaveImg: function () {
    app.getSetting('scope.writePhotosAlbum').then((data) => {
      console.log(data)
      this.savePhoto()
    }).catch((err) => {
      console.log(err)
      this.setData({
        isShowOpenSetting: true
      })
    })
  },
  //取消事件
  cancelEvent() {
    wx.showModal({
      title: '警告',
      content: '不授权无法保存',
      showCancel: false
    })
    this.setData({
      isShowOpenSetting: false
    })
  },
  //确认事件
  confirmEvent() {
    wx.showToast({
      title: '授权成功,去保存吧!'
    })
    this.setData({
      isShowOpenSetting: false
    })
  },

  
  /***
   *  第二种方式
   */
  twoSaveImg() {
    wx.getSetting({
      success: (res) => {
        //不存在相册授权
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              this.savePhoto();
              this.setData({
                isPic: false
              })
            },
            fail: (err) => {
              this.setData({
                isPic: true
              })
            }
          })
        } else {
          this.savePhoto();
        }
      }
    })
  },
  handleSetting(e) {
    if (!e.detail.authSetting['scope.writePhotosAlbum']) {
      wx.showModal({
        title: '警告',
        content: '不授权无法保存',
        showCancel: false
      })
      this.setData({
        isPic: true
      })
    } else {
      wx.showToast({
        title: '授权成功'
      })
      this.setData({
        isPic: false
      })
    }
  },
  savePhoto() {
    let {
      urlStr
    } = this.data;
    wx.downloadFile({
      url: urlStr,
      success: (res) => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: (data) => {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 1500
            })
          }
        })
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '来自休休漠漠',
      desc: '这是一个测试分享',
      path: '/pages/test/test',
      success: (res) => {
        console.log(res)
      },
      fail: (res) => {
        console.log(res)
      }
    }
  }
})