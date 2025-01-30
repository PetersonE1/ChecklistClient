Requester = {
		getJSON: function(url, callback) {
		    var xhr = new XMLHttpRequest();
		    xhr.open('GET', url, true);
		    xhr.responseType = 'json';
		    xhr.onload = function() {
		      var status = xhr.status;
		      if (status === 200) {
		        callback(null, xhr.response);
		      } else {
		        callback(status, xhr.response);
		      }
		    };
		    xhr.send();
		},

		postJSON: function(url, callback) {
		    var xhr = new XMLHttpRequest();
		    xhr.open('POST', url, true);
		    
		    xhr.responseType = 'json';
		    xhr.onload = function() {
		      var status = xhr.status;
		      if (status === 200) {
		        callback(null, xhr.response);
		      } else {
		        callback(status, xhr.response);
		      }
		    };
		    
		    xhr.send();
		},

		getChores: function(callback) {
			Requester.getJSON("http://192.168.1.14:8080/ChecklistTasks?filterByDay=true&assignmentLevel=0",
			function(err, data) {
				if (err !== null) {
					Logger.log('Something went wrong: ' + err);
				} else {
					callback(data);
				}
			});
		},

		getMembers: function(callback) {
			Requester.getJSON("http://192.168.1.14:8080/Member",
			function(err, data) {
				if (err !== null) {
					Logger.log('Something went wrong: ' + err);
				} else {
					callback(data);
				}
			});
		}
};