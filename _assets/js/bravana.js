$(document).ready( function() {

	/*--------------------------------/
	/* NAVIGATION
	/*-------------------------------*/

	$(window).bind('load resize', function() {
		checkNavByScreenSize();
	});

	function checkNavByScreenSize() {
		// mobile main navigation
		if( $(window).width() < 993 ) {

			// reset padding-top since navbar-fixed-top is disabled
			$('body').css('padding-top', 0);

			// dropdown menu in navbar-fixed-top can't be scrolled, so we disabled it in mobile screen (EXCEPT for one-page template)
			if($('.navbar-default').hasClass('navbar-fixed-top') && $('.navbar-default .nav-onepage').length <= 0) {
				$('.navbar-default').removeClass('navbar-fixed-top');
			}

			// re-enable dropdown cart toggle
			$('.dropdown-cart .dropdown-toggle').removeClass('disabled');
			$('ul.main-navbar-nav > li > .dropdown-toggle').removeClass('disabled');
		} else {

			// body padding-top adjustment for page with navbar-fixed-top
			if($('.navbar').hasClass('navbar-fixed-top') && !$('.navbar').hasClass('ignore-paddingtop')) {
				$('body').css('padding-top', $('.navbar-fixed-top').innerHeight());
			}

			// re-enable navbar-fixed-top
			if($('.navbar-default').hasClass('ignore-paddingtop')) { // ignore-paddingtop class indicating that it's or it should a fixed-top nav
				$('.navbar-default').addClass('navbar-fixed-top');
			}

			// disable toggle
			$('.dropdown-cart .dropdown-toggle').addClass('disabled');
			$('ul.main-navbar-nav > li > .dropdown-toggle').addClass('disabled');
		}

		// sidebar navigation on mobile
		if($('.sidebarnav-toggle').length > 0) {
			var navWidth = $('#sidebar-nav').width();

			if( $(window).width() < 767 ) {
				$('#sidebar-nav').css({'left': -navWidth});
			} else {
				$('#sidebar-nav').css({'left': 'inherit'});
				navWidth = 0;
			}

			$('.sidebarnav-toggle').on('click', function() {
				if($('#sidebar-nav').hasClass('active')) {
					$('#sidebar-nav').css({'left': -navWidth});
					$('#sidebar-nav').removeClass('active');
				} else {
					$('#sidebar-nav').css({'left': 0});
					$('#sidebar-nav').addClass('active');
				}
			});
		}
	}

	// submenu dropdown click event
	$('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(e) {
		e.preventDefault(); 
		e.stopPropagation(); 
		$(this).parent().siblings().removeClass('open');
		$(this).parent().toggleClass('open');
	});

	// hide collapsible menu once menu item clicked 
	$('.nav-onepage li a').click( function() {
		var navbarCollapse = $(this).parents('.navbar-collapse.collapse');

		if(navbarCollapse.hasClass('in')) {
			navbarCollapse.collapse('hide');
		}
	});

	// full transparent fixed-top navbar should have background when scrolled
	if($('.navbar-fixed-top.navbar-no-background').length > 0) {
		$(window).scroll(function() {
			if($(document).scrollTop() > 100) {
				$('.navbar-fixed-top').removeClass('navbar-no-background');
			}else {
				$('.navbar-fixed-top').addClass('navbar-no-background');
			}
		});
	}

	// transparent fixed-top navbar should have solid background when scrolled
	if($('.navbar-fixed-top.navbar-transparent').length > 0) {
		$(window).scroll(function() {
			if($(document).scrollTop() > 100) {
				$('.navbar-fixed-top').removeClass('navbar-transparent');
			}else {
				$('.navbar-fixed-top').addClass('navbar-transparent');
			}
		});
	}

	if($('.navbar-auto-hiding').length > 0) {
		$('.navbar-auto-hiding').autoHidingNavbar();
	}

	if($('.navbar-fixed-top.navbar-shrinkable').length > 0) {
		$(window).scroll(function() {
			if($(document).scrollTop() > 300) {
				$('.navbar-fixed-top').addClass('shrink-active');
			}else {
				$('.navbar-fixed-top').removeClass('shrink-active');
			}
		});
	}


	/*--------------------------------/
	/* SIDEBAR NAVIGATION TOGGLE
	/*-------------------------------*/

	$('.submenu-toggle').click( function() {
		if(!$(this).parent().hasClass('active')) {
			$(this).parent().addClass('active');
		} else {
			$(this).parent().removeClass('active');
		}
	});

	$('.sidebar-nav a').click( function() {
		$('.sidebar-nav a').removeClass('current');
		$(this).addClass('current');
	});


	/*-----------------------------------/
	/* ICON LIST
	/*----------------------------------*/

	if($('.fontawesome-icon-list').length > 0) {
		$('.fontawesome-icon-list a').on('click', function(e) {
			e.preventDefault();
		});

		new Clipboard('.fontawesome-icon-list a', {
			text: function(trigger) {
				var ahref = trigger.getAttribute('href');
				return ahref.replace('#', 'fa fa-');
			}
		}).on('success', function(e) {
			var tooltipObj = $(e.trigger).tooltip({
				title: 'copied!',
				placement: 'bottom',
				trigger: 'click',
			});

			tooltipObj.tooltip('show');
			setTimeout(function() {
				tooltipObj.tooltip('hide');
			}, 1000);
		});
	}


	/*-----------------------------------/
	/* BOOTSTRAP PROGRESS BAR
	/*----------------------------------*/

	if($('.progress .progress-bar').length > 0) {
		$('.progress .progress-bar').progressbar({
			display_text: 'fill'
		});

		$('.progress.no-percentage .progress-bar').progressbar({
			display_text: 'fill',
			use_percentage: false
		});

		$('.progress.custom-format .progress-bar').progressbar({
			display_text: 'fill',
			use_percentage: false,
			amount_format: function(p, t) {return p + ' of ' + t;}
		});
	}


	/*-----------------------------------/
	/* MODAL
	/*----------------------------------*/

	if($('#subscribe-modal').length > 0) {
		$dialogShown = false;

		$(this).on('mouseleave', function(e) {
			if(e.clientY < 0 && !$dialogShown) {
				$('#subscribe-modal').modal('show');
				$dialogShown = true;
			}
		});

		$('.modal-subscription .btn-close, .modal-subscription .link-close, .modal-backdrop').on('click', function() {
			$('#subscribe-modal').modal('hide');
		});
	}


	/*-----------------------------------/
	/* TOOLTIPS, POPOVERS
	/*----------------------------------*/

	if($('[data-toggle="tooltip"]').length > 0) {
		$('[data-toggle="tooltip"]').tooltip();
	}

	if($('[data-toggle="popover"]').length >0) {
		$('[data-toggle="popover"]').popover();
	}

});
