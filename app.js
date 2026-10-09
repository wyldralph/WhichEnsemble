import {instruments,levels,matches,noInstrument} from './data.js';
const instrument=document.querySelector('#instrument'),age=document.querySelector('#age'),slider=document.querySelector('#standard'),childAge=document.querySelector('#child-age'),showChoirs=document.querySelector('#show-choirs');
const deselected=new Set();
let visibleGroups=[];
for(const name of instruments){const option=document.createElement('option');option.value=name;option.textContent=name;instrument.append(option);}
function updateEmail(){
const selected=visibleGroups.filter(group=>!deselected.has(group.name));
const emailAction=document.querySelector('#email-action'),emailLink=document.querySelector('#email-draft');
emailAction.hidden=!visibleGroups.length;
emailLink.hidden=!selected.length;
document.querySelector('#email-help').hidden=!selected.length;
document.querySelector('#selection-help').hidden=!!selected.length;
document.querySelector('#selected-count').textContent=selected.length+' selected';
document.querySelector('#toggle-selection').textContent=selected.length?'Deselect all':'Select all';
if(selected.length){
const selectedAge=age.value==='adult'?'Adult':childAge.valueAsNumber;
const opening=age.value==='adult'?'I would':'My child would';
const body=['Dear Amersham Music Centre,','',opening+' be interested in trying out the following groups:','',...selected.map(group=>'- '+group.name),'','Instrument: '+instrument.value,'Age: '+selectedAge,'','Thank you'].join('\r\n');
emailLink.href='mailto:ammusic@bucksmusic.org?subject='+encodeURIComponent('Enquiry about trying Amersham Music Centre groups')+'&body='+encodeURIComponent(body);
}else emailLink.removeAttribute('href');
}
function render(){
document.querySelector('#child-age-controls').hidden=age.value!=='young';
const selectedAge=age.value==='adult'?'adult':childAge.valueAsNumber;
const validAge=age.value==='adult'||(age.value==='young'&&childAge.value!==''&&childAge.validity.valid);
const beginner=instrument.value===noInstrument;
document.querySelector('#standard-controls').hidden=beginner;
const level=Number(slider.value);
document.querySelector('#level').textContent=levels[level];
slider.setAttribute('aria-valuetext',levels[level]);
slider.style.setProperty('--progress',(level/10*100)+'%');
const list=document.querySelector('#matches');list.replaceChildren();
const ready=instrument.value&&validAge;
const allGroups=ready?matches(instrument.value,level,selectedAge):[];
visibleGroups=allGroups.filter(group=>showChoirs.checked||!group.name.includes('Choir'));
document.querySelector('#count').textContent=ready?visibleGroups.length+' found':'';
document.querySelector('#selection-controls').hidden=!visibleGroups.length;
document.querySelector('#status').textContent=!ready?'Choose your instrument and enter your age, or select Adult, to see suitable ensembles.':visibleGroups.length?visibleGroups.length+' suitable '+(visibleGroups.length===1?'group':'groups')+' found.':allGroups.length?'No groups to show with choirs switched off. Turn on Include choirs to see your matches.':beginner?'Please contact Amersham Music Centre about starting an instrument.':'No matching ensembles at this standard. Please contact Amersham Music Centre to discuss options.';
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
instrument.addEventListener('change',render);age.addEventListener('change',render);childAge.addEventListener('input',render);slider.addEventListener('input',render);showChoirs.addEventListener('change',render);render();
