(function () {
    // This variable counts the number of matches up to 8 when the game ends.
    var matches = 0

    // This Array will contain the objects with a source and id from 0 to 7.
    var images = [];

    // This array will contain cards that are flipped.
    var flippedCards = [];

    // This will target an image saying that the game is over.
    var modalGameOver = document.querySelector("#modalGameOver")

    // This variable will target an image to show when the players matches 2 cards.
    var imgMatchSign = document.querySelector('#imgMatchSign')

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

    function startGame() {

        //Reseting the counter.
        matches = 0;

        //This command will shuffle the cards.
        images = randomSort(images);

        //This will empty the array with flipped cards.
        flippedCards = [];

        //Targeting elements div with "back" and "front" as a class.
        var frontFaces = document.getElementsByClassName('front');
        var backFaces = document.getElementsByClassName('back');

        // Displaying the cards on the HTML file according to the id number (vertically) .
        for (var i = 0; i < 16; i++) {

            var card = document.querySelector('#card' + i)
            if (i < 4) {
                card.style.top = 20 + 'px'
            } else if (i >= 4 && i < 8) {
                card.style.top = 200 + 'px'
            } else if (i >= 8 && i < 12) {
                card.style.top = 380 + 'px'
            } else {
                card.style.top = 560 + 'px'
            }
            // Displaying the cards on the HTML file according to the id number (horizontally) .
            if (i)
                card.style.left = i === 0 || i === 4 || i === 8 || i === 12 ? 20 + 'px' : i % 4 * 160 + 20 + 'px';
            
                // on click cards will  answer to function called to flip the cards
            card.addEventListener('click', flipCard, false);


        }
        // It takes "match" and "flipped" class from the targeted cards.
        for (var i = 0; i < 16; i++) {
            frontFaces[i].classList.remove('flipped', 'match');
            backFaces[i].classList.remove('flipped', 'match');

            //It adds an image to each card 
            frontFaces[i].style.background = "url('assets/" + images[i].src + "')";
            frontFaces[i].setAttribute("id", images[i].id);

        }
        // It puts the Game Over Image at the very bacl of the HTML file.
        modalGameOver.style.zIndex = "-2";

        // It removes the event click 
        modalGameOver.removeEventListener('click', startGame, false);
    }

    function randomSort(oldArray) {
        var newArray = [];

        while (newArray.length !== oldArray.length) {
            var i = Math.floor(Math.random() * oldArray.length);

            if (newArray.indexOf(oldArray[i]) < 0) {
                newArray.push(oldArray[i])
            }
        }
        return newArray;
    }



    function flipCard() {
        if (flippedCards.length < 2) {
            var faces = this.getElementsByClassName('face');

            if (faces[0].classList.length > 2) {
                return;
            }

            faces[0].classList.toggle('flipped');
            faces[1].classList.toggle('flipped');

            flippedCards.push(this);

            if(flippedCards.length === 2){
                if(flippedCards[0].childNodes[3.].id === flippedCards[1].childNodes[3].id){
                    flippedCards[0].childNodes[1].classList.toggle('match');
                    flippedCards[0].childNodes[3].classList.toggle('match');
                    flippedCards[1].childNodes[1].classList.toggle('match');
                    flippedCards[1].childNodes[3].classList.toggle('match'); 

                    matchCardSign();

                    matches++;

                    flippedCards = [];

                    if(matches === 8){
                        gameOver();
                    }
                }
            }


        } else {
            flippedCards[0].childNodes[1].classList.toggle('flipped');
            flippedCards[0].childNodes[3].classList.toggle('flipped');
            flippedCards[1].childNodes[1].classList.toggle('flipped');
            flippedCards[1].childNodes[3].classList.toggle('flipped');

            flippedCards = [];
        }

    }

   

    function gameOver() {
        modalGameOver.style.zIndex = 10;
        modalGameOver.addEventListener('click', startGame, false);
    }

    function matchCardSign() {
        imgMatchSign.style.zIndex = 1;
        imgMatchSign.style.top = 150 + 'px';
        imgMatchSign.style.opacity = 0;
        setTimeout(function(){  
            imgMatchSign.style.zIndex = -1;
            imgMatchSign.style.top = 250 + 'px';
            imgMatchSign.style.opacity = 1;

        }, 1500);
    }

}());


            