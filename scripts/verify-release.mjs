import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('dist');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const files=walk(root);
for(const required of ['.htaccess','api/.htaccess','api/enquiry.php','404.html','sitemap-index.xml','robots.txt','images/social-share.jpg','privacy/index.html']) assert.ok(fs.existsSync(path.join(root,required)),required);
for(const file of files){
 const relative=path.relative(root,file).replaceAll('\\','/');
 assert.ok(!/(^|\/)(\.git|\.env[^/]*|node_modules|tests|\.ihire-enquiry)(\/|$)/.test(relative),relative);
 if(file.endsWith('.html')){
  const html=fs.readFileSync(file,'utf8');
  assert.ok(html.includes('https://www.ihireglobal.com/images/social-share.jpg'),relative+' share image');
  assert.ok(!/localhost|127\.0\.0\.1/.test(html),relative+' local URL');
  assert.ok(!/awaiting approval|Layout preview:|An approved customer quote|Customer name/.test(html),relative+' draft testimonial');
  for(const [,url] of html.matchAll(/(?:src|href)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)){
   if(url.startsWith('//')) continue;
   const target=path.join(root,decodeURIComponent(url));
   assert.ok(fs.existsSync(target),relative+' missing '+url);
  }
 }
}
const policy=fs.readFileSync(path.join(root,'privacy/index.html'),'utf8');
assert.equal((policy.match(/iTelco/g)||[]).length,1);
const form=fs.readFileSync(path.join(root,'hire-talent/index.html'),'utf8');
assert.ok(form.includes('iHire Global uses these details'));
assert.ok(!form.includes('iTelco'));
const apache=fs.readFileSync(path.join(root,'.htaccess'),'utf8');
assert.ok(apache.includes('ErrorDocument 404 /404.html'));
assert.ok(apache.includes('R=308'));
console.log('Release verified: '+files.length+' files; local assets, public metadata, privacy identity and required hosting files present.');
console.log('Apache redirects and PHP execution still require checks on the actual host.');
