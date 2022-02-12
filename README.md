## **PARROT TRANSLATOR 🦜**

- Parrot translator is a mobile friendly voice translation app designed to be intuitive and user-friendly. Perfect companion for travelling abroad.

**Please click this link to start the app:**
https://parrot-translate.herokuapp.com

![Recording Screen](https://raw.github.com/ttyngai/parrot-translate/main/src/images/recordingScreen.jpg 'ScreenShot of app recording')
![Favourite Screen](https://raw.github.com/ttyngai/parrot-translate/main/src/images/favScreen.jpg 'ScreenShot of app at favourite page')

**Tehcnologies used:**

- React.js
- Google Cloud API
- Express.js
- Node.js
- MongoDB

**Highlights:**

- There is no need to login to access basic translation features
- A starter instructional conversation will appear

- Language can be selected, and also swapped if communicating with foreign speaker

- In order to have conversation stored, login/sign up is required

- After login, conversation that was made before will still temporarily be available at main screen, which could be saved by pressing `Add`.

- Each conversation also has a `★` button on the top right-hand corner. This button will allow translation to be saved in favorites. Unclicking it will remove it from favorites

- Clearing of list can be achieved by pressing `Clear List` and `Confirm` button within 3 seconds. Clearing of list will not delete favorites from favorite list, but will not appear in main page anymore

- Deleting all favorites can be achived by pressing `Delete ★` and `Confirm` like above. This will remove all favorites from database as well as main page. When navigating back to main page, all conversation except favorites will still persist

**Future improvements:**

- Add text input functionalities
- Add folder system for favourites
