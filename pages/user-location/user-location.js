
const app = new getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLocationTwo: false,
    isShowOpenSetting: false
  },
  onShow: function(){
    let { isLocationTwo, isShowOpenSetting} = this.data;
    //配合第二种方式
    if (isLocationTwo || isShowOpenSetting){
      this.getLocationData();
    }
  },
  /**
   * 第一种方式
   */
  getLocationOne: function(){
    app.getSetting("scope.userLocation").then((data) => {
      this.getLocationData()
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
  confirmEvent(e) {
    console.log(e.detail)
    if (e.detail.state && e.detail.scope === 'scope.userLocation') {
      wx.showToast({
        title: '授权成功'
      })
      this.setData({
        isShowOpenSetting: false
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getLocationData: function(){
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.log(res)
        wx.showToast({
          title: '获取成功',
        })
      }
    })
  },
  /**
   * 第二种方式
   */
  getLocationTwo: function () {
    this.getLocationDataTwo()
  },
  handleLocationTwoSetting: function(e){
    if (!e.detail.authSetting['scope.userLocation']) {
      wx.showModal({
        title: '警告',
        content: '不授权无法保存',
        showCancel: false
      })
      this.setData({
        isLocationTwo: true
      })
    } else {
      wx.showToast({
        title: '授权成功'
      })
      this.setData({
        isLocationTwo: false
      })
    }
  },
  getLocationDataTwo: function () {
    wx.getLocation({
      type: 'wgs84',
      success:(res)=> {
        console.log(res)
        wx.showToast({
          title: '获取成功',
        })
      },
      fail:(err)=>{
        this.setData({
          isLocationTwo: true
        })
      }
    })
  },

  /**
   * 第三种方式
   */
  getLocationTherr: function () {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.log(res)
        wx.showToast({
          title: '获取成功',
        })
      },
      fail: (err) => {
        this.setData({
          isShowOpenSetting: true
        })
        app.getSetting("scope.userLocation").then((data) => {
          this.setData({
            isShowOpenSetting: false
          })
          this.getLocationData()
        }).catch((err) => {
          console.log(err)
          this.setData({
            isShowOpenSetting: true
          })
        })
      }
    })
  },
  
})