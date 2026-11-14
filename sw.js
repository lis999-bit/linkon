// 링크온 서비스 워커 v2: 홈 화면 설치용. 링크온 파일은 매번 서버에 새 버전이 있는지 확인해요.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const sameOrigin=new URL(e.request.url).origin===self.location.origin;
  e.respondWith(fetch(e.request,sameOrigin?{cache:'no-cache'}:{}).catch(() => new Response(
    '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body style="margin:0;background:#07070a;color:#EDEBE4;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;text-align:center"><p>인터넷에 연결되면 링크온이 다시 켜져요.</p></body>',
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } })));
});
