

const orginal = ["collide", "leaveYourLife", "shivers"]; 

var music = ["collide", "leaveYourLife", "shivers"]; 



var player1Score = 0;
var player2Score = 0;
var turns = 1;
var isMusic = false;
var isCorrect = false;







//random Indx
var randomSongIdx = Math.floor(Math.random() * music.length)
var curSong = music[randomSongIdx]

var audio = new Audio('../static/Music/' + curSong + '.mov');



// play Music
function playMusic(){
    
    isMusic = true;
    curSong = music[randomSongIdx];
    audio.src = '../static/Music/' + curSong + '.mov'
    

    console.log('../static/Music/' + curSong + '.mov')
   
    audio.play();
   
    setTimeout(function(){
        audio.pause()
        isMusic = false;
     
    }, 30000)

    delete music[randomSongIdx];

    randomSongIdx = Math.floor(Math.random() * music.length)
   


   
    

}


//switch colors of the button
function switchColors(id){
    var classList = $('#' + id).attr('class');
    if (classList.includes('player1Bt') || classList.includes('player2Bt')){
        alert('already')
    }else{
        console.log(classList);
  
        $("#" + id).addClass('player' + turns + 'Bt');

    }
    switchTurns();

   
}

//switch turns of the player

function switchTurns(){
    if (turns === 1){
        turns = 2;
    }else{
        turns = 1;
    }
    


}

//check if the input is correct
function isRight(){
    $('#p' + turns + 'Input').textContent

}

//check if the button already has a class, so user can't click on it
function isAdd(button){
    var classList = $(button).attr('class').split(/\s+/);
    return classList.includes('player1Bt') || classList.includes('player2Bt');

}

$('.button').click(function(){
    var id = $(this).attr('id');
    $('#' + id).fadeIn(100).fadeOut(100).fadeIn(100)
    
    if (!isMusic && !isAdd(this)){
        switchColors(id);
        playMusic();

    }
 
  
       
});


//Getting the input Value

function returnText(num){
    let input = document.getElementById('input' + num).value
    console.log(input.replace(/\s+/g, '').toUpperCase(),curSong.toUpperCase() )
    if (input.replace(/\s+/g, '').toUpperCase() == curSong.toUpperCase()){
        updateScore(num);
        audio.pause();
        isMusic = false;
        
       
    }

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