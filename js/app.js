$(document).ready(function(){

var questions = [
{question: "Which one of these is a JavaScript Framework?",
 choices: ["Burn.JS","Ember.JS","Fire.JS","Salsa.JS"],
 quesNum: 1,
 correctAns: 1},

 {question: "How do you invoke jQuery?",
 choices: ["$()","$$$","$","$())"],
 quesNum: 2,
 correctAns: 0},

 {question: "Which one of these is NOT a jQuery command?",
 choices: [".DoSomething",".remove",".addClass",".Append"],
 quesNum: 3,
 correctAns: 0},

 {question: "Which is an OO JS principal?",
 choices: ["Scaling","Closures","Hoisting","Polymorphism"],
 quesNum: 4,
 correctAns: 3},

 {question: "What is the full-stack JavaScript Language?",
 choices: ["Express","Node.JS","Mongo","Cordova"],
 quesNum: 5,
 correctAns: 1},

 {question: "What is the correct syntax to call a JavaScript file?",
 choices: ["script name=", "script file=", "script src=", "script href="],
 quesNum: 6,
 correctAns: 2},

 {question: "How do you create a Function in JavaScript?",
 choices: ["function:myFunction()", "function myFunction()", "function:function", "function = myFunction()"],
 quesNum: 7,
 correctAns: 1},

 {question: "How does a FOR loop start?",
 choices: ["for (i <=5; i++", "for i= 1 to 5", "for (i = 0; i <= 5; i++)", "for(i = 0; i < 5;)"],
 quesNum: 8,
 correctAns: 2},
 
 {question: "What is the correct way to add JavaScript comments?",
 choices: ["??", "//" , "/**/", "<-- -->"],
 quesNum: 9,
 correctAns: 1},

 {question: "Onclick is equivalent to which two events in sequence?",
 choices: ["onmouseover & onmousedown", "onmousedown & onmouseout", "&onmousedown & onmouseup", "onmouseup & onmouseout"],
 quesNum: 10,
 correctAns: 2},
 ];

 //Question Tracker 
 $("div#main p:first").text("Question " + questions[0].quesNum + " of " + questions.length);

 //Global Variables
 var questionNumber = 0;
 var correctAnswers = 0;
 var counter = 0;
 var userAnswers = new Array();

 //On Submit Button
 $("button#submit").on("click",function(){ 		 	
 	checkAnswer();
 	questionNumber++;

 	if(questionNumber === questions.length){
 	 	$(this).css("display","none");
 	 	$("#review").css("display","block"); 	 	
	}
	else {
		nextQuestion();	
	};	
 });

//On Review Button
$("button#review").on("click",function(){
 	fade("#main","fast","#review",1000);
	reviewQuestions(); 	
 });

//On Restart Quiz Button
$("button#restart").on("click",function(){	
 	restart();
 	nextQuestion();
})

//Utility function for fading out sections
function fade(sectionOut, speed1, sectionIn, speed2){
	$(sectionOut).fadeOut(speed1);
	$(sectionIn).fadeIn(speed2);
}

//Move to next question - update question & answers
function nextQuestion(){
	$("div#main p:first").text("Question " + questions[questionNumber].quesNum + " of " + questions.length);
	$("#quizQuestions").text(questions[questionNumber].question);

	var multChoice = $.each(questions[questionNumber].choices,function(index,value){value});
	$("#QuizSection label").remove();
	$.each(multChoice,function(index,value){
		$("#QuizSection").append("<label class='radio'><input type='radio' name='check' data-ans=" + index +">"+value+"</label>");
		});				                  
	}

//Check user answer against correct answer - store user answer & keep count fo right or wrong answers
function checkAnswer(){
	var userAns = $("input[type=radio]:checked").data("ans");
	userAnswers.push(userAns);
	
 	if(userAns === questions[counter].correctAns) {
 		correctAnswers++;
 	} 
	counter++;
	}

//Review questions 
function reviewQuestions(){
	$("#Review h1,#Review p,#Review label").remove();
	$("#Review").prepend("<h1>You Got " + correctAnswers + " Out Of " + questions.length + " Questions Right!</h1>").show();

	for(var i = 0; i < questions.length; i++){
		$("#Review").append("<p class='Review'>Question " + questions[i].quesNum +"</p>" + 
			"<p id='q" + i + "'" + "><span class='wrong'>&#33;</span><span class='right'>&#36;</span>" +
			questions[i].question + "<span id='rightAns'>&nbsp;&nbsp;The right answer is " 
			+ questions[i].choices[questions[i].correctAns] + "</p>");
		
		var multChoice = $.each(questions[i].choices,function(index,value){value});
		$.each(multChoice,function(index,value){
			$("#Review").append("<label class='radio'><input type='radio' name='check' data-ans=" + index +">"+value+"</label>");
			});

		if(userAnswers[i] === questions[i].correctAns){
			$("#q"+i+" span.right").show();
		}else {
			$("#q"+i+" span.wrong").show();
			}
		}
	}

//Restart Quiz
function restart(){
	questionNumber = 0;
 	correctAnswers = 0;
 	counter = 0;
 	userAnswers = new Array();	
 	$("#submit").css("display","block");
 	$("#restart").css("display","none");
 	$("#review").css("display", "none");
 	fade("#Review",50,"#main",1000);
}


});