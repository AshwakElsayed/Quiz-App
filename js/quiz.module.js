export class Quiz{
    constructor(result){
    //--------------Global Property    
        this.result = result;
        console.log(result);
        this.currentIndex= 0;
        document.getElementById('to').innerText = this.result.length;
        this.from = document.getElementById('from') ;
        this.question=document.getElementById('questionTitle');
        this.questionContent=document.getElementById('questionContent');
        this.correctAnswers;
        this.showQuestions();
        this.score= 0 ;
        //--------Events
        
        document.getElementById('nextQuestion').addEventListener('click' , () =>{
            this.nextQuestion();
        })
        document.getElementById('end').addEventListener('click' , ()=> {
            location.reload();
        })
        
    }
    showQuestions(){
        this.from.innerText = this.currentIndex + 1;
        this.currentQuestion=this.result[this.currentIndex];
        this.question.innerText=this.currentQuestion.question;
        console.log(this.currentQuestion);
        const answer = [...this.currentQuestion.incorrect_answers];
        this.correctAnswers = this.currentQuestion.correct_answer;
        console.log(answer , this.correctAnswers);
        const randomNumber= Math.ceil(Math.random() *answer.length);
        answer.splice(randomNumber , 0 , this.correctAnswers)
        console.log(randomNumber);

        let answersBox = ``
        for (let i = 0; i < answer.length; i++) {
           answersBox +=`
           <li class="my-3 animate__animated">
         <div class="pretty p-default p-round p-smooth p-plain">
            <input type="radio" name="answer" value="${answer[i]}" />
            <div class="state p-success-o">
               <label> ${answer[i]} </label>
            </div>
         </div>
      </li>`
            
        }
        this.questionContent.innerHTML= answersBox ;
    }
    
    nextQuestion(){
       const currentAns =document.querySelector('[name="answer"]:checked')?.value;
       console.log(currentAns);
       if (currentAns != undefined) {
        $('#alertAns').fadeOut(100);
        this.currentIndex++;
        
        if (this.currentIndex > this.result.length-1) {
            $('#quiz').removeClass('show');
            $('#finsish').addClass('show');
            
            document.getElementById('score').innerText =this.score;
            
            $('#confeti').addClass('show');
           
        
        } else {
            if (currentAns === this.correctAnswers) {
                $('#correct').fadeIn(0);
                setTimeout(() => {
                    $('#correct').fadeOut(0);
                }, 500);
                this.score ++;
                document.getElementById("aud").play();
                
            } else {
                
                $('#inCorrect').fadeIn(0);
                setTimeout(() => {
                    $('#inCorrect').fadeOut(0);
                }, 500);
               
            }
            this.showQuestions();
        }

       } else {
         $('#alertAns').fadeIn(100)
       }

    }






}