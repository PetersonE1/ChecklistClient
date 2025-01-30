ChoreManager = {
		chores: null,
		members: null,

		init: function() {
			ChoreManager.oneDone = false;
			if (ChoreManager.chores)
				ChoreManager.removeFocusables();
	
			document.getElementById("chore_table").innerHTML = "";
	
			Requester.getChores(ChoreManager.loadChores);
			Requester.getMembers(ChoreManager.loadMembers);
		},
		
		oneDone: false,
		continue_init_once_both_requests_done: function() {
			if (!ChoreManager.oneDone) {
				ChoreManager.oneDone = true;
			}
			else {
				try {
					ChoreManager.buildHeaders();
					ChoreManager.buildGrid();
					activateFocus();
					getFocus();
				} catch (error) {
					Logger.log(error);
				}
			}
		},

		loadChores: function(data) {
			ChoreManager.chores = data;
			ChoreManager.continue_init_once_both_requests_done();	
		},

		loadMembers: function(data) {
			ChoreManager.members = data;
			ChoreManager.continue_init_once_both_requests_done();
		},

		buildHeaders: function() {
			var table = document.getElementById("chore_table");
			var line = document.createElement("tr");
			
			var empty = document.createElement("th");
			empty.classList.add("member_name");
			line.appendChild(empty);
			
			ChoreManager.members.forEach((member) => {
				var name = document.createElement("th");
    			name.innerHTML = member.name + " " + '<div class="container"><img src="images/gold_star.png" width=75 height=75><div class="centered_image_text">' + member.score + '</div></div>';
    			name.classList.add("member_name");
    			line.appendChild(name);
			});
			table.appendChild(line);
		},

		buildGrid: function() {
			var table = document.getElementById("chore_table");
			
			ChoreManager.chores.forEach((chore) => {
				var line = document.createElement("tr");
				
				var chore_desc = document.createElement("td");
				chore_desc.innerHTML = "<span>"+chore.description+"</span>";
				chore_desc.classList.add("chore");
				if (chore.state === 2) {
					chore_desc.classList.add("completed");
				}
				line.appendChild(chore_desc);
				
				ChoreManager.members.forEach((member) => {
					var gridBox = document.createElement("td");
					gridBox.classList.add("grid_box");
					
					gridBox.setAttribute("member", member.name);
					gridBox.setAttribute("chore", chore.id);
					gridBox.setAttribute("focusable", "");
					
					if (chore.state !== 2) {
						if (!chore.assignedTo || chore.assignedTo === member.name) {
							if (chore.highPriority)
								gridBox.classList.add("high_priority");
							else
								gridBox.classList.add("assigned");
							
							if (chore.state === 1) {
								gridBox.innerHTML = '<img src="images/loading.gif" width="50" height="50">'
							}
						}
					}
					else {
						if (chore.doneBy === member.name) {
							gridBox.innerHTML = '<img src="images/gold_star.png" width="50" height="50">'
						}
						gridBox.classList.add("completed_box");
					}
					
					line.appendChild(gridBox);
				});
				
				table.appendChild(line);
			});
		},

		removeFocusables: function() {
			try{
			const elements = document.getElementsByClassName("grid_box");
			for (var i = 0; i < elements.length; i++) {
				$.caph.focus.nearestFocusableFinderProvider.getInstance().$$remove(elements[i]);
			};
			} catch (error){
				Logger.log(error);
			}
		}
};