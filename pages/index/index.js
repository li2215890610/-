Page({
  data: {

  },
  scopeWritePhotosAlbum: function (params) {
    wx.navigateTo({
      url: '/pages/save-image/save-image'
    })
  },
  scopeUserLocation: function (params) {
    wx.navigateTo({
      url: '/pages/user-location/user-location'
    })
  },
  scopeAddress: function(){
    wx.navigateTo({
      url: '/pages/user-address/user-address'
    })
  },
  onShareAppMessage: function() {
    return {
      title: '来自休休漠漠',
      desc: '这是一个测试分享',
      path: '/pages/test/test',
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      }
    }
  }
})