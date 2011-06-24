winkstart.module('dashboard', 'monitor', {
		templates: {
			monitor: 'monitor.html'
		},
		
		subscribe: {
			'monitor.activate' : 'activate'
		}
	},
	function(args) {
            winkstart.publish('subnav.add', {module: this.__module, label: 'monitor', nav_category: 'category-3'});
	},
	{
                checkServerStatus: function() {

                    var on_success = function() {

                    };

                    winkstart.getJSON(some_url, some_params, on_success);
                },
		activate: function(args) {
			$(args.target).empty();
			
			var THIS = this, monitor = this.templates.monitor;
			monitor.delegate('[data-action]', 'click', function() {
				THIS[$(this).attr('data-action')].call(THIS);
				$(this).after('Server module loaded').remove();
				return false;
			});
			monitor.appendTo( args.target );
			winkstart.publish('layout.updateLoadedModule', {label: 'User Monitor', module: this.__module});
		},
		loadservers: function() {
			winkstart.module.load('server', function() {
				this.init();
			});
		}
	}
);
