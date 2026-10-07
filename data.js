export const levels = ['Learning for 1 term to 1 year','Learning for 1 year',...Array.from({length:8},(_,i)=>'Grade '+(i+1)),'Grade 8+'];
const strings=['Violin','Viola','Cello','Double bass'];
const woodwind=['Flute','Piccolo','Oboe','Bassoon','Clarinet','Saxophone'];
const brass=['Trumpet / Cornet','French horn','Tenor horn','Trombone','Euphonium / Baritone','Tuba'];
const percussion=['Drums / Percussion'];
const wind=[...woodwind,...brass,...percussion];
const orchestra=[...strings,...wind,'Piano / Keyboard'];
export const noInstrument = 'I don’t play an instrument yet';
export const instruments=[noInstrument,...strings,...woodwind,...brass,...percussion,'Piano / Keyboard','Guitar','Bass guitar','Voice / Singing','Other instrument'];
const group=(name,time,min,max,accepted='all',age='young')=>({name,time,min,max,accepted,age});
export const ensembles=[
group('Hi-Gain','Tuesday · 17:00–19:00',4,10,[...woodwind,...brass,'Guitar','Bass guitar','Drums / Percussion','Piano / Keyboard','Voice / Singing']),
group('Training Brass Ensemble','Saturday · 09:00–10:00',0,5,brass),
group('Training Orchestra','Saturday · 09:15–10:00',2,6,orchestra),
group('Prep Choir','Saturday · 09:30–10:00',0,10,'all','6-8'),
group('Chamber Strings','Saturday · 09:30–10:00',7,10,strings),
group('Sax & Clarinet Ensemble','Saturday · 09:15–10:00',4,10,['Saxophone','Clarinet']),
group('Music for Munchkins','Saturday · 10:00–10:45',0,10,'all','4-6'),
group('Musikids','Saturday · 10:00–10:45',0,10,'all','6-8'),
group('Training Guitars','Saturday · 10:00–10:45',1,3,['Guitar']),
group('Training Strings','Saturday · 10:00–10:45',1,3,strings),
group('Training Wind Band','Saturday · 10:00–10:45',2,4,wind),
group('Intermediate Strings','Saturday · 10:00–11:00',4,7,strings),
group('Big Band','Saturday · 10:00–11:00',6,10,['Saxophone',...brass,'Drums / Percussion','Piano / Keyboard','Double bass','Bass guitar','Guitar']),
group('Training Percussion Ensemble','Saturday · 10:15–10:45',0,1),
group('Intermediate Percussion Ensemble','Saturday · 10:45–11:30',1,10),
group('Prep Orchestra','Saturday · 10:45–11:30',0,2,orchestra),
group('Adult Choir','Saturday · 10:45–11:45',0,10,'all','adult'),
group('Youth Orchestra','Saturday · 11:00–12:00',6,10,orchestra),
group('Intermediate Wind Band','Saturday · 11:00–12:00',4,6,wind),
group('Amersham Community Orchestra','Saturday · 11:45–13:00',5,10,orchestra,'adult'),
group('Intermediate Choir','Saturday · 12:00–12:45',0,10,'all','9-13'),
group('String Ensemble','Saturday · 12:00–13:00',7,10,strings),
group('Concert Band','Saturday · 12:00–13:00',6,10,wind),
group('Chamber Brass','Saturday · 13:00–13:30',6,10,brass)
];
export function matches(instrument,level,age) {
if(!instruments.includes(instrument)||(age!=='adult'&&(!Number.isInteger(age)||age<4||age>18)))return [];
const ageMatches=e=>{
if(age==='adult')return e.age==='adult';
if(e.age==='adult')return false;
if(e.age==='young')return true;
const [min,max]=e.age.split('-').map(Number);
return age>=min&&age<=max;
};
if(instrument===noInstrument){
const results=ensembles.filter(e=>e.age!=='young'&&e.name!=='Amersham Community Orchestra'&&ageMatches(e));
if(age!=='adult'&&age>=9&&age<=13)results.push({name:'Music Majors (including Theory Investigation)',time:'Saturday · Instrumental: 09:15–10:00; Theory Investigation: 11:00–11:30'});
return results;
}
if(!Number.isInteger(level)||level<0||level>10)return [];
return ensembles.filter(e=>ageMatches(e)&&level>=e.min&&level<=e.max&&(e.accepted==='all'||e.accepted.includes(instrument)));
}
