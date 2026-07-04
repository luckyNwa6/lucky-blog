function doStuff() {
  var flag = 0
  try {
    ap = aplayers[0]
    ap.list
    flag = 1
  } catch {
    setTimeout(doStuff, 50)
    return
  }
  if (flag) {
    //爬出爬取替换下面,再去配置那inject改成自己data-id
    ap.list.add([
      {
        name: '未闻花名（钢琴曲纯音乐）',
        artist: 'nengcd',
        url: 'https://imgs.luckynwa.top/profile/blog/blogMusic/Weiwensename/Weiwensename.mp3',
        cover: 'https://imgs.luckynwa.top/profile/blog/blogMusic/Weiwensename/Weiwensename_cover.webp',
        lrc: 'https://imgs.luckynwa.top/profile/blog/blogMusic/none.lrc',
      },
      {
        name: '夜、萤火虫和你',
        artist: 'AniFace',
        url: 'https://imgs.luckynwa.top/profile/blog/blogMusic/Night_Fireflies_and_You/Night_Fireflies_and_You.mp3',
        cover: 'https://imgs.luckynwa.top/profile/blog/blogMusic/Night_Fireflies_and_You/Night_Fireflies_and_You_cover.webp',
        lrc: 'https://imgs.luckynwa.top/profile/blog/blogMusic/none.lrc',
      },
      {
        name: '千与千寻（钢琴版）',
        artist: '晨曦',
        url: 'https://imgs.luckynwa.top/profile/blog/blogMusic/Sen_to_Chihiro/Sen_to_Chihiro.mp3',
        cover: 'https://imgs.luckynwa.top/profile/blog/blogMusic/Sen_to_Chihiro/Sen_to_Chihiro_cover.webp',
        lrc: 'https://imgs.luckynwa.top/profile/blog/blogMusic/none.lrc',
      },
      {
        name: '起风了纯音乐',
        artist: 'GX',
        url: 'https://imgs.luckynwa.top/profile/blog/blogMusic/qifengle/qifengle.mp3',
        cover: 'https://imgs.luckynwa.top/profile/blog/blogMusic/qifengle/qifengle_cover.webp',
        lrc: 'https://imgs.luckynwa.top/profile/blog/blogMusic/none.lrc',
      },
      {
        name: 'My Soul',
        artist: 'July',
        url: 'https://imgs.luckynwa.top/profile/blog/blogMusic/My_Soul/My_Soul.mp3',
        cover: 'https://imgs.luckynwa.top/profile/blog/blogMusic/My_Soul/My_Soul_cover.webp',
        lrc: 'https://imgs.luckynwa.top/profile/blog/blogMusic/none.lrc',
      },
      {
        name: '我曾爱过一个人 (笛子版)',
        artist: '董敏',
        url: 'https://imgs.luckynwa.top/profile/blog/blogMusic/Wo_Ceng_Aiguo_Yige_Ren/Wo_Ceng_Aiguo_Yige_Ren.mp3',
        cover: 'https://imgs.luckynwa.top/profile/blog/blogMusic/Wo_Ceng_Aiguo_Yige_Ren/Wo_Ceng_Aiguo_Yige_Ren_cover.webp',
        lrc: 'https://imgs.luckynwa.top/profile/blog/blogMusic/none.lrc',
      },
      {
        name: '偏爱(钢琴版)',
        artist: '叫我阿坤就好啦',
        url: 'https://imgs.luckynwa.top/profile/blog/blogMusic/Pian_Ai/Pian_Ai.mp3',
        cover: 'https://imgs.luckynwa.top/profile/blog/blogMusic/Pian_Ai/Pian_Ai_cover.webp',
        lrc: 'https://imgs.luckynwa.top/profile/blog/blogMusic/none.lrc',
      },
      {
        name: '美丽的神话（纯音乐）',
        artist: '蜻蜓酱',
        url: 'https://imgs.luckynwa.top/profile/blog/blogMusic/Meili_de_Shenhua/Meili_de_Shenhua.mp3',
        cover: 'https://imgs.luckynwa.top/profile/blog/blogMusic/Meili_de_Shenhua/Meili_de_Shenhua_cover.webp',
        lrc: 'https://imgs.luckynwa.top/profile/blog/blogMusic/none.lrc',
      },
    ])
    //纯音乐没lrc（歌词，随便弄个）
    ap.list.remove(0)
    ap.lrc.hide()
    ap.setMode('normal')
    document.getElementsByClassName('aplayer-icon-menu')[0].click()
    if (localStorage.getItem('musicIndex') != null) {
      musicIndex = localStorage.getItem('musicIndex')
      ap.list.switch(musicIndex)
      //歌曲可以本地储存
    }
    if (sessionStorage.getItem('musicTime') != null) {
      window.musict = sessionStorage.getItem('musicTime')
      ap.setMode(sessionStorage.getItem('musicMode'))
      if (sessionStorage.getItem('musicPaused') != '1') {
        ap.play()
      }
      var g = true
      ap.on('canplay', function () {
        if (g) {
          ap.seek(window.musict)
          g = false
        }
      })
    } else {
      sessionStorage.setItem('musicPaused', 1)
      ap.setMode('normal')
    }
    if (sessionStorage.getItem('musicVolume') != null) {
      ap.audio.volume = Number(sessionStorage.getItem('musicVolume'))
    }
    ap.on('pause', function () {
      sessionStorage.setItem('musicPaused', 1)
      ap.lrc.hide()
    })
    ap.on('play', function () {
      sessionStorage.setItem('musicPaused', 0)
      ap.lrc.show()
    })
    ap.audio.onvolumechange = function () {
      sessionStorage.setItem('musicVolume', ap.audio.volume)
    }
    setInterval(function () {
      musicIndex = ap.list.index
      musicTime = ap.audio.currentTime
      localStorage.setItem('musicIndex', musicIndex)
      sessionStorage.setItem('musicTime', musicTime)
      sessionStorage.setItem('musicMode', ap.mode)
    }, 200)
  }
}
document.addEventListener('DOMContentLoaded', (e) => {
  doStuff()
})
