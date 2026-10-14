import {instruments,levels,matches,noInstrument} from './data.js';
const instrument=document.querySelector('#instrument'),age=document.querySelector('#age'),slider=document.querySelector('#standard'),showChoirs=document.querySelector('#show-choirs');
const deselected=new Set();
let visibleGroups=[];
for(const name of instruments){const option=document.createElement('option');option.value=name;option.textContent=name;instrument.append(option);}
function sessions(group){
const day=group.time.match(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/)?.[0];
return [...group.time.matchAll(/(\d{2}):(\d{2})[–-](\d{2}):(\d{2})/g)].map(m=>({day,start:Number(m[1])*60+Number(m[2]),end:Number(m[3])*60+Number(m[4])}));
}
function updateClashes(selected){
const list=document.querySelector('#clash-list');list.replaceChildren();
const clock=n=>String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0');
for(let i=0;i<selected.length;i++)for(let j=i+1;j<selected.length;j++){
const overlaps=[];
for(const a of sessions(selected[i]))for(const b of sessions(selected[j])){
const start=Math.max(a.start,b.start),end=Math.min(a.end,b.end);
if(a.day&&a.day===b.day&&start<end)overlaps.push(a.day+' · '+clock(start)+'–'+clock(end));
}
if(overlaps.length){const item=document.createElement('li');item.textContent=selected[i].name+' and '+selected[j].name+' — '+[...new Set(overlaps)].join('; ');list.append(item);}
}
document.querySelector('#clash-content').hidden=!list.children.length;
}
function updateEmail(){
const selected=visibleGroups.filter(group=>!deselected.has(group.name));
updateClashes(selected);
const emailAction=document.querySelector('#email-action'),emailLink=document.querySelector('#email-draft');
emailAction.hidden=!visibleGroups.length;
emailLink.hidden=!selected.length;
document.querySelector('#email-help').hidden=!selected.length;
document.querySelector('#selection-help').hidden=!!selected.length;
document.querySelector('#selected-count').textContent=selected.length+' selected';
document.querySelector('#toggle-selection').textContent=selected.length?'Deselect all':'Select all';
if(selected.length){
const selectedAge=age.value==='adult'?'Adult':Number(age.value);
const opening=age.value==='adult'?'I would':'My child would';
const body=['Dear Amersham Music Centre,','',opening+' be interested in trying out the following groups:','',...selected.map(group=>'- '+group.name+' — '+group.time),'','Instrument: '+instrument.value,'Age: '+selectedAge,'','Thank you'].join('\r\n');
emailLink.href='mailto:ammusic@bucksmusic.org?subject='+encodeURIComponent('Enquiry about trying Amersham Music Centre groups')+'&body='+encodeURIComponent(body);
}else emailLink.removeAttribute('href');
}
function render(){
const selectedAge=age.value==='adult'?'adult':Number(age.value);
const validAge=age.value==='adult'||(age.value!==''&&Number.isInteger(selectedAge)&&selectedAge>=4&&selectedAge<=18);
const beginner=instrument.value===noInstrument;
document.querySelector('#standard-controls').hidden=beginner;
const level=Number(slider.value);
document.querySelector('#level').textContent=levels[level];
slider.setAttribute('aria-valuetext',levels[level]);
slider.style.setProperty('--progress',(level/10*100)+'%');
const list=document.querySelector('#matches');list.replaceChildren();
const ready=instrument.value&&validAge;
document.querySelector('#county-message').hidden=!(ready&&!beginner&&selectedAge!=='adult'&&level>=levels.indexOf('Grade 6'));
document.querySelector('#beginner-contact').hidden=!(ready&&beginner&&selectedAge!=='adult'&&selectedAge>=14&&selectedAge<=18);
const allGroups=ready?matches(instrument.value,level,selectedAge):[];
visibleGroups=allGroups.filter(group=>showChoirs.checked||!group.name.includes('Choir'));
document.querySelector('#count').textContent=ready?visibleGroups.length+' found':'';
document.querySelector('#selection-controls').hidden=!visibleGroups.length;
document.querySelector('#status').textContent=!ready?'Choose your instrument and age to see suitable ensembles.':visibleGroups.length?visibleGroups.length+' suitable '+(visibleGroups.length===1?'group':'groups')+' found.':allGroups.length?'No groups to show with choirs switched off. Turn on Include choirs to see your matches.':beginner?'Please contact Amersham Music Centre about starting an instrument.':'No matching ensembles at this standard. Please contact Amersham Music Centre to discuss options.';
document.querySelector('#status').classList.toggle('visually-hidden',!!visibleGroups.length);
for(const group of visibleGroups){
const li=document.createElement('li'),label=document.createElement('label'),checkbox=document.createElement('input'),details=document.createElement('span'),name=document.createElement('span'),time=document.createElement('span');
label.className='group-choice';checkbox.type='checkbox';checkbox.checked=!deselected.has(group.name);
checkbox.addEventListener('change',()=>{if(checkbox.checked)deselected.delete(group.name);else deselected.add(group.name);updateEmail();});
details.className='group-details';name.className='group-name';name.textContent=group.name;time.className='group-time';time.textContent=group.time;
details.append(name,time);label.append(checkbox,details);li.append(label);list.append(li);
}
updateEmail();
}
document.querySelector('#toggle-selection').addEventListener('click',()=>{
const anySelected=visibleGroups.some(group=>!deselected.has(group.name));
for(const group of visibleGroups){if(anySelected)deselected.add(group.name);else deselected.delete(group.name);}
render();
});
instrument.addEventListener('change',render);age.addEventListener('change',render);slider.addEventListener('input',render);showChoirs.addEventListener('change',render);render();
