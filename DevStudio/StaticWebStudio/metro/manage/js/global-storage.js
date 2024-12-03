//Startup Configuration

/* You Can Set External Backend Server */
Metro.storage.setItem('BackendServerAddress', window.location.origin);
Metro.storage.setItem('DetectedLanguage', (navigator.language || navigator.userLanguage).substring(0, 2));
Metro.storage.setItem('NotifyShowTime', 5000);


//Startup Global Variables Init -> are Saved All Editor Contents For Posibility Transfer / Saving / Export / Etc

//All Opened Tools
let RegisteredStudioList = []; let RegisteredFrameList = []; 



//Startup Storage Settings

/*WebPages Theme Scheme*/
if (Metro.storage.getItem('WebScheme', null) == null) {
    Metro.storage.setItem('WebScheme', "sky-net.css");
    ChangeSchemeTo(Metro.storage.getItem('WebScheme', null));
} else { ChangeSchemeTo(Metro.storage.getItem('WebScheme', null)); }

//Start Set User Default Setting
if (Metro.storage.getItem('UserAutomaticTranslate', null) == null) { Metro.storage.setItem('UserAutomaticTranslate', false); }