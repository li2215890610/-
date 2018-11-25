Page({
  scopeUserInfo: function(){
    wx.navigateTo({
      url: '/pages/user-info/user-info'
    })
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
})