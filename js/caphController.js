$(document).ready(activateFocus);

function activateFocus() {

    $.caph.focus.activate(function(nearestFocusableFinderProvider, controllerProvider) {

        controllerProvider.onFocused(function(event, originalEvent) {
            $(event.currentTarget).css({
                'border': '4px solid',
            });
        });

        controllerProvider.onBlurred(function(event, originalEvent) {
            $(event.currentTarget).css({
                'border': '1px solid'
            });
        });
        
        controllerProvider.onSelected(function(event, originalEvent) {
        	choreID = event.currentTarget.getAttribute("chore");
        	memberName = event.currentTarget.getAttribute("member");
        	
        	choreState = ChoreManager.chores.filter(chore => chore.id == choreID)[0].state;
        	
        	choreState = choreState + 1;
        	if (choreState > 2)
        		choreState = 0;
        	
        	if (choreState === 2) {
        		Requester.postJSON("http://192.168.1.14:8080/ChecklistTasks?id=" + choreID + "&doneBy=" + memberName + "&state=" + choreState,
                		function(err, data) {
                			if (err !== null) {
                				Logger.log('Something went wrong: ' + err);
                			} else {
                				ChoreManager.init();
                			}
                		});
        	} else {
        		Requester.postJSON("http://192.168.1.14:8080/ChecklistTasks?id=" + choreID + "&state=" + choreState,
                		function(err, data) {
                			if (err !== null) {
                				Logger.log('Something went wrong: ' + err);
                			} else {
                				ChoreManager.init();
                			}
                		});
        	}
        });
    }); 
}

function getFocus() {
	var controller = $.caph.focus.controllerProvider.getInstance();
 	var nearestFocusableFinder = $.caph.focus.nearestFocusableFinderProvider.getInstance();
 
 	controller.focus(nearestFocusableFinder.getInitial());
}