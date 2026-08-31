import fs from 'node:fs';
const d = JSON.parse(fs.readFileSync('/tmp/claude-0/-home-user-bls-website/4a06ccff-589a-5f4b-bb94-24ba0249075c/scratchpad/ld.json','utf8'));
console.log('--- pages missing GeneralContractor:');
for (const [p,v] of Object.entries(d)) {
  const ts = v.ld.flatMap(l=>l['@graph']||[l]).map(n=>n['@type']);
  if(!ts.includes('GeneralContractor')) console.log(p, JSON.stringify(ts));
  }
console.log('--- pages missing BreadcrumbList:');
for (const [p,v] of Object.entries(d)) {
  const ts = v.ld.flatMap(l=>l['@graph']||[l]).map(n=>n['@type']);
  if(!ts.includes('BreadcrumbList')) console.log(p, JSON.stringify(ts));
}
console.log('\n=== HOME full ===');
console.log(JSON.stringify(d['/'].ld,null,1).slice(0,6000));
