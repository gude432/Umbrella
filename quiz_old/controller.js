$(document).ready(function () {
	
var questionNumber=0;
var questionBank=new Array();
var stage="#game1";
var stage2=new Object;
var questionLock=false;
var numberOfQuestions;
var score=0;
var point;
var right;
		 
 		$.getJSON('activity.json', function(data) {

		for(i=0;i<data.questions.easy.length;i++){ 
			questionBank[i]=new Array;
			questionBank[i][0]=data.questions.easy[i].question;
			questionBank[i][1]=data.questions.easy[i].option1;
			questionBank[i][2]=data.questions.easy[i].option2;
			questionBank[i][3]=data.questions.easy[i].option3;
			questionBank[i][4]=data.questions.easy[i].option4;
		}
		 numberOfQuestions=questionBank.length; 
		 //numberOfQuestions=30 ;		 
		displayQuestion();
		})

function displayQuestion(){
 var rnd=Math.random()*4;
rnd=Math.ceil(rnd);
 var q1;
 var q2;
 var q3;
 var q4;
 var rightAudio = $("#mysoundclip")[0];
    console.log(rightAudio);
  var wrongAudio = $("#myWrongSoundClip")[0];
  console.log(wrongAudio);

if(rnd==1){
	q1=questionBank[questionNumber][1];
	q2=questionBank[questionNumber][2];
	q3=questionBank[questionNumber][3];
	q4=questionBank[questionNumber][4];
}
if(rnd==2){
	q2=questionBank[questionNumber][1];
	q3=questionBank[questionNumber][2];
	q1=questionBank[questionNumber][3];
	q4=questionBank[questionNumber][4];
}
if(rnd==3){
	q3=questionBank[questionNumber][1];
	q1=questionBank[questionNumber][2];
	q2=questionBank[questionNumber][3];
	q4=questionBank[questionNumber][4];
}
if(rnd==4){
	q4=questionBank[questionNumber][1];
	q1=questionBank[questionNumber][2];
	q2=questionBank[questionNumber][3];
	q3=questionBank[questionNumber][4];
}


$(stage).append('<div class="questionText">'+questionBank[questionNumber][0]+'</div><div id="1" class="option">'+q1+'</div><div id="2" class="option">'+q2+'</div><div id="3" class="option">'+q3+'</div><div id="4" class="option">'+q4+'</div>');
  $(stage).append('<div id="scoreBar"></div>');
 $('.option').click(function(){
  if(questionLock==false){
  	questionLock=true;	
  //correct answer
  
  if(this.id==rnd){
   $(stage).append('<div class="feedback1">Correct!</div>');
    rightAudio.play();
    score++;
	
   point = ((score/numberOfQuestions)*100);
   point = Math.ceil( point ); 
   

    document.getElementById("score").innerHTML= "Score:" +score*10+ "";
} 
  //wrong answer	
  if(this.id!=rnd){
   $(stage).append('<div class="feedback2">Not Correct, The answer is:</div>');
   wrongAudio.play();
   
   point = ((score/numberOfQuestions)*100);
   point = Math.ceil( point ); 
   document.getElementById("score").innerHTML= "Score:" +score*10+ "";
   right = [q1,q2,q3,q4];
   $(stage).append('<div class="feedback1">'+right[rnd-1]+'</div>');
   setTimeout(function(){  },2000);	//display explanation for some seconds
  }
  setTimeout(function(){changeQuestion()},2000);
 }})
}//display question


	function changeQuestion(){
		
		questionNumber++;
	
	if(stage=="#game1"){
		stage2="#game1";
		stage="#game2";
	}
		else{
			stage2="#game2";
			stage="#game1";
		}
	
	if(questionNumber<numberOfQuestions)
	{
		displayQuestion();
	}
	else{
		displayFinalSlide();
	}
	
	 $(stage2).animate({"right": "+=800px"},"slow", function() {$(stage2).css('right','-800px');$(stage2).empty();});
	 $(stage).animate({"right": "+=800px"},"slow", function() {questionLock=false;});
	//change question
	}

	
	
	function displayFinalSlide(){
		var msg1 = "Well done!";
		var msg2 = "Good!";
		var msg3 = "You can do better!";
		var msg4 = ".....";

		var grade;
		var please = "";
		
		if ((point >= 75) && (point<100)) {
			grade = "A"; 
			$(stage).append('<div class="stars"><img src="img/3stars.png"></div>');
			$(stage).append('<div class="questionText"><p id="congrats"></p> '+msg1+'</div>');
			};
		if ((point>=50) && (point<75)) {
			grade = "B"; 
			$(stage).append('<div class="stars"><img src="img/2stars.png"></div>');
			$(stage).append('<div class="questionText"><p id="congrats"></p> '+msg2+'</div>');
			};
		
		if ((point>=0) && (point<50)){ grade = "C";
			$(stage).append('<div class="stars"><img src="img/1stars.png"></div>');
			$(stage).append('<div class="questionText"><p id="tryPlease"> ' +please+ '</p> '+msg3+' </div>'); 
			};
				if(numberOfQuestions==score)
		{
		

		$(stage).append('<div class="questionText"><p id="congrats"></p> '+msg4+'</div><br><br>');
		
		}
		else{
			$(stage).append('<div class="questionText"><p id="tryPlease"> ' +msg4+ '</p> </div><br><br>');
		}
		
		
		}//display final slide
        

	});//doc ready