const CACHE = 'mattemastaren-offline-v2';
const ASSETS = ['./','./index.html','./manifest.webmanifest','./icons/icon.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('mattemastaren-offline-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const req=event.request, url=new URL(req.url);
 if(req.method!=='GET'||url.origin!==self.location.origin)return;
 event.respondWith(fetch(req).then(res=>{
  if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy)).catch(()=>{});}
  return res;
 }).catch(async()=>{
  const cached=await caches.match(req);
  if(cached)return cached;
  if(req.mode==='navigate')return caches.match('./index.html');
  return Response.error();
 }));
});