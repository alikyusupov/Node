function EE(){
	this.events = {}
}

EE.prototype.on = function(type, listener){
	this.events[type] = this.events[type] || [];
	this.events[type].push(listener);
}

EE.prototype.emit = function(type, data){
	if (this.events[type]) {
		this.events[type].forEach(listener=>listener(data))
	}
}

module.exports = EE;