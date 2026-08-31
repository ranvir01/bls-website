import fs from 'node:fs';
const d = JSON.parse(fs.readFileSync('/tmp/claude-0/-home-user-bls-website/4a06ccff-589a-5f4b-bb94-24ba0249075c/scratchpad/ld.json','utf8'));
const typeSet = {};
function nodes(ld){ return ld['@graph'] ? ld['@graph'] : [ld]; }
for (const [p,v] of Object.entries(d)) {
  for (const ld of v.ld) for (const n of nodes(ld)) {
    const t = Array.isArray(n['@type'])?n['@type'].join('+'):n['@type'];
    (typeSet[t] ||= new Set()).add(p);
  }
}
for (const [t,s] of Object.entries(typeSet)) console.log(t, s.size, [...s].slice(0,3).join(' '));
// search for rating/review
const bad=[];
const walk=(o,path,p)=>{ if(o&&typeof o==='object'){ for(const [k,vv] of Object.entries(o)){ if(/rating|review|ratingValue|aggregate/i.test(k)) bad.push([p,path+'.'+k,JSON.stringify(vv).slice(0,200)]); walk(vv,path+'.'+k,p);} } };
for (const [p,v] of Object.entries(d)) v.ld.forEach((ld,i)=>walk(ld,'ld'+i,p));
console.log('\nRATING/REVIEW HITS:', bad.length);
bad.slice(0,20).forEach(b=>console.log(b.join(' | ')));
