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
        url: 'https://npm.onmicrosoft.cn/lucky-img/music/%E6%9C%AA%E9%97%BB%E8%8A%B1%E5%90%8D%EF%BC%88%E9%92%A2%E7%90%B4%E6%9B%B2%E7%BA%AF%E9%9F%B3%E4%B9%90%EF%BC%89.mp3',
        cover:
          'https://npm.onmicrosoft.cn/lucky-img/pic/%E6%9C%AA%E9%97%BB%E8%8A%B1%E5%90%8D%EF%BC%88%E9%92%A2%E7%90%B4%E6%9B%B2%E7%BA%AF%E9%9F%B3%E4%B9%90%EF%BC%89.jpg',
        lrc: 'https://npm.onmicrosoft.cn/lucky-img/lyric/%E6%9C%AA%E9%97%BB%E8%8A%B1%E5%90%8D%EF%BC%88%E9%92%A2%E7%90%B4%E6%9B%B2%E7%BA%AF%E9%9F%B3%E4%B9%90%EF%BC%89.lrc',
      },
      {
        name: 'Somewhere',
        artist: 'July',
        url: 'https://npm.onmicrosoft.cn/lucky-img/music/Somewhere.mp3',
        cover: 'https://npm.onmicrosoft.cn/lucky-img/pic/Somewhere.jpg',
        lrc: 'https://npm.onmicrosoft.cn/lucky-img/lyric/Somewhere.lrc',
      },
      {
        name: '千与千寻（钢琴版）',
        artist: '纯音乐',
        url: 'https://npm.onmicrosoft.cn/lucky-img/music/%E5%8D%83%E4%B8%8E%E5%8D%83%E5%AF%BB%EF%BC%88%E9%92%A2%E7%90%B4%E7%89%88%EF%BC%89.mp3',
        cover:
          'https://npm.onmicrosoft.cn/lucky-img/pic/%E5%8D%83%E4%B8%8E%E5%8D%83%E5%AF%BB%EF%BC%88%E9%92%A2%E7%90%B4%E7%89%88%EF%BC%89.jpg',
        lrc: 'https://npm.onmicrosoft.cn/lucky-img/lyric/%E5%8D%83%E4%B8%8E%E5%8D%83%E5%AF%BB%EF%BC%88%E9%92%A2%E7%90%B4%E7%89%88%EF%BC%89.lrc',
      },
      {
        name: 'My Soul',
        artist: 'July',
        url: 'https://npm.onmicrosoft.cn/lucky-img/music/My%20Soul.mp3',
        cover: 'https://npm.onmicrosoft.cn/lucky-img/pic/My%20Soul.jpg',
        lrc: 'https://npm.onmicrosoft.cn/lucky-img/lyric/My%20Soul.lrc',
      },

      {
        name: '美丽的神话（纯音乐）',
        artist: '纯音乐',
        url: 'https://npm.onmicrosoft.cn/lucky-img/music/%E7%BE%8E%E4%B8%BD%E7%9A%84%E7%A5%9E%E8%AF%9D%EF%BC%88%E7%BA%AF%E9%9F%B3%E4%B9%90%EF%BC%89.mp3',
        cover:
          'https://npm.onmicrosoft.cn/lucky-img/pic/%E7%BE%8E%E4%B8%BD%E7%9A%84%E7%A5%9E%E8%AF%9D%EF%BC%88%E7%BA%AF%E9%9F%B3%E4%B9%90%EF%BC%89.jpg',
        lrc: 'https://npm.onmicrosoft.cn/lucky-img/lyric/%E7%BE%8E%E4%B8%BD%E7%9A%84%E7%A5%9E%E8%AF%9D%EF%BC%88%E7%BA%AF%E9%9F%B3%E4%B9%90%EF%BC%89.lrc',
      },

      {
        name: '偏爱(钢琴版)',
        artist: '纯音乐',
        url: 'https://npm.onmicrosoft.cn/lucky-img/music/%E5%81%8F%E7%88%B1%28%E9%92%A2%E7%90%B4%E7%89%88%29.mp3',
        cover: 'https://npm.onmicrosoft.cn/lucky-img/pic/%E5%81%8F%E7%88%B1%28%E9%92%A2%E7%90%B4%E7%89%88%29.jpg',
        lrc: 'https://npm.onmicrosoft.cn/lucky-img/lyric/%E5%81%8F%E7%88%B1%28%E9%92%A2%E7%90%B4%E7%89%88%29.lrc',
      },
      {
        name: '我曾爱过一个人 (笛子版)',
        artist: '琰琰',
        url: 'https://npm.onmicrosoft.cn/lucky-img/music/%E6%88%91%E6%9B%BE%E7%88%B1%E8%BF%87%E4%B8%80%E4%B8%AA%E4%BA%BA%20%28%E7%AC%9B%E5%AD%90%E7%89%88%29.mp3',
        cover:
          'https://npm.onmicrosoft.cn/lucky-img/pic/%E6%88%91%E6%9B%BE%E7%88%B1%E8%BF%87%E4%B8%80%E4%B8%AA%E4%BA%BA%20%28%E7%AC%9B%E5%AD%90%E7%89%88%29.jpg',
        lrc: 'https://npm.onmicrosoft.cn/lucky-img/lyric/%E6%88%91%E6%9B%BE%E7%88%B1%E8%BF%87%E4%B8%80%E4%B8%AA%E4%BA%BA%20%28%E7%AC%9B%E5%AD%90%E7%89%88%29.lrc',
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
