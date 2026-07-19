/* =====================================================
   TRANSPETRO 2026
   SIMULADOR ÊNFASE 4 - INFORMÁTICA

   APP.JS
===================================================== */



/* ==========================
   NAVEGAÇÃO
========================== */


function showSection(id){


document
.querySelectorAll(".page")
.forEach(section=>{

section.classList.add("hidden");

});


document
.getElementById(id)
.classList.remove("hidden");


}




/* ==========================
   DATA DA PROVA
========================== */


const examDate =
new Date("2026-12-01");



function updateDays(){


let today =
new Date();



let diff =
examDate - today;



let days =
Math.ceil(
diff /
(1000*60*60*24)
);



document
.getElementById(
"daysRemaining"
)
.innerText =
days;



}


updateDays();









/* ==========================
   VARIÁVEIS SIMULADO
========================== */


let current = 0;


let selectedQuestions=[];


let answers=[];


let timer;


let seconds=0;









/* ==========================
   INICIAR SIMULADO
========================== */



document
.getElementById(
"startSimulation"
)
.onclick=function(){



let quantity =
Number(
document
.getElementById(
"questionQuantity"
)
.value
);



startExam(quantity);



};







function startExam(quantity){



selectedQuestions =
shuffle(
questions
)
.slice(
0,
quantity
);



answers =
new Array(quantity)
.fill(null);



current=0;



seconds =
Number(
document
.getElementById(
"examTime"
)
.value
)
*60;



document
.getElementById(
"simulationArea"
)
.classList
.remove("hidden");



showQuestion();


startTimer();



}










/* ==========================
   EMBARALHAR QUESTÕES
========================== */


function shuffle(array){


return array
.sort(
()=>Math.random()-0.5
);


}









/* ==========================
   MOSTRAR QUESTÃO
========================== */


function showQuestion(){



let q =
selectedQuestions[current];



document
.getElementById(
"currentQuestion"
)
.innerText =
current+1;



document
.getElementById(
"questionContent"
)
.innerHTML =

`

<h3>
${q.disciplina}
-
${q.assunto}
</h3>


<p>
${q.enunciado}
</p>

`;





let area =
document
.querySelector(
".answer-options"
);



area.innerHTML="";




q.alternativas
.forEach(
(alt,index)=>{


let button =
document
.createElement(
"button"
);



button.innerHTML =

`

${String.fromCharCode(65+index)})
${alt}

`;



button.onclick=function(){


selectAnswer(index);


};



if(
answers[current]===index
){

button
.classList
.add(
"answer-selected"
);

}



area
.appendChild(button);



}

);



}










/* ==========================
   SELECIONAR RESPOSTA
========================== */


function selectAnswer(index){


answers[current]=index;



showQuestion();



}









/* ==========================
   NAVEGAÇÃO QUESTÕES
========================== */


document
.getElementById(
"nextQuestion"
)
.onclick=function(){


if(
current <
selectedQuestions.length-1
){

current++;

showQuestion();


}

else{


finishExam();


}



};







document
.getElementById(
"previousQuestion"
)
.onclick=function(){



if(current>0){


current--;


showQuestion();


}



};









/* ==========================
   CRONÔMETRO
========================== */


function startTimer(){



clearInterval(timer);



timer =
setInterval(()=>{



seconds--;



let min =
Math.floor(
seconds/60
);



let sec =
seconds%60;



document
.getElementById(
"timer"
)
innerText =

`

${String(min)
.padStart(2,"0")}

:

${String(sec)
.padStart(2,"0")}

`;



if(seconds<=0){


finishExam();


}



},1000);



}











/* ==========================
   FINALIZAR
========================== */


function finishExam(){



clearInterval(timer);



let correct=0;



selectedQuestions
.forEach(
(q,i)=>{


if(
answers[i]===q.correta
){

correct++;

}


}

);




let total =
selectedQuestions.length;



let wrong =
total-correct;



let percent =
Math.round(
(correct/total)*100
);




document
.getElementById(
"correctAnswers"
)
.innerText =
correct;



document
.getElementById(
"wrongAnswers"
)
.innerText =
wrong;



document
.getElementById(
"finalScore"
)
.innerText =
percent+"%";




generateAnswerKey();



saveResult(
percent
);



showSection(
"resultado"
);



}









/* ==========================
   GABARITO
========================== */


function generateAnswerKey(){


let html="";



selectedQuestions
.forEach(
(q,i)=>{


html +=

`

<p>

${i+1})

Resposta correta:

<strong>

${String.fromCharCode(
65+q.correta
)}

</strong>

<br>

Sua resposta:

<strong>

${
answers[i]!==null
?
String.fromCharCode(
65+answers[i]
)
:
"Não respondeu"

}

</strong>

</p>

`;



});



document
.getElementById(
"answerKey"
)
.innerHTML =
html;



}











/* ==========================
   SALVAR RESULTADO
========================== */


function saveResult(percent){



localStorage
.setItem(
"ultimoResultado",
percent
);



document
.getElementById(
"performance"
)
.innerText =
percent+"%";



document
.getElementById(
"progressBar"
)
.style.width =
percent+"%";



}








/* ==========================
   QUESTÕES RESOLVIDAS
========================== */


function loadProgress(){



let result =
localStorage
.getItem(
"ultimoResultado"
);



if(result){


document
.getElementById(
"performance"
)
.innerText =
result+"%";


document
.getElementById(
"progressBar"
)
.style.width =
result+"%";



}



}



loadProgress();









/* ==========================
   GRÁFICO SIMPLES
========================== */


let canvas =
document
.getElementById(
"studyChart"
);



if(canvas){


let ctx =
canvas
.getContext(
"2d"
);



ctx.font =
"18px Arial";



ctx.fillText(
"Seu desempenho será atualizado após os simulados",
40,
80
);



}
