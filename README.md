mobtimer
========
The second. The best. The most stable one (yet). 

## Features backlog
(create an Issue for feature requests, or to report a bug 🐜!)

Settings
* Themes
  - CSS themes. [DOING]

* localStorage
  - Bug: green color on timer after refresh/rehydrate of state.

Sound
 - Bug: Force to use english voice, it varies between sv and en right now. And also voice varies from computer to computer.

CSS
* Mobile should look acceptable.

Notifications
  
Timer
* Title/tab header
  - Use hooks/useEffect to handle this title update instead
* Timer visual states
  - Show favicon color based on state
* Intermesso/Break after every n rounds
  - timebased? after around 60 min
* Metadata
  - Number of cycles
  - propose a break after nth round/time?
  
Users
* Start with user [0] active.

Images
* Random user images
  - Unsplashed API
* Unique image of every user.
  - Bug: worked, but now now since rehydration of state. Needs to filter through users from state.

Misc
* Support
  - Does not work on:
    - IE
    - Safari
    
* Version control av appen
  - Visa när ny version är tillgänglig. Uppmuntra reload.
  - Try out react hooks

## Release log:
### Version 1.0: 2018
Settings
* localStorage
  - ~Remember users/redux state on refresh~

Sound
* ~Say upcoming username with Speech API~
* ~Choose which sound to use~  

CSS

Notifications
* When NEXT_USER
  - ~Click focuses on tab~
  - ~Close notification when NEXT_USER.~
* ~Prompt to activate notifications in Settings view in case she has not~
  
Timer
* ~Timer in title/tab~
  - ~Formatted in "helper" class to minutes:seconds~
  - ~window.title updates every second~
* ~Add users (unique ones by name)~
  - ~bug: should not be case sensitive..~
* ~Circular chart visualisation of time~
  - ~Toggle play/pause on click~
* timer visual states
  - ~Red/green~
* Intermesso/Break after every n rounds
* ~"blink" on title when alarm-state.~
* Set timer session length
* Metadata
  - ~Overall mobtime of todays session~
  
Users
* ~Remove a user~
  - ~Not be able remove an active user~
* ~Toggle inactive/active user~
  - ~Not be able to disable all / i.e not the active one~
* ~NEXT_USER skips disabled users~
  - ~RESET_TIME when next and time is active~
* ~Edit username~
* ~Change order of users~
  - ~Via drag and drop~
* ~Crown on active user~

Images
* ~Random user images ("hardcoded" list of image-urls now)~
* ~NEXT_USER after timer ends~
