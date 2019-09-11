const app = getApp()
let schoolData = require('../../resources/gis-school')
let site = require('../../resources/local')
let video_resources = require('../../resources/video')
Page({
  data:{
    state_video:1,
    src_video:"http://47.103.100.232:8085/daoyou/女-概况介绍.wav",
    png_video:"http://app.cxtx.info:8085/images/images/暂停.png",
    local_name:"中华孝道园",
    local_introduce: video_resources[1].video[0].character,
    checked:"",
    lastTapTime: 0,
    hand:0,
    longitude: 120.0706744194,
    latitude: 31.4774089485,
    num:-1,
    offx:0,
    src:"http://47.103.100.232:8085/daoyou/女-概况介绍.wav",
    scale: 16,
    items: site[0].items,
    markers: []
  },
  createMarker(point) {
    let latitude = point.latitude;
    let longitude = point.longitude;
    let iconPath = point.iconPath;
    let id = point.id;
    let width = point.width;
    let height = point.height;
    let src = point.src;
    let marker = {
      src:src,
      iconPath: iconPath,
      id: point.id || 0,
      latitude: latitude,
      longitude: longitude,
      width: width,
      height: height,
    }
    return marker;
  },
  onLoad:function(options){
    this.setData({
      checked: options.checked,
      num:-1,
      local_introduce: options.checked
    })
    var that = this
    // wx.showLoading({
    //   title: '定位中'
    // })
    wx.openSetting({
      success(res) {
        console.log(res.authSetting)
      }
    })
  },
  tap:function(e){
    var data = e.currentTarget.dataset.smile;
    console.log(data);
    this.setData({
      num:data,
      checked: ""
    })
  },
  search:function(){
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // num:function(e){
  //   this.setData({
  //     markers: markers
  //   })
  //   console.log(schoolData)
  //   console.log(this.data.markers)
  // },
  onReady:function(){
    this.audioCtx = wx.createAudioContext('myAudio')
    let markers = [];
    for (let item of schoolData) {
      let marker = this.createMarker(item);
      markers.push(marker)
    }
    this.setData({
      markers:markers
    })
  },
  Localhost:function(e){
    this.setData({
      png_video:"http://app.cxtx.info:8085/images/images/暂停.png",
      src: e.target.dataset.src,
      state_video:1,
      local_name:e.currentTarget.dataset.address
    })
    for (let i of video_resources[0].video){
      if (i.title == e.currentTarget.dataset.address){
          this.setData({
            local_introduce:i.character
          })
      }
    }
    this.audioCtx.pause()
    console.log(e.target.dataset.src + "" + e.currentTarget.dataset.address)
  },
  gotohere: function (e) {
    // console.log(this.audioCtx.src)
    this.setData({
      src: e.currentTarget.dataset.markers[e.markerId].src
    })
    this.audioCtx.play()
    console.log(src)
  },
  ceshi:function(){
    console.log("点击的是地图组件")
  },
  ccc:function(){
    console.log("大地点")
  },
  yyyy:function(){
    console.log("点击的是view组件")
  },
  xxx:function(){
    console.log("点击的是地图组件")
  },
  video_button:function(){
    if(this.data.state_video==0){
      this.setData({
        png_video: "http://app.cxtx.info:8085/images/images/暂停.png",
      })
      this.audioCtx.pause()
    }else if(this.data.state_video==1){
      this.setData({
        png_video: "http://app.cxtx.info:8085/images/images/播放-暂停.png",
        state_video:2
      })
      this.audioCtx.play()
    }else{
      this.setData({
        png_video: "http://app.cxtx.info:8085/images/images/停止.png",
        state_video:1
      })
      this.audioCtx.pause()
    }
  },
  navi:function(){
    wx.navigateTo({
      url: '../detail/detail?name=' + this.data.local_name,
      src:""
    })
  }
  // num:function(){
  //   this.setData({
  //     hand: this.data.hand+1
  //   })
  // },
  // mapreduce:function(){
  //   this.setData({
  //     hand: this.data.hand - 1
  //   })
  // },
  // add: function () {
  //   this.setData({
  //     scale: this.data.scale + 1
  //   })
  //   for(let index=0; index< this.data.markers.length-1;index++){
  //     console.log(this.data.markers[index].height)
  //     this.setData({
  //       "markers[0].height": 600 * this.data.scale / 17,
  //         "markers[0].width":500*this.data.scale/17
  //     })
  //   }
  // },
  // reduce: function () {
  //   this.setData({
  //     scale: this.data.scale - 1
  //   })
  //   for (let index = 0; index < this.data.markers.length - 1; index++) {
  //     console.log(this.data.markers[index].height)
  //     this.setData({
  //       "markers[0].height": 600 * this.data.scale / 17,
  //       "markers[0].width": 500 * this.data.scale / 17
  //     })
  //   }
  //   // console.log(this.data.num)
  // },
})