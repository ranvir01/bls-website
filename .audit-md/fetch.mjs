import fs from 'node:fs';

const urls = fs.readFileSync('/tmp/claude-0/-home-user-bls-website/4a06ccff-589a-5f4b-bb94-24ba0249075c/scratchpad/urls.txt','utf8').trim().split('\n');
const out = [];
function attrs(tag){const o={};for(const m of tag.matchAll(/([a-zA-Z:_-]+)\s*=\s*"([^"]*)"/g))o[m[1]]=m[2];return o;}
function dec(s){return s?s.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#x27;|&#39;/g,"'").replace(/&amp;/g,'&'):s;}
for(const u of urls){
  const path = new URL(u).pathname || '/';
  const local = 'http://localhost:3000'+ (path==='/'?'/':path);
  const res = await fetch(local, {redirect:'manual'});
  const html = await res.text();
  const rec = {url:u, path, local, status:res.status, loc:res.headers.get('location')};
  rec.appError = /Application error/i.test(html);
  const t = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  rec.title = t?dec(t[1].trim()):null;
  rec.metas = {};
  rec.og = {}; rec.tw = {};
  for(const m of html.matchAll(/<meta\b[^>]*>/gi)){
    const a = attrs(m[0]);
    const key = a.name||a.property||a.itemprop;
    if(!key) continue;
    const v = dec(a.content||'');
    if(key.startsWith('og:')) (rec.og[key] ??= []).push(v);
    else if(key.startsWith('twitter:')) (rec.tw[key] ??= []).push(v);
    else (rec.metas[key] ??= []).push(v);
  }
  rec.canonical = [];
  for(const m of html.matchAll(/<link\b[^>]*>/gi)){
    const a = attrs(m[0]);
    if((a.rel||'').toLowerCase()==='canonical') rec.canonical.push(dec(a.href||''));
  }
  rec.h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(x=>dec(x[1].replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim()));
  out.push(rec);
}
fs.writeFileSync('/home/user/bls-website/.audit-md/meta.json', JSON.stringify(out,null,1));
console.log('fetched', out.length, 'errors:', out.filter(r=>r.status!==200||r.appError).length);
