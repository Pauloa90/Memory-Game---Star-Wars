(function () {
    //On this section I defnied all variables that I will need before the game starts//


    // This variable counts the number of matches up to 8 when the game ends.
    var matches = 0

    // This Array will contain the objects with a source and id from 0 to 7.
    var images = [];

    var sucess = document.getElementById('sucess')
    
    var sound = document.getElementById('sound')
    function soundtrack(){
        sound.play();
    }
    function playAudio() {
        sucess.play();

    }
    // This array will contain cards that are flipped.
    var turnedcards = [];

    // These variables will target the piece of information to be displayed (Timer, Score and Flips and Button - Instructions))
    var timer = document.getElementById('timer')
    var counter = 0

    var flips = document.getElementById('flips')
    var counterf = 0

    var score = document.getElementById('score')
    scorepoints = 0
    var bestscore = document.getElementById('bestscore')
    arrayscore = [];

    // Targeting modal Instructions
    var modalinstructions = document.getElementById("modalinstructions");
    var instructions = document.getElementById('instructions')
    var closeinstructions = document.getElementsByClassName("closeinstructions")[0];




    // When the user clicks on the button, open the modal
    instructions.onclick = function () {
        modalinstructions.style.display = "block";
    }

    // When the user clicks on <span> (x), it closes the modal
    closeinstructions.onclick = function () {
        modalinstructions.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modalinstructions) {
            modalinstructions.style.display = "none";
        }
    }

    var interval = null
    var submit = document.getElementById('submit')
    var contactbutton = document.getElementById('contactbutton')
    var modalcontactid = document.getElementById('modalcontactid')
    var contactForm = document.getElementById('contactForm')


    contactbutton.onclick = function () {
        modalcontactid.style.display = "block";
    }

    submit.onclick = function () {
        modalcontactid.style.display = "none";

    }

    window.onclick = function (event) {
        if (event.target == modalcontactid) {
            modalcontactid.style.display = "none";
        }
    }



    // Targeting modal Play Again
    var modalplayagain = document.getElementById("modalplayagain");
    var playagain = document.getElementById("playagain");
    var closeplayagain = document.getElementsByClassName("closeplayagain")[0];
    var tryagain = document.getElementById('tryagain')

    // When the user clicks on <span> (x), close the modal
    closeinstructions.onclick = function () {
        modalinstructions.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modalinstructions) {
            modalinstructions.style.display = "none";
        }
    }



    // This structure will set an attribute “source” and “id” to each card and then, those
    // will be put into an array "image".
    for (var i = 0; i < 16; i++) {
        var img = {
            src: "images/" + i + ".jpg",
            id: i % 8
        }
        images.push(img);
    } console.log(images);


    //That function calls the initialization of the game.
    startGame();
    soundtrack();
    function startGame() {
        //The timer and Flips Counter will be reset
        counter = 0;
        counterf = 0;
        flips.innerHTML = counterf;
        matches = 0;

        //This command will shuffle the cards.
        images = randomSort(images);

        //This will empty the array with flipped cards.
        turnedcards = [];

        //Targeting elements div with "back" and "front" as a class.
        var frontFaces = document.getElementsByClassName('front');
        var backFaces = document.getElementsByClassName('back');

        //This function will increase the second in "1"
        interval = setInterval(ValueCount, 1000);

        function ValueCount() {
            counter++;
            timer.innerHTML = `${counter} s`;
        }


        // Displaying the cards on the HTML file according to the id number (vertically) .
        for (var i = 0; i < 16; i++) {

            var card = document.querySelector('#card' + i)
            if (i < 4) {
                card.style.top = 1 + 'vh'
            } else if (i >= 4 && i < 8) {
                card.style.top = 16 + 'vh'
            } else if (i >= 8 && i < 12) {
                card.style.top = 31 + 'vh'
            } else {
                card.style.top = 46 + 'vh'
            }

            // Displaying the cards on the HTML file according to the id number (horizontally) .
            if (i)
                card.style.left = i === 0 || i === 4 || i === 8 || i === 12 ? 2 + 'vh' : i % 4 * 12 + 2 + 'vh';

            // on click cards will  answer to function called to flip the cards
            card.addEventListener('click', turncard, false);
            
           
        }

        // It takes "match" and "flipped" classes from the targeted cards.
        for (var i = 0; i < 16; i++) {
            frontFaces[i].classList.remove('flipped', 'match');
            backFaces[i].classList.remove('flipped', 'match');

            //It adds an image to each card 
            frontFaces[i].style.background = "url('assets/" + images[i].src + "')center";
            frontFaces[i].style.backgroundSize = "cover";
            frontFaces[i].setAttribute("id", images[i].id);
        }

        //It will make the modal game over disappear
        modalplayagain.style.display = "none";
    }

    // This function will shuffle the cards every time that the page is loaded.
    function randomSort(oldArray) {

        //It will create an empty array.
        var newArray = [];

        // The new array must have the same number of elements as the old array 
        while (newArray.length !== oldArray.length) {
            var i = Math.floor(Math.random() * oldArray.length);

            // This condition will check if the  elements of the index "i" exists in the new array.
            if (newArray.indexOf(oldArray[i]) < 0) {
                newArray.push(oldArray[i])
            }
        }
        return newArray;
    }

    // This function will flip the cards.
    function turncard() {
        
        //For every click, the flips counter will be increased by one.
        counterf++;
        flips.innerHTML = counterf;

        // This will verify if there are more than 2 cards flipped.
        if (turnedcards.length < 2) {
            var faces = this.getElementsByClassName('face');

            // That condition will check if the card is alreade flipped.
            if (faces[0].classList.length > 2) {
                return;
            }

            // This function will add a class "flipped" to the cards linking them to sheet style.
            faces[0].classList.toggle('flipped');
            faces[1].classList.toggle('flipped');

            //That function will put the card clicked into the array of flipped cards.
            turnedcards.push(this);

            //It verifes if the number of flipped cards is 2.
            if (turnedcards.length === 2) {

                // It verifies if the cards have the same id.

                if (turnedcards[0].childNodes[3.].id === turnedcards[1].childNodes[3].id) {

                    // If the cards match a class "match" will be added to them.
                    turnedcards[0].childNodes[1].classList.toggle('match');
                    turnedcards[0].childNodes[3].classList.toggle('match');
                    turnedcards[1].childNodes[1].classList.toggle('match');
                    turnedcards[1].childNodes[3].classList.toggle('match');




                    // It increases the counter in one.
                    matches++;

                    //It empties the array of flipped cards.
                    turnedcards = [];

                    //Score logic
                    scorepoints = (matches * 30000) / (counter * counterf)

                    // When the number of matches is equal to 8, it will call the function "gameOver"
                    if (matches === 8) {
                        gameOver();
                        playAudio();
                    }
                }
            }


        } else {

            // This condition will make the third click flip the cards in case they dont match.
            turnedcards[0].childNodes[1].classList.toggle('flipped');
            turnedcards[0].childNodes[3].classList.toggle('flipped');
            turnedcards[1].childNodes[1].classList.toggle('flipped');
            turnedcards[1].childNodes[3].classList.toggle('flipped');

            //It empties the array of flipped cards.
            turnedcards = [];
        }

    }


    // This function will reset all the parameters
    function gameOver() {

        scorepoints = (matches * 30000) / (counter * counterf)
        console.log(matches)
        console.log(counter)
        console.log(counterf)

        scorepoints = parseInt(scorepoints)

        //The modal game over appears
        modalplayagain.style.display = "block";
        tryagain.innerHTML = `<p>Your Score is <strong>${scorepoints}!</strong> Let's try again? </p>`


        playagain.addEventListener('click', startGame, false);
        playagain.addEventListener('click', StopTimer, false);
        closeplayagain.addEventListener('click', startGame, false);
        closeplayagain.addEventListener('click', StopTimer, false);
        

        instructions.style.display = "none";
        function StopTimer() {
            clearInterval(interval)

        }

        arrayscore.push(scorepoints)

        console.log(arrayscore)
        let maxscore = arrayscore[0];
        let minscore = arrayscore[0];

        for (var player in arrayscore) {
            if (arrayscore[player] > maxscore) {
                maxscore = arrayscore[player]
            }
        }
        score.innerHTML = `${maxscore}`
        bestscore.innerHTML = `Best Score:`
        // It adds the event "clicl" to the image "Game Over"
        //modalGameOver.addEventListener('click', startGame, false);
    }
}());


