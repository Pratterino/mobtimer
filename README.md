### Implemented features (striked) / to-do features (not striked)
Settings
* Themes
  - CSS themes.

* localStorage
  - ~Remember users/redux state on refresh~
  - Bug: green color on timer after refresh/rehydrate of state.
  
CSS
* Mobile should look acceptable.

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
  - Red/yellow/green
  - Show favicon color based on state
* Intermesso/Break after every n rounds
  - timebased? after around 60 min
* ~"blink" on tite when alarm-state.~
* Metadata
  - ~Overall mobtime of todays session~
  - Number of cycles
  - propose a break after nth round/time?
  
User
* Start with user [0] active.
* ~Remove a user~
* ~Toggle inactive/active user~
* ~NEXT_USER skips disabled users~
  - ~RESET_TIME when next and time is active~
* ~Edit username~
* ~Not be able remove an active user~
* ~Change order of users~
* ~Not be able to disable all / i.e not the active one~
* ~Crown on active user~

User images
* ~Random user images ("hardcoded" list of image-urls now)~
  - Unsplashed API
* ~NEXT_USER after timer ends~
* Unique image of every user.
* Set timer time in Settings

Sound
* ~Say upcoming username with Speech API~
* ~Choose which sound to use~

Misc
* Support
  - Does not work on:
    - IE
    - Safari
    
* Version control av appen
  - Visa när ny version är tillgänglig. Uppmuntra reload.
  - Try out react hooks
