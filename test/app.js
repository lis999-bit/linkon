(function(){
'use strict';
const SPLASH_AT=Date.now();
function hideSplash(){const sp=document.getElementById('splash');if(!sp||sp.classList.contains('out'))return;setTimeout(()=>{sp.classList.add('out');setTimeout(()=>sp.remove(),700);},Math.max(0,1600-(Date.now()-SPLASH_AT)));}
setTimeout(hideSplash,6000);
const APP_VERSION='2026.11.14-1';
(function(){let shown=false;async function check(){if(shown)return;try{const r=await fetch('version.json?t='+Date.now(),{cache:'no-store'});if(!r.ok)return;const j=await r.json();if(j&&j.v&&j.v!==APP_VERSION){shown=true;document.getElementById('upd').classList.add('on');}}catch(e){}}
  document.getElementById('updGo').onclick=()=>location.reload();setInterval(check,60000);document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')check();});setTimeout(check,5000);})();
const $=id=>document.getElementById(id);
const el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e;};

/* ---------- 기본 데이터 ---------- */
const CITIES=[['서울',126.98,37.57,30],['인천',126.7,37.46,6],['수원·경기남부',127.0,37.27,7],['고양·경기북부',126.83,37.66,4],['성남·분당',127.12,37.38,4],['춘천',127.73,37.88,1],['원주',127.92,37.34,1],['강릉',128.9,37.75,1],['청주',127.49,36.64,2],['천안',127.15,36.81,2],['대전',127.38,36.35,4],['세종',127.29,36.48,1.2],['전주',127.15,35.82,2],['광주',126.85,35.16,4],['목포',126.39,34.81,1],['여수',127.66,34.76,1],['대구',128.6,35.87,6],['안동',128.73,36.57,0.8],['포항',129.34,36.02,1.5],['경주',129.21,35.86,0.8],['울산',129.31,35.54,3],['창원',128.68,35.23,3],['부산',129.07,35.18,8],['제주',126.53,33.5,1.5],['순천',127.49,34.95,0.8],['광양',127.7,34.94,0.5],['김해',128.89,35.23,1],['구미',128.34,36.12,0.8],['진주',128.11,35.18,0.7],['군산',126.74,35.97,0.6],['익산',126.96,35.95,0.6],['평택',127.11,36.99,1],['충주',127.93,36.99,0.4],['제천',128.19,37.13,0.3],['거제',128.62,34.88,0.5],['통영',128.43,34.85,0.3],['속초',128.59,38.21,0.2],['용인',127.18,37.24,2],['화성',126.83,37.2,1.5],['안산',126.83,37.32,1.2],['파주',126.78,37.76,0.8],['의정부',127.03,37.74,0.8],['남양주',127.22,37.64,1]];
const POLY=[[126.1,37.72],[126.6,37.78],[127.1,38.28],[128.35,38.6],[128.62,38.2],[129.0,37.65],[129.38,36.95],[129.45,36.05],[129.33,35.45],[129.1,35.1],[128.6,34.88],[127.8,34.68],[127.3,34.48],[126.6,34.3],[126.3,34.6],[126.42,35.05],[126.5,35.6],[126.7,36.0],[126.5,36.4],[126.15,36.8],[126.7,37.0],[126.6,37.42]];
const COL={f:'#FFB86B',m:'#8FB8FF'},GL={f:'여성의 빛',m:'남성의 빛'};
const THIS_YEAR=new Date().getFullYear(),MAX_BIRTH=THIS_YEAR-19;
const GMAX=3,MMAX=8;
const REPLIES=['안녕하세요. 이 시간에 불 켜신 분이 있네요','저도 방금 불 켰어요','거기는 날씨 어때요?','오늘 하루 어땠어요?','여기는 좀 조용해요','반가워요, 같은 하늘 아래네요','저는 퇴근하고 쉬는 중이에요','이렇게 이어지니까 신기하네요'];

function cleanNick(s){return String(s||'').replace(/[\u0000-\u001f\u007f-\u009f​-‏‪-‮⁠-⁯﻿\s]/g,'').slice(0,10);}
function cleanName(s){return String(s||'').replace(/[\u0000-\u001f\u007f-\u009f​-‏‪-‮⁠-⁯﻿]/g,'').trim().slice(0,12);}
function realAge(by){const a=THIS_YEAR-by;return (a>=19&&a<=110)?a:null;}
function label(o){return o?(o.age!=null?o.nick+' ('+o.age+')':o.nick):'알 수 없는 빛';}
function nearestCity(lon,lat){let b=CITIES[0],d=1e9;for(const c of CITIES){const e=(c[1]-lon)**2+(c[2]-lat)**2;if(e<d){d=e;b=c;}}return b[0];}
function desc(o){return GL[o.g]+' · '+(o.place||nearestCity(o.lon,o.lat))+' 근처'+(o.sample?' · 샘플':'');}
function hash(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
function hexUtf8(s){return Array.from(new TextEncoder().encode(s)).map(b=>b.toString(16).padStart(2,'0')).join('');}
function idEmail(nick){return 'u'+hexUtf8(cleanNick(nick).toLowerCase())+'@linkon.app';}
function okImg(u){return typeof u==='string'&&u.length<8000&&/^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(u);}
function chatId(a,b){return [a,b].sort().join('_');}
function toast(t){const e=$('toast');e.textContent=t;e.classList.add('on');clearTimeout(toast._t);toast._t=setTimeout(()=>e.classList.remove('on'),2400);}
function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('on',s.id===id));if(id==='room')resize();}
function dotStyle(c,sz,dim){return 'display:inline-block;flex:none;border-radius:50%;width:'+sz+'px;height:'+sz+'px;background:'+c+';'+(dim?'opacity:.35':'box-shadow:0 0 14px 3px '+c+'88');}
function sbtn(txt,kind,fn){const b=el('button','sbtn'+(kind?' '+kind:''),txt);b.type='button';b.onclick=fn;return b;}
function armBtn(b,armText,fn,normalText){b.onclick=()=>{if(b.dataset.arm){fn();return;}b.dataset.arm='1';b.textContent=armText;b.classList.add('danger');S.armed=true;setTimeout(()=>{S.armed=false;if(b.isConnected){delete b.dataset.arm;b.textContent=normalText;b.classList.remove('danger');}},5000);};}

/* ---------- 설정 확인 ---------- */
const cfg=window.LIGHTROOM_FIREBASE;
if(!window.firebase||!cfg||!cfg.apiKey||/여기에/.test(cfg.apiKey)){show('setup');hideSplash();return;}
firebase.initializeApp(cfg);
const auth=firebase.auth(),db=firebase.database(),TS=firebase.database.ServerValue.TIMESTAMP;

/* ---------- 상태 ---------- */
const S={me:null,prof:null,lit:false,view:'all',L:{},P:{},picks:new Set(),likedBy:new Set(),friends:new Set(),inReq:new Map(),outReq:new Set(),frNo:new Set(),
  noReq:false,sample:true,photo:null,region:null,loc:null,sel:null,chatWith:null,dms:{},dmSubs:{},read:{},unreadLoaded:false,startAt:Date.now(),
  groups:{},gSubs:{},ginv:{},gChat:null,gOpen:null,atTo:null,mySug:{},ctab:'all',armed:false,admSeen:new Set(),frSeen:new Set(),onlineSeen:new Set(),photos:{},subs:[]};
let offDisc=null,watchId=null;

/* ---------- 로그인 화면 ---------- */
const bSel=$('aBirth');for(let y=MAX_BIRTH;y>=THIS_YEAR-90;y--){const o=el('option',null,y+'년');o.value=y;bSel.appendChild(o);}

let mode='new',gPick=null;
function setMode(m){mode=m;$('tabNew').classList.toggle('on',m==='new');$('tabLogin').classList.toggle('on',m==='login');$('tabNew').setAttribute('aria-pressed',m==='new');$('tabLogin').setAttribute('aria-pressed',m==='login');$('newOnly').style.display=m==='new'?'flex':'none';$('aGo').textContent=m==='new'?'아이디 만들고 들어가기':'로그인';$('aPw').autocomplete=m==='new'?'new-password':'current-password';$('aErr').style.display='none';}
$('tabNew').onclick=()=>setMode('new');$('tabLogin').onclick=()=>setMode('login');
document.querySelectorAll('#gRow .btn').forEach(b=>b.onclick=()=>{gPick=b.dataset.g;document.querySelectorAll('#gRow .btn').forEach(x=>{const on=x===b;x.classList.toggle('sel',on);x.style.background=on?COL[x.dataset.g]:'';x.setAttribute('aria-pressed',on);});$('aErr').style.display='none';});
['aId','aPw','aPw2','aBirth'].forEach(id=>$(id).addEventListener('input',()=>{$('aErr').style.display='none';}));
function aErr(t){$('aErr').textContent=t;$('aErr').style.display='block';}
$('authForm').onsubmit=async e=>{e.preventDefault();const nick=cleanNick($('aId').value),pw=$('aPw').value;
  if(!nick)return aErr('아이디를 써 주세요');if(pw.length<6)return aErr('비밀번호는 6자 이상이어야 해요');
  $('aGo').disabled=true;
  try{
    if(mode==='new'){
      if(pw!==$('aPw2').value)throw {code:'x/pw2'};if(!gPick)throw {code:'x/g'};const by=+bSel.value;if(!by)throw {code:'x/birth'};
      const cred=await auth.createUserWithEmailAndPassword(idEmail(nick),pw);
      await db.ref('profiles/'+cred.user.uid).set({nick,g:gPick,birth:by,created:TS});
    }else{await auth.signInWithEmailAndPassword(idEmail(nick),pw);}
  }catch(x){const c=x&&x.code||'';
    aErr(c==='x/pw2'?'비밀번호 확인이 달라요':c==='x/g'?'빛의 색을 골라 주세요':c==='x/birth'?'태어난 해를 골라 주세요':
      c==='auth/email-already-in-use'?'「'+nick+'」은(는) 이미 다른 사람이 쓰고 있어요. 다른 아이디를 써 주세요':
      (c==='auth/wrong-password'||c==='auth/invalid-credential'||c==='auth/invalid-login-credentials'||c==='auth/user-not-found')?'아이디나 비밀번호가 맞지 않아요':
      c==='auth/too-many-requests'?'시도가 너무 많아요. 잠시 뒤 다시 해 주세요':c==='auth/network-request-failed'?'인터넷 연결을 확인해 주세요':'들어가지 못했어요. 다시 시도해 주세요');}
  $('aGo').disabled=false;};
$('logout').onclick=async()=>{await lightOff();S.subs.forEach(f=>f());S.subs=[];Object.values(S.dmSubs).forEach(f=>f());S.dmSubs={};Object.values(S.gSubs).forEach(a=>a.forEach(f=>f()));S.gSubs={};await auth.signOut();location.reload();};

auth.onAuthStateChanged(async u=>{
  if(!u){show('auth');setMode('new');hideSplash();return;}
  S.me=u.uid;
  let p=null;try{p=(await db.ref('profiles/'+u.uid).get()).val();}catch(e){}
  if(!p){for(let i=0;i<5&&!p;i++){await new Promise(r=>setTimeout(r,600));try{p=(await db.ref('profiles/'+u.uid).get()).val();}catch(e){}}}
  if(!p){await auth.signOut();show('auth');aErr('프로필을 불러오지 못했어요. 다시 로그인해 주세요');return;}
  S.prof={nick:cleanNick(p.nick),g:p.g==='m'?'m':'f',birth:p.birth,age:realAge(p.birth)};S.P[S.me]=S.prof;
  try{const st=(await db.ref('settings/'+S.me).get()).val()||{};S.noReq=!!st.noReq;S.sample=st.sample!==false;S.read=st.read||{};if(typeof st.radius==='number')S.radius=st.radius;if(typeof st.region==='number')S.region=st.region;}catch(e){}
  try{const ph=(await db.ref('photos/'+S.me).get()).val();S.photo=okImg(ph)?ph:null;}catch(e){}
  paintMe();paintReq();paintSample();paintRad();loadSampleFriends();loadSampleGroups();
  $('offTitle').textContent=label(S.prof)+'님, 불을 켜 볼까요?';
  startSubs();show('off');hideSplash();
});
function saveSetting(k,v){if(S.me)db.ref('settings/'+S.me+'/'+k).set(v).catch(()=>{});}

/* ---------- 위치 ---------- */
function fuzz(lat,lon){let d=1e9;for(const c of CITIES){const km=Math.hypot((c[1]-lon)*88,(c[2]-lat)*111);if(km<d)d=km;}
  const cell=d<15?0.02:d<40?0.05:0.12;const h=hash(S.me+':'+Math.round(lat/cell)+':'+Math.round(lon/cell));
  const jx=((h%1000)/1000-0.5)*cell*0.6,jy=(((h>>>10)%1000)/1000-0.5)*cell*0.6;
  return {lat:+(Math.round(lat/cell)*cell+jy).toFixed(4),lon:+(Math.round(lon/cell)*cell+jx).toFixed(4)};}
function getGps(){return new Promise(res=>{if(!navigator.geolocation)return res(null);navigator.geolocation.getCurrentPosition(p=>res(p.coords),()=>res(null),{enableHighAccuracy:false,timeout:12000,maximumAge:120000});});}
function cleanPlace(x){return String(x||'').replace(/[\u0000-\u001f\u007f-\u009f​-‏‪-‮⁠-⁯﻿]/g,'').trim().slice(0,20);}
const placeCache={};
async function placeName(lat,lon){const key=lat.toFixed(2)+','+lon.toFixed(2);if(placeCache[key])return placeCache[key];
  try{const r=await fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude='+lat+'&longitude='+lon+'&localityLanguage=ko');if(!r.ok)throw 0;const j=await r.json();
    const adm=((j.localityInfo&&j.localityInfo.administrative)||[]).filter(a=>a&&a.name&&/[가-힣]/.test(a.name));
    let name='';const lv=n=>adm.filter(a=>a.adminLevel===n).map(a=>a.name)[0];
    const si=lv(6)||lv(5)||j.city||'';const top=lv(4)||j.principalSubdivision||'';
    if(/(특별시|광역시)$/.test(top)){const gu=lv(6)||j.locality||'';name=top.replace(/(특별시|광역시)$/,'')+(gu&&gu!==top?' '+gu:'');}
    else name=si||j.locality||top;
    name=cleanPlace(name);if(name){placeCache[key]=name;return name;}}catch(e){}
  return nearestCity(lon,lat);}
function placeOf(o){return o.place||nearestCity(o.lon,o.lat);}
async function refreshPlace(){if(!S.loc)return;const n=await placeName(S.loc.lat,S.loc.lon);if(n!==S.place){S.place=n;if(S.lit)publishLight().catch(()=>{});if($('meSheet').classList.contains('on'))paintLoc();}}
async function publishLight(){if(!S.lit||!S.loc)return;const d={lat:S.loc.lat,lon:S.loc.lon,place:S.place||null,g:S.prof.g,nick:S.prof.nick,age:S.prof.age,noReq:!!S.noReq,t:TS};await db.ref('lights/'+S.me).set(d);}

$('switch').onclick=async()=>{if(S.busy)return;S.busy=true;$('offHint').style.color='';
  $('offHint').textContent='위치를 확인하는 중…';const c=await getGps();
  if(!c){$('offHint').style.color='#FF9A8A';$('offHint').textContent='위치를 받지 못했어요. 링크온은 GPS 위치로만 빛을 켜요. 주소창 왼쪽 자물쇠(또는 ⋮ → 설정 → 사이트 설정 → 위치)에서 위치를 허용하고 다시 스위치를 올려 주세요';S.busy=false;return;}
  S.loc=fuzz(c.latitude,c.longitude);S.locBy='gps';S.place=nearestCity(S.loc.lon,S.loc.lat);S.lit=true;$('switch').classList.add('flip');
  try{await publishLight();offDisc=db.ref('lights/'+S.me).onDisconnect();await offDisc.remove();}catch(e){S.lit=false;$('switch').classList.remove('flip');$('offHint').textContent='빛을 켜지 못했어요. 인터넷 연결을 확인해 주세요';S.busy=false;return;}
  refreshPlace();
  if(navigator.geolocation){watchId=navigator.geolocation.watchPosition(p=>{const n=fuzz(p.coords.latitude,p.coords.longitude);if(n.lat!==S.loc.lat||n.lon!==S.loc.lon){S.loc=n;publishLight().catch(()=>{});refreshPlace();if($('meSheet').classList.contains('on'))paintLoc();}},()=>{},{enableHighAccuracy:false,maximumAge:300000,timeout:30000});}
  setTimeout(()=>{show('room');$('switch').classList.remove('flip');S.busy=false;},450);};
async function lightOff(){S.lit=false;if(watchId!=null){try{navigator.geolocation.clearWatch(watchId);}catch(e){}watchId=null;}if(S.me){try{if(offDisc)await offDisc.cancel();await db.ref('lights/'+S.me).remove();}catch(e){}}BOTS.forEach(b=>{b.picksMe=false;b.frMe=false;});S.botPicks.clear();}
$('lightOff').onclick=async()=>{await lightOff();$('sheet').classList.remove('on');$('meSheet').classList.remove('on');S.sel=null;$('offHint').textContent='스위치를 올려 주세요';show('off');};
window.addEventListener('beforeunload',()=>{if(S.lit&&S.me)db.ref('lights/'+S.me).remove();});

/* ---------- 실시간 구독 ---------- */
function sub(ref,ev,fn){ref.on(ev,fn,()=>{});S.subs.push(()=>ref.off(ev,fn));}
function loadProfile(uid){if(S.P[uid]||uid[0]==='s'||S['pl'+uid])return;S['pl'+uid]=1;db.ref('profiles/'+uid).get().then(s=>{const p=s.val();if(p){S.P[uid]={nick:cleanNick(p.nick),g:p.g==='m'?'m':'f',birth:p.birth,age:realAge(p.birth)};refreshOpen();}}).catch(()=>{delete S['pl'+uid];});}
function startSubs(){const me=S.me;
  sub(db.ref('lights'),'value',s=>{const v=s.val()||{};const L={};Object.keys(v).forEach(k=>{if(k===me)return;const x=v[k];if(!x||typeof x.lat!=='number'||typeof x.lon!=='number')return;L[k]={key:k,g:x.g==='m'?'m':'f',nick:cleanNick(x.nick)||'빛',age:typeof x.age==='number'?x.age:null,lat:x.lat,lon:x.lon,noReq:x.noReq===true,place:cleanPlace(x.place)||null};S.P[k]=S.P[k]||{nick:L[k].nick,g:L[k].g,age:L[k].age};});S.L=L;onPeopleChanged();});
  sub(db.ref('mypicks/'+me),'value',s=>{const v=s.val()||{};S.pickAt=new Map(Object.entries(v));S.picks=new Set(Object.keys(v));onPeopleChanged();});
  sub(db.ref('.info/serverTimeOffset'),'value',s=>{S.tOff=s.val()||0;});
  sub(db.ref('likes/'+me),'value',s=>{const v=s.val()||{};S.likedAt=new Map(Object.entries(v));S.likedBy=new Set(Object.keys(v));onPeopleChanged();});
  sub(db.ref('friends/'+me),'value',s=>{const nw=new Set(Object.keys(s.val()||{}));nw.forEach(k=>{loadProfile(k);if(!S.friends.has(k)&&S.outReq.has(k)){db.ref('settings/'+me+'/myreq/'+k).remove();if(S.ready)notifyAct(k,nickOf(k)+'님이 친구 신청을 수락했어요','대화',()=>openChat(k));}});S.friends=nw;onPeopleChanged();});
  sub(db.ref('freq/'+me),'value',s=>{const v=s.val()||{};const m=new Map();Object.keys(v).forEach(k=>{m.set(k,v[k]);loadProfile(k);if(!S.inReq.has(k)&&!S.frSeen.has(k)&&S.ready){S.frSeen.add(k);notifyAct(k,nickOf(k)+'님이 친구를 신청했어요','확인',showFriends);}});S.inReq=m;onPeopleChanged();});
  sub(db.ref('settings/'+me+'/myreq'),'value',s=>{S.outReq=new Set(Object.keys(s.val()||{}));S.outReq.forEach(loadProfile);onPeopleChanged();});
  sub(db.ref('frno/'+me),'value',s=>{const nw=new Set(Object.keys(s.val()||{}));nw.forEach(k=>{if(!S.frNo.has(k)&&S.outReq.has(k)){db.ref('settings/'+me+'/myreq/'+k).remove();if(S.ready)notifyAct(k,nickOf(k)+'님이 친구 신청을 거절했어요','확인',()=>{});}});S.frNo=nw;onPeopleChanged();});
  sub(db.ref('mygroups/'+me),'value',s=>{const ids=Object.keys(s.val()||{});ids.forEach(watchGroup);Object.keys(S.gSubs).forEach(g=>{if(!ids.includes(g)&&!S.ginv[g])unwatchGroup(g);});refreshOpen();});
  sub(db.ref('ginv/'+me),'value',s=>{const v=s.val()||{};const prev=S.ginv;S.ginv={};Object.keys(v).forEach(g=>{const x=v[g]||{};S.ginv[g]={id:g,name:cleanName(x.name)||'별자리',from:String(x.from||'')};loadProfile(S.ginv[g].from);if(!prev[g]&&S.ready)notifyAct(S.ginv[g].from,nickOf(S.ginv[g].from)+'님이 별자리 「'+S.ginv[g].name+'」에 초대했어요','확인',()=>{renderList();show('chats');});});refreshOpen();});
  sub(db.ref('settings/'+me+'/read'),'value',s=>{S.read=s.val()||{};});
  sub(db.ref('settings/'+me+'/fcats'),'value',s=>{S.fcats=s.val()||{};refreshOpen();});
  sub(db.ref('settings/'+me+'/fmap'),'value',s=>{S.fmap=s.val()||{};refreshOpen();});
  setTimeout(()=>{S.ready=true;},2500);
}
function nickOf(k){if(k===S.me)return label(S.prof);const b=k[0]==='s'?BOTS.find(x=>x.key===k):null;if(b)return label(b);const o=S.L[k];if(o)return label(o);const p=S.P[k];if(p)return label(p);loadProfile(k);return '빛';}
function others(){const a=Object.values(S.L);return S.sample?a.concat(BOTS):a;}
function findO(k){return S.L[k]||(k[0]==='s'?BOTS.find(b=>b.key===k):null)||null;}
const PICK_TTL=10*60*1000;
function nowS(){return Date.now()+(S.tOff||0);}
function permanent(v){return v===true||v===1;}
function fresh(v){return permanent(v)||(typeof v==='number'&&nowS()-v<PICK_TTL);}
function pickLeft(k){const v=k[0]==='s'?S.botPickAt.get(k):(S.pickAt&&S.pickAt.get(k));if(permanent(v)||typeof v!=='number')return null;return Math.max(0,PICK_TTL-(nowS()-v));}
function picked(k){return k[0]==='s'?S.botPicks.has(k):S.picks.has(k);}
function likesMe(k){if(k[0]==='s'){const b=BOTS.find(x=>x.key===k);return !!(b&&b.picksMe&&(b.linked||fresh(b.picksMeAt)));}return S.likedBy.has(k)&&fresh(S.likedAt&&S.likedAt.get(k));}
function isLinked(k){return picked(k)&&likesMe(k);}
S.botFriends=new Set();S.botOut=new Set();S.botNo=new Set();
function isFriend(k){return k[0]==='s'?S.botFriends.has(k):S.friends.has(k);}
function allFriends(){return [...S.friends,...S.botFriends];}
function isOut(k){return k[0]==='s'?S.botOut.has(k):S.outReq.has(k);}
function isNo(k){return k[0]==='s'?S.botNo.has(k):S.frNo.has(k);}
function sfKey(){return 'linkon-sample-friends-'+S.me;}
function saveSampleFriends(){if(!S.me)return;try{const fr=[...S.botFriends].map(k=>BOTS.find(b=>b.key===k)).filter(Boolean).map(b=>({key:b.key,g:b.g,nick:b.nick,age:b.age,lon:b.lon,lat:b.lat}));
  const dms={};fr.forEach(b=>{if(S.dms[b.key])dms[b.key]=S.dms[b.key].slice(-100).map(m=>({me:!!m.me,text:m.text,at:m.at||0,read:!!m.read}));});
  localStorage.setItem(sfKey(),JSON.stringify({fr,dms}));}catch(e){}}
function loadSampleFriends(){try{const d=JSON.parse(localStorage.getItem(sfKey())||'null');if(!d||!Array.isArray(d.fr))return;
  d.fr.forEach(x=>{if(!x||typeof x.key!=='string'||x.key[0]!=='s')return;let b=BOTS.find(y=>y.key===x.key);
    if(!b){b={key:x.key,sample:true,g:x.g==='m'?'m':'f',nick:cleanNick(x.nick)||'샘플',age:typeof x.age==='number'?x.age:null,lon:+x.lon,lat:+x.lat,warm:true,noReq:false,picksMe:false};BOTS.push(b);}
    S.botFriends.add(b.key);if(d.dms&&Array.isArray(d.dms[b.key]))S.dms[b.key]=d.dms[b.key].filter(m=>m&&typeof m.text==='string').map(m=>({me:!!m.me,text:m.text.slice(0,500),at:m.at||0,read:!!m.read}));});}catch(e){}}
function botFriendReq(k){const b=BOTS.find(x=>x.key===k);S.botOut.add(k);toast('친구를 신청했어요. 상대가 수락하면 친구가 돼요');
  setTimeout(()=>{if(!S.botOut.has(k))return;S.botOut.delete(k);if(b&&b.warm){S.botFriends.add(k);saveSampleFriends();notifyAct(k,label(b)+'님이 친구 신청을 수락했어요 (샘플)','대화',()=>openChat(k));}else{S.botNo.add(k);notifyAct(k,(b?label(b):'샘플 빛')+'님이 친구 신청을 거절했어요 (샘플)','확인',()=>{});}onPeopleChanged();},1800+Math.random()*2500);}
function isAdmirer(k){return !S.noReq&&likesMe(k)&&!picked(k);}
function online(k){return !!S.L[k]||(S.sample&&k[0]==='s'&&BOTS.some(b=>b.key===k));}

S.botPickAt=new Map();
function sweepPicks(){if(!S.me)return;const u={};let n=0;
  (S.picks||new Set()).forEach(k=>{const mine=S.pickAt.get(k);const theirs=S.likedAt&&S.likedAt.get(k);
    if(S.likedBy.has(k)&&fresh(theirs)&&fresh(mine)){if(!permanent(mine)){u['mypicks/'+S.me+'/'+k]=1;u['likes/'+k+'/'+S.me]=1;n++;}return;}
    if(!fresh(mine)){u['mypicks/'+S.me+'/'+k]=null;u['likes/'+k+'/'+S.me]=null;n++;if(S.ready)toast(nickOf(k)+'님에게 켠 스위치가 응답이 없어 꺼졌어요');}});
  if(n)db.ref().update(u).catch(()=>{});
  S.botPicks.forEach(k=>{if(likesMe(k)){const b=BOTS.find(x=>x.key===k);if(b)b.linked=true;S.botPickAt.set(k,1);return;}if(!fresh(S.botPickAt.get(k))){S.botPicks.delete(k);S.botPickAt.delete(k);const b=BOTS.find(x=>x.key===k);toast((b?label(b):'샘플 빛')+'님에게 켠 스위치가 응답이 없어 꺼졌어요');}});
  onPeopleChanged();}
setInterval(sweepPicks,20000);
let pcTimer=null;
function onPeopleChanged(){clearTimeout(pcTimer);pcTimer=setTimeout(()=>{syncDmSubs();checkNotices();refreshOpen();},120);}
function refreshOpen(){if($('chats').classList.contains('on'))renderList();if($('lightsScr').classList.contains('on'))renderLights();if($('friends').classList.contains('on')&&!S.armed)renderFriends();if($('chat').classList.contains('on'))updChatHead();if($('gchat').classList.contains('on')&&!S.armed)renderGPanels();if(S.sel)renderSheet();}
function checkNotices(){if(!S.ready){S.likedBy.forEach(k=>S.admSeen.add(k));Object.keys(S.L).forEach(k=>{if(isFriend(k))S.onlineSeen.add(k);});return;}
  S.likedBy.forEach(k=>{if(!S.admSeen.has(k)&&isAdmirer(k)){S.admSeen.add(k);notifyAct(k,nickOf(k)+'님이 당신의 빛을 골랐어요','보기',()=>focusLight(k));}});
  [...S.admSeen].forEach(k=>{if(!S.likedBy.has(k)&&k[0]!=='s')S.admSeen.delete(k);});
  S.friends.forEach(k=>{if(S.L[k]&&!S.onlineSeen.has(k)){S.onlineSeen.add(k);if(S.lit)notifyAct(k,'친구 '+nickOf(k)+'님이 불을 켰어요','대화',()=>openChat(k));}});
  [...S.onlineSeen].forEach(k=>{if(!S.L[k])S.onlineSeen.delete(k);});}

/* ---------- 알림 ---------- */
function notifyAct(k,text,btn,fn){const o=findO(k)||S.P[k]||{g:'f'};$('nText').textContent=text;$('nDot').style.cssText=dotStyle(COL[o.g]||'#fff',12);$('nView').textContent=btn;const n=$('notice');n._act=fn;n.classList.add('on');clearTimeout(notifyAct._t);notifyAct._t=setTimeout(()=>n.classList.remove('on'),6000);try{navigator.vibrate&&navigator.vibrate(40);}catch(e){}}
$('nView').onclick=()=>{const n=$('notice');n.classList.remove('on');if(n._act)n._act();};

/* ---------- 샘플 빛 ---------- */
const NA=['별빛','새벽','고요','파도','구름','달빛','늦은밤','봄비','바람','노을','은하','첫눈','라떼','고양이','산책','여름','숲속','한강','바다','등대'];
const NB=['여행자','산책자','고래','토끼','소년','소녀','편지','기차','정원','라디오','곰','나무','섬','우주','빵','책방','','','',''];
const WT=CITIES.reduce((a,c)=>a+c[3],0);
function gs(){return Math.sqrt(-2*Math.log(Math.random()||1e-9))*Math.cos(2*Math.PI*Math.random());}
function inKr(x,y){let c=false;for(let i=0,j=POLY.length-1;i<POLY.length;j=i++){const[xi,yi]=POLY[i],[xj,yj]=POLY[j];if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)c=!c;}return c||((x-126.55)/0.4)**2+((y-33.38)/0.16)**2<1;}
let botSeq=0;
function makeBot(){let lon=126.98,lat=37.57;for(let k=0;k<60;k++){let x,y;if(Math.random()<0.18){x=126+Math.random()*3.5;y=33.1+Math.random()*5.5;}else{let r=Math.random()*WT,c=CITIES[0];for(const ci of CITIES){r-=ci[3];if(r<=0){c=ci;break;}}const sd=0.04+Math.random()*0.12;x=c[1]+gs()*sd;y=c[2]+gs()*sd*0.8;}if(inKr(x,y)){lon=x;lat=y;break;}}
  const a=Math.random();const age=a<0.35?19+Math.floor(Math.random()*11):a<0.7?30+Math.floor(Math.random()*10):a<0.9?40+Math.floor(Math.random()*10):50+Math.floor(Math.random()*20);
  return {key:'s'+(++botSeq).toString(36)+Math.random().toString(36).slice(2,7),sample:true,g:Math.random()<0.5?'f':'m',nick:(NA[Math.floor(Math.random()*NA.length)]+NB[Math.floor(Math.random()*NB.length)]).slice(0,10),age,lon:+lon.toFixed(3),lat:+lat.toFixed(3),warm:Math.random()<0.6,noReq:Math.random()<0.12,picksMe:false};}
const BOTS=[];for(let i=0;i<220;i++)BOTS.push(makeBot());S.botPicks=new Set();
setInterval(()=>{if(!S.sample)return;for(let n=0;n<2;n++){const i=Math.floor(Math.random()*BOTS.length);const b=BOTS[i];if(!S.botPicks.has(b.key)&&!b.picksMe&&!S.botFriends.has(b.key)&&!S.botOut.has(b.key))BOTS.splice(i,1);}while(BOTS.length<220)BOTS.push(makeBot());},2500);
setInterval(()=>{if(!S.sample||!S.lit||S.noReq)return;if(Math.random()<0.5){const c=BOTS.filter(b=>!S.botPicks.has(b.key)&&!b.picksMe);if(c.length){const bb=c[Math.floor(Math.random()*c.length)];bb.picksMe=true;bb.picksMeAt=Date.now();onPeopleChanged();}}},14000);
function paintSample(){$('sampleBtn').textContent=S.sample?'샘플 빛 보는 중':'샘플 빛 끄고 실제만';$('sampleBtn').setAttribute('aria-pressed',S.sample);}
$('sampleBtn').onclick=()=>{S.sample=!S.sample;saveSetting('sample',S.sample);paintSample();onPeopleChanged();};

/* ---------- 지도 ---------- */
const cv=$('cv'),ctx=cv.getContext('2d');let W=0,H=0;const Z={s:1,x:0,y:0};
function resize(){W=cv.clientWidth||390;H=Math.round(window.innerHeight||844);const d=window.devicePixelRatio||1;cv.width=W*d;cv.height=H*d;cv.style.height=H+'px';ctx.setTransform(d,0,0,d,0,0);clampZ();}
window.addEventListener('resize',()=>{if($('room').classList.contains('on'))resize();});
function base(lon,lat){const top=110,h=H-210;const s=Math.min((W-30)/(3.9*0.81),h/5.9);const ox=(W-3.9*0.81*s)/2;return [ox+(lon-125.85)*0.81*s,top+(38.85-lat)*s];}
function proj(lon,lat){const b=base(lon,lat);return [b[0]*Z.s+Z.x,b[1]*Z.s+Z.y];}
function clampZ(){Z.s=Math.max(1,Math.min(14,Z.s));const m=80;Z.x=Math.min(m,Math.max(W-W*Z.s-m,Z.x));Z.y=Math.min(m,Math.max(H-H*Z.s-m,Z.y));if(Z.s===1){Z.x=0;Z.y=0;}}
function zoomAt(px,py,ns){ns=Math.max(1,Math.min(14,ns));const wx=(px-Z.x)/Z.s,wy=(py-Z.y)/Z.s;Z.s=ns;Z.x=px-wx*ns;Z.y=py-wy*ns;clampZ();}
function glow(x,y,r,c,a){ctx.globalAlpha=a*0.16;ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r*3,0,7);ctx.fill();ctx.globalAlpha=a*0.35;ctx.beginPath();ctx.arc(x,y,r*1.8,0,7);ctx.fill();ctx.globalAlpha=a;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill();ctx.globalAlpha=1;}
const seen={},ghosts={};let drawn=[];
function frame(now){requestAnimationFrame(frame);if(!$('room').classList.contains('on')||!S.loc)return;
  ctx.fillStyle='#07070a';ctx.fillRect(0,0,W,H);
  ctx.strokeStyle='rgba(237,235,228,0.05)';ctx.lineWidth=1;ctx.beginPath();POLY.forEach((p,i)=>{const [x,y]=proj(p[0],p[1]);i?ctx.lineTo(x,y):ctx.moveTo(x,y);});ctx.closePath();ctx.stroke();
  if(S.radius&&S.view!=='mine'){const [cx,cy]=proj(S.loc.lon,S.loc.lat);const [,ry]=proj(S.loc.lon,S.loc.lat+S.radius/111);const r=Math.abs(cy-ry);ctx.save();ctx.strokeStyle='rgba(255,246,224,0.22)';ctx.setLineDash([4,6]);ctx.lineWidth=1;ctx.beginPath();ctx.arc(cx,cy,r,0,7);ctx.stroke();ctx.restore();}
  const os=others().filter(inRadius);const keys=new Set(os.map(o=>o.key));
  for(const k in seen){if(!keys.has(k)){ghosts[k]={...seen[k].o,t:now};delete seen[k];}}
  os.forEach(o=>{if(!seen[o.key])seen[o.key]={t:now,o};else seen[o.key].o=o;});
  const [mx,my]=proj(S.loc.lon,S.loc.lat);
  const links=os.filter(o=>isLinked(o.key));
  const lineTo=S.view==='mine'?os.filter(o=>isFriend(o.key)):links;
  lineTo.forEach(o=>{const [x,y]=proj(o.lon,o.lat);ctx.globalAlpha=0.35+0.25*Math.sin(now/500);ctx.strokeStyle=S.view==='mine'?'#9FE1CB':COL[o.g];ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(mx,my);ctx.lineTo(x,y);ctx.stroke();ctx.globalAlpha=1;});
  drawn=[];
  for(const k in ghosts){const g=ghosts[k];const a=1-(now-g.t)/2000;if(a<=0){delete ghosts[k];continue;}if(S.view==='mine')continue;const [x,y]=proj(g.lon,g.lat);glow(x,y,3,COL[g.g],a*0.6);}
  os.forEach((o,i)=>{const linked=isLinked(o.key),adm=isAdmirer(o.key),fr=isFriend(o.key);
    if(S.view==='mine'&&!linked&&!adm&&!fr)return;
    const [x,y]=proj(o.lon,o.lat);if(x<-30||y<-30||x>W+30||y>H+30)return;
    const fade=Math.min(1,(now-seen[o.key].t)/900);const r=linked?5:3;
    glow(x,y,r,COL[o.g],fade*(0.8+0.2*Math.sin(now/800+i)));
    if(fr){ctx.globalAlpha=fade*0.8;ctx.strokeStyle='#9FE1CB';ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(x,y,r+5,0,7);ctx.stroke();ctx.globalAlpha=1;}
    if(linked||fr){ctx.globalAlpha=fade;ctx.fillStyle=fr?'#9FE1CB':COL[o.g];ctx.font='11px "Noto Sans KR",sans-serif';ctx.fillText(label(o),x+r+9,y+4);ctx.globalAlpha=1;}
    if(adm){const ph=(now%1600)/1600;ctx.globalAlpha=(1-ph)*0.9;ctx.strokeStyle=COL[o.g];ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(x,y,5+ph*16,0,7);ctx.stroke();ctx.globalAlpha=1;}
    if(picked(o.key)&&!linked){ctx.globalAlpha=0.6;ctx.strokeStyle=COL[o.g];ctx.setLineDash([2,3]);ctx.beginPath();ctx.arc(x,y,9,0,7);ctx.stroke();ctx.setLineDash([]);ctx.globalAlpha=1;}
    if(S.sel===o.key){ctx.strokeStyle='#fff';ctx.lineWidth=1;ctx.beginPath();ctx.arc(x,y,13,0,7);ctx.stroke();}
    drawn.push({key:o.key,x,y});});
  let gExtra=0;Object.values(S.groups).forEach(g=>{gExtra+=Math.max(0,Object.keys(g.members||{}).length-1);});
  const myR=3*Math.sqrt(1+links.length+gExtra)+1.5;glow(mx,my,myR,'#fff',1);
  ctx.fillStyle='#fff';ctx.font='12px "Noto Sans KR",sans-serif';ctx.fillText(label(S.prof),mx+myR+8,my+4);
  $('zFit').style.visibility=Z.s>1.01?'visible':'hidden';
  if(!frame._t||now-frame._t>500){frame._t=now;
    $('count').textContent=(os.length+1).toLocaleString('ko-KR')+'개';$('empty').style.display=os.length?'none':'block';
    const rooms=oneRooms().length+Object.keys(S.groups).length;const adms=os.filter(o=>isAdmirer(o.key)).length;
    $('toChats').textContent='대화방 '+rooms+(totalUnread()?' · 새 메시지':'');$('toLights').textContent='빛 '+links.length+(adms?' · +'+adms:'');
    const afs=allFriends();const onF=afs.filter(k=>online(k)).length;$('toFriends').textContent=(afs.length?'친구 '+onF+'/'+afs.length:'친구')+(S.inReq.size?' · 신청 '+S.inReq.size:'');}
}
requestAnimationFrame(frame);

/* 제스처 */
const PT=new Map();let G=null,lastTap=0;
function rel(e){const r=cv.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top};}
function gstart(){const ps=[...PT.values()];if(ps.length===1)G={k:1,p0:ps[0],zx:Z.x,zy:Z.y,moved:false};else if(ps.length>=2){const a=ps[0],b=ps[1];G={k:2,d0:Math.hypot(a.x-b.x,a.y-b.y)||1,m0:{x:(a.x+b.x)/2,y:(a.y+b.y)/2},s0:Z.s,x0:Z.x,y0:Z.y,moved:true};}}
cv.addEventListener('pointerdown',e=>{try{cv.setPointerCapture(e.pointerId);}catch(_){}PT.set(e.pointerId,rel(e));gstart();});
cv.addEventListener('pointermove',e=>{if(!PT.has(e.pointerId))return;PT.set(e.pointerId,rel(e));if(!G)return;const ps=[...PT.values()];
  if(G.k===2&&ps.length>=2){const a=ps[0],b=ps[1];const d=Math.hypot(a.x-b.x,a.y-b.y);const m={x:(a.x+b.x)/2,y:(a.y+b.y)/2};const ns=Math.max(1,Math.min(14,G.s0*d/G.d0));const wx=(G.m0.x-G.x0)/G.s0,wy=(G.m0.y-G.y0)/G.s0;Z.s=ns;Z.x=m.x-wx*ns;Z.y=m.y-wy*ns;clampZ();}
  else if(G.k===1){const p=ps[0];const dx=p.x-G.p0.x,dy=p.y-G.p0.y;if(Math.abs(dx)+Math.abs(dy)>8)G.moved=true;if(G.moved&&Z.s>1){Z.x=G.zx+dx;Z.y=G.zy+dy;clampZ();}}});
function gend(e){const was=G;const p=PT.get(e.pointerId);PT.delete(e.pointerId);
  if(was&&was.k===1&&!was.moved&&p&&e.type==='pointerup'){const now=Date.now();if(now-lastTap<300){zoomAt(p.x,p.y,Z.s*2);lastTap=0;}else{lastTap=now;tapAt(p.x,p.y);}}G=null;if(PT.size)gstart();}
cv.addEventListener('pointerup',gend);cv.addEventListener('pointercancel',gend);
cv.addEventListener('wheel',e=>{e.preventDefault();const p=rel(e);zoomAt(p.x,p.y,Z.s*Math.exp(-e.deltaY*0.002));},{passive:false});
$('zIn').onclick=()=>zoomAt(W/2,H/2,Z.s*1.6);$('zOut').onclick=()=>zoomAt(W/2,H/2,Z.s/1.6);$('zFit').onclick=()=>{Z.s=1;Z.x=0;Z.y=0;};
function tapAt(x,y){const [mx,my]=proj(S.loc.lon,S.loc.lat);if((mx-x)**2+(my-y)**2<20*20){openMe();return;}$('meSheet').classList.remove('on');
  let best=null,bd=26*26;drawn.forEach(d=>{const dd=(d.x-x)**2+(d.y-y)**2;if(dd<bd){bd=dd;best=d;}});S.sel=best?best.key:null;$('sheet').classList.toggle('on',!!best);if(best)renderSheet();}
function focusLight(k){const o=findO(k);if(!o)return;show('room');const [x,y]=proj(o.lon,o.lat);if(Z.s<3)zoomAt(x,y,3);const [x2,y2]=proj(o.lon,o.lat);Z.x+=W/2-x2;Z.y+=H*0.4-y2;clampZ();S.sel=k;$('meSheet').classList.remove('on');$('sheet').classList.add('on');renderSheet();}
S.radius=0;const RADII=[0,5,10,30,50,100,200];
function distKm(a,b){const R=6371,toR=Math.PI/180;const dLat=(b.lat-a.lat)*toR,dLon=(b.lon-a.lon)*toR;const x=Math.sin(dLat/2)**2+Math.cos(a.lat*toR)*Math.cos(b.lat*toR)*Math.sin(dLon/2)**2;return 2*R*Math.asin(Math.sqrt(x));}
function inRadius(o){return S.view==='mine'||!S.radius||!S.loc||distKm(S.loc,o)<=S.radius;}
function paintRad(){$('radBtn').textContent='반경 · '+(S.radius?S.radius+'km':'전체');const P=$('radPanel');P.textContent='';
  RADII.forEach(r=>{const c=el('button','chip'+(S.radius===r?' on':''),r?r+'km':'전체');c.type='button';c.onclick=()=>setRadius(r);P.append(c);});}
function setRadius(r){S.radius=r;saveSetting('radius',r);paintRad();$('radPanel').style.display='none';$('radBtn').setAttribute('aria-expanded','false');
  if(S.loc){if(!r){Z.s=1;Z.x=0;Z.y=0;}else{const [bx,by]=base(S.loc.lon,S.loc.lat);const [,b2]=base(S.loc.lon,S.loc.lat+r/111);const rp=Math.abs(by-b2)||1;const ns=Math.max(1,Math.min(14,(Math.min(W,H)*0.38)/rp));Z.s=ns;Z.x=W/2-bx*ns;Z.y=H*0.45-by*ns;clampZ();}}
  toast(r?'내 주변 '+r+'km 안의 빛만 보여요':'모든 빛을 보여요');}
$('radBtn').onclick=e=>{e.stopPropagation();const P=$('radPanel');const open=P.style.display==='none';paintRad();P.style.display=open?'flex':'none';$('radBtn').setAttribute('aria-expanded',open);};
function setView(v){S.view=v;$('radBtn').style.display=v==='mine'?'none':'';$('radPanel').style.display='none';const w=$('vsw');w.classList.toggle('mine',v==='mine');w.setAttribute('aria-checked',v==='mine');$('vk').style.transform='';}
(function(){const w=$('vsw'),k=$('vk');let sx=0,dx=0,on=false,id=null,base=0;const MAX=86;
  w.addEventListener('pointerdown',e=>{e.stopPropagation();on=true;id=e.pointerId;sx=e.clientX;dx=0;base=S.view==='mine'?MAX:0;try{w.setPointerCapture(id);}catch(_){}w.classList.add('drag');});
  w.addEventListener('pointermove',e=>{if(!on||e.pointerId!==id)return;dx=e.clientX-sx;const x=Math.max(0,Math.min(MAX,base+dx));k.style.transform='translateX('+x+'px)';});
  const end=e=>{if(!on)return;on=false;w.classList.remove('drag');let v;
    if(Math.abs(dx)<8){const r=w.getBoundingClientRect();v=(e.clientX-r.left)>r.width/2?'mine':'all';if(v===S.view)v=S.view==='mine'?'all':'mine';}
    else{const x=Math.max(0,Math.min(MAX,base+dx));v=x>MAX/2?'mine':'all';}
    setView(v);};
  w.addEventListener('pointerup',end);w.addEventListener('pointercancel',end);
  w.addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();setView(S.view==='mine'?'all':'mine');}else if(e.key==='ArrowRight')setView('mine');else if(e.key==='ArrowLeft')setView('all');});})();

/* ---------- 빛 정보 시트 ---------- */
$('sClose').onclick=()=>{S.sel=null;$('sheet').classList.remove('on');};
function renderSheet(){const o=findO(S.sel);
  if(!o){$('sStatus').textContent='이 빛은 방금 꺼졌어요.';$('sToggle').style.display='none';$('sTalk').style.display=isFriend(S.sel)?'':'none';return;}
  $('sDot').style.cssText=dotStyle(COL[o.g],14);$('sTitle').textContent=label(o);$('sSub').textContent=desc(o);
  const on=picked(o.key),linked=isLinked(o.key),fr=isFriend(o.key);$('sToggle').style.display='';
  $('sTalk').className='btn';$('sTalk').style.color='var(--ink)';
  if(fr){$('sStatus').textContent='친구예요. 스위치를 켜지 않아도 바로 대화할 수 있어요.';$('sToggle').style.display='none';$('sTalk').style.display='';$('sTalk').textContent='1:1 대화하기';$('sTalk').className='btn solid';$('sTalk').style.color='';return;}
  if(o.noReq&&!on&&!linked&&!likesMe(o.key)){$('sStatus').textContent='이 빛은 지금 빛 요청을 받지 않아요.';$('sToggle').style.display='none';}
  else{$('sStatus').textContent=(!linked&&likesMe(o.key))?'이 빛이 당신을 골랐어요. 당신도 스위치를 켜면 바로 이어져요.':linked?'서로 골랐어요. 두 빛이 이어졌고, 대화가 열렸어요.':on?('이 빛의 스위치를 켰어요. 상대도 당신을 고르면 이어져요.'+(pickLeft(o.key)!=null?' 응답이 없으면 '+Math.max(1,Math.ceil(pickLeft(o.key)/60000))+'분 뒤 자동으로 꺼져요.':'')):'이 빛의 스위치는 꺼져 있어요.';
    $('sToggle').textContent=on?'이 빛의 스위치 끄기':'이 빛의 스위치 켜기';$('sToggle').className=on?'btn':'btn solid';}
  $('sTalk').style.display=(linked||fr)?'':'none';$('sTalk').textContent=(fr&&!linked)?'1:1 대화하기':'대화하기';}
$('sToggle').onclick=async()=>{const k=S.sel;if(!k)return;const on=picked(k);
  if(k[0]==='s'){if(on){S.botPicks.delete(k);S.botPickAt.delete(k);}else{S.botPicks.add(k);S.botPickAt.set(k,Date.now());const b=BOTS.find(x=>x.key===k);if(b&&b.warm&&!b.noReq&&!likesMe(k)&&Math.random()<0.75)setTimeout(()=>{if(S.botPicks.has(k)){b.picksMe=true;b.picksMeAt=Date.now();b.linked=true;S.botPickAt.set(k,1);onPeopleChanged();toast(label(b)+'님과 빛이 이어졌어요');}},1200+Math.random()*2500);else if(b&&likesMe(k)){b.linked=true;S.botPickAt.set(k,1);toast(label(b)+'님과 빛이 이어졌어요');}}renderSheet();onPeopleChanged();return;}
  const lk=!on&&likesMe(k);const val=lk?1:TS;const u={};u['mypicks/'+S.me+'/'+k]=on?null:val;u['likes/'+k+'/'+S.me]=on?null:val;
  try{await db.ref().update(u);if(!on&&likesMe(k))toast(nickOf(k)+'님과 빛이 이어졌어요');}catch(e){toast(on?'스위치를 끄지 못했어요':'이 빛은 지금 빛 요청을 받지 않아요');}};
$('sTalk').onclick=()=>{if(S.sel)openChat(S.sel);};

/* ---------- 내 설정 ---------- */
function paintMe(){$('meAv').style.backgroundImage=S.photo?'url('+S.photo+')':'';const p=$('pick');p.style.backgroundImage=S.photo?'url('+S.photo+')':'';p.classList.toggle('has',!!S.photo);$('pickTxt').textContent=S.photo?'':'사진';$('photoDel').style.display=S.photo?'':'none';$('meName').textContent=label(S.prof)+' · 내 설정';}
function paintReq(){$('reqToggle').checked=!S.noReq;$('reqSub').textContent=S.noReq?'지금은 아무도 나에게 빛 요청을 보낼 수 없어요':'다른 빛이 나를 고르면 알림이 와요';$('meLbl').textContent=S.noReq?'요청 차단 중':'내 설정';}
function paintLoc(){if(!S.loc){$('meLoc').textContent='위치 정보 없음';$('meLocSub').textContent='';return;}$('meLoc').textContent=(S.place||nearestCity(S.loc.lon,S.loc.lat))+' 근처';$('meLocSub').textContent='GPS로 받은 위치 · 다른 사람에게도 이 정도로만 보여요';}
function openMe(){S.sel=null;$('sheet').classList.remove('on');paintLoc();$('meSheet').classList.add('on');}
$('meBtn').onclick=()=>{$('meSheet').classList.contains('on')?$('meSheet').classList.remove('on'):openMe();};$('meClose').onclick=()=>$('meSheet').classList.remove('on');
$('reqToggle').onchange=()=>{S.noReq=!$('reqToggle').checked;saveSetting('noReq',S.noReq);paintReq();publishLight().catch(()=>{});if(S.noReq)$('notice').classList.remove('on');toast(S.noReq?'빛 요청 받기를 껐어요':'빛 요청 받기를 켰어요');};
$('photoIn').onchange=()=>{const f=$('photoIn').files&&$('photoIn').files[0];if(!f)return;const url=URL.createObjectURL(f);const im=new Image();
  im.onload=()=>{const c=document.createElement('canvas');const n=120;c.width=n;c.height=n;const x=c.getContext('2d');const m=Math.min(im.width,im.height);x.drawImage(im,(im.width-m)/2,(im.height-m)/2,m,m,0,0,n,n);let q=0.8,d=c.toDataURL('image/jpeg',q);while(d.length>=7900&&q>0.2){q-=0.1;d=c.toDataURL('image/jpeg',q);}URL.revokeObjectURL(url);
    if(!okImg(d)){$('meNote').textContent='이 사진은 쓸 수 없어요. 다른 사진을 골라 주세요';return;}
    db.ref('photos/'+S.me).set(d).then(()=>{S.photo=d;paintMe();toast('프로필 사진을 올렸어요');}).catch(()=>{$('meNote').textContent='사진을 올리지 못했어요. 다시 시도해 주세요';});};
  im.onerror=()=>{URL.revokeObjectURL(url);$('meNote').textContent='사진을 읽지 못했어요. 다른 사진을 골라 주세요';};im.src=url;$('photoIn').value='';};
$('photoDel').onclick=()=>{db.ref('photos/'+S.me).remove().then(()=>{S.photo=null;paintMe();}).catch(()=>{});};

/* ---------- 1:1 대화 ---------- */
function oneRooms(){const ks=new Set();Object.keys(S.dms).forEach(k=>{if((isFriend(k)||isLinked(k))&&(S.dms[k]||[]).length)ks.add(k);});
  return [...ks].sort((a,b)=>(unreadOf(b)-unreadOf(a))||((lastAt(b))-(lastAt(a))));}
function lastAt(k){const m=S.dms[k];return m&&m.length?m[m.length-1].at||0:0;}
function unreadOf(k){if(k[0]==='s'){return (S.dms[k]||[]).filter(m=>!m.me&&!m.read).length;}const r=S.read[k]||0;return (S.dms[k]||[]).filter(m=>m.from!==S.me&&(m.at||0)>r).length;}
function totalUnread(){let n=0;Object.keys(S.dms).forEach(k=>n+=unreadOf(k));Object.values(S.groups).forEach(g=>n+=g.unread||0);return n;}
function syncDmSubs(){const want=new Set();S.friends.forEach(k=>want.add(k));Object.keys(S.L).forEach(k=>{if(isLinked(k))want.add(k);});
  want.forEach(k=>{if(S.dmSubs[k])return;const ref=db.ref('dm/'+chatId(S.me,k)).orderByChild('at').limitToLast(100);S.dms[k]=S.dms[k]||[];
    const fn=s=>{const v=s.val();if(!v||typeof v.text!=='string')return;const m={id:s.key,from:String(v.from),text:v.text.slice(0,500),at:v.at||0,me:v.from===S.me};const arr=S.dms[k];if(arr.some(x=>x.id===m.id))return;arr.push(m);arr.sort((a,b)=>a.at-b.at);
      if(S.chatWith===k&&$('chat').classList.contains('on')){renderMsgs();markRead(k);}else if(!m.me&&m.at>S.startAt){notifyAct(k,nickOf(k)+': '+m.text.slice(0,40),'열기',()=>openChat(k));}
      refreshOpenLists();};
    ref.on('child_added',fn,()=>{});S.dmSubs[k]=()=>ref.off('child_added',fn);});
  Object.keys(S.dmSubs).forEach(k=>{if(!want.has(k)){S.dmSubs[k]();delete S.dmSubs[k];}});}
function refreshOpenLists(){clearTimeout(refreshOpenLists._t);refreshOpenLists._t=setTimeout(()=>{if($('chats').classList.contains('on'))renderList();if($('lightsScr').classList.contains('on'))renderLights();if($('friends').classList.contains('on')&&!S.armed)renderFriends();},150);}
function markRead(k){if(k[0]==='s'){(S.dms[k]||[]).forEach(m=>m.read=true);if(isFriend(k))saveSampleFriends();return;}const t=lastAt(k);if(t&&(S.read[k]||0)<t){S.read[k]=t;saveSetting('read/'+k,t);}}
async function openChat(k){if(!(isFriend(k)||isLinked(k))){toast('대화방이 닫혔어요');return;}S.chatWith=k;S.dms[k]=S.dms[k]||[];
  $('err').style.display='none';$('big').classList.remove('on');updChatHead();renderMsgs();show('chat');markRead(k);loadPhoto(k);}
function loadPhoto(k){$('chAv').style.display='none';$('chDot').style.display='';if(k[0]==='s')return;
  db.ref('photos/'+k).get().then(s=>{const v=s.val();if(okImg(v)&&S.chatWith===k){S.photos[k]=v;const o=findO(k)||S.P[k]||{g:'f'};$('chAv').style.backgroundImage='url('+v+')';$('chAv').style.borderColor=COL[o.g];$('chAv').style.display='';$('chDot').style.display='none';}}).catch(()=>{});}
$('chAv').onclick=()=>{const v=S.photos[S.chatWith];if(!v)return;$('bigImg').src=v;$('big').classList.add('on');};$('big').onclick=()=>$('big').classList.remove('on');
function updChatHead(){const k=S.chatWith;if(!k)return;const o=findO(k);const p=o||S.P[k]||{g:'f',nick:'빛'};
  $('chDot').style.cssText=dotStyle(COL[p.g],14,!o);if(S.photos[k]&&$('chAv').style.display!=='none')$('chDot').style.display='none';
  $('chTitle').textContent=nickOf(k);const fr=isFriend(k),lk=isLinked(k);$('chSub').textContent=(o?'접속 중 · ':'오프라인 · ')+(fr?'친구':'이어진 빛')+(o?' · '+(o.place||nearestCity(o.lon,o.lat))+' 근처':'');
  const b=$('chFr');
  const theyReq=k[0]!=='s'&&S.inReq.has(k);b.style.display=(fr||isOut(k)||isNo(k)||lk)?'':'none';
  b.textContent=fr?'친구예요':isNo(k)?'신청 거절됨':isOut(k)?'수락 기다리는 중':theyReq?'친구 수락':'친구 신청';b.style.opacity=(fr||isOut(k)||isNo(k))?'0.6':'1';}
$('chFr').onclick=async()=>{const k=S.chatWith;if(!k||isFriend(k)||isOut(k)||isNo(k))return;
  if(k[0]==='s'){if(!isLinked(k)){toast('친구 신청은 서로 이어진 빛끼리만 할 수 있어요');return;}botFriendReq(k);updChatHead();return;}
  if(S.inReq.has(k)){await acceptFriend(k);return;}
  if(!isLinked(k)){toast('친구 신청은 서로 이어진 빛끼리만 할 수 있어요');return;}
  const u={};u['freq/'+k+'/'+S.me]={at:TS};u['settings/'+S.me+'/myreq/'+k]=true;
  try{await db.ref().update(u);toast('친구를 신청했어요. 상대가 수락하면 친구가 돼요');}catch(e){toast('친구 신청을 보내지 못했어요');}};
function renderMsgs(){const M=$('msgs');M.textContent='';const k=S.chatWith;
  M.append(el('p','sys',k[0]==='s'?'샘플 빛이에요. 실제 사람이 아니라 자동으로 짧게 답해요.':isFriend(k)?'친구와의 1:1 대화예요. 기록은 서버에 저장돼요.':'두 빛이 이어졌어요. 기록은 서버에 저장돼요.'));
  let prev=null;(S.dms[k]||[]).forEach(m=>{const b=el('div','b '+(m.me?'me':'them'),m.text);
    if(m.me){M.append(b);prev='me';return;}const first=prev!=='them';prev='them';M.append(themRow(k,first?nickOf(k):null,b,first));});M.scrollTop=M.scrollHeight;}
function themRow(k,name,bubble,showAv,nameColor){const row=el('div','mrow2');const p=findO(k)||S.P[k]||{g:'f'};
  const av=showAv?avatarEl(k,p.g,34,false):el('span');if(!showAv)av.style.cssText='width:34px;flex:none';
  const col=el('div');col.style.cssText='display:flex;flex-direction:column;gap:4px;min-width:0;max-width:calc(100% - 44px)';
  if(name){const n=el('span','who2',name);if(nameColor)n.style.color=nameColor;col.append(n);}bubble.style.maxWidth='100%';col.append(bubble);row.append(av,col);return row;}
$('msgIn').oninput=()=>{$('err').style.display='none';};
$('compose').onsubmit=async e=>{e.preventDefault();const k=S.chatWith;const t=$('msgIn').value.trim();const err=m=>{$('err').textContent=m;$('err').style.display='block';};
  if(!t)return err('한마디를 먼저 써 주세요');
  if(k[0]==='s'){S.dms[k].push({me:true,text:t,at:Date.now(),read:true});saveSampleFriends();$('msgIn').value='';renderMsgs();setTimeout(()=>{if(!S.dms[k])return;S.dms[k].push({me:false,text:REPLIES[Math.floor(Math.random()*REPLIES.length)],at:Date.now()});saveSampleFriends();if(S.chatWith===k&&$('chat').classList.contains('on')){renderMsgs();markRead(k);}},1200+Math.random()*1800);return;}
  if(!isFriend(k)&&!isLinked(k))return err('빛이 끊어져서 지금은 보낼 수 없어요');
  try{await db.ref('dm/'+chatId(S.me,k)).push({from:S.me,text:t.slice(0,500),at:TS});$('msgIn').value='';}catch(x){err('보내지 못했어요. 다시 시도해 주세요');}};
$('chBack').onclick=()=>{S.chatWith=null;if(S.chatFrom==='friends'){renderFriends();show('friends');}else if(S.chatFrom==='lights'){renderLights();show('lightsScr');}else{renderList();show('chats');}};

/* ---------- 대화방 목록 ---------- */
$('toChats').onclick=()=>{S.chatFrom='chats';S.sel=null;$('sheet').classList.remove('on');$('meSheet').classList.remove('on');renderList();show('chats');};
$('cBack').onclick=()=>show('room');
function setTab(t){S.ctab=t;[['tAll','all'],['tGroup','group'],['tOne','one']].forEach(([id,v])=>{$(id).classList.toggle('on',t===v);$(id).setAttribute('aria-pressed',t===v);});$('secGroup').style.display=(t==='all'||t==='group')?'flex':'none';$('secOne').style.display=(t==='all'||t==='one')?'flex':'none';$('secAdm').style.display=(t==='all'||t==='one')?'flex':'none';}
$('tAll').onclick=()=>setTab('all');$('tGroup').onclick=()=>setTab('group');$('tOne').onclick=()=>setTab('one');
function secHead(id,text,n){const h=$(id);h.textContent=text;if(n){h.append(el('span','n',n+'개'));}}
S.phCache={};
function getPhoto(k){if(k===S.me)return S.photo||null;if(k[0]==='s'||k in S.phCache)return S.phCache[k]||null;S.phCache[k]=null;db.ref('photos/'+k).get().then(sn=>{const v=sn.val();if(okImg(v)){S.phCache[k]=v;S.photos[k]=v;refreshOpenLists();}}).catch(()=>{delete S.phCache[k];});return null;}
function avatarEl(k,g,sz,dim){const ph=getPhoto(k);const e=el('span');const c=COL[g]||'#fff';
  if(ph)e.style.cssText='display:block;flex:none;width:'+sz+'px;height:'+sz+'px;border-radius:50%;background:center/cover no-repeat url('+ph+');border:1.5px solid '+c+(dim?';opacity:.55':'');
  else e.style.cssText='display:flex;align-items:center;justify-content:center;flex:none;width:'+sz+'px;height:'+sz+'px;border-radius:50%;background:#1A1A1F;border:1.5px solid '+c+'88'+(dim?';opacity:.55':'');
  if(!ph){const i=el('span');i.style.cssText=dotStyle(c,12,dim);e.append(i);}return e;}
function renderList(){setTab(S.ctab);renderGroups();
  const L=$('list'),LF=$('listFr');L.textContent='';LF.textContent='';const rooms=oneRooms();const nf=rooms.filter(isFriend).length;$('oneFrHead').style.display=nf?'block':'none';$('oneLkHead').style.display=(rooms.length-nf)?'block':'none';$('noLinks').style.display=rooms.length?'none':'block';secHead('oneHead','1:1 대화',rooms.length);
  rooms.forEach(k=>{const o=findO(k);const p=o||S.P[k]||{g:'f'};const b=el('button','item');b.type='button';
    const av=el('span','av');const d=avatarEl(k,p.g,40,!o);const st=el('span','st '+(o?'on':'off'));av.append(d,st);
    const w=el('span');w.style.cssText='display:flex;flex-direction:column;gap:2px;min-width:0;flex:1';const t=el('span','t',nickOf(k));
    const ms=S.dms[k]||[];const last=ms[ms.length-1];const s2=el('span','s',last?((last.me?'나: ':'')+last.text):(o?desc(o):'오프라인'));s2.style.cssText='white-space:nowrap;overflow:hidden;text-overflow:ellipsis';w.append(t,s2);b.append(av,w);
    const n=unreadOf(k);if(n)b.append(el('span','badge',String(n)));b.onclick=()=>{S.chatFrom='chats';openChat(k);};(isFriend(k)?LF:L).append(b);});}
S.ltab='all';
function setLTab(t){S.ltab=t;[['lAll','all'],['lLinked','linked'],['lAdm','adm']].forEach(([id,v])=>{$(id).classList.toggle('on',t===v);$(id).setAttribute('aria-pressed',t===v);});$('secLinked').style.display=(t==='all'||t==='linked')?'flex':'none';$('secAdm').style.display=(t==='all'||t==='adm')?'flex':'none';}
$('lAll').onclick=()=>setLTab('all');$('lLinked').onclick=()=>setLTab('linked');$('lAdm').onclick=()=>setLTab('adm');
function renderLights(){setLTab(S.ltab);const L=$('linkedList');L.textContent='';const ls=others().filter(o=>isLinked(o.key)&&!isFriend(o.key));
  ls.forEach(o=>{const b=el('button','item');b.type='button';const d=el('span');d.style.cssText=dotStyle(COL[o.g],14);const w=el('span');w.style.cssText='display:flex;flex-direction:column;gap:2px;min-width:0;flex:1';const t=el('span','t',label(o));w.append(t,el('span','s',desc(o)));b.append(d,w);
    const n=unreadOf(o.key);if(n)b.append(el('span','badge',String(n)));b.onclick=()=>{S.chatFrom='lights';openChat(o.key);};L.append(b);});
  renderAdm();}
function showLights(){S.sel=null;$('sheet').classList.remove('on');$('meSheet').classList.remove('on');renderLights();show('lightsScr');}
$('toLights').onclick=showLights;$('lBack').onclick=()=>show('room');
function renderMyPicks(){const M=$('myPickList');M.textContent='';const ps=others().filter(o=>picked(o.key)&&!isLinked(o.key));
  ps.forEach(o=>{const row=el('div','item');const d=el('span');d.style.cssText=dotStyle(COL[o.g],14);const w=el('span');w.style.cssText='display:flex;flex-direction:column;gap:2px;min-width:0;flex:1';const left=pickLeft(o.key);w.append(el('span','t',label(o)),el('span','s',desc(o)+(left!=null?' · '+Math.max(1,Math.ceil(left/60000))+'분 남음':'')));
    row.classList.add('swipe');row.style.cursor='pointer';row.append(d,w);attachSwipe(row,()=>{cancelPick(o.key);},()=>focusLight(o.key));M.append(row);});}
function cancelPick(k){if(k[0]==='s'){S.botPicks.delete(k);S.botPickAt.delete(k);onPeopleChanged();}else{const u={};u['mypicks/'+S.me+'/'+k]=null;u['likes/'+k+'/'+S.me]=null;db.ref().update(u).catch(()=>{});}toast(nickOf(k)+'님에게 켠 스위치를 껐어요');}
function renderAdm(){renderMyPicks();const A=$('adm');A.textContent='';const adms=others().filter(o=>isAdmirer(o.key));
  adms.forEach(o=>{const b=el('button','item swipe');b.type='button';const d=el('span');d.style.cssText=dotStyle(COL[o.g],14);const w=el('span');w.style.cssText='display:flex;flex-direction:column;gap:2px';w.append(el('span','t',label(o)),el('span','s',desc(o)));b.append(d,w);attachSwipe(b,()=>rejectAdmirer(o.key),()=>focusLight(o.key));A.append(b);});}
function rejectAdmirer(k){if(k[0]==='s'){const b=BOTS.find(x=>x.key===k);if(b)b.picksMe=false;}else db.ref('likes/'+S.me+'/'+k).remove().catch(()=>{});toast(nickOf(k)+'님의 빛을 거절했어요');}
function attachSwipe(e,onSwipe,onTap){let sx=0,sy=0,dx=0,on=false,moved=false,id=null;
  e.addEventListener('pointerdown',ev=>{sx=ev.clientX;sy=ev.clientY;dx=0;on=true;moved=false;id=ev.pointerId;});
  e.addEventListener('pointermove',ev=>{if(!on||ev.pointerId!==id)return;const mx=ev.clientX-sx,my=ev.clientY-sy;if(!moved){if(Math.abs(mx)>10&&Math.abs(mx)>Math.abs(my)){moved=true;e.classList.add('drag');try{e.setPointerCapture(id);}catch(_){}}else if(Math.abs(my)>10){on=false;return;}else return;}dx=mx;e.style.transform='translateX('+dx+'px)';e.style.opacity=String(Math.max(0.15,1-Math.abs(dx)/260));});
  const end=()=>{if(!on)return;on=false;e.classList.remove('drag');if(moved&&Math.abs(dx)>110){e.style.transform='translateX('+(dx>0?1:-1)*480+'px)';e.style.opacity='0';onSwipe();setTimeout(()=>{e.remove();renderLights();},300);}else{e.style.transform='';e.style.opacity='';}};
  e.addEventListener('pointerup',end);e.addEventListener('pointercancel',end);e.addEventListener('click',ev=>{if(moved){ev.preventDefault();moved=false;return;}onTap();});}

/* ---------- 친구 ---------- */
function showFriends(){S.sel=null;$('sheet').classList.remove('on');$('meSheet').classList.remove('on');S.chatFrom='friends';renderFriends();show('friends');}
$('toFriends').onclick=showFriends;$('fBack').onclick=()=>show('room');
async function acceptFriend(k){const u={};u['friends/'+S.me+'/'+k]=true;u['friends/'+k+'/'+S.me]=true;u['freq/'+S.me+'/'+k]=null;try{await db.ref().update(u);toast(nickOf(k)+'님과 친구가 됐어요');}catch(e){toast('수락하지 못했어요. 다시 시도해 주세요');}}
async function declineFriend(k){const u={};u['freq/'+S.me+'/'+k]=null;u['frno/'+k+'/'+S.me]=true;try{await db.ref().update(u);}catch(e){}}
async function cancelReq(k){if(k[0]==='s'){S.botOut.delete(k);onPeopleChanged();return;}const u={};u['freq/'+k+'/'+S.me]=null;u['settings/'+S.me+'/myreq/'+k]=null;try{await db.ref().update(u);}catch(e){}}
async function removeFriend(k){if(k[0]==='s'){S.botFriends.delete(k);delete S.dms[k];saveSampleFriends();Object.values(S.groups).forEach(G=>{if(G.sample&&G.members[k]){delete G.members[k];delete G.subs[k];}});saveSampleGroups();toast(nickOf(k)+'님과 친구를 끊었어요');onPeopleChanged();return;}const u={};u['friends/'+S.me+'/'+k]=null;u['friends/'+k+'/'+S.me]=null;try{await db.ref().update(u);toast(nickOf(k)+'님과 친구를 끊었어요');}catch(e){toast('삭제하지 못했어요');}}
function personRow(k,sub){const o=findO(k);const p=o||S.P[k]||{g:'f'};const row=el('div','item');row.style.cursor='default';const av=el('span','av');const d=avatarEl(k,p.g,40,!o);av.append(d,el('span','st '+(o?'on':'off')));
  const w=el('span');w.style.cssText='display:flex;flex-direction:column;gap:2px;flex:1;min-width:0';w.append(el('span','t',nickOf(k)),el('span',o?'on-dot':'off-dot',sub(o)));row.append(av,w);return {row,w};}
function renderFriends(){
  const I=$('inList');I.textContent='';$('inHead').style.display=S.inReq.size?'block':'none';
  S.inReq.forEach((_,k)=>{const {row}=personRow(k,o=>o?'접속 중 · '+desc(o):'오프라인');row.append(sbtn('수락','solid',()=>acceptFriend(k)),sbtn('거절',null,()=>declineFriend(k)));I.append(row);});
  const O=$('outList');O.textContent='';const outs=[...S.outReq].filter(k=>!isFriend(k)).concat([...S.botOut]);$('outHead').style.display=outs.length?'block':'none';
  outs.forEach(k=>{const {row}=personRow(k,()=>'수락 기다리는 중');row.append(sbtn('취소',null,()=>cancelReq(k)));O.append(row);});
  const F=$('frList');F.textContent='';const fs=allFriends().sort((a,b)=>(online(b)?1:0)-(online(a)?1:0));const on=fs.filter(k=>online(k)).length;
  $('frHead').style.display=fs.length?'flex':'none';$('frEmpty').style.display=(fs.length||S.inReq.size||outs.length)?'none':'block';$('frSum').textContent=fs.length?'접속 중 '+on+'명 · 전체 '+fs.length+'명':'';
  renderCatPanel();
  const cats=catList();const byCat={};fs.forEach(k=>{const c=catOf(k);(byCat[c]=byCat[c]||[]).push(k);});
  const sections=cats.map(c=>[c.id,c.name]).concat([['','분류 없음']]);
  if(cats.length)F.append(el('p','empty2','친구 오른쪽의 ≡ 를 잡고 원하는 분류로 끌어다 놓으세요.'));
  sections.forEach(([cid,name])=>{const ks=byCat[cid]||[];if(!ks.length&&!cats.length)return;
    const box=el('div','col catbox');box.dataset.cat=cid;box.style.gap='8px';
    if(cats.length){const h=el('p','cat',name);h.append(el('span','n',ks.filter(online).length+'/'+ks.length));box.append(h);}
    if(!ks.length&&cats.length){const z=el('div','dropzone','여기로 끌어다 놓기');box.append(z);}
    ks.forEach(k=>box.append(friendRow(k)));F.append(box);});}
function catList(){return Object.entries(S.fcats||{}).filter(([,v])=>v&&v.name).map(([id,v])=>({id,name:cleanName(v.name),o:v.o||0})).sort((a,b)=>a.o-b.o);}
function catOf(k){const c=(S.fmap||{})[k];return c&&(S.fcats||{})[c]?c:'';}
function setCat(k,c){saveSetting('fmap/'+k,c||null);}
function friendRow(k){const wrap=el('div','col');wrap.style.gap='6px';
  const {row,w}=personRow(k,o=>o?'접속 중 · '+(o.place||nearestCity(o.lon,o.lat))+' 근처 · 눌러서 대화':'오프라인 · 눌러서 대화');
  w.style.cursor='pointer';w.setAttribute('role','button');w.tabIndex=0;w.onclick=()=>{S.chatFrom='friends';openChat(k);};
  const n=unreadOf(k);if(n)row.append(el('span','badge',String(n)));
  const cb=el('span','grip','≡');cb.setAttribute('aria-label',nickOf(k)+' 분류 옮기기');cb.setAttribute('role','button');cb.tabIndex=0;attachDrag(cb,wrap,k);
  const cancel=sbtn('취소',null,()=>{});cancel.style.display='none';const del=sbtn('삭제',null,()=>{});
  const reset=()=>{clearTimeout(del._t);S.armed=false;delete del.dataset.arm;del.textContent='삭제';del.classList.remove('danger');cancel.style.display='none';cb.style.display='';};
  del.onclick=()=>{if(del.dataset.arm){S.armed=false;removeFriend(k);setCat(k,null);return;}del.dataset.arm='1';del.textContent='정말 삭제';del.classList.add('danger');cancel.style.display='';cb.style.display='none';S.armed=true;del._t=setTimeout(reset,5000);};cancel.onclick=reset;
  row.append(cancel,del);if(catList().length)row.append(cb);wrap.append(row);
  return wrap;}
function attachDrag(h,wrap,k){let ghost=null,id=null,over=null,ox=0,oy=0,scrollT=null;
  const target=(x,y)=>{if(ghost)ghost.style.display='none';const e=document.elementFromPoint(x,y);if(ghost)ghost.style.display='';return e&&e.closest('.catbox');};
  const clear=()=>{document.querySelectorAll('.catbox.drop').forEach(b=>b.classList.remove('drop'));};
  h.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();id=e.pointerId;try{h.setPointerCapture(id);}catch(_){}S.armed=true;
    const r=wrap.getBoundingClientRect();ox=e.clientX-r.left;oy=e.clientY-r.top;ghost=wrap.cloneNode(true);ghost.classList.add('ghost');ghost.style.width=r.width+'px';ghost.style.left=r.left+'px';ghost.style.top=r.top+'px';document.body.appendChild(ghost);wrap.style.opacity='.3';try{navigator.vibrate&&navigator.vibrate(20);}catch(_){}});
  h.addEventListener('pointermove',e=>{if(e.pointerId!==id||!ghost)return;ghost.style.left=(e.clientX-ox)+'px';ghost.style.top=(e.clientY-oy)+'px';
    const t=target(e.clientX,e.clientY);if(t!==over){clear();over=t;if(t)t.classList.add('drop');}
    clearInterval(scrollT);const sc=$('friends');if(e.clientY<90)scrollT=setInterval(()=>{sc.scrollTop-=12;window.scrollBy(0,-12);},16);else if(e.clientY>innerHeight-90)scrollT=setInterval(()=>{sc.scrollTop+=12;window.scrollBy(0,12);},16);});
  const end=e=>{if(e.pointerId!==id||!ghost)return;clearInterval(scrollT);const t=target(e.clientX,e.clientY);clear();ghost.remove();ghost=null;wrap.style.opacity='';id=null;S.armed=false;
    if(t&&t.dataset.cat!==undefined&&t.dataset.cat!==catOf(k)){const c=t.dataset.cat;setCat(k,c||null);const nm=c?((S.fcats[c]||{}).name||''):'분류 없음';toast(nickOf(k)+'님을 「'+nm+'」으로 옮겼어요');}else renderFriends();};
  h.addEventListener('pointerup',end);h.addEventListener('pointercancel',end);}
function renderCatPanel(){const P=$('catPanel');$('catBtn').textContent=S.catOpen?'닫기':'분류 관리';if(!S.catOpen){P.style.display='none';return;}P.style.display='flex';P.textContent='';
  P.append(el('p','lbl','친구를 이름 붙인 분류로 묶어서 볼 수 있어요. 예: 가족, 회사, 동네'));
  const cats=catList();
  cats.forEach(c=>{const r=el('div','mrow');const inp=el('input','field');inp.value=c.name;inp.maxLength=12;inp.style.cssText='min-height:38px;flex:1;font-size:14px';inp.setAttribute('aria-label',c.name+' 분류 이름');
    inp.onfocus=()=>{S.armed=true;};inp.onblur=()=>{S.armed=false;const v=cleanName(inp.value);if(v&&v!==c.name)saveSetting('fcats/'+c.id+'/name',v);else inp.value=c.name;};
    inp.onkeydown=e=>{if(e.key==='Enter')inp.blur();};
    const d=sbtn('삭제',null,()=>{});armBtn(d,'정말 삭제',()=>{S.armed=false;saveSetting('fcats/'+c.id,null);Object.entries(S.fmap||{}).forEach(([k,v])=>{if(v===c.id)setCat(k,null);});toast('「'+c.name+'」 분류를 지웠어요. 친구는 분류 없음으로 옮겨져요');},'삭제');
    r.append(inp,d);P.append(r);});
  const r=el('div','mrow');const inp=el('input','field');inp.id='catNew';inp.placeholder='새 분류 이름';inp.maxLength=12;inp.style.cssText='min-height:38px;flex:1;font-size:14px';inp.setAttribute('aria-label','새 분류 이름');
  inp.onfocus=()=>{S.armed=true;};inp.onblur=()=>{S.armed=false;};
  const go=()=>{const v=cleanName(inp.value);if(!v){inp.focus();return;}if(cats.length>=12){toast('분류는 12개까지 만들 수 있어요');return;}if(cats.some(c=>c.name===v)){toast('같은 이름의 분류가 있어요');return;}const id=db.ref().push().key;S.armed=false;saveSetting('fcats/'+id,{name:v,o:Date.now()});inp.value='';toast('「'+v+'」 분류를 만들었어요');};
  inp.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();go();}};
  r.append(inp,sbtn('추가','solid',go));P.append(r);}
$('catBtn').onclick=()=>{S.catOpen=!S.catOpen;S.armed=false;renderFriends();};

/* ---------- 별자리 (그룹) ---------- */
function watchGroup(g){if(S.gSubs[g])return;const arr=[];S.groups[g]=S.groups[g]||{id:g,msgs:[],wmsgs:[],unread:0,members:{},subs:{},invites:{},sug:{},no:{}};
  const gref=db.ref('groups/'+g);const fn=s=>{const v=s.val();if(!v){groupGone(g,false);return;}const G=S.groups[g];const prevMembers=G.members||{};
    Object.assign(G,{name:cleanName(v.name)||'별자리',owner:String(v.owner||''),members:v.members||{},subs:v.subs||{},invites:v.invites||{},sug:v.sug||{},no:v.no||{}});
    Object.keys(G.members).forEach(loadProfile);Object.keys(G.sug).forEach(loadProfile);
    if(!G.members[S.me]){groupGone(g,true);return;}
    Object.keys(S.mySug[g]||{}).forEach(x=>{if(G.sug[x])return;if(G.invites[x]||G.members[x])gSys(G,'방장이 승인해서 '+nickOf(x)+'님에게 초대가 갔어요');else if(G.no[x]){gSys(G,'방장이 '+nickOf(x)+'님 초대를 거절했어요');notifyAct(x,'방장이 '+nickOf(x)+'님 초대를 거절했어요','확인',()=>{});}delete S.mySug[g][x];});
    if(G.owner===S.me&&S.ready){Object.keys(G.sug).forEach(x=>{const key=g+':'+x;if(!S['sg'+key]){S['sg'+key]=1;notifyAct(G.sug[x].by,nickOf(G.sug[x].by)+'님이 '+nickOf(x)+'님을 「'+G.name+'」에 초대하려고 해요','확인',()=>openGroup(g));}});}
    if(G.subs[S.me]&&!G._wasSub&&G._loaded&&S.ready)notifyAct(G.owner,'「'+G.name+'」의 부방장이 됐어요','확인',()=>openGroup(g));
    if(G.owner===S.me&&G._loaded&&G._prevOwner&&G._prevOwner!==S.me&&S.ready)notifyAct(G._prevOwner,'「'+G.name+'」의 방장을 이어받았어요','확인',()=>openGroup(g));
    G._wasSub=!!G.subs[S.me];G._prevOwner=G.owner;G._loaded=true;refreshOpen();};
  gref.on('value',fn,()=>groupGone(g,true));arr.push(()=>gref.off('value',fn));
  const mref=db.ref('gmsgs/'+g).orderByChild('at').limitToLast(100);const mf=s=>{const v=s.val();if(!v||typeof v.text!=='string')return;addGMsg(g,{id:s.key,from:String(v.from),text:v.text.slice(0,500),at:v.at||0,sys:v.sys===true});};
  mref.on('child_added',mf,()=>{});arr.push(()=>mref.off('child_added',mf));
  const wref=db.ref('gw/'+g+'/'+S.me).orderByChild('at').limitToLast(50);const wf=s=>{const v=s.val();if(!v||typeof v.text!=='string')return;addGMsg(g,{id:'w'+s.key,from:String(v.from),to:String(v.to||S.me),text:v.text.slice(0,500),at:v.at||0});};
  wref.on('child_added',wf,()=>{});arr.push(()=>wref.off('child_added',wf));
  S.gSubs[g]=arr;}
function unwatchGroup(g){(S.gSubs[g]||[]).forEach(f=>f());delete S.gSubs[g];delete S.groups[g];}
function groupGone(g,kicked){const G=S.groups[g];const name=G&&G.name;unwatchGroup(g);db.ref('mygroups/'+S.me+'/'+g).remove().catch(()=>{});
  if(kicked&&name&&S.ready&&!S['left'+g])notifyAct(S.me,'별자리 「'+name+'」에서 내보내졌어요','확인',()=>{});if(S.gChat===g){S.gChat=null;renderList();show('chats');}refreshOpen();}
function addGMsg(g,m){const G=S.groups[g];if(!G||G.msgs.some(x=>x.id===m.id))return;m.me=m.from===S.me;loadProfile(m.from);G.msgs.push(m);G.msgs.sort((a,b)=>a.at-b.at);if(G.msgs.length>200)G.msgs.shift();
  if(S.gChat===g&&$('gchat').classList.contains('on'))renderGMsgs();else if(!m.me&&m.at>S.startAt&&!m.sys){G.unread=(G.unread||0)+1;notifyAct(m.from,(m.to?'귓말 · ':G.name+' · ')+nickOf(m.from)+': '+m.text.slice(0,30),'열기',()=>openGroup(g));refreshOpenLists();}}
function gSys(G,text){G.msgs.push({id:'l'+Date.now()+Math.random(),sys:true,text,at:Date.now(),local:true});if(S.gChat===G.id&&$('gchat').classList.contains('on'))renderGMsgs();}
function sgKey(){return 'linkon-sample-groups-'+S.me;}
function saveSampleGroups(){if(!S.me)return;try{const arr=Object.values(S.groups).filter(G=>G.sample).map(G=>({id:G.id,name:G.name,owner:G.owner,members:G.members,subs:G.subs,msgs:G.msgs.slice(-150).map(m=>({id:m.id,from:m.from,to:m.to||null,text:m.text,at:m.at,sys:!!m.sys}))}));localStorage.setItem(sgKey(),JSON.stringify(arr));}catch(e){}}
function loadSampleGroups(){try{const arr=JSON.parse(localStorage.getItem(sgKey())||'[]');if(!Array.isArray(arr))return;arr.forEach(x=>{if(!x||typeof x.id!=='string'||!x.id.startsWith('sg'))return;const members={};Object.keys(x.members||{}).forEach(k=>{if(k===S.me||S.botFriends.has(k))members[k]=x.members[k];});if(!members[S.me])return;
  S.groups[x.id]={id:x.id,name:cleanName(x.name)||'별자리',owner:S.me,members,subs:Object.fromEntries(Object.keys(x.subs||{}).filter(k=>members[k]).map(k=>[k,x.subs[k]])),invites:{},sug:{},no:{},unread:0,sample:true,_loaded:true,msgs:(x.msgs||[]).filter(m=>m&&typeof m.text==='string').map(m=>({id:String(m.id),from:String(m.from),to:m.to||null,text:m.text.slice(0,500),at:m.at||0,sys:!!m.sys,me:m.from===S.me}))};});}catch(e){}}
function createSampleGroup(name,keys){const id='sg'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);const now=Date.now();const members={};members[S.me]=now;keys.forEach((k,i)=>members[k]=now+i+1);
  const G={id,name,owner:S.me,members,subs:{},invites:{},sug:{},no:{},unread:0,sample:true,_loaded:true,msgs:[]};S.groups[id]=G;gSys(G,'샘플 별자리가 만들어졌어요. 샘플 친구들이 자동으로 짧게 답해요. @아이디 로 쓰면 그 사람에게만 귓말이 가요.');saveSampleGroups();return G;}
function sampleGroupReply(G,msg){const bots=memberKeys(G).filter(k=>k[0]==='s');if(!bots.length)return;const who=msg.to?(bots.includes(msg.to)?msg.to:null):bots[Math.floor(Math.random()*bots.length)];if(!who)return;
  setTimeout(()=>{if(!S.groups[G.id]||!G.members[who])return;addGMsg(G.id,{id:'b'+Date.now()+Math.random(),from:who,to:msg.to?S.me:null,text:REPLIES[Math.floor(Math.random()*REPLIES.length)],at:Date.now()});saveSampleGroups();},1200+Math.random()*2200);}
function postSys(g,text){if(S.groups[g]&&S.groups[g].sample){gSys(S.groups[g],text);saveSampleGroups();return Promise.resolve();}return db.ref('gmsgs/'+g).push({from:S.me,text,at:TS,sys:true}).catch(()=>{});}
function memberKeys(G){return Object.keys(G.members||{}).sort((a,b)=>(G.members[a]||0)-(G.members[b]||0));}
function isSub(G,k){return !!(G.subs&&G.subs[k]);}
function canKick(G,k){return k!==G.owner&&!isSub(G,k)&&k!==S.me&&(G.owner===S.me||isSub(G,S.me));}
function gInvite(G,k){const u={};u['groups/'+G.id+'/invites/'+k]=true;u['groups/'+G.id+'/sug/'+k]=null;u['ginv/'+k+'/'+G.id]={name:G.name,from:S.me,at:TS};return db.ref().update(u);}

function renderGroups(){const L=$('gList');L.textContent='';const gs=Object.values(S.groups).filter(G=>G.name);secHead('gHead','그룹 대화 · 별자리',gs.length);
  gs.forEach(G=>{const n=Object.keys(G.members).length;const b=el('button','item');b.type='button';const d=el('span');const sz=Math.round(8+4*Math.sqrt(n));d.style.cssText='display:inline-block;flex:none;border-radius:50%;width:'+sz+'px;height:'+sz+'px;background:#fff;box-shadow:0 0 16px 4px #ffffff55';
    const w=el('span');w.style.cssText='display:flex;flex-direction:column;gap:2px;min-width:0;flex:1';const t=el('span','t',G.name);t.append(el('span','tag','그룹 '+n));if(G.owner===S.me)t.append(el('span','tag ow','방장'));else if(isSub(G,S.me))t.append(el('span','tag ow','부방장'));if(G.sample)t.append(el('span','tag','샘플'));
    const onl=memberKeys(G).filter(k=>k===S.me||online(k)).length;const last=G.msgs.filter(m=>!m.local).slice(-1)[0];const s2=el('span','s',last?(last.sys?last.text:nickOf(last.from)+': '+last.text):'빛 '+n+'개 · 지금 '+onl+'명');s2.style.cssText='white-space:nowrap;overflow:hidden;text-overflow:ellipsis';w.append(t,s2);b.append(d,w);
    if(G.unread)b.append(el('span','badge',String(G.unread)));b.onclick=()=>openGroup(G.id);L.append(b);});
  const I=$('ginvList');I.textContent='';const ivs=Object.values(S.ginv);$('ginvHead').style.display=ivs.length?'block':'none';
  ivs.forEach(iv=>{const row=el('div','item');row.style.cursor='default';const w=el('span');w.style.cssText='display:flex;flex-direction:column;gap:2px;flex:1;min-width:0';w.append(el('span','t','「'+iv.name+'」'),el('span','s',nickOf(iv.from)+'님의 초대'));row.append(w,sbtn('참여','solid',()=>acceptGInvite(iv)),sbtn('거절',null,()=>declineGInvite(iv)));I.append(row);});
  $('gEmpty').style.display=(gs.length||ivs.length)?'none':'block';$('gNewBtn').style.display=gs.length>=GMAX?'none':'';}
async function acceptGInvite(iv){if(Object.keys(S.groups).length>=GMAX){toast('별자리는 3개까지 들어갈 수 있어요');return;}const u={};u['groups/'+iv.id+'/members/'+S.me]=TS;u['groups/'+iv.id+'/invites/'+S.me]=null;u['ginv/'+S.me+'/'+iv.id]=null;u['mygroups/'+S.me+'/'+iv.id]=true;
  try{await db.ref().update(u);postSys(iv.id,label(S.prof)+'님이 들어왔어요');toast(iv.name+'에 들어왔어요');}catch(e){toast('들어가지 못했어요. 초대가 취소됐을 수 있어요');db.ref('ginv/'+S.me+'/'+iv.id).remove().catch(()=>{});}}
async function declineGInvite(iv){const u={};u['groups/'+iv.id+'/invites/'+S.me]=null;u['ginv/'+S.me+'/'+iv.id]=null;try{await db.ref().update(u);}catch(e){db.ref('ginv/'+S.me+'/'+iv.id).remove().catch(()=>{});}}

let gnPick=new Set();
$('gNewBtn').onclick=()=>{if(Object.keys(S.groups).length>=GMAX){toast('별자리는 3개까지 들어갈 수 있어요');return;}gnPick=new Set();$('gName').value='';$('gnErr').style.display='none';renderGNew();show('gnew');};
$('gnBack').onclick=()=>{renderList();show('chats');};$('gName').oninput=()=>{$('gnErr').style.display='none';};
function renderGNew(){const C=$('gnCands');C.textContent='';const cs=allFriends();
  if(!cs.length){C.append(el('p','empty2','함께할 친구가 아직 없어요. 이어진 빛과 친구를 맺은 뒤 다시 와 주세요. 샘플 빛과 맺은 친구도 여기에 나와요.'));return;}
  cs.forEach(k=>{const lab=el('label','item');const cb=el('input');cb.type='checkbox';cb.style.cssText='width:20px;height:20px;accent-color:#FFB86B';cb.checked=gnPick.has(k);cb.onchange=()=>{if(cb.checked){if(gnPick.size>=MMAX-1){cb.checked=false;return;}gnPick.add(k);}else gnPick.delete(k);$('gnErr').style.display='none';};
    const o=findO(k);const p=o||S.P[k]||{g:'f'};const d=el('span');d.style.cssText=dotStyle(COL[p.g],14,!o);const w=el('span');w.style.cssText='display:flex;flex-direction:column;gap:2px';w.append(el('span','t',nickOf(k)),el('span','s',k[0]==='s'?'샘플 친구':o?'접속 중':'오프라인 · 다음에 접속하면 초대를 볼 수 있어요'));lab.append(cb,d,w);C.append(lab);});
  C.append(el('p','empty2','샘플 친구와 실제 친구는 한 별자리에 같이 넣을 수 없어요.'));}
$('gnMake').onclick=async()=>{const err=t=>{$('gnErr').textContent=t;$('gnErr').style.display='block';};const n=cleanName($('gName').value);if(!n)return err('별자리 이름을 써 주세요');if(gnPick.size<2)return err('함께할 친구를 2명 이상 골라 주세요');
  const picks=[...gnPick];const nb=picks.filter(k=>k[0]==='s').length;if(nb&&nb<picks.length)return err('샘플 친구와 실제 친구는 한 별자리에 같이 넣을 수 없어요');
  if(nb){const G=createSampleGroup(n,picks);setTimeout(()=>openGroup(G.id),100);return;}
  const g=db.ref('groups').push().key;const u={};u['groups/'+g+'/name']=n;u['groups/'+g+'/owner']=S.me;u['groups/'+g+'/created']=TS;u['groups/'+g+'/members/'+S.me]=TS;u['mygroups/'+S.me+'/'+g]=true;
  gnPick.forEach(k=>{u['groups/'+g+'/invites/'+k]=true;u['ginv/'+k+'/'+g]={name:n,from:S.me,at:TS};});
  $('gnMake').disabled=true;try{await db.ref().update(u);await postSys(g,'별자리가 만들어졌어요. @아이디 로 쓰면 그 사람에게만 귓말이 가요.');watchGroup(g);setTimeout(()=>openGroup(g),300);}catch(e){err('만들지 못했어요. 다시 시도해 주세요');}$('gnMake').disabled=false;};

function openGroup(g){const G=S.groups[g];if(!G)return;S.gChat=g;G.unread=0;S.atTo=null;S.gOpen=null;$('gIn').value='';$('gerr').style.display='none';$('gcPanel').dataset.mode='';renderGPanels();renderGMsgs();renderAt();show('gchat');}
$('gcBack').onclick=()=>{S.gChat=null;renderList();show('chats');};
$('gcMembers').onclick=()=>{const P=$('gcPanel');S.gOpen=null;P.dataset.mode=P.dataset.mode==='members'?'':'members';renderGPanels();};
$('gcInvite').onclick=()=>{const P=$('gcPanel');P.dataset.mode=P.dataset.mode==='invite'?'':'invite';renderGPanels();};
function renderGPanels(){const G=S.groups[S.gChat];if(!G||!G.name)return;const mk=memberKeys(G);const onl=mk.filter(k=>k===S.me||online(k)).length;
  $('gcTitle').textContent=G.name;$('gcSub').textContent='빛 '+mk.length+'개 · 지금 '+onl+'명'+(G.owner===S.me?' · 내가 방장':isSub(G,S.me)?' · 내가 부방장':'');
  const A=$('gcApprove');A.textContent='';const sug=Object.keys(G.sug||{});
  if(G.owner===S.me&&sug.length){A.append(el('p','lbl','방장 승인 요청'));sug.forEach(x=>{const r=el('div','mrow');r.append(el('span','t',nickOf(G.sug[x].by)+'님이 '+nickOf(x)+'님을 초대하려고 해요'),
      sbtn('승인','solid',()=>gInvite(G,x).then(()=>postSys(G.id,nickOf(x)+'님에게 초대를 보냈어요')).catch(()=>toast('승인하지 못했어요'))),
      sbtn('거절',null,()=>{const u={};u['groups/'+G.id+'/sug/'+x]=null;u['groups/'+G.id+'/no/'+x]={by:G.sug[x].by,at:TS};db.ref().update(u).catch(()=>{});}));A.append(r);});A.style.display='flex';}else A.style.display='none';
  const P=$('gcPanel');const mode=P.dataset.mode;P.textContent='';if(!mode){P.style.display='none';return;}P.style.display='flex';
  if(mode==='members'){
    mk.forEach(k=>{const on=k===S.me||online(k);const p=findO(k)||S.P[k]||{g:'f'};const av=el('span','av');const d=avatarEl(k,k===S.me?S.prof.g:p.g,32,!on);av.append(d,el('span','st '+(on?'on':'off')));
      const t=el('span','t',nickOf(k)+(k===S.me?' (나)':''));if(k===G.owner)t.append(el('span','tag ow','방장'));else if(isSub(G,k)){const s2=el('span','tag fr','부방장');t.append(s2);}
      const acts=[];
      if(k!==S.me)acts.push(sbtn('귓말',null,()=>{S.gOpen=null;setAt(k);P.dataset.mode='';renderGPanels();$('gIn').focus();}));
      if(G.owner===S.me&&k!==S.me)acts.push(sbtn(isSub(G,k)?'부방장 해제':'부방장 지정',null,()=>{if(!isSub(G,k)&&Object.keys(G.subs||{}).length>=3){toast('부방장은 3명까지 정할 수 있어요');return;}
        if(G.sample){const was=isSub(G,k);if(was)delete G.subs[k];else G.subs[k]=Date.now();postSys(G.id,was?nickOf(k)+'님의 부방장을 해제했어요':nickOf(k)+'님을 부방장으로 정했어요');renderGPanels();return;}db.ref('groups/'+G.id+'/subs/'+k).set(isSub(G,k)?null:TS).then(()=>postSys(G.id,isSub(G,k)?nickOf(k)+'님의 부방장을 해제했어요':nickOf(k)+'님을 부방장으로 정했어요')).catch(()=>toast('바꾸지 못했어요'));}));
      if(canKick(G,k)){const kb=sbtn('내보내기',null,()=>{});armBtn(kb,'정말 내보내기',()=>{S.armed=false;S.gOpen=null;const who=nickOf(k);if(G.sample){delete G.members[k];delete G.subs[k];postSys(G.id,'방장 '+label(S.prof)+'님이 '+who+'님을 내보냈어요');toast(who+'님을 내보냈어요');renderGPanels();return;}db.ref('groups/'+G.id+'/members/'+k).remove().then(()=>{postSys(G.id,(G.owner===S.me?'방장 ':'부방장 ')+label(S.prof)+'님이 '+who+'님을 내보냈어요');toast(who+'님을 내보냈어요');}).catch(()=>toast('내보내지 못했어요'));},'내보내기');acts.push(kb);}
      const rb=el('button','mrow');rb.type='button';rb.style.cssText='width:100%;background:transparent;border:0;color:var(--ink);text-align:left;padding:0;cursor:'+(acts.length?'pointer':'default');rb.append(av,t,el('span',null,acts.length?(S.gOpen===k?'▴':'▾'):''));rb.lastChild.style.cssText='color:var(--dim);font-size:13px';rb.setAttribute('aria-expanded',S.gOpen===k);
      rb.onclick=()=>{if(!acts.length)return;S.gOpen=S.gOpen===k?null:k;S.armed=false;renderGPanels();};
      const wrap=el('div');wrap.style.cssText='display:flex;flex-direction:column;gap:6px;'+(S.gOpen===k?'background:#1A1A1F;border-radius:12px;padding:6px 8px 10px;margin:0 -8px':'');wrap.append(rb);
      if(S.gOpen===k&&acts.length){const ar=el('div');ar.style.cssText='display:flex;gap:6px;flex-wrap:wrap;padding-left:22px';acts.forEach(x=>ar.append(x));wrap.append(ar);}P.append(wrap);});
    Object.keys(G.invites||{}).forEach(k=>{P.append(el('div','mrow',nickOf(k)+' · 초대 수락 전'));P.lastChild.style.color='var(--mute)';P.lastChild.style.fontSize='14px';});
    Object.keys(G.sug||{}).forEach(k=>{if(G.owner!==S.me){P.append(el('div','mrow',nickOf(k)+' · 방장 승인 기다리는 중'));P.lastChild.style.color='var(--mute)';P.lastChild.style.fontSize='14px';}});
    const lv=sbtn('별자리 나가기',null,()=>{});lv.style.alignSelf='flex-start';lv.style.marginTop='4px';armBtn(lv,'정말 나가기',()=>{S.armed=false;leaveGroup(G);},'별자리 나가기');P.append(lv);
  }else{
    P.append(el('p','lbl',G.owner===S.me?'초대할 친구 · 방장이라 바로 초대돼요':'초대할 친구 · 방장이 승인하면 초대가 가요'));
    const cs=(G.sample?[...S.botFriends]:[...S.friends]).filter(k=>!G.members[k]&&!G.invites[k]);
    if(!cs.length)P.append(el('p','empty2','초대할 수 있는 친구가 없어요.'));
    if(mk.length+Object.keys(G.invites||{}).length>=MMAX)P.append(el('p','empty2','한 별자리에는 8명까지 들어갈 수 있어요.'));
    else cs.forEach(k=>{const r=el('div','mrow');const p=findO(k)||S.P[k]||{g:'f'};const d=el('span');d.style.cssText=dotStyle(COL[p.g],12,!online(k));r.append(d,el('span','t',nickOf(k)));
      if(G.sug[k])r.append(el('span','off-dot','승인 대기'));else if(G.no&&G.no[k]&&G.owner!==S.me)r.append(el('span','off-dot','방장이 거절함'));
      else r.append(sbtn(G.owner===S.me?'초대':'초대 요청','solid',()=>{if(G.sample){G.members[k]=Date.now();postSys(G.id,nickOf(k)+'님이 들어왔어요 (샘플)');renderGPanels();return;}if(G.owner===S.me){gInvite(G,k).then(()=>postSys(G.id,nickOf(k)+'님에게 초대를 보냈어요')).catch(()=>toast('초대하지 못했어요'));}else{S.mySug[G.id]=S.mySug[G.id]||{};S.mySug[G.id][k]=1;db.ref('groups/'+G.id+'/sug/'+k).set({by:S.me,at:TS}).then(()=>{gSys(G,nickOf(k)+'님 초대를 방장에게 요청했어요');}).catch(()=>toast('요청하지 못했어요'));}}));P.append(r);});}
}
async function leaveGroup(G){const g=G.id;if(G.sample){delete S.groups[g];saveSampleGroups();S.gChat=null;renderList();show('chats');toast(G.name+'에서 나왔어요');return;}S['left'+g]=1;const me=S.me;const others2=memberKeys(G).filter(k=>k!==me);
  try{
    if(G.owner===me){
      if(!others2.length){await db.ref('groups/'+g).remove();await db.ref('mygroups/'+me+'/'+g).remove();}
      else{const subs=Object.keys(G.subs||{}).filter(k=>k!==me&&G.members[k]).sort((a,b)=>G.subs[a]-G.subs[b]);const succ=subs[0]||others2[0];
        await postSys(g,'방장 '+label(S.prof)+'님이 나가서 '+nickOf(succ)+'님이 방장을 이어받았어요');
        const u={};u['groups/'+g+'/owner']=succ;u['groups/'+g+'/subs/'+succ]=null;u['groups/'+g+'/members/'+me]=null;u['mygroups/'+me+'/'+g]=null;await db.ref().update(u);}
    }else{await postSys(g,label(S.prof)+'님이 별자리를 나갔어요');const u={};if(isSub(G,me))u['groups/'+g+'/subs/'+me]=null;u['groups/'+g+'/members/'+me]=null;u['mygroups/'+me+'/'+g]=null;await db.ref().update(u);}
    unwatchGroup(g);S.gChat=null;renderList();show('chats');toast(G.name+'에서 나왔어요');
  }catch(e){delete S['left'+g];toast('나가지 못했어요. 다시 시도해 주세요');}}
const WCOL=['#C3B5FF','#F4A6C8','#8EE3C8','#9CCBFF','#C7E68A','#FFB4A0','#F6D58A','#E0B3FF'];
function wColor(k){return WCOL[hash(String(k))%WCOL.length];}
function renderGMsgs(){const G=S.groups[S.gChat];const M=$('gmsgs');M.textContent='';if(!G)return;
  G.msgs.forEach(m=>{if(m.sys){M.append(el('p','sys',m.text));return;}
    const wc=m.to?wColor(m.me?m.to:m.from):null;const bb=el('div','b '+(m.me?'me':'them')+(m.to?' w':''),m.text);if(wc){bb.style.color=wc;bb.style.borderColor=wc+'99';}
    if(m.me){if(m.to){const w=el('p','who r w','귓말 → '+nickOf(m.to));w.style.color=wc;M.append(w);}M.append(bb);return;}
    M.append(themRow(m.from,m.to?nickOf(m.from)+'님의 귓말':nickOf(m.from),bb,true,wc));});M.scrollTop=M.scrollHeight;}
function plainNick(k){return (findO(k)||S.P[k]||{}).nick||'';}
function setAt(k){S.atTo=k;$('gIn').value='@'+plainNick(k)+' ';renderAt();}
function renderAt(){const bar=$('atBar');bar.textContent='';const G=S.groups[S.gChat];const m=$('gIn').value.match(/^@(\S*)$/);if(!G||!m){bar.style.display='none';return;}
  const ms=memberKeys(G).filter(k=>k!==S.me&&plainNick(k).startsWith(m[1]));if(!ms.length){bar.style.display='none';return;}
  ms.forEach(k=>{const c=el('button','chip','@'+nickOf(k));c.style.color=wColor(k);c.style.borderColor=wColor(k)+'88';c.type='button';c.onclick=()=>{setAt(k);$('gIn').focus();};bar.append(c);});bar.style.display='flex';}
$('gIn').oninput=()=>{$('gerr').style.display='none';if(S.atTo&&!$('gIn').value.startsWith('@'+plainNick(S.atTo)+' '))S.atTo=null;renderAt();};
$('gcompose').onsubmit=async e=>{e.preventDefault();const G=S.groups[S.gChat];if(!G)return;const err=t=>{$('gerr').textContent=t;$('gerr').style.display='block';};
  const v=$('gIn').value.trim();if(!v)return err('한마디를 먼저 써 주세요');let to=null,text=v;
  if(v.startsWith('@')){const mm=v.match(/^@(\S+)\s+([\s\S]+)$/);if(!mm)return err('@아이디 뒤에 한 칸 띄우고 할 말을 써 주세요');
    if(S.atTo&&plainNick(S.atTo)===mm[1])to=S.atTo;else{const hits=memberKeys(G).filter(k=>k!==S.me&&plainNick(k)===mm[1]);if(!hits.length)return err('@'+mm[1]+' 은(는) 이 별자리에 없어요');to=hits[0];}
    text=mm[2].trim();}
  if(G.sample){const m={id:'m'+Date.now()+Math.random(),from:S.me,to,text:text.slice(0,500),at:Date.now()};addGMsg(G.id,m);saveSampleGroups();$('gIn').value='';S.atTo=null;renderAt();sampleGroupReply(G,m);return;}
  try{if(to){const d={from:S.me,to,text:text.slice(0,500),at:TS};const u={};const id=db.ref().push().key;u['gw/'+G.id+'/'+to+'/'+id]=d;u['gw/'+G.id+'/'+S.me+'/'+id]=d;await db.ref().update(u);}
    else await db.ref('gmsgs/'+G.id).push({from:S.me,text:text.slice(0,500),at:TS});
    $('gIn').value='';S.atTo=null;renderAt();}catch(x){err('보내지 못했어요. 다시 시도해 주세요');}};

})();
