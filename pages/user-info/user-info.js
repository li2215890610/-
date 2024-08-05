const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    avatarUrl: defaultAvatarUrl,
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
  },
  onGetUserInfo: function(e) {
    if (e.detail) {
      // 用户授权，可以获取到用户信息
      console.log(e.detail.userInfo);
      // TODO: 将用户信息存储到服务器
    } else {
      // 用户拒绝授权，显示提示信息
      console.log('用户拒绝授权');
    }
  },
})