//TODO rewrite as not a jQuery plugin

(function( $ ) {
	$.fn.guesswho = function(options) {
		var o = $.extend( {per_row:3, ordering:"asc", showMore:'on'}, options );		
		var that = this;
		var thresh = o.per_row;
		
		//get rid of this
		var links = {
			"Research with impact":"/about/our-strategy/key-areas/impact/",
			"Effectiveness and sustainability":"/about/our-strategy/key-areas/sustainability/",
			"Learning, teaching and the student experience":"/about/our-strategy/key-areas/experience/",
			"Partnerships and public engagement":"/about/our-strategy/key-areas/engagement/"
		};
		
		this.addClass("has-js");
		
		this.find("figure").append($('<a href="#">Show</a>').on("click", function(e){ 
			e.preventDefault();
		} ));
		
		this.find(".details[data-theme]").each(function(i) {
			var theme = $(this).data("theme");
			$(this).append('<a href="'+links[theme]+'" class="theme">'+theme+'</a>');
		});
		
				
		
		this.find("figure").on("click", function(){
			that.find(".details").not('[data-id="'+$(this).data('id')+'"]').hide();
			that.find("figure").not(this).removeClass('active');
			$(this).toggleClass('active');
			$('.details[data-id="'+$(this).data('id')+'"]').toggle();
			
			var $a = $(this).find("a");
			if ($a.html() === 'Show') {
				$a.html("Hide");
			} else {
				$a.html("Show");
			}
			
			if($(this).hasClass("active")){
				$(this).removeClass('inactive');
				$(this).siblings("figure").addClass('inactive');
			} else {
				$(".inactive").removeClass('inactive');
			}
			
			$(this).siblings("figure").find("a").html("Show");
			
		});
		
		this.guesswho_reflow({per_row:3});
		
		$(window).resize(function() {
			var w = $( window ).width();
			if( ((w >= 915)) && thresh !== 3){
				thresh = 3;
				$(".guess-who").guesswho_reflow({per_row:3});
			} else if( ((w >= 466) && (w <= 915)) && thresh !== 2){
				thresh = 2;
				$(".guess-who").guesswho_reflow({per_row:2});
			} else if((w < 466) && thresh !== 1) {
				thresh = 1;
				$(".guess-who").guesswho_reflow({per_row:1});
			}
		});

		return this;
	};
	
	$.fn.guesswho_reflow = function(options){
		var o = $.extend( {per_row:3}, options );
		var total = this.find("figure").length -1;
		var $temp = [];
		var that = this;
		
		//console.log("🔁 REFLOW " + o.per_row);

		this.find("figure").each(function(i) {
			var id = $(this).data('id');
			//console.log($(this).find(".fn").html(), id);
			$temp.push( $('.details[data-id="'+id+'"]').detach() );
			
			if(o.per_row === 1 || (i>0 && (i+1)%o.per_row === 0) || i===total) {
				for (var x in $temp){
					//console.log("Reattach #" + id)
					$(this).after($temp[x]);
				}
			 $temp = [];
			}
		});

		return this;

	}

	
})( jQuery );


