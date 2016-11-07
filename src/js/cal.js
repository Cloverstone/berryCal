

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

	function createNew(date, jsEvent, view){

		// var init  = {berry_id: myStack.config.attributes._id};
		// init[get().start] = date.format()
var attributes = {};
attributes[this.options.dateField]=date.format();
		this.berry = $().berry({attributes:attributes,legend: 'Add:', fields: this.options.schema});
		this.berry.on('save', function() {
			var attributes = this.berry.toJSON();

			var temp = this.calendar.fullCalendar('renderEvent', {
				// id: model.attributes._id, 
				title: attributes[this.options.dateField]+'', 
				start: attributes[this.options.dateField],
				allDay: true}
			, true )
			this.berry.trigger('close');
						debugger;

		}, this);
		// this.berry.options.model.on('sync', function() {
		// 	this.trigger('change');
		// });
	}

	function editEvent(calEvent, jsEvent, view) {
		this.calEvent = calEvent;

		this.berry = $().berry({actions:['save', 'cancel', 'remove'], legend: 'Edit:', fields: this.options.schema}).on('save', function(){
			var attributes = this.berry.toJSON();
      this.calEvent.title = attributes[this.options.dateField]+'';
      this.calEvent.start = attributes[this.options.dateField];
      this.calendar.fullCalendar('updateEvent', this.calEvent);
		}, this).on('remove', function(){
			debugger;
				this.calendar.fullCalendar('removeEvents', this.calEvent);

			// this.removeEvent.call(this, this.berry.options.model.attributes._id);
			// this.
			// this.options.model.destroy()
			// this.trigger('cancel');
		},this);
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
				// editable: !(get().start == 'createdAt'),
				eventClick: $.proxy(editEvent, this),
				dayClick: createNew.bind(this),
				// eventDrop: $.proxy(moveEvent, this)
				});


}
function berryCalSfuff(options) {

	function createNew(date, jsEvent, view){

		var init  = {berry_id: myStack.config.attributes._id};
		init[get().start] = date.format()

		this.berry = $().berry({legend: 'Add:', model: new liveModel(init) });
		this.berry.on('saveing', function() {
			myStack.collection.add(this.options.model);
		});
		this.berry.options.model.on('sync', function() {
			this.trigger('change');
		});
	}
	function moveEvent(calEvent, delta, revertFunc) {
  	var temp = myStack.collection.findWhere({_id:calEvent.id});
  	var newValues = {};
  	newValues[get().start] = calEvent.start.format();
  	temp.set(newValues);
  }
  this.removeEvent = function(calEvent) {
		this.calendar.fullCalendar('removeEvents', calEvent);
  }
  function editEvent(calEvent, jsEvent, view) {
		this.calEvent = calEvent;
		this.berry = $().berry({actions:['save', 'cancel', 'remove'], legend: 'Edit:', model: myStack.collection.findWhere({_id: calEvent.id}) }).on('saved', function(){
      this.calEvent.title = this.berry.options.model.attributes[this.model.attributes.label]+'';
      this.calEvent.start = this.berry.options.model.attributes[this.model.attributes.start];
      this.calendar.fullCalendar('updateEvent', this.calEvent);
		}, this).on('remove', function(){
			// this.removeEvent.call(this, this.berry.options.model.attributes._id);
			// this.
			this.options.model.destroy()
			this.trigger('cancel');
		});
  }
  this.addEvent = function(model){
		this.calendar.fullCalendar('renderEvent', {
			id: model.attributes._id, 
			title: model.attributes[get().label]+'', 
			start: model.attributes[get().start],
		allDay: true}, true )
	}


	function render() {
		return '<div class="well" style="background-color:#fff;"><div id="calendar"></div></div>';
	}
	this.onload = function($el) {
		this.$el = $el;
					var dates = _.where(myStack.config.attributes.form, {type: 'date'});
					var firstDate = {name: 'createdAt'};
					if(dates.length){
						firstDate = dates[0];
					}
					var texts = _.where(myStack.config.attributes.form, {type: 'text'});
					var firstText = myStack.config.attributes.form[0];
					if(texts.length){
						firstText = texts[0];
					}
					// , function(item){return {label:item.label,value:item.name};})

				// this.model.attributes.start = ;
				// this.model.attributes.label = ;
				set({start: getIdentifier(firstDate),label: getIdentifier(firstText)})
				// this.model.attributes = this.calfields;
				// this.setElement(render(this.template, myStack.config.attributes));
				this.calendar = this.$el.find('#calendar');
				// this.model.on('change', this.onload, this);



				this.calendar= $('#calendar');
				this.calendar.fullCalendar('destroy');
				this.calendar.fullCalendar({
					 header: {
						left: 'prev,next today',
						center: 'title',
						right: 'month,basicWeek,basicDay'
				},
				editable: !(get().start == 'createdAt'),
				eventClick: $.proxy(editEvent, this),
				dayClick: $.proxy(createNew, this),
				eventDrop: $.proxy(moveEvent, this)
				});

				myStack.collection.each(function(model){
					var self = this;
					if(typeof model.attributes[get().start] !== 'undefined' && model.attributes[get().start].length > 0){
						this.calendar.fullCalendar( 'renderEvent', {id: model.attributes._id, title: model.attributes[get().label]+'', start: model.attributes[get().start], allDay: true} ,true )
						model.on('change',function(model,b){
							// debugger;
							this.removeEvent.call(this, model.attributes._id);
							this.addEvent(model);

						}, this);
					}
				},this);

				myStack.collection.on('add', function(model){
					if(model.attributes._id){
						this.addEvent(model);
					}else{
						this.temp = model;
						model.on('ready', function(){
							this.addEvent(this.temp);
						}, this);
					}
				}, this);

				myStack.collection.on('remove', function(model){
					this.removeEvent.call(this, model.attributes._id);
				},this)

	}
	function get() {
		item.widgetType = 'drupe_calendar_view';
		return item;
	}
	function toJSON() {
		return get();
	}
	function set(newItem){
		item = newItem;
	}
	var item = {
		widgetType: 'drupe_calendar_view',
	}
	var fields = {
		'Date Field': {
			type: 'select', 
			name: 'start',
			options: function() {
				var options = _.map(
				_.where(
					myStack.config.attributes.form, {type: 'date'}
				), function(item){return {label: item.label, value: getIdentifier(item)}});
				options.push({label: 'Created At', value: 'createdAt'});
				options.push({label: 'Updated At', value: 'updatedAt'});
				return options;
			}  
		}
	}
	return {
		container: container,
		fields: fields,
		render: render,
		toJSON: toJSON,
		onload: this.onload.bind(this),
		edit: berryEditor.call(this, container),
		get: get,
		set: set
	}
}
