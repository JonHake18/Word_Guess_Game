var wins = 0;
var losses = 0;
var guesses = 8;
var wordDisplay = document.getElementById("wordDisplay");
var chances = document.getElementById("chances");
var winCount = document.getElementById("wins");
var lossCount = document.getElementById("losses");
var guessedLetters = document.getElementById("letters");
var validGuesses = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", " "];
var game = new Hangman();

document.onkeyup = function(event) {
	var userGuess = event.key;

	if (!game.gameOver) {
		if (validGuesses.includes(userGuess) && !game.guessedLetters.includes(userGuess)) {
			game.checkGuess(userGuess);
		}
	} else {
		game = new Hangman();
		game.updatePageData();
	};
};

function Hangman() {
	this.words = ["macarena", "nirvana", "titanic", "matrix", "clueless", "fresh prince", "spice girls", "furby", "friends", "michael jordan", "green day", "weezer", "social distortion", "the offspring", "bad religion", "nofx", "red hot chili peppers", "radiohead", "third eye blind", "stone temple pilots", "the smashing pumpkins", "live", "everclear", "bush", "alice in chains", "backstreet boys", "hanson", "nsync", "britney spears", "christina aguilera", "billy ray cyrus", "shania twain", "garth brooks", "metallica", "jurassic park", "independence day", "the lion king", "forrest gump", "the sixth sense", "men in black", "armageddon", "ghost", "aladdin", "twister", "saving private ryan", "home alone", "pretty woman", "the matrix", "tarzan", "dances with wolves", "the mummy", "the bodyguard"]

	this.word = this.words[Math.floor(Math.random() * this.words.length)];
	this.guessedLetters = [];
	this.errors = 0;
	this.visibleLetters = [];
	this.gameOver = false;
	for (var i = 0; i < this.word.length; i++) {
		this.visibleLetters[i] = (false);
	};
};

Hangman.prototype.checkGuess = function(char) {
	this.guessedLetters.push(char);

	var isInWord = false;
	for (var i = 0; i < this.word.length; i++) {
		if (this.word.charAt(i) === char) {
			isInWord = true;
			this.visibleLetters[i] = true;
		}
	}
	if (!isInWord) {
		this.errors++;
	}

	if (this.errors >= guesses) {
		losses++;
		this.gameOver = true;
	}

	if (!this.visibleLetters.includes(false)) {
		wins++;
		this.gameOver = true;
	}

	game.updatePageData();
};

Hangman.prototype.updatePageData = function() {
	var tempString = "";
	for (var i = 0; i < this.visibleLetters.length; i++) {
		tempString += ((this.visibleLetters[i] || this.gameOver) ? this.word.charAt(i).toUpperCase() : "_");
		if (i < (this.visibleLetters.length - 1)) tempString += " ";
    }
    
	wordDisplay.textContent = tempString;

	tempString = "";
	for (var i = 0; i < this.guessedLetters.length; i++) {
		tempString += (this.guessedLetters[i].toUpperCase());
		if (i < (this.guessedLetters.length - 1)) tempString += " ";
    }
    
	for (var i = tempString.length; i < 51; i++) {
		tempString += " ";
	}
	guessedLetters.textContent = tempString;

	tempString = this.errors + " / " + guesses;
	for (var i = tempString.length; i < 32; i++) {
		tempString += " ";
	}
	chances.textContent = tempString;

	tempString = wins + "";
	for (var i = tempString.length; i < 45; i++) {
		tempString += " ";
	}
	winCount.textContent = tempString;

	tempString = losses + "";
	for (var i = tempString.length; i < 43; i++) {
		tempString += " ";
    }
}

game.updatePageData();