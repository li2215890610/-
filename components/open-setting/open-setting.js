Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    // 弹窗标题
    title: { // 属性名
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '标题' // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    // 弹窗内容
    content: {
      type: String,
      value: '弹窗内容'
    },
    // 弹窗取消按钮文字
    cancelText: {
      type: String,
      value: '取消'
    },
    // 弹窗确认按钮文字
    confirmText: {
      type: String,
      value: '确定'
    },
    // 控制组件是否展示
    isShowOpenSetting: {
      type: Boolean,
      value: false
    },
    //控制判断是否开启
    scope: {
      type: String,
      value:""
    },
    //设置用户点击内容 button的open-type
    openType: {
      type: String,
      value: "openSetting"
    },
    btnClickType: {
      type: String,
      value: "bindopensetting"
    },
  },

  /**
   * 私有数据,组件的初始数据
   * 可用于模版渲染
   */
  data: {
    // 弹窗显示控制
    isShow: false,
  },

  /**
   * 组件的方法列表
   * 更新属性和数据的方法与更新页面数据的方法类似
   */
  methods: {

    /*
     * 内部私有方法建议以下划线开头
     * triggerEvent 用于触发事件
     */
    cancelEvent() {
      //触发取消回调
      this.triggerEvent("cancelEvent")
    },
    confirmEvent(e) {
      //触发成功回调
      let { scope} = this.data;
      console.log(e.detail.authSetting[scope]);
      /*
      * 返回两个值解释
      * state 
      */
      this.triggerEvent(
        "confirmEvent", 
        { 
          state: e.detail.authSetting[scope],
          scope: scope
        }
      );
    }
  }
})