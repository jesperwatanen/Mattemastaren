import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {JSDOM, VirtualConsole} from 'jsdom';

const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const messages=[];
const vc=new VirtualConsole();
vc.on('jsdomError',e=>messages.push(e.message));
const dom=new JSDOM(html,{
  url:'https://example.test/Mattemastaren/',
  runScripts:'dangerously',
  pretendToBeVisual:true,
  virtualConsole:vc,
  beforeParse(win){win.scrollTo=()=>{};win.AudioContext=undefined}
});
const {document,localStorage}=dom.window;
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
function get(selector){const el=document.querySelector(selector);assert.ok(el,'Hittar inte '+selector);return el}
function click(selector){get(selector).click()}
function profile(){return JSON.parse(localStorage.getItem('mattemastaren_v1')).profiles[0]}
function chooseCorrect(expected){
 const options=[...document.querySelectorAll('[data-answer]')];
 assert.equal(options.length,6,'Varje fråga har exakt sex svar');
 assert.equal(document.querySelectorAll('.answer-option small').length,0,'Inga extra 1–6 på svarsknapparna');
 assert.equal(new Set(options.map(b=>b.dataset.answer)).size,6,'Svarsalternativen är unika');
 const btn=options.find(b=>Number(b.dataset.answer)===expected);
 assert.ok(btn,'Rätt svar måste finnas bland alternativen: '+expected);
 btn.click();
}
test('barnprofil, kanin, repetition och felfritt tabellrekord',async()=>{
  assert.equal(messages.length,0,'Inga exekveringsfel vid start');
  click('#new-player-main');
  click('#new-profile');
  get('#hero-name').value='Testhjälte';
  click('[data-emoji="🐰"]');
  click('#create-profile');
  assert.equal(profile().avatar,'🐰');
  assert.equal(document.querySelectorAll('[data-ready-table]').length,12);
  click('[data-ready-table="3"]');
  assert.match(document.body.textContent,/Är du redo/);
  click('#ready-repeat');
  assert.match(get('#review-current').textContent,/1×3=3/);
  await sleep(1050);
  assert.match(get('#review-current').textContent,/1×3=3/,'Varje tal ska visas i 1,5 sekunder');
  await sleep(550);
  assert.match(get('#review-current').textContent,/2×3=6/);
  click('#review-start');
  for(let n=1;n<=10;n++){
    assert.match(get('#equation').textContent,new RegExp('^'+n+' × 3 ='));
    chooseCorrect(n*3);
    await sleep(1020);
  }
  assert.match(document.body.textContent,/NYTT PERSONBÄSTA/);
  assert.equal(typeof profile().tableRecords['3'],'number');
  assert.ok(profile().tableRecords['3']>0);
  click('#back-home');
});
test('tiokompisar på tid med sex alternativ och rekord',async()=>{
  click('#friends-start');
  assert.match(document.body.textContent,/Tiokompisar/);
  click('#friends-ready-start');
  for(let n=0;n<11;n++){
    const eq=get('#equation').textContent;
    const m=eq.match(/^(\d+) \+ \? = 10$/);
    assert.ok(m,'Tiokompisfråga: '+eq);
    chooseCorrect(10-Number(m[1]));
    await sleep(1020);
  }
  assert.match(document.body.textContent,/NYTT PERSONBÄSTA/);
  assert.ok(profile().friendsBestMs>0);
  click('#back-home');
});
test('fel svar visar överstruket val och stort korrekt svar',async()=>{
  click('[data-ready-table="2"]');
  click('#ready-start');
  const expected=2;
  const wrong=[...document.querySelectorAll('[data-answer]')].find(b=>Number(b.dataset.answer)!==expected);
  assert.ok(wrong,'Det måste finnas ett felaktigt alternativ');
  const wrongNumber=wrong.dataset.answer;
  wrong.click();
  assert.equal(get('.wrong-response del').textContent,wrongNumber);
  assert.equal(get('.correct-response strong').textContent,String(expected));
  assert.ok(get('.answer-option.picked.miss'));
  assert.ok(get('.answer-option.revealed'));
  await sleep(1990);
  click('#exit-game');
  click('#end-now');
  click('#back-home');
});
test('hiscore, vänbyte och sparad historik efter omladdning',()=>{
  click('[data-ready-table="3"]');
  assert.match(document.querySelector('.highscore-panel').textContent,/Testhjälte/);
  click('#profile-button');
  click('#change-friend');
  click('[data-friend-emoji="🦊"]');
  assert.equal(profile().avatar,'🦊');
  assert.equal(profile().tableRecords['3']>0,true);
  assert.equal(messages.length,0,'Inga okontrollerade JSDOM-fel');
  dom.window.close();
});
