define({
	uid: function (prefix) {
			var id = Math.floor((Math.random() * 9999) + 1) + "-" + Math.floor((Math.random() * 9999) + 1) + "-" + Math.floor((Math.random() * 9999) + 1);
			return prefix ? prefix + "-" + id : id;
	},
	guid: function () {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(character) {
			var rand = Math.random() * 16|0,
				value = character === 'x' ? rand : (rand&0x3|0x8);
			return value.toString(16);
		});
	}
});
