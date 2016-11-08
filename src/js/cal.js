Berry.btn.remove = {
	label: 'Remove',
	icon:'trash',
	id: 'berry-remove',
	modifier: 'danger pull-left',
	click: function() {
		this.trigger('remove');
	}
};
function berryCal(options){
	this.models = [];
	this.template = Hogan.compile(options.title);
	function createNew(date, jsEvent, view){
		var attributes = {};
		attributes[this.options.dateField]=date.format();
		$().berry({name: 'modal', attributes:attributes,legend: 'Add:', fields: this.options.schema}).on('save', function() {
			if(Berries.modal.validate()){
				var newModel = new berryModel(this, Berries.modal.toJSON());
				this.models.push(newModel);
				Berries.modal.trigger('saved');
				
				if(typeof this.options.add == 'function'){
					this.options.add(newModel);
				}
				this.calendar.fullCalendar('renderEvent', {
					id: newModel._id, 
					title: this.template.render(newModel.attributes, templates), 
					start: newModel.attributes[this.options.dateField],
					allDay: true}
				, true )
			}
		}, this);

	}

	function editEvent(calEvent, jsEvent, view) {
		this.calEvent = calEvent;
		var atts = _.findWhere(this.models, {_id:this.calEvent._id});
		$().berry({name: 'modal', attributes:atts.attributes, actions:['save', 'cancel', 'remove'], legend: 'Edit:', fields: this.options.schema}).on('save', function(){
			var attributes = Berries.modal.toJSON();
			var temp = _.findWhere(this.models, {_id:this.calEvent._id});
  		var oldValues = temp.toJSON();
  		temp.set($.extend(true, temp.toJSON(), attributes));

      this.calEvent.title = this.template.render(temp.attributes, templates);
      this.calEvent.start = attributes[this.options.dateField];
      this.calendar.fullCalendar('updateEvent', this.calEvent);				
      Berries.modal.trigger('close');
		}, this).on('remove', function(){
				this.calendar.fullCalendar('removeEvents', this.calEvent._id);
      	Berries.modal.trigger('close');
		},this);
  }

	function moveEvent(calEvent, delta, revertFunc) {
		var temp = _.findWhere(this.models, {_id:calEvent._id});
  	var newValues = temp.toJSON();
  	newValues[this.options.dateField] = calEvent.start.format();
  	temp.set(newValues);
  }

	this.options = options;
	this.calendar= $('#first');
	this.calendar.fullCalendar('destroy');
	this.calendar.fullCalendar({
		 header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,basicWeek,basicDay'
	}
	,
	editable: true,//!(get().start == 'createdAt'),
	eventClick: editEvent.bind(this),
	dayClick: createNew.bind(this),
	eventDrop: moveEvent.bind(this)
	});
}