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

    var timer = document.getElementById('timer')
    var counter = 0
    var flips = document.getElementById('flips')
    var counterf = 0

    //Score
    score = 0
    
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

        setInterval(function(){
            counter++;
            timer.innerHTML = `${counter} s`;
        }, 1000)
        
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
            card.addEventListener('click', flipCard, false);


        }
        // It takes "match" and "flipped" class from the targeted cards.
        for (var i = 0; i < 16; i++) {
            frontFaces[i].classList.remove('flipped', 'match');
            backFaces[i].classList.remove('flipped', 'match');

            //It adds an image to each card 
            frontFaces[i].style.background = "url('assets/" + images[i].src + "')center";
            frontFaces[i].style.backgroundSize = "cover";
            frontFaces[i].setAttribute("id", images[i].id);

        }
        // It puts the Game Over Image at the very bacl of the HTML file.
        modalGameOver.style.zIndex = "-2";

        // It removes the event click from the Game Over image.
        modalGameOver.removeEventListener('click', startGame, false);
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
    function flipCard() {
       
        
        counterf++;
        flips.innerHTML = counterf;
        
        // This will verify if there are more than 2 cards flipped.
        if (flippedCards.length < 2) {
            var faces = this.getElementsByClassName('face');

            // That condition will check if the card is alreade flipped.
            if (faces[0].classList.length > 2) {
                return;
            }

            // This function will add a class "flipped" to the cards linking them to sheet style.
            faces[0].classList.toggle('flipped');
            faces[1].classList.toggle('flipped');

            //That function will put the card clicked into the array of flipped cards.
            flippedCards.push(this);

            //It verifes if the number of flipped cards is 2.
            if(flippedCards.length === 2){
                // It verifies if the cards have the same id.
                if(flippedCards[0].childNodes[3.].id === flippedCards[1].childNodes[3].id){
                    // If the cards match a class "match" will be added to them.
                    flippedCards[0].childNodes[1].classList.toggle('match');
                    flippedCards[0].childNodes[3].classList.toggle('match');
                    flippedCards[1].childNodes[1].classList.toggle('match');
                    flippedCards[1].childNodes[3].classList.toggle('match'); 
                    
                    //It calls the function showing the Match message.
                    matchCardSign();

                    // It increases the counter in one.
                    matches++;

                    //It empties the array of flipped cards.
                    flippedCards = [];

                    score = (matches*30000)/(counter*counterf)
                    console.log(matches)
                    console.log(counter)
                    console.log(counterf)

                    // When the number of matches is equal to 8, it will call the function "gameOver"
                    if(matches === 8){
                        gameOver();
                    }
                }
            }


        } else {

            // This condition will make the third click flip the cards in case they dont match.
            flippedCards[0].childNodes[1].classList.toggle('flipped');
            flippedCards[0].childNodes[3].classList.toggle('flipped');
            flippedCards[1].childNodes[1].classList.toggle('flipped');
            flippedCards[1].childNodes[3].classList.toggle('flipped');

            //It empties the array of flipped cards.
            flippedCards = [];
        }

    }
    
    
    // This function will reset all the parameters
    function gameOver() {
        document.alert(`${score}`)
        // It pulls the message "Game Over" to the front of the page.
        modalGameOver.style.zIndex = 10;

        // It adds the event "clicl" to the image "Game Over"
        modalGameOver.addEventListener('click', startGame, false);
    }

    // This function will make a message come up when the cards matches.
    function matchCardSign() {
        // It brings the message/image to the front.
        imgMatchSign.style.zIndex = 1;
        imgMatchSign.style.top = 150 + 'px';
        imgMatchSign.style.opacity = 0;
        // This function will make the message last just 1.5 second and go back to the back
        // the html file.
        setTimeout(function(){  
            imgMatchSign.style.zIndex = -1;
            imgMatchSign.style.top = 250 + 'px';
            imgMatchSign.style.opacity = 1;

        }, 1500);
    }
    

}());


            