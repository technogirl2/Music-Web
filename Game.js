
var music = ["collide", "leaveYourLife", "shivers", 'allOfTheStars', 'castleOnTheHill', 'celestial',
'newMan', 'oneLife', 'saltWater', 'shivers']; 

var curButton;
var player1Score = 0;
var player2Score = 0;
var turns = 1;
var isMusic = false;
var isCorrect = false;

var isUpdate = false;
var player1Array = []
var player2Array = []









//random Indx
var randomSongIdx = Math.floor(Math.random() * music.length)
var curSong = music[randomSongIdx]

var audio = new Audio('Music/' + curSong + '.mov');



// starting the game


// play Music
function playMusic(){
    
    isMusic = true;
    curSong = music[randomSongIdx];
    audio.src = 'Music/' + curSong + '.mov'
    

    console.log('Music/' + curSong + '.mov')
  
   
    audio.play();

    music.splice(randomSongIdx, 1);

    randomSongIdx = Math.floor(Math.random() * music.length)
    console.log(music, randomSongIdx)


   
    

}


//switch colors of the button
function switchColors(id){

    isUpdate = false;
    
    var classList = $('#' + id).attr('class');
    if (classList.includes('player1Bt') || classList.includes('player2Bt')){
        alert('already')
    }else{

       
        $("#" + id).addClass('player' + turns + 'Bt');

        if (turns == 1){
            player1Array.push(id);
        }else{
            player2Array.push(id);
        }
       

  
     

    }
  
    switchTurns();
    isCorrect = false;
 
  

   
}

//switch turns of the player

function switchTurns(){
    if (turns === 1){
        turns = 2;
        
    }else{
        turns = 1;
    }
    
    


}


//check if the button already has a class, so user can't click on it
function isAdd(button){
    var classList = $(button).attr('class').split(/\s+/);
    return classList.includes('player1Bt') || classList.includes('player2Bt');

}

$('.button').click(function(){
 
    var id = $(this).attr('id');
    curButton =  id;
    $('#' + id).fadeIn(100).fadeOut(100).fadeIn(100)

    
    if (!isMusic && !isAdd(this)){
    
        switchColors(id);
        isMusic = true;
        playMusic();
     
        

    }

    console.log(player1Array);
    console.log(player2Array);
    

   
  


});

audio.addEventListener("ended", function(){
    audio.currentTime = 0;

    console.log(curButton)
    if(!isCorrect){
        k = turns == 1 ? 2: 1;
        $('#' + curButton).removeClass('player' + (k) +'Bt');
        music.push(curSong);

        if (k == 1){
            player1Array.pop()
        }else{
            player2Array.pop()
        }


    }
   
    console.log('player' + (turns) +'Bt')
    isMusic = false;
    console.log("ended");
    isCorrect = false;

    isWin();

});


//Getting the input Value

function returnText(num){
    let input = document.getElementById('input' + num).value
    //check if the user got it right
   
    //ensure the score only added once
    console.log(input.replace(/\s+/g, '').toUpperCase(),curSong.toUpperCase() )
    //ensure the user can only get points when the music is playing
    if (input.replace(/\s+/g, '').toUpperCase() == curSong.toUpperCase() && isMusic){
        if (!isUpdate){
            updateScore(num);
            isUpdate = true;
            isCorrect = true;

        }
    
        
        audio.pause();
        isWin();
        isMusic = false;

    }

    isCorrect = false;
    document.getElementById('input' + num).value = '';



}




//update score
function updateScore(num){
    if (num == "1"){
        player1Score += 1
        $('#p1Score').text(player1Score.toString())
    }else{
        player2Score += 1
        $('#p2Score').text(player2Score.toString())
    }
}





// checking if wins

function winning(array){
    if(array.length < 3){
        return false;
    }

   if (array.includes('one') && array.includes("two") && array.includes('three')){
     return true;
    }else if (array.includes('five') && array.includes("four") && array.includes('six')){
        return true;
    }else if (array.includes('seven') && array.includes("eight") && array.includes('nine')){
        return true;
    }else if (array.includes('five') && array.includes("nine") && array.includes('one')){
        return true;
    }else if (array.includes('five') && array.includes("seven") && array.includes('three')){
        return true;
    }else if (array.includes('four') && array.includes("one") && array.includes('seven')){
        return true;
    }else if (array.includes('two') && array.includes("five") && array.includes('eight')){
        return true;
    }else if( array.includes('three') && array.includes("six") && array.includes('nine')){
        return true
    }
    return false;
    
   

  

}

//check if wins



function restartGame(){
    n = $('.btn');
    for (i = 0; i < n.length; i ++){

        $(n[i]).addClass('button');


    }
    $('.happy2').addClass('happy')
    $('.happy2').removeClass('happy2')
    
    $('#restart').addClass('restart')
      
    $('#restart').removeClass('restart2')
    

    $('.grid-container2').addClass('grid-container')
    $('.grid-container2').removeClass('grid-container2')


    player1Score = 0
    player1Score = 0

    $('#p1Score').text(player1Score.toString())
    $('#p2Score').text(player1Score.toString())
    
    turns = 1;
    isMusic = false;
    isCorrect = false;

    isUpdate = false;
    player1Array = []
    player2Array = []

    music = ["collide", "leaveYourLife", "shivers", 'allOfTheStars', 'castleOnTheHill', 'celestial',
'newMan', 'oneLife', 'saltWater', 'shivers']; 

}


function stopGame(){
    n = $('.button');
    var i = 0
    while (i < n.length){
        $(n[i]).removeClass('button');
        $(n[i]).removeClass('player1Bt');
        $(n[i]).removeClass('player2Bt');

        i++;


    }
  
    $('.happy').addClass('happy2')
    $('.happy').removeClass('happy');
    
    $('.grid-container').addClass('grid-container2');
    $('.grid-container').removeClass('grid-container');
    $('#restart').addClass('restart2');
    $('#restart').removeClass('restart')

  
}

$('#restart').click(function(){
    restartGame();


});

function isWin(){
    if (winning(player1Array)){
        console.log('player1');
        $('.text').text('player1 Wins! Press restart button to restart the Game.');
       
        stopGame();
        $('.happy2').text('Game Over, Player1 Wins')
        

    }else if (winning(player2Array)){
        $('.text').text('player2 Wins! Press restart button to restart the Game.');
        stopGame();
        $('.happy2').text('GameOver, Player2 Wins')
    }else if ((player1Array.length + player2Array.length == 9)){
        $('.text').text('Tie,  Press Any Keys to Restart the Game.');
        stopGame();
        $('.happy2').text('Tie! You guys are both loyal!')


    }


  
}
