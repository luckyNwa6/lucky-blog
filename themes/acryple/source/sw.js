const CACHE_NAME = 'ICDNCache'
let cachelist = []
self.addEventListener('install', async function (installEvent) {
  self.skipWaiting()
  installEvent.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      // console.log('开启缓存')
      return cache.addAll(cachelist)
    }),
  )
})
self.addEventListener('fetch', async (event) => {
  try {
    event.respondWith(handle(event.request))
  } catch (msg) {
    event.respondWith(handleerr(event.request, msg))
  }
})
const handleerr = async (req, msg) => {
  return new Response(
    `<h1>CDN分流器遇到了致命错误</h1>
    <b>${msg}</b>`,
    { headers: { 'content-type': 'text/html; charset=utf-8' } },
  )
}

self.addEventListener('fetch', async (event) => {
  try {
    event.respondWith(handle(event.request))
  } catch (err) {
    if (fullpath(urlPath).indexOf('.html') != -1) {
      event.respondWith(fetch('/404.html'))
    }
  }
})
const fullpath = (path) => {
  path = path.split('?')[0].split('#')[0]
  if (path.match(/\/$/)) {
    path += 'index'
  }
  if (!path.match(/\.[a-zA-Z]+$/)) {
    path += '.html'
  }
  return path
}

self.db = {
  //全局定义db,只要read和write,看不懂可以略过
  read: (key, config) => {
    if (!config) {
      config = { type: 'text' }
    }
    return new Promise((resolve, reject) => {
      caches.open(CACHE_NAME).then((cache) => {
        cache
          .match(new Request(`https://LOCALCACHE/${encodeURIComponent(key)}`))
          .then(function (res) {
            if (!res) resolve(null)
            res.text().then((text) => resolve(text))
          })
          .catch(() => {
            resolve(null)
          })
      })
    })
  },
  write: (key, value) => {
    return new Promise((resolve, reject) => {
      caches
        .open(CACHE_NAME)
        .then(function (cache) {
          cache.put(new Request(`https://LOCALCACHE/${encodeURIComponent(key)}`), new Response(value))
          resolve()
        })
        .catch(() => {
          reject()
        })
    })
  },
}

const handle = async (req) => {
  // console.log('🚀 ~ handle ~ req:', req)
  return fetch(req)
}
