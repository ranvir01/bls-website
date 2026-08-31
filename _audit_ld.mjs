import fs from 'node:fs';
const urls = fs.readFileSync('/tmp/claude-0/-home-user-bls-website/4a06ccff-589a-5f4b-bb94-24ba0249075c/scratchpad/urls.txt','utf8').trim().split('\n');
const out = {};
const errs = [];
for (const u of urls) {
  const path = u.replace('https://bluelandscapingservices.com','') || '/';
  const res = await fetch('http://localhost:3000' + path);
  const html = await res.text();
  if (html.includes('Application error')) errs.push([path,'APP ERROR']);
  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
  const parsed = [];
  for (const b of blocks) {
    try { parsed.push(JSON.parse(b.replace(/\\u003c/g,'<'))); }
    catch(e){ errs.push([path,'PARSE FAIL: '+e.message]); }
  }
  out[path] = {status: res.status, count: blocks.length, ld: parsed, h1: [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map(m=>m[1].replace(/<[^>]*>/g,'').trim()), html};
}
fs.writeFileSync('/tmp/claude-0/-home-user-bls-website/4a06ccff-589a-5f4b-bb94-24ba0249075c/scratchpad/ld.json', JSON.stringify(Object.fromEntries(Object.entries(out).map(([k,v])=>[k,{status:v.status,count:v.count,ld:v.ld,h1:v.h1}])),null,1));
fs.writeFileSync('/tmp/claude-0/-home-user-bls-website/4a06ccff-589a-5f4b-bb94-24ba0249075c/scratchpad/pages.json', JSON.stringify(Object.fromEntries(Object.entries(out).map(([k,v])=>[k,v.html]))));
console.log('pages', urls.length, 'errors', JSON.stringify(errs));
const counts={}; for(const [p,v] of Object.entries(out)) counts[v.count]=(counts[v.count]||0)+1;
console.log('ld block counts', counts);
