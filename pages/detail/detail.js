//logs.js
const util = require('../../utils/util.js')
let video_resources = require('../../resources/video')
Page({
  data: {
    video_src:"",
    character:"",
    photoimg_src:"",
    state:1,
    image_src: "http://app.cxtx.info:8085/images/images/暂停.png",
  },
  onLoad: function (option) {
    this.audioCtxtwo = wx.createAudioContext('myAudiotwo')
    for (let i of video_resources[0].video){
      if (i.title == option.name){
        this.setData({
          character: i.character,
          video_src: i.voice_src
        })
      }
    }
  },
  startvideo:function(){
      if(this.data.state==1){
        this.setData({
          image_src:"http://app.cxtx.info:8085/images/images/播放-暂停.png",
          state:2
        })
        this.audioCtxtwo.play()
        console.log("i.voice_src" + this.data.video_src)
        console.log("音频播放了")
      }else{
        this.setData({
          image_src: "http://app.cxtx.info:8085/images/images/暂停.png",
          state: 1
        })
        this.audioCtxtwo.pause()
      }
  }
})
