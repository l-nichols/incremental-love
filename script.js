$(document).ready(function() {
	const standard = new ADNotations.StandardNotation();
	ADNotations.Settings.isInfinite = decimal => decimal.gte(1000000000);

	// Variables
	var prevTimeStamp = null;
	var alertShown = false;
	var totalTimePlayed = 0;
	var love = 10000000;

	// Timers
	var chat = {on: false, timerLeft: 0, id: "#chat", simpleID: "chat", quantity: 1, basecost: 15, duration: 1, basevalue: 1, value: 1, description: "Chat", automated: false};
	var cuddle = {on: false, timerLeft: 0, id: "#cuddle", simpleID: "cuddle", quantity: 0, basecost: 200, duration: 5, basevalue: 15, value: 15, description: "Cuddle", automated: false};
	var hang = {on: false, timerLeft: 0, id: "#hang", simpleID: "hang", quantity: 0, basecost: 3000, duration: 15, basevalue: 300, value: 300, description: "Hang Out", automated: false};
	var adventure = {on: false, timerLeft: 0, id: "#adventure", simpleID: "adventure", quantity: 0, basecost: 50000, duration: 5, basevalue: 2000, value: 2000, description: "Adventure", automated: false};
	var timers = [];


	// Cards
	var chat1 = {purchased: false, unlocked: false, id: "chat1", cost: 50, threshold: 5, name: "First Conversation", description: "Doubles the Value of Conversation", flavor: "From the beginning of our relationship, conversation was so easy between us." }
	var chat2 = {purchased: false, unlocked: false, id: "chat2", cost: 200, threshold: 10, name: "I Like... Like you, Like you", description: "Makes Conversation Faster", flavor: "I'd only known you for a couple weeks, but I was so saddened by the idea that I wouldn't see you again that I cried when I sent you the text saying we shouldn't see each other again."}
	var chat3 = {purchased: false, unlocked: false, id: "chat3", cost: 20000, threshold: 50, name: "Deep Conversation", description: "Doubles the Value of Conversation", flavor: "We discuss difficult topics openly and honestly. Let's face it. We're amazing at communication."}
	var chat4 = {purchased: false, unlocked: false, id: "chat4", cost: 10000000, threshold: 300, name: "Memories of Conversations Under the Stars", description: "Increases Effectiveness of Chatting Based on Number of Adventures Had", flavor: "Night walks. Sitting on a bench in the park or the beach on a starlit night. Just talking and looking at the stars together."}

	var cuddle1 = {purchased: false, unlocked: false, id: "cuddle1", cost: 1000, threshold: 2, name: "Ant Man and Wasp", description: "Doubles the Value of Cuddling", flavor: "We held hands, and I felt like a nervous teenager on a date instead of a fully grown adult."}
	var cuddle2 = {purchased: false, unlocked: false, id: "cuddle2", cost: 2500, threshold: 5, name: "Emoji Cuddles", description: "Cuddling now takes 1/4 the time.", flavor: "I never saw myself as someone who needed or wanted sappy text messages or hearts and flowers and to text each other all day long, but I was wrong. Two years on and I still get excited every time I see hearts from you on Messenger."}
	var cuddle3 = {purchased: false, unlocked: false, id: "cuddle3", cost: 7500, threshold: 15, name: "The Cuddle Selfie", description: "Doubles the Value of Cuddling", flavor: "A big step. Possibly the biggest we've ever taken. Selfie cuddle sent to friends. We need to show the world how disgustingly affectionate we are."}
	var cuddle4 = {purchased: false, unlocked: false, id: "cuddle4", cost: 250000000, threshold: 300, name: "Valentine's Picnic Under the Stars", description: "Increases Effectiveness of Cuddling Based on Number of Adventures Had", flavor: "Valentine's day. A starlit picnic under the stars. It was cold, but we kept each other warm."}

	var hang1 = {purchased: false, unlocked: false, id: "hang1", cost: 10000, threshold: 5, name: "Anime Night", description: "Doubles the Value of Hanging Out", flavor: "I know I sleep through half the anime nights we have, so it might seem like I don't like them. But I like sharing in what you love, and I love that you want me there."}
	var hang2 = {purchased: false, unlocked: false, id: "hang2", cost: 25000, threshold: 8, name: "You'll Watch It And Love It. No Pressure.", description: "Triples the Value of Hanging Out", flavor: "Sharing the movies and TV shows that I love with the person I love is great, but watching the things that are important to you is amazing."}
	var hang3 = {purchased: false, unlocked: false, id: "hang3", cost: 50000, threshold: 12, name: "Games", description: "Quadruples the Value of Hanging Out", flavor: "Zelda, Atelier, Incremental games, MMOs, Diablo. I fucking love you."}
	var hang4 = {purchased: false, unlocked: false, id: "hang4", cost: 500000000, threshold: 300, name: "Valentine's Under the Stars", description: "Increases Effectiveness of Hanging Out Based on Number of Adventures Had", flavor: "I want to spend every Valentine's day with you."}

	var adventure1 = {purchased: false, unlocked: false, id: "adventure1", cost: 30000, threshold: 1, name: "Rennaissance Faire", description: "Doubles the Value of Adventuring", flavor: "I remember watching you watch the performers. You were so delighted and happy. It made me want to show you everything I've ever loved to just see you react to it."}
	var adventure2 = {purchased: false, unlocked: false, id: "adventure2", cost: 60000, threshold: 2, name: "Paint a Friend's House", description: "Doubles the Value of Adventuring", flavor: "The key to a successful relationship is forced manual labor on one of the first dates. Right???"}
	var adventure3 = {purchased: false, unlocked: false, id: "adventure3", cost: 150000, threshold: 3, name: "Camping", description: "Doubles the Value of Adventuring", flavor: "I thought I hated camping. Turns out it's amazing and magical when you're with the right person."}
	var adventure4 = {purchased: false, unlocked: false, id: "adventure4", cost: 300000, threshold: 4, name: "Dancing", description: "Doubles the Value of Adventuring", flavor: "I never though of myself as the dancing type. I still don't, but I love dancing with you, and I never want to stop."}
	var adventure5 = {purchased: false, unlocked: false, id: "adventure5", cost: 500000, threshold: 5, name: "Theater", description: "Doubles the Value of Adventuring", flavor: "I spent nearly the entire first opera performance we ever went to watching you watch the opera. I love how much you enjoy people's performances, and I want to be there with you when you do."}
	var adventure6 = {purchased: false, unlocked: false, id: "adventure6", cost: 750000, threshold: 6, name: "Vacation", description: "Doubles the Value of Adventuring", flavor: "20-some-odd hours in a car? All the more time to listen to an audiobook! I love traveling with you. I have so many places I want to go with you and share together."}
	var adventure7 = {purchased: false, unlocked: false, id: "adventure7", cost: 1000000, threshold: 7, name: "MMO", description: "Doubles the Value of Adventuring", flavor: "A long term commitment. Sharing an entire virtual existence together."}
	var adventure8 = {purchased: false, unlocked: false, id: "adventure8", cost: 1000000000, threshold: 15, name: "Watching a Million Stars on Rock Island", description: "A magical night to remember.", flavor: "I want to spend the rest of our lives together making more magical moments."}
	var chatCards = [chat1, chat2, chat3, chat4];
	var cuddleCards = [cuddle1, cuddle2, cuddle3, cuddle4];
	var hangCards = [hang1, hang2, hang3, hang4];
	var adventureCards = [adventure1, adventure2, adventure3, adventure4, adventure5, adventure6, adventure7, adventure8];

	// Functions


	// Main Game Loop
	// Calculates time difference between last game loop
	// Updates stats - sends number of seconds passed
	// Requests animation frame and calls the game loop again
	function gameLoop(timeStamp) {

		// Calculate the number of seconds since last request
		if (!prevTimeStamp) prevTimeStamp = timeStamp;
		var secondsPassed = (timeStamp - prevTimeStamp) / 1000;
		prevTimeStamp = timeStamp;
		updateStats(secondsPassed);

		window.requestAnimationFrame(gameLoop);
	}

	// Takes number of seconds as argument
	// Adds loop time on to total time played
	// Updates Timers, Timer Values
	// Checks unlocks
	function updateStats(timeElapsed) {
		totalTimePlayed += timeElapsed;
		timers.forEach(item => updateTimer(item, timeElapsed));
		timers.forEach(item => updateValue(item));
		timers.forEach(item => checkUnlocks(item));
	}


	// Only runs if timer is on
	// Checks if timer has completed and: 
		// Adds love earned based on value
		// If timer is automated, resets timer
		// If timer is a parent timer, toggles automation off for child when completed
		// Resets timer to 0 if not automated
	// If not complete
		// Updates progress bar
	// Updates inventory
	function updateTimer(timer, timeElapsed) {
		if (timer.on) {
			if (timer.timerLeft > 0) {
				timer.timerLeft -= timeElapsed;
			}
			if (timer.timerLeft <= 0) {
				love += timer.value;
				if (timer.automated == true) {
					timer.timerLeft = timer.duration;
				}
				else {
					if (timer == cuddle) {
						chat.automated = false;
					}
					if (timer == hang) {
						cuddle.automated = false;
					}

					if (timer == adventure) {
						hang.automated = false;
					}

					timer.on = false
					$( timer.id ).width("0%");
				}
			}
		
			else {
				var chatWidth = 100 - (timer.timerLeft / timer.duration * 100);
				$( timer.id ).width(chatWidth+"%");
			}
			$(' #inventory ').html('<p>Love: ' + standard.format(love,1,0));
		}
	}


	// Updates value based on quantity of timers purchased and basevalue
	// Checks for final card purcahses and updates timer values based on that
	function updateValue(timer) {
		timer.value = timer.quantity * timer.basevalue;
		if (chat4.purchased) {
			chat.value *= adventure.quantity;
		}

		if (cuddle4.purchased) {
			cuddle.value *= adventure.quantity;
		}

		if (hang4.purchased) {
			hang.value *= adventure.quantity;
		}

		if (adventure8.purchased) {
			adventure.value = adventure.basevalue * (adventure.quantity + chat.quantity + cuddle.quantity + hang.quantity)
			endGame();
		}
 	}


 	// Checks card arrays for unlock thresholds 
 	// Creates a new card if met and sets item to unlocked
 	// Could be refactored to reduce duplication
	function checkUnlocks(timer) {
		if (timer == chat) {
			chatCards.forEach(item => {
				if (chat.quantity >= item.threshold && item.unlocked == false) {
					createNewCard(item);
					item.unlocked = true;
				}
			});
		}
		
		if (timer == cuddle) {
			cuddleCards.forEach(item => {
				if (cuddle.quantity >= item.threshold && item.unlocked == false) {
					createNewCard(item);
					item.unlocked = true;
				}
			})
		}

		if (timer == hang) {
			hangCards.forEach(item => {
				if (hang.quantity >= item.threshold && item.unlocked == false) {
					createNewCard(item);
					item.unlocked = true;
				}
			})
		}

		if (timer == adventure) {
			adventureCards.forEach(item => {
				if (adventure.quantity >= item.threshold && item.unlocked == false) {
					createNewCard(item);
					item.unlocked = true;
				}
			})
		}
	}

	// Changes value based on cards
	// Unlocks timers if certain cards are bought
	// Updates all values
	function purchaseCard(card) {
		card.purchased = true;

		switch(card) {

			case chat1:
			case chat3:
				chat.basevalue *= 2;
				break;
			case chat2:
				chat.duration = chat.duration/2;
				chat.timerLeft = chat.timerLeft/2;
				createNewTimer(cuddle);
				break;
			case cuddle1:
			case cuddle3:
				cuddle.basevalue *= 2;
				break;
			case cuddle2:
				cuddle.duration = cuddle.duration / 4;
				cuddle.timerLeft = cuddle.timerLeft / 4;
				createNewTimer(hang);
				break;
			case hang1:
				hang.basevalue *= 2;
				break;
			case hang2:
				hang.basevalue *= 3;
				createNewTimer(adventure);
				break;
			case hang3:
				hang.basevalue *= 4;
				break;
			case adventure1:
			case adventure2:
			case adventure3:
			case adventure4:
			case adventure5:
			case adventure6:
				adventure.basevalue *= 2;
				break;
			case adventure7:
				adventure.basevalue *= 2;
				if (chat4.unlocked == false) {
					chat4.unlocked = true;
					createNewCard(chat4);
				}
				if (cuddle4.unlocked == false) {
					cuddle4.unlocked = true;
					createNewCard(cuddle4);
				}

				if (hang4.unlocked == false) {
					hang4.unlocked = true;
					createNewCard(hang4);
				}
				break;
			default:
				console.log("Something went very wrong. Where did you get this card?");
		}

		timers.forEach(item => updateValue(item));
	}

	// Turns a timer on if not already on
	// If parent timer, switches on its child's automation
	function makeTimerGo(timer) {
		if (timer.on == false && timer.quantity > 0) {
			timer.timerLeft = timer.duration
			timer.on = true;
			if (timer == cuddle) {
			chat.automated = true;
			makeTimerGo(chat);
			}

			if (timer == hang) {
				chat.automated = true;
				cuddle.automated = true;
				makeTimerGo(cuddle);
			}

			if (timer == adventure) {
				hang.automated = true;
				makeTimerGo(hang);
			}
		}

		
	}

	function showAlertOnce() {
		if (alertShown == false) {
			$( "#timerArea" ).append('<div class="alert alert-danger alert-dismissible fade show" role="alert">You do not have enough love for this yet. Keep going!<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
			alertShown = true;
		}
	}

	// Creates an html timer grouping consisting of progress bar and timer buttong and buy button with event listeners
	function createNewTimer(timer) {
		var htmlString = '<div class="row"><div class="col-3 text-right"><button id="' + timer.simpleID + 'Button" type="button" class="btn btn-dark">' + timer.description + '</button></div><div class="col-6"><div class="progress"><div class="progress-bar" id="' + timer.simpleID + '" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div></div><div class="col-3"><button id="'+timer.simpleID+'Buy" class="btn btn-dark">Buy ('+standard.format(calculateCurrentCost(timer),1,0)+')</button></div></div>'
        $(' #timerArea ').append(htmlString);
        timers.push(timer);
        $(' #' + timer.simpleID + 'Button' ).click(function() {
        	makeTimerGo(timer);
        })
        $(' #' + timer.simpleID + 'Buy' ).click(function() {
        	buy(timer);
        })
	}

	// Creates a html card grouping consisting of a front and a back, text and a button along with event listener
	function createNewCard(card) {
		var htmlString = '<div class="card mb-4"><div id="' + card.id + 'parent" class="flip-card"><div class="flip-card-inner"><div class="flip-card-front"><div class="card-body"><h5 class="card-title">' + card.name + '</h5><p class="card-text">' + card.description + '</p><button id="' + card.id + '">Buy (' + standard.format(card.cost,1,0) + ')</button></div></div><div class="flip-card-back"><div class="card-body"><h5 class="card-title">' + card.name + '</h5><p class="card-text">' + card.flavor + '</p></div></div></div></div></div>'
		$(' #cardArea ').prepend(htmlString);
		$('#' + card.id).click(function() {
			if (love >= card.cost) {
  				$('#' + card.id + 'parent').toggleClass('flipped');
  				love -= card.cost;
  				updateInventory();
  				purchaseCard(card);
  			}
  			else {
  				showAlertOnce();
			}
  		})
	}

	// Updates the love display
	function updateInventory() {
		$(' #inventory ').html('<p>Love: ' + standard.format(love,1,0));
	}

	// Check if enough love
	// Increments quantity
	// Updates value based on new quantity
	// Updates text on corresponding buttons 
	// Updates inventory
	function buy(timer) {
		currentCost = calculateCurrentCost(timer);
		if (love >= currentCost) {
			love -= currentCost;
			timer.quantity += 1;
			timer.value = timer.quantity * timer.basevalue;
			$( "#" + timer.simpleID + "Buy" ).html("Buy ("+standard.format(calculateCurrentCost(timer),1,0)+")");
			$(' #' + timer.simpleID + 'Button' ).html(timer.description + " (" + timer.quantity + ")")
			updateInventory();
		}
		else {
			showAlertOnce();
		}
	}

	// Increase price of adventure timer by factor of 1.5 and other timers by a factor of 1.12
	function calculateCurrentCost(timer) {
		if (timer == adventure ) {return Math.round(timer.basecost * Math.pow(1.5, timer.quantity))}
		else {return Math.round(timer.basecost * Math.pow(1.12, timer.quantity))};
	}

	// Show proposal modal pop up
	function endGame() {
		$('#marryMe').modal('show');
	}

  //Start the Game

  createNewTimer(chat);
  
  window.requestAnimationFrame(gameLoop);

  });
