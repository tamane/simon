// JavaScript Document
// freeCodeCamp Challenge - Simon Game
// May 2018
// Author: André Tamane

$(document).ready(function(){

	var count = 0;
	var colors = [0,1,2,3];
	var colorName = ["blue","red","green","yellow"];
	var random = [];
	var cpSelect = [];
	var plSelect = [];
	var cpClickCount = 0;
	var plClickCount = 0;
	var index = 0;
	var strict = false;
	
	// 0 = BLUE / 1 = RED / 2 = GREEN / 3 = YELLOW
	
	//ON/OFF BUTTON
	$('#ON_OFF').click(function(){
		if( $('#start').prop('disabled') === true && $('#strict').prop('disabled') === true ){
			$('#start').prop('disabled',false);
			$('#strict').prop('disabled',false);
			$(this).css('background-image','url("img/on.png")');
		}
		else{
			$('#start').prop('disabled',true);
			$('#strict').prop('disabled',true);
			$(this).css('background-image','url("img/off.png")');
		}
	});
	
	//STRICT MODE BUTTON
	$('#strict').click(function(){
		if( strict === false ){ 
			strict = true;
			$('#strict_span').text('ON');
			$('button#restart').css('display','block');
			$('button#continue_game').css('display','none');
			$(this).css('background-image','url("img/strict-on.png")');
		}
		else{ 
			strict = false;
			$('#strict_span').text('OFF');
			$('button#restart').css('display','none');
			$('button#continue_game').css('display','block');
			$(this).css('background-image','url("img/strict-off.png")');
		}
	});

	//START GAME BUTTON
	function start(){		
		//Select random color
		random = colors[Math.floor(Math.random() * colors.length)];
		//Put the selected color in cpSelect array
		cpSelect.push(random);
		//Show and Hide cpSelect color(s)
		lightOn(random,colorName[random],1);		
		//Number of CPU clicks
		cpClickCount = cpClickCount + 1;
	}
	
	//PLAYER CLICK
	function playerClick(){
		//Get the ID of the button selected
		plSelect.push(parseInt(this.id));		
		//Number of PLAYER clicks
		plClickCount = plClickCount + 1;
		//Compare the selected IDs
		compare();
	}
	
	//COMPARE ARRAYS – CPU x PLAYER
	function compare(){
		if (cpSelect[index] !== plSelect[index]) { 
				//GAME OVER
				gameover();			
			}
			else{
				//Correct! Continue game…
				continue_game();
			}
	}

	//CONTINUE AFTER GAME OVER
	$('#continue_game').click(function(){
		$('#gameover_layer').slideUp('fast');
		reset();
		//Show and Hide AGAIN cpSelect color(s)
		setTimeout(function(){
			for ( var i = 0; i < cpSelect.length; i++){
				lightOn(cpSelect[i],colorName[cpSelect[i]],i);
			}
		}, 2000);
	});

	//GAME OVER AND RESTART
	$('#restart').click(function(){
		$('#gameover_layer').slideUp('fast');
		reset();
		random = [];
		cpSelect = [];
		cpClickCount = 0;
		count = 0;
		$('#count').text(count);
		start();
	});
	
	//CONTINUE GAME
	function continue_game(){
		//If the CPU number of clicks is equal to PLAYER number of clicks:
		if( cpClickCount === plClickCount ){
			//Count +1
			count = count + 1;
			$('#count').text(count);			
			//Disable button
			$('.button').attr('disabled');
			//Reset PLAYER's choices and clicks
			reset();
			//Select new random color
			random = colors[Math.floor(Math.random() * colors.length)];
			//Add to CPU's choices array
			cpSelect.push(random);
			//Add 1 to CPU click counter
			cpClickCount = cpClickCount + 1;
			//Show and Hide cpSelect color(s)
			setTimeout(function(){
				for ( var i = 0; i < cpSelect.length; i++){
					lightOn(cpSelect[i],colorName[cpSelect[i]],i);
				}
			}, 1000);						
		}
		//If the CPU number of clicks IS NOT equal to PLAYER number of clicks:
		else{ index = index + 1; }		
	}
	
	//Reset PLAYER's choices and clicks
	function reset(){
		plSelect = [];
		plClickCount = 0;
		index = 0;
	}
	
	//Show and Hide cpSelect color(s)
	function lightOn(a,b,c) {
		setTimeout( function(){$( '#' + a ).css( 'background-image', 'url("img/'+b+'-pressed.png")'); $('#simonSound' + a).get(0).play();}, c * 1000);
		setTimeout( function(){$( '#' + a ).css( 'background-image', 'url("img/'+b+'.png")');}, c * 1000 + 1000);
		//Enable buttons
		$('.button').removeAttr('disabled');
	}

	//GAME OVER
	function gameover(){
		$('.button').attr('disabled');
		$('#gameOverSound').get(0).play();
		$('#gameover_layer').slideDown('slow');
	}

	//START GAME
	$('#start').click(start);
	$('#start').mousedown(function(){ $(this).css("background-image","url('img/start-pressed.png')"); }).mouseup(function(){ $(this).css("background-image","url('img/start.png')"); });

	//PLAYER CLICK
	$('.button').click(playerClick);
	$('#0').mousedown(function(){ $(this).css("background-image","url('img/blue-pressed.png')"); $('#simonSound0').get(0).play(); }).mouseup(function(){ $(this).css("background-image","url('img/blue.png')"); });
	$('#1').mousedown(function(){ $(this).css("background-image","url('img/red-pressed.png')"); $('#simonSound1').get(0).play();}).mouseup(function(){ $(this).css("background-image","url('img/red.png')"); });
	$('#2').mousedown(function(){ $(this).css("background-image","url('img/green-pressed.png')"); $('#simonSound2').get(0).play();}).mouseup(function(){ $(this).css("background-image","url('img/green.png')"); });
	$('#3').mousedown(function(){ $(this).css("background-image","url('img/yellow-pressed.png')"); $('#simonSound3').get(0).play();}).mouseup(function(){ $(this).css("background-image","url('img/yellow.png')"); });
	
});