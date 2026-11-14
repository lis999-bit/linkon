// 링크온 서비스 워커: 홈 화면 설치용. 항상 최신 파일을 받도록 캐시는 쓰지 않아요.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).catch(() => new Response(
    '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body style="margin:0;background:#07070a;color:#EDEBE4;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;text-align:center"><p>인터넷에 연결되면 링크온이 다시 켜져요.</p></body>',
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } })));
});
