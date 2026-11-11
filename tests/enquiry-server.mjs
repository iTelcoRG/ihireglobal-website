import {spawn} from 'node:child_process';
import {createServer} from 'node:net';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = fs.mkdtempSync(path.resolve('artifacts/enquiry-test-'));
fs.mkdirSync(path.join(root,'public/api'),{recursive:true});
fs.copyFileSync('public/api/enquiry.php',path.join(root,'public/api/enquiry.php'));
const messages=[];
let accept=true;
function part(message,type){
 const boundary=message.match(/boundary="([^"]+)"/)?.[1];
 assert.ok(boundary,'multipart boundary');
 const section=message.split('--'+boundary).find(item=>item.includes('Content-Type: '+type+';'));
 assert.ok(section,'missing '+type+' part');
 return Buffer.from(section.split('\r\n\r\n')[1].replace(/\r\n/g,''),'base64').toString('utf8');
}

const smtp=createServer(socket=>{
 socket.setEncoding('utf8'); socket.write('220 test SMTP\r\n');
 let buffer='',data=false,body='';
 socket.on('data',chunk=>{
  buffer+=chunk;
  let index;
  while((index=buffer.indexOf('\r\n'))>=0){
   const line=buffer.slice(0,index); buffer=buffer.slice(index+2);
   if(data){if(line==='.') {messages.push(body);body='';data=false;socket.write('250 accepted\r\n');}else body+=line+'\r\n';continue;}
   if(/^DATA/i.test(line)){if(accept){data=true;socket.write('354 go ahead\r\n');}else socket.write('550 test rejection\r\n');}
   else if(/^QUIT/i.test(line)){socket.end('221 bye\r\n');}
   else socket.write('250 OK\r\n');
  }
 });
});
await new Promise(r=>smtp.listen(2526,'127.0.0.1',r));
const php=spawn('php',['-d','SMTP=127.0.0.1','-d','smtp_port=2526','-d','sendmail_from=enquiries@ihireglobal.com','-S','127.0.0.1:4325','-t',path.join(root,'public')],{stdio:'ignore'});
const url='http://127.0.0.1:4325/api/enquiry.php';
const valid={contact_name:'Test Person',company_name:'Example Test',work_email:'test@example.com',phone:'',country:'NZ',role_title:'TEST ONLY',headcount:'2',responsibilities:'Test responsibilities',required_skills:'Test skills',required_experience:'',working_hours:'',start_timeframe:'exploring',preferred_location:'recommendation',equipment_requirements:['headset'],connectivity_requirements:'',notes:'TEST ONLY — no recruitment action',website:''};
const post=(data,headers={})=>fetch(url,{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://ihireglobal.com',...headers},body:JSON.stringify(data)});
try{
 for(let i=0;i<40;i++){try{await fetch(url);break;}catch{await new Promise(r=>setTimeout(r,100));}}
 const token=async()=>(await (await fetch(url)).json()).token;
 assert.equal((await post(valid)).status,403);
 assert.equal((await post({...valid,token:await token()},{Origin:'https://attacker.example'})).status,403);
 for(const fields of [{work_email:'x@example.com\r\nBcc: x@other.com'},{headcount:'1.5'},{country:'XX'},{required_skills:' '},{equipment_requirements:['unknown']},{website:'spam'}]){
  assert.ok([400,422].includes((await post({...valid,...fields,token:await token()})).status));
 }
 assert.equal(messages.length,0);
 const firstToken=await token();
 const first=await (await post({...valid,token:firstToken})).json();
 assert.equal(first.ok,true);
 const duplicate=await (await post({...valid,token:firstToken})).json();
 assert.equal(duplicate.reference,first.reference);
 assert.equal(messages.length,1);
 assert.match(messages[0],/To: enquiries@ihireglobal.com/i);
 assert.match(messages[0],/Reply-To: test@example.com/i);
 assert.match(part(messages[0],'text/plain'),/Equipment \/ infrastructure: Headset/);
 const staffingHtml=part(messages[0],'text/html');
 assert.match(staffingHtml,/New staffing enquiry/);
 assert.match(staffingHtml,/Skills &amp; working arrangements/);
 assert.match(staffingHtml,/mailto:test@example.com/);
 assert.doesNotMatch(staffingHtml,/Not specified/);
 fs.mkdirSync('artifacts/email-preview',{recursive:true});
 fs.writeFileSync('artifacts/email-preview/staffing.html',staffingHtml);
 const chat={enquiry_type:'chat',contact_name:'Chat Test',work_email:'chat@example.com',message:'TEST ONLY: please discuss options\n<script>alert(1)</script> & details',website:''};
 for(const fields of [{message:' '},{work_email:'not-an-email'},{enquiry_type:'unknown'},{message:['bad']}]){
  assert.equal((await post({...chat,...fields,token:await token()})).status,422);
 }
 const chatToken=await token();
 const chatResponse=await (await post({...chat,token:chatToken})).json();
 assert.equal(chatResponse.ok,true);
 assert.equal(messages.length,2);
 assert.match(messages[1],/Subject: iHire Global chat request/);
 assert.match(messages[1],/Reply-To: chat@example.com/);
 const chatBody=part(messages[1],'text/plain');
 assert.match(chatBody,/Enquiry type: Chat request/);
 assert.match(chatBody,/Message: TEST ONLY: please discuss options/);
 assert.doesNotMatch(chatBody,/Number of people required|Required skills/);
 const chatHtml=part(messages[1],'text/html');
 assert.match(chatHtml,/New chat request/);
 assert.match(chatHtml,/&lt;script&gt;alert\(1\)&lt;\/script&gt; &amp; details/);
 assert.doesNotMatch(chatHtml,/<script>/);
 assert.match(chatHtml,/<br>/);
 fs.writeFileSync('artifacts/email-preview/chat.html',chatHtml);
 assert.equal((await (await post({...chat,token:chatToken})).json()).reference,chatResponse.reference);
 assert.equal(messages.length,2);
 accept=false;
 assert.equal((await post({...valid,token:await token()})).status,503);
 accept=true;
 for(let i=0;i<2;i++)assert.equal((await post({...valid,token:await token()})).status,200);
 assert.equal((await post({...valid,token:await token()})).status,429);
 console.log('PASS: validation, origin/token checks, honeypot, fixed recipient, complete email, idempotency, transport failure, rate limit.');
}finally{php.kill(); smtp.close();}
