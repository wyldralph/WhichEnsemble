import {instruments,levels,matches,noInstrument} from './data.js';
const instrument=document.querySelector('#instrument'),age=document.querySelector('#age'),slider=document.querySelector('#standard'),childAge=document.querySelector('#child-age');
for(const name of instruments){const option=document.createElement('option');option.value=name;option.textContent=name;instrument.append(option);}
function render(){document.querySelector('#child-age-controls').hidden=age.value!=='young';const selectedAge=age.value==='adult'?'adult':childAge.valueAsNumber;const validAge=age.value==='adult'||(age.value==='young'&&childAge.value!==''&&childAge.validity.valid);const beginner=instrument.value===noInstrument;document.querySelector('#standard-controls').hidden=beginner;const level=Number(slider.value);document.querySelector('#level').textContent=levels[level];slider.setAttribute('aria-valuetext',levels[level]);slider.style.setProperty('--progress',(level/10*100)+'%');
const list=document.querySelector('#matches');list.replaceChildren();const ready=instrument.value&&validAge;
const groups=ready?matches(instrument.value,level,selectedAge):[];
document.querySelector('#count').textContent=ready?groups.length+' found':'';
document.querySelector('#status').textContent=!ready?'Choose your instrument and enter your age, or select Adult, to see suitable ensembles.':groups.length?groups.length+' suitable '+(groups.length===1?'group':'groups')+' found.':beginner?'Please contact Amersham Music Centre about starting an instrument.':'No matching ensembles at this standard. Please contact Amersham Music Centre to discuss options.';
document.querySelector('#status').classList.toggle('visually-hidden',!!groups.length);
for(const group of groups){const li=document.createElement('li'),name=document.createElement('h3'),time=document.createElement('p');name.textContent=group.name;time.textContent=group.time;if(group.name.startsWith('Music Majors'))time.style.whiteSpace='normal';li.append(name,time);list.append(li);}}
instrument.addEventListener('change',render);age.addEventListener('change',render);childAge.addEventListener('input',render);slider.addEventListener('input',render);render();
