document.body.className  = "snow";
$(document).snowfall();

var clock;
var $clock = $('.clock');
var $soon = $('.soon');
var $message = $('.message');
var $confetti = $('#confetti');
var animations = ['bounce', 'pulse', 'rubberBand', 'swing', 'tada'];
var current_animation = 0;
var timeout = null;
var interval = 10000;

$(document).ready(function() {
	var currentDate = new Date();
	var futureDate  = new Date("December 10, 2021 18:00:00");
	var diff = (futureDate.getTime()- currentDate.getTime()) / 1000;
console.log(diff);
	clock = $clock.FlipClock(diff, {
		clockFace: 'DailyCounter',
		countdown: true,
		callbacks: {
			interval: function() {
				
				var time = this.factory.getTime().time;
				pulse();
				celebrate();
			}
		}
	});
});

function celebrate()
{
	$confetti.fadeIn();
	
	$soon.addClass('animated flipOutX');

	clearTimeout(timeout);
	setTimeout(function(){
		$message.addClass('animated flipInX').fadeIn();
		timeout = setTimeout(bounce, interval);
	}, 350);
}

function pulse()
{
	$clock.removeClass('animated flipInX flipOutX pulse');

	clearTimeout(timeout);
	timeout = setTimeout(function(){
		$clock.addClass('animated pulse');
	}, 50);
}

function bounce()
{
	clearTimeout(timeout);
	
	$message.removeClass('animated bounce flipInX pulse rubberBand swing tada');
	
	setTimeout(function(){ 
		$message.addClass('animated ' + animations[current_animation]);
		current_animation++;
		if(current_animation == animations.length)
		{
			current_animation = 0;
		}
	}, 100);
	
	timeout = setTimeout(bounce, interval);
}