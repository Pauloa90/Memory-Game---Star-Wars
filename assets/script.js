//anonneiou funcition
(function(){
    var pics = [];
for (var i =0; i< 16; i ++){
    var img = {
        src : "img/"+ i + ".jpg",
        id : i%8  
    };
    pics.push(img);
}


    startGame();

    function startGame(){

        var frontFaces = document.getElementsByClassName('front')

 // Displaying the cards on the HTML file acoording to the id number
        for (var i = 0; i < 16; i++){
            
            var card = document.querySelector('#card'+i)
            if (i < 4){
                card.style.top = 20 + 'px'
            } else if (i >= 4 && i < 8){
                card.style.top = 200 + 'px'
            } else if (i >= 8 && i < 12){
                card.style.top = 380 + 'px'
            } else {
                card.style.top =560 + 'px'
            }
            if (i )
            card.style.left = i  === 0 || i === 4 || i === 8  || i === 12 ? 20 + 'px' : i % 4 * 160 +20+ 'px';
            
            card.addEventListener('click', flipCard, false);
            frontFaces[i].style.background = "url('" + pics[i].src + "')";
            
            

        }
    }
    function flipCard(){
        var faces = this.getElementsByClassName('face');
        faces[0].classList.toggle('flipped');
        faces[1].classList.toggle('flipped');
        
    }






}());