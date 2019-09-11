//logs.js
const util = require('../../utils/util.js')
let site = require('../../resources/sitename')
Page({
  data: {
    num: 0,
    inputShowed: true,
    logs_site: site[0].items,
    search:"",
    show_local:[]
  },
  onLoad: function () {
  },
  sou: function (e) {
    // console.log(e.detail.value)
    let show_locals=[]
    let hash = [];
    for (let i of this.data.logs_site){
      for(let k of i.title.split("")){
        for(let j of e.detail.value.split("")){
          if (k == j){
               show_locals.push(i)
          }
        }
      }
    }
    show_locals = show_locals.reduce(function (x, y) {
      hash[y['title']] ? '' : hash[y['title']] = true && x.push(y);
      return x;
    }, []);
    this.setData({
      show_local:show_locals
    })
    console.log(this.data.show_local)
    console.log(this.data.logs_site)
  },
  li:function(e){
    wx.navigateTo({
      url: '../index/index?checked=' + e.currentTarget.dataset.site || 'pages/index/index?checked=' + e.currentTarget.dataset.site,
    })
    console.log(e.currentTarget.dataset.site)
  }
})
