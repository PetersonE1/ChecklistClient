//Initialize function
var init = function () {
    //Logger.log('init() called');
    
    document.addEventListener('visibilitychange', function() {
        if(document.hidden){
            // Something you want to do when hide or exit.
        } else {
            // Something you want to do when resume.
        }
    });
 
    // add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
    	case 37: //LEFT arrow
    		break;
    	case 38: //UP arrow
    		break;
    	case 39: //RIGHT arrow
    		break;
    	case 40: //DOWN arrow
    		break;
    	case 13: //OK button
    		break;
    	case 10009: //RETURN button
    		tizen.application.getCurrentApplication().exit();
    		break;
    	default:
    		//Logger.log('Key code : ' + e.keyCode);
    		break;
    	}
    });
    
    ChoreManager.init();
    setInterval(ChoreManager.init, 30000);
};

// window.onload can work without <body onload="">
window.onload = init;