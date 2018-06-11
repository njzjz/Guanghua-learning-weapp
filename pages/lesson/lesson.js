// pages/lesson/lesson.js
const AV = require('../../libs/av-weapp-min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;
    var lessonObject = new AV.Query('lesson');
    lessonObject.get(options.id).then(function (lesson) {
      if (lesson.get("needemail") == true) {
        if (!AV.User.current().get("emailVerified")) {
          wx.showToast({
            title: '请先验证邮箱',
            icon: 'loading',
          });
          setTimeout(function () {
            wx.redirectTo({
              url: '../sign/sign',
              success: function (e) {
              }
            });
          }, 1000);
        }
      }
      page.setData({ lesson });
      wx.setNavigationBarTitle({
        title: lesson.get("name"),
      })
    }).catch(console.error);
  },
  videoEnd: function () {
    var page = this;
    const { lesson } = this.data;
    const user = AV.User.current();
    var UserLesson = AV.Object.extend('userlesson');
    var userLesson = new UserLesson();
    userLesson.set("lesson", lesson);
    userLesson.set("user", user);
    userLesson.save();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})