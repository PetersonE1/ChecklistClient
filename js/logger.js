Logger = {
		step: 0,
		
		log: function(data) {
			var logElement = document.getElementById('debug_div');
			logElement.innerHTML = logElement.innerHTML + " | " + data;
		},

		log_step: function() {
			Logger.log(this.step);
			Logger.step += 1;
		}
};