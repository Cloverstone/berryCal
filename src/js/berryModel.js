function berryModel (owner, initial, _id) {
	this.owner = owner;
	this._id = _id || Berry.getUID();
	this.attributes = {};
	this.schema = owner.options.schema;
	this.set = function(newAtts){
		this.attributes = newAtts;
	}
	this.selected = false;
	$.extend(true, this.attributes, initial);
	this.toJSON = function() {return this.attributes}
	this.delete = function(){
		this.owner.models.splice(_.indexOf(_.pluck(this.owner.models, 'id'), this.id),1);
	}
	this.events = {initialize: []};
	this.addSub = Berry.prototype.addSub;
	this.on = Berry.prototype.on;
	this.off = Berry.prototype.off;
	this.trigger = Berry.prototype.trigger;
};