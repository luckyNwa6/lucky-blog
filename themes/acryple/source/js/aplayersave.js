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
        url: 'https://imgs.luckynwa.top/blogMusic/Unknown flower name.mp3',
        cover: 'https://imgs.luckynwa.top/blogMusic/Unknown flower name.jpg',
        lrc: 'https://imgs.luckynwa.top/blogMusic/Unknown flower name.lrc',
      },
      {
        name: '千与千寻（钢琴版）',
        artist: '纯音乐',
        url: 'https://imgs.luckynwa.top/blogMusic/Sen and Chihiro.mp3',
        cover: 'https://imgs.luckynwa.top/blogMusic/Sen and Chihiro.jpg',
        lrc: 'https://imgs.luckynwa.top/blogMusic/Sen and Chihiro.lrc',
      },
      {
        name: 'My Soul',
        artist: 'July',
        url: 'https://imgs.luckynwa.top/blogMusic/My Soul.mp3',
        cover: 'https://imgs.luckynwa.top/blogMusic/My Soul.jpg',
        lrc: 'https://imgs.luckynwa.top/blogMusic/My Soul.lrc',
      },

      {
        name: '美丽的神话（纯音乐）',
        artist: '纯音乐',
        url: 'https://imgs.luckynwa.top/blogMusic/Beautiful myth.mp3',
        cover: 'https://imgs.luckynwa.top/blogMusic/Beautiful myth.jpg',
        lrc: 'https://imgs.luckynwa.top/blogMusic/Beautiful myth.lrc',
      },
      {
        name: '偏爱(钢琴版)',
        artist: '纯音乐',
        url: 'https://imgs.luckynwa.top/blogMusic/preference.mp3',
        cover: 'https://imgs.luckynwa.top/blogMusic/preference.jpg',
        lrc: 'https://imgs.luckynwa.top/blogMusic/preference.lrc',
      },
      {
        name: '我曾爱过一个人 (笛子版)',
        artist: '琰琰',
        url: 'https://imgs.luckynwa.top/blogMusic/I once loved someone.mp3',
        cover: 'https://imgs.luckynwa.top/blogMusic/I once loved someone.jpg',
        lrc: 'https://imgs.luckynwa.top/blogMusic/I once loved someone.lrc',
      },
    ])

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
