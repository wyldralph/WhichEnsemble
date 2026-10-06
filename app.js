import {instruments,levels,matches} from './data.js';
const instrument=document.querySelector('#instrument'),age=document.querySelector('#age'),slider=document.querySelector('#standard');
for(const name of instruments){const option=document.createElement('option');option.value=name;option.textContent=name;instrument.append(option);}
function render(){const level=Number(slider.value);document.querySelector('#level').textContent=levels[level];slider.setAttribute('aria-valuetext',levels[level]);slider.style.setProperty('--progress',(level/10*100)+'%');
const list=document.querySelector('#matches');list.replaceChildren();const ready=instrument.value&&age.value;
const groups=ready?matches(instrument.value,level,age.value):[];
document.querySelector('#count').textContent=ready?groups.length+' found':'';
document.querySelector('#status').textContent=!ready?'Choose your instrument and age group to see suitable ensembles.':groups.length?groups.length+' suitable '+(groups.length===1?'group':'groups')+' found.':'No matching ensembles at this standard. Please contact Amersham Music Centre to discuss options.';
document.querySelector('#status').classList.toggle('visually-hidden',!!groups.length);
document.querySelector('#age-note').hidden=!(ready&&age.value==='4-8');
for(const group of groups){const li=document.createElement('li'),name=document.createElement('h3'),time=document.createElement('p');name.textContent=group.name;time.textContent=group.time;li.append(name,time);list.append(li);}}
instrument.addEventListener('change',render);age.addEventListener('change',render);slider.addEventListener('input',render);render();
