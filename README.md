# Amersham Music Centre ensemble finder

A small static app using the 2026/27 timetable. Select an instrument, age and approximate playing standard. Results show ensemble name, day and time.

## Netlify
Import this GitHub repository into your Netlify account. No build command is required. The publish directory is the repository root (configured in netlify.toml). Connect the main branch so later commits update the site.

## Embed
Replace YOUR-NETLIFY-URL with the deployed address:
```html
<iframe src="https://YOUR-NETLIFY-URL" title="Amersham Music Centre ensemble finder" style="width:100%;height:1100px;border:0;" loading="lazy"></iframe>
```
The iframe scrolls if the results exceed its height. The deployed address also works as a direct link.

## Update the timetable
Edit data.js: each group has a name, day/time, minimum and maximum slider index, accepted instruments, and age category. Slider indices: 0 = 1 term to 1 year; 1 = 1 year; 2 = Grade 1; through 9 = Grade 8; 10 = Grade 8+.

Boundaries are inclusive. There is no one-grade-below matching. Prep Orchestra runs through Grade 1; Training Percussion through one year; Intermediate Percussion from one year upwards.

Choose Child / young person and enter a whole-number age from 4 to 18, or choose Adult without an age entry. Eighteen-year-olds remain in youth groups. Age-specific groups: Munchkins 4–6; Musikids 6–8; Prep Choir 6–8; Intermediate Choir 9–13. Other youth ensembles retain their instrument/standard rules.

The first instrument option is “I don’t play an instrument yet”. It hides the standard slider and shows the age-specific groups above, plus Music Majors including Theory Investigation for ages 9–13. Non-players aged 14–18 see a contact message. Adult non-players see only Adult Choir. Adult players see Adult Choir and, where instrument/standard permits, Community Orchestra. Standalone theory is excluded.

Orchestras include strings, woodwind, brass, percussion and piano/keyboard. Hi-Gain treats horns as woodwind and brass. These broad instrument categories can be refined in data.js if needed.

## Local preview
Run `python3 -m http.server 8000` in this folder and open http://localhost:8000. No dependencies, accounts, analytics or personal-data collection.
